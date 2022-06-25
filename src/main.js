import App          from './App.svelte';
import airtable     from 'airtable'
import { schema }   from './data/schema.js'

export { app };

let app
initWithAirtableContent(initSvelteApp)

// Instantiate Svelte App with content and queryParams as props
function initSvelteApp(actionData, schemaData){
    const queryParams = new URLSearchParams(window.location.search)

    app = new App({
        target: document.body,
        props: {actionData, schemaData, queryParams}
    });
};

// Get Airtable content before instantiating Svelte app
function initWithAirtableContent(initApp){
    const apiKey = 'key3EFjfpM7LqvZGK'
    const dataBase = new airtable({apiKey}).base('appBfnKX8Pf8oHvRt');
    const airtableData = {}

    // Schema data
    for (const tableName of Object.keys(schema) ){
        dataBase(`s_${tableName}`).select({
            maxRecords: 50
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
        }).then( () => {
            if(tableName == dataTableNames[dataTableNames.length - 1]){
                setTimeout(() => initApp(airtableData, schema), 1000)
            }
        }) 
    }
};
