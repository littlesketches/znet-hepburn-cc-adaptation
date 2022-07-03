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
            const loadedClimateData =  await tsv("https://docs.google.com/spreadsheets/d/e/2PACX-1vS86VEQlm8KI0g0b_thIlz8boNSfWwO5xZgA_8wLOEfjgygRUR0WEVHnBD2kh9EgbgJqyKuKdkwn-F3/pub?gid=0&single=true&output=tsv")

            // Parse and shape data to numbers
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

            /// Call initApp
            if(tableName == dataTableNames[dataTableNames.length - 1]){
                setTimeout(() => initApp(airtableData, schema, climateData), 1000)
            }
        }) 
    }






};


    

