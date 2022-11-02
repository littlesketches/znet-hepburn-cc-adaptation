import App          from './App.svelte';
import airtable     from 'airtable'
import {tsv}        from 'd3'
import { schema }   from './data/schema.js'

export { app };

let app
initWithAirtableContent(initSvelteApp)

// Instantiate Svelte App with content and queryParams as props
function initSvelteApp(actionData, schemaData, climateData){
    const queryParams = new URLSearchParams(window.location.search)
    
    // Filter action data for records with 'complete' data entry
    console.log(actionData["Adaptation actions"]) 
    actionData["Adaptation actions"] = actionData["Adaptation actions"]
                                            .filter( d => d["Action type"])
                                            .filter( d => d["Adaptation and risk approach"])
                                            .filter( d => !isNaN(d["Adaptation rating"]) ) 
                                            .filter( d => !isNaN(d["Average hazard rating"]) ) 
                                            .filter( d => d["Name"])
                                            .filter( d => d["Focus areas"])
                                            .filter( d => d["Hazard"])
                                            .filter( d => d["Hazard event"])
                                            .filter( d => d["Linked approach theme"])
                                            .filter( d => d["Project leads"])
                                            .filter( d => d["Flexible: increases flexibility and preserves options"])
                                            .filter( d => d["Robust: to wide range of climate futures"])
                                            .filter( d => d["Viable: practical and financially viable"])
                                            .filter( d => d["Scale"])

    app = new App({
        target: document.body,
        props: {actionData, schemaData, climateData, queryParams}
    });
};

// Get Airtable + GSheet content before instantiating Svelte app
function initWithAirtableContent(initApp){
    const apiKey = 'key3EFjfpM7LqvZGK'
    const dataBase = new airtable({apiKey}).base('appBfnKX8Pf8oHvRt');
    const airtableData = {}

    // Schema data
    for (const tableName of Object.keys(schema) ){
        dataBase(`s_${tableName}`).select({
            maxRecords: 50,
            view: "Grid view",
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(record => {
                const cleanRecord = {} 
                for( const field of schema[tableName].fields){
                    cleanRecord[field] = record.fields[field]
                }
                schema[tableName].data.push(cleanRecord) 
            })
            fetchNextPage()
        })
    }
    // Content database
    const dataTableNames = ['Adaptation actions', 'Stakeholders', 'References']
    for (const tableName of dataTableNames) {
        airtableData[tableName] = []
        dataBase(tableName).select({
            maxRecords: 200,
            sort: [{field: "Name", direction: "asc"}]
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(record => airtableData[tableName].push(record.fields) )
            fetchNextPage()
        }).then( async() => {
        
            //////////// Load climate data from GSheet TSV
            const loadedClimateData =  await tsv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTdZpZiXgr0PBPLmMtIGJVNzRrxv3F70UEPT3vhbzg3IsjIbu__JY8PWve6r5Tt2dqNmg-jOXPiwf-y/pub?gid=0&single=true&output=tsv")
            // const loadedClimateData =  []
            console.log(loadedClimateData)

            // // Parse and shape data to numbers
            const climateData = {
                schema: {
                    scenarios:  ["RCP4.5", "RCP8.5"],
                    seasons:    ["Annual", "Summer", "Autumn", "Winter", "Spring"],
                    years:      [2030, 2050, 2070, 2090],
                    variables:  [...new Set(loadedClimateData.map(d => d.Variable))],
                    estimates:  ["Median", "Lower", "Upper"]
                },
                variables: {
                    projectedChange: {}
                } 
            }
console.log(climateData)
            for(const d of loadedClimateData){
                for(const scenario of climateData.schema.scenarios){ 
                    if(!climateData.variables.projectedChange[scenario]) climateData.variables.projectedChange[scenario] = {}
                    for (const season of climateData.schema.seasons){  
                        if(!climateData.variables.projectedChange[scenario][season]) climateData.variables.projectedChange[scenario][season] = {}
                        for(const variable of climateData.schema.variables){
                            if(!climateData.variables.projectedChange[scenario][season][variable]) climateData.variables.projectedChange[scenario][season][variable] = {}
                            for(const estimate of climateData.schema.estimates){
                                if(!climateData.variables.projectedChange[scenario][season][variable][estimate]) climateData.variables.projectedChange[scenario][season][variable][estimate] = {}
                                for(const year of climateData.schema.years){
                                    if(d.Variable === variable && season === d.Season) {
                                        climateData.variables.projectedChange[scenario][season][variable][estimate][year] =  +d[`${year}-${scenario}_${estimate}`]
                                    }
                                }
                            }
                        }                    
                    }
                }
            }
console.log(climateData.variables.projectedChange)
            /// Call initApp
            if(tableName == dataTableNames[dataTableNames.length - 1]){
                setTimeout(() => initApp(airtableData, schema, climateData), 1000)
            }
        }) 
    }






};


    

