<script>
    import Logo              from '../../../shared/Logo.svelte'
    import { schema }        from  '../../../../data/schema.js' 
    import { icons }         from  '../../../../utils/icons.js' 
    import { slugify }       from '../../../../utils/helpers.js'
    import { ui, data }      from '../../../../data/stores.js';

    export let actionData 
    const focusAreas = [...new Set(actionData['Focus areas'])].map( d => schema.adaptationFocus.data.filter(e => e.recordID === d)[0]["Alias"]) 

</script>


<!-- HTML COMPONENT MARKUP -->
<section>
    <div class = 'logo-container'>
        <Logo/>
    </div>
    <div class ="strip-1a"></div>
    <div class ="strip-2a"></div>
    <div class ="strip-1b">
        <div class = 'vertical-label-container'>
            <div class = "vertical-label">Hepburn climate change adaptation focus areas</div>
        </div>
    </div>
    <div class ="strip-2b">
        <div class = 'focus-area-container'>
            {#each $data.schema.adaptationFocus.data as d}
            <div class = "focusArea-wrapper" class:selected={focusAreas.indexOf(d.Alias) > -1}>
                <div class = "focusArea-icon-wrapper" >
                    <svg class = "focusArea-icon"  viewBox = "-50 -50 100 100" width= "80%" >
                        <path d = {icons[slugify(d.Alias)]} />
                    </svg>
                </div>
                <div class = "focusArea-icon-label" >{@html d.Alias}</div>
            </div>
            {/each}
        </div>
    </div>
</section>


<!-- STYLES -->
<style>
    :root{
       --iconWidth:                 5vw; 
    }
    section{
        grid-area:                  strip;
        display:                    grid;
        grid-template-columns:      1fr 2fr;
        grid-template-rows:         5vh auto 1fr;
        grid-template-areas: 
                "strip-1a   strip-2a"
                "logo       logo"
                "strip-1b   strip-2b";
        min-height: calc(100vh - 6rem);
    }
    .logo-container{
        grid-area:                  logo;
        padding:                    1rem 0;
    }
    .focusArea-icon{
        fill:                        var(--pc-foreground);  
    }
    .strip-1a,
    .strip-1b{
        background-color:           var(--pc-foreground);
        color:                      var(--pc-background);
    }
    .strip-2a,
    .strip-2b{
        background-color:           var(--pc-background);
        color:                      var(--pc-foreground);
    }
    .strip-1a{ grid-area:           strip-1a; }
    .strip-2a{ grid-area:           strip-2a; }
    .strip-1b{ grid-area:           strip-1b; }
    .strip-2b{ grid-area:           strip-2b; }

    .strip-1b,
    .strip-2b{
        display:                    flex;
        flex-direction:             column;
        justify-content:            flex-end;
    }

    .vertical-label-container{
        position:                   absolute;
        transform-origin:           0 0;
        transform:                  rotate(-90deg);
        display:                    flex;
    }
    .vertical-label{
        text-transform:             uppercase;
        font-size:                  1vw;
        letter-spacing:             0.15vw;
        padding:                    0.5rem 0;
        opacity:                    0.65
    }
    .focusArea-wrapper{
        opacity:                    0.1;
    }
    .focusArea-wrapper.selected{
        opacity:                    1;
    }
    .focus-area-container{
        padding-bottom:             2.5vh;
    }
    .focusArea-icon-wrapper{
        display:                    flex;
        justify-content:            center;
        align-content:              center;
    }
    .focusArea-icon-label{
        font-size:                  0.75vw;
        text-align:                 center; 
        padding-bottom:             0.75vw;
    }

</style>
