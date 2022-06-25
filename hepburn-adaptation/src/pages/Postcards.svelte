<script>
    import Logo             from '../components/shared/Logo.svelte'
    import Postcard         from '../components/byPage/postcards/Postcard.svelte'
	import {  data }        from '../data/stores.js'	 
</script>


<!-- HTML COMPONENT MARKUP -->
<!-- Hero page section-->
<div class = 'hero-wrapper'>
    <div class="hero-content">
        <!-- Hero page section -->
        <div class="hero-logo">
            <div class="hero-logo__wrapper"><Logo/></div>
        </div>
        <h1 class="hero-content__title">
            <span class = "title--mute">hepburn</span><br/>
            adapation action<br/>
            <span class = "title--highlight">postcards</span>
        </h1>
        <div class="hero-content__text">
            <p>This section provides a set of summary 'postcards' for <em>every</em> adaptation considered in this research. These postcards provide descriptions, details and links to further information about each action; and can be added to via the Hepburn Z-NET adaptation action database. 
            </p>
            <p class = 'note'>Note: Options for selecting and styling each action postcards will be provided. The default development view (as shown) is to 
            </p>
        </div>
        <div class ="select">
            <ul>
                <li class = "select__item" on:click={scrollTo} actName = "maker">Postcard maker</li>
                <li class = "select__item" on:click={scrollTo} actName = "menu">Actions menu</li>
            </ul>
        </div>
    </div>
</div>

<!-- Page content section-->
<div class = "content-wrapper">
    <section class = "option-container col-1-2">
        <div>
            <h2>Options for viewing creating adapation action postcards</h2>
            <div>
                <div>Select an action from a list</div>
                <div>Select an action from table</div>
                <div>Select an action from table</div>
            </div>
            <div>
                <h3>Postcard styling options</h3>
                <div>Color palette options</div>
                <div>Image style options</div>
            </div>
        </div>
    </section>

    <section class = "postcards-container">
        {#each $data.actions as action }
        <Postcard actionData={action}></Postcard>
        {/each}
    </section>
</div>

<!-- STYLES -->
<style>
    /** PAGE / VIS STORY SECTION **/
   .option-container{
        display:                grid;
        column-gap:             6rem;
        min-height:             100vh;
        padding:                3rem;
        display:                none;
    }
    .col-1-2{
        grid-template-columns:  1fr 2fr; 
        grid-template-areas:    'narrative vis';
    }


    /** HERO SECTION **/
    .hero-content {
        padding:                2rem;
        align-items:            center;
        justify-self:           center;
        display:                grid;
        grid-template-columns:  50% 50%;
        grid-template-rows:     calc(25vh - 1rem) calc(25vh - 1rem) calc(50vh - 2rem);
        grid-template-areas: 	
            'back logo'
            'title title'
            'text select'
    }

    .hero-content__title {
        grid-area:              title;
        font-weight:            700;
        font-size:              2.5rem;
        line-height:            1;
        position:               relative;
        margin:                 0 0 1rem 0;
        padding:                0 0 1rem 0;
        align-self:             start;
        text-transform:         lowercase;
    }
    .hero-content__title::after {
        content:                '';
        position:               absolute;
        width:                  3rem;
        height:                 1px;
        background:             currentColor;
        top:                    100%;
        left:                   0;
    }
        .title--mute{       color:  var(--midGrey);     }
        .title--highlight{  color:  var(--brightGreen); }

    .hero-content__text {
        grid-area:              text;
    }
    .hero-logo{
        grid-area:              logo;
        align-self:             start;
        justify-self:           end;
    }    
    .hero-logo__wrapper{
        max-width:              100px;
    }
    .select {
        grid-area:              select;
        color:                  var(--color-select);
        font-size:              0.65rem;
    }
    .select__item {
        margin:                 0 0 0 0.5rem;
        display:                inline-block;
        cursor:                 pointer;
        font-size:              0.65rem;
        font-weight:            300;
    }
    .select__item:hover {
        color:                  var(--foreground);
        font-weight:            700;
    }


    @media screen and (min-width: 53em) {
        .hero-content {
            padding:                3rem 3rem 2rem;
            grid-template-columns:  calc(50% - 2rem) calc(50% - 2rem) ;
            column-gap:             4rem;
            grid-template-areas: 	
                'back logo'
                'title title'
                'text select'
        }
        .hero-content__title {
            font-size: 4.5rem;
            margin: 0 0 4rem 0;
            padding: 0 0 2rem 0;
        }
        .hero-content__text {
            max-width: var(--min-col-width);
        }

        .select {
            text-align: right;
            margin-top: auto;
            align-self: end;
        }
        .select__item {
            display: block;
            margin: 0;
        }
        .content-wrapper{
            width:                  100vw;
            padding:                0;
            margin:                 0;
            display:                grid;
        }
    }

    @media print{
        .hero-wrapper{
            height:             190mm;
            overflow:           hidden;
            grid-row-gap:       10mm;
            grid-column-gap:    20mm;
            padding:            10mm;
            page-break-after:   always;
        }
        .select,    
        .note{
            display:            none
        }
        .hero-content__title {
            font-size:              4.5rem;
        }
    }

</style>