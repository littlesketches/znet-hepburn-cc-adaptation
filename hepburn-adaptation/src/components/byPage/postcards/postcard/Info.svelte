<script>
    import AdaptationCriteria       from './AdaptationCriteria.svelte'
    import ActionTypeVis            from './ActionTypeVis.svelte'
    import { schema }               from  '../../../../data/schema.js' 
    import { data }                 from '../../../../data/stores.js';
    import { slugify }              from '../../../../utils/helpers.js'
    import { mapIcons, icons, triangle }      from  '../../../../utils/icons.js' 


    export let actionData 

    // Ge action data
    const actionType = actionData['Action type'] ? schema.actionTypes.data.filter( d => d.recordID === actionData['Action type'][0])[0].Type : null 
    const actionApproachArray =  [...new Set(actionData['Adaptation and risk approach'])].map( d => schema.adaptationApproaches.data.filter(e => e.recordID === d)[0]["Adaptation and risk approach"]) 
    const actionApproachThemeArray =  [...new Set(actionData['Adaptation and risk approach'].map( d => schema.adaptationApproaches.data.filter(e => e.recordID === d)[0]["Approach theme"]) )] 
    const actionApproachTheme = actionApproachThemeArray.length === 2 ? "Reduce risk and increase resilience" : actionApproachThemeArray[0]
    const actionScale = actionData.Scale ? schema.actionScale.data.filter( d => d.recordID === actionData.Scale[0])[0].Scale : null 
    const focusAreas = [...new Set(actionData['Focus areas'])].map( d => schema.adaptationFocus.data.filter(e => e.recordID === d)[0]["Alias"]) 
    const criteria ={
        flexible:       actionData[$data.schema.adaptationScreens.data.filter( d=> d.Screen === "Flexible")[0].fieldName] === "Yes" ? true : false,
        robust:         actionData[$data.schema.adaptationScreens.data.filter( d=> d.Screen === "Robust")[0].fieldName] === "Yes" ? true : false,
        viable:         actionData[$data.schema.adaptationScreens.data.filter( d=> d.Screen === "Viable")[0].fieldName] === "Yes" ? true : false
    }
    const assessment = ""

</script>

<section>
    <!-- Action type-->
    <div class ='info-container'>
        <div class = 'header'>
            <h4>Action type</h4>
        </div>
        <div class = "response-wrapper">
             <div class = "icon-wrapper">
                <ActionTypeVis {actionType}/>
            </div>
            <div class = "label-wrapper">
                <div class = 'response'>
                    {@html actionType}  
                </div>
            </div>
        </div>
    </div>

    <!-- Adaptation approach-->
    <div class ='info-container'>
        <div class = 'header'>
            <h4>Adapation approach</h4>
        </div>
        <div class = "response-wrapper">
             <div class = "icon-wrapper">
                <svg class ="scale-icon" viewBox= "0 0 100 100" width = "75%">
                    {#if actionApproachThemeArray.includes('Increase resilience')}
                    <path  d ={triangle(50)} style="transform:translate( 50px, 50px)"/>
                    {/if}
                    {#if actionApproachThemeArray.includes('Reduce risk')}
                    <path  d ={triangle(50, 'down')} style="transform:translate( 50px, 50px)"/>
                    {/if}
                </svg>
            </div>
            <div class = "label-wrapper">
                <div class = 'response icon-label'>
                    {@html actionApproachTheme}  
                </div>
            </div>
        </div>
    </div>

    <!-- Action scale -->
    <div class ='info-container'>
        <div class = 'header'>
            <h4>Project scale</h4>
        </div>
        <div class = "response-wrapper icon-label">
             <div class = "icon-wrapper">
                <svg class ="scale-icon" viewBox= "-50 -50 100 100" width = "75%">
                    <path  d ={mapIcons[actionScale]}/>
                </svg>
            </div>
            <div class = 'label-wrapper'>
                <div class = 'response icon-label'>
                {@html actionScale}
                </div>
            </div>  
        </div>
    </div>

    <!-- Focus area -->
    <div class ='info-container'>
        <div class = 'header'>
            <h4>Focus areas</h4>
        </div>
        <div class = 'response-wrapper list'>
            {#each focusAreas as focusArea}
            <div class = 'focusArea-wrapper'>
                <div class = "focusArea-icon-wrapper" >
                    <svg class = "focusArea-icon" viewBox = "-50 -50 100 100" width= "100%" height= "4rem">
                        <path d = {icons[slugify(focusArea)]}/>
                    </svg>
                </div>
                <div class = "focusArea-response response">{@html focusArea}</div>
            </div>
            {/each}
        </div>
    </div>

    <!-- Adapation screening criteria  -->
    <div class ='info-container'>
        <div class = 'header'>
            <h4>Adaptation criteria</h4>
        </div>
        <div class = 'response-wrapper icon-label'>
            <div class =  "icon-wrapper">
                <AdaptationCriteria {criteria}/>
            </div>
            <div class =  "label-wrapper">
                <div class = "response">No regrets</div>
                <!-- <div class>Very high adapation benefits</div> -->
            </div>
        </div>
    </div>

</section>


<style>
    section{
        grid-area: info;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    .info-container{
        display:                grid;
        grid-template-rows:     auto 1fr;
    }
    .info-container:not(:last-of-type){
        border-right:          solid 2px var(--foreground);
    }
    .header{
        height:                 fit-content;
    }
    h4{
        color:                  var(--midGrey);
        font-weight:            100;
        margin-block-start:     0;
        margin-block-end:       0;
        text-align:             center;
        text-transform:         uppercase;
        letter-spacing:         0.125rem;
    }
    /* Box icon and label wrapper */
    .response-wrapper{
        display:                grid;
        height:                 100%
    }

    .icon-wrapper, 
    .label-wrapper {
        grid-area:              1 / 1/ 2/ 2;
        display:                grid;
        align-content:          center;
        justify-content:        center;
        padding:                0 1rem;
    }
    .icon-wrapper{
        display:                flex;
        align-content:          center;
        justify-content:        center;
    }

    .icon-label{
        display:                grid;
    }
    .list{
        display:                flex;
        flex-direction:         column;
        justify-content:        space-evenly;
        height:                 calc(100% - 1.5rem);
    }

    .response{
        display:                flex;
        text-align:             center;
        color:                  var(--foreground);
        font-size:              1rem;
        font-weight:            700;
        line-height:            1;
        align-self:             center;
        justify-self:           center;
        text-shadow:  
             0.25px  0.25px 3px #fff,
             0.25px -0.25px 3px #fff,
            -0.25px  0.25px 3px #fff,
            -0.25px -0.25px 3px #fff;
    }

    /* Foucs Areas */
    .focusArea-wrapper{
        display:                grid;
        grid-template-columns:  1fr 2fr;
    }
    .focusArea-response{
        justify-self:           start;
        text-align:             start;
    }
    .focusArea-icon-wrapper{
        margin:                 0 0;
    }
    .focusArea-icon{
        fill:                   var(--brightGreen);
    }


    /* Action scale */
    .scale-icon{
        fill:                   var(--brightGreen);
        overflow:               visible;
    }

    @media print{
        .response{
        text-shadow:  
             0.25px  0.25px 0px #fff,
             0.25px -0.25px 0px #fff,
            -0.25px  0.25px 0px #fff,
            -0.25px -0.25px 0px #fff;
        }
    }
</style>