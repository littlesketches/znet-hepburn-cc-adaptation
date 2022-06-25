<script>
    import Title        from './postcard/Title.svelte'
    import Main         from './postcard/Main.svelte'
    import ImageHazards from './postcard/ImageHazards.svelte'
    import Info         from './postcard/Info.svelte'

    export let actionData
</script>

<!-- HTML COMPONENT MARKUP -->
<main class = "postcard">
    <Title {actionData}/>
    <Main {actionData}/>
    <ImageHazards {actionData}/>
    <Info {actionData}/>
</main>

<!-- STYLING -->
<style>
    main{ 
        /* height:                 calc(100vh - 5rem); */
        display:                grid;   
		padding:                2.5rem;
        padding-bottom:         20vh;
        grid-template-columns:  1fr 1fr;
        grid-template-rows:     auto 2fr minmax(15vh, auto);
        grid-column-gap:        5rem;
        grid-row-gap:           1.5rem;
        grid-template-areas: 
            "title  title"
            "main   imgHaz"
            "info   info"
    }

    @media print {
        main{
            height:             190mm;
            overflow:           hidden;
            grid-row-gap:       10mm;
            grid-column-gap:    20mm;
            padding:            7.5mm;
            page-break-after:   always;
        }
    }
</style>