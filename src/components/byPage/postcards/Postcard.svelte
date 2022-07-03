<script>
    import {fade }      from 'svelte/transition'
    import Title        from './postcard/Title.svelte'
    import Main         from './postcard/Main.svelte'
    import ImageHazards from './postcard/ImageHazards.svelte'
    import Info         from './postcard/Info.svelte'
    import Strip        from './postcard/Strip.svelte'

    export let actionData
</script>

<!-- HTML COMPONENT MARKUP -->
<main class = "postcard" transition:fade>
    <Strip {actionData}/>    
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
        min-height:             calc(100vh - 6rem);
        padding-bottom:         20vh;
        grid-template-columns:  0.5fr 2fr 1fr 2fr;
        grid-template-rows:     auto 2fr 20vh;
        grid-column-gap:        2.5rem;
        grid-row-gap:           2.5rem;
        grid-template-areas: 
            "strip  title  title   img"
            "strip  main   main    img"
            "strip  info   info    img"
    }

    @media print {
        main{
            height:             209.5mm;
            overflow:           hidden;
            grid-row-gap:       10mm;
            grid-column-gap:    5mm;
            padding:            2.5mm 2.5mm 2mm 2.5mm;
            page-break-after:   always;
        }
    }
</style>
