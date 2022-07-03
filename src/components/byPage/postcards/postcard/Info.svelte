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
    const criteria = {
        flexible:       actionData[$data.schema.adaptationScreens.data.filter( d => d.Screen === "Flexible")[0].fieldName],
        robust:         actionData[$data.schema.adaptationScreens.data.filter( d => d.Screen === "Robust")[0].fieldName], 
        viable:         actionData[$data.schema.adaptationScreens.data.filter( d => d.Screen === "Viable")[0].fieldName] 
    }
    let assessment = ''
    switch(actionData["Screening outcome"]){
        case  "=> No regrets":
            assessment =  "No regrets: highest priority"
            break
        case  "=> Discard":
            assessment =  "No adaptation benefit"
            break
        default:
            switch(Object.values(criteria).filter(d => d === "Yes").length){
                case 3:
                    assessment =  "No regrets"
                    break
                case 2:
                    assessment =  "High priority"
                    break
                case 1:
                    assessment =  "Low priority"
                    break
                case 0:
                    assessment =  "Uncertain adaptation benefit"
                    break
            }
    }
</script>


<!-- COMPONENT HTML MARKUP -->
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
            <h4>Adaptation approach</h4>
        </div>
        <div class = "response-wrapper">
             <div class = "icon-wrapper">
                <svg class ="scale-icon" viewBox= "0 0 100 100" width = "100%">
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
                <svg class ="scale-icon" viewBox= "-50 -50 100 100" width = "100%">
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

    <!-- Adaptation screening criteria  -->
    <div class ='info-container'>
        <div class = 'header'>
            <h4>Adaptation criteria</h4>
        </div>
        <div class = 'response-wrapper icon-label'>
            <div class =  "icon-wrapper">
                <AdaptationCriteria {criteria}/>
            </div>
            <div class =  "label-wrapper">
                <div class = "response">{@html assessment}</div>
            </div>
        </div>
    </div>
</section>


<!-- STYLES-->
<style>
    section{
        grid-area:                  info;
        display:                    grid;
        grid-template-columns:      1fr 1fr 1fr 1fr;
    }
    h4{
        color:                      var(--midGrey);
        font-weight:                100;
        font-size:                  1vw;
        margin-block-start:         0;
        margin-block-end:           0;
        text-align:                 center;
        text-transform:             uppercase;
        letter-spacing:             0.1vw;
    }
    .info-container{
        display:                    grid;
    }
    .info-container:not(:last-of-type){
        border-right:               solid 2px var(--foreground);
    }
    .header{
        height:                     1.5rem;
        grid-area:                  1 / 1 / 2 / 2;
        display:                    grid;
        justify-content:            center;
        align-content:              center;
        padding:                    0 1vw;        
    }

    /* Box icon and label wrapper */
    .response-wrapper{
        grid-area:                  1 / 1 / 2 / 2;
        display:                    grid;
        justify-content:            center;
        align-content:              end;
        padding-top:                0.75rem;
    }
    .icon-wrapper, 
    .label-wrapper {
        grid-area:                  1 / 1 / 2 / 2;
        display:                    grid;
        align-content:              center;
        justify-content:            center;
        padding:                    0 1vw;
    }
    .icon-label{
        display:                    grid;
    }
    .response{
        display:                    flex;
        text-align:                 center;
        color:                      var(--foreground);
        font-size:                  1.25vw;
        font-weight:                700;
        line-height:                1;
        align-self:                 center;
        justify-self:               center;
        text-shadow:  
             0.25px  0.25px 3px #fff,
             0.25px -0.25px 3px #fff,
            -0.25px  0.25px 3px #fff,
            -0.25px -0.25px 3px #fff;
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
        h4{
            font-size:         10pt;
        }
    }
</style>