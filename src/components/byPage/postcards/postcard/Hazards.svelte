<!-- HAZARD EVENT RATINGS-->
<script>
    import { data }         from '../../../../data/stores.js'
    import { icons }        from '../../../../utils/icons.js'
    import { slugify }      from '../../../../utils/helpers.js'

    export let actionData 

    const hazardRecordList = [...new Set(actionData.Hazard)]
    const hazardList = [...new Set(actionData.Hazard)].map(d => $data.schema.hazards.data.filter(e => e.recordID === d)[0].Hazard)
    const eventObjList = [...new Set(actionData["Hazard event"])].map(d => $data.schema.hazardEvents.data.filter(e => e.recordID === d)[0])
    const eventsByHazard = {}
    hazardRecordList.forEach( (id, i) =>{
        eventsByHazard[hazardList[i]] = []
        for(const obj of eventObjList){
            if(obj.Hazard && id === obj.Hazard[0]){
                eventsByHazard[hazardList[i]].push(obj["Hazard event"])
            }
        }
    })
</script>


<!-- HTML COMPONENT MARKUP -->
<section class ="hazards-wrapper">
    <div class = "wedge"></div>
    <h3>Ratings vs climate hazards</h3>
    <div class ="hazards-container">
        {#each hazardList as hazard}
        <div class = "hazard-container {slugify(hazard)}">
            <div class = 'hazard-label-wrapper'>{@html hazard}</div>
            <div class = "hazard-icon-wrapper">
                <svg class = "hazard-icon" viewBox = "-50 -50 100 100">
                    <path class = "icon {slugify(hazard)}" d = {icons[slugify(hazard)]}/>
                </svg>
            </div>
            <div class = "event-wrapper">
                {#each eventsByHazard[hazard] as event}
                <div class = "event">{@html event}</div>
                {/each}
            </div>
            <div class = 'marker-wrapper'>
                {#if actionData[hazard] > 0}<div class = 'marker filled'></div>{:else}<div class = 'marker'></div>{/if}
                {#if actionData[hazard] > 1}<div class = 'marker filled'></div>{:else}<div class = 'marker'></div>{/if}
                {#if actionData[hazard] > 2}<div class = 'marker filled'></div>{:else}<div class = 'marker'></div>{/if}
                {#if actionData[hazard] > 3}<div class = 'marker filled'></div>{:else}<div class = 'marker'></div>{/if}
                {#if actionData[hazard] > 4}<div class = 'marker filled'></div>{:else}<div class = 'marker'></div>{/if}
            </div>
        </div>
        {/each}
    </div>
</section>


<!-- STYLES -->
<style>
    section{
        grid-area:              1 / 1 / 3 / 3;
        height:                 fit-content;
        color:                  var(--pc-foreground);
        margin:                 var(--spacing);
        align-self:             end;

    }
    h3{
        font-size:              1vw;
        margin-block-start:     0rem;
        margin-block-end:       0rem;
        padding-bottom:         0.75rem;
        text-align:             center;
        font-weight:            300;
        letter-spacing:         0.15vw;
        text-transform:         uppercase;
        background-color:       rgba(255, 255, 255, 0.7);
    }
    .wedge{
        height:                 7.5vh;
        width:                  100%;
        background-color:       rgba(255, 255, 255, 0.7);
        padding:                var(--spacing);
        clip-path:              polygon(0% 100%, 100% 0%, 100% 100%, 0% 130%) 
    }
    .hazards-container{
        display:                flex;
        flex-direction:         column;
        justify-content:        space-between;
        background-color:       rgba(255, 255, 255, 0.7);
    }

    /* Hazard container styling */
    .hazard-container{
        display:                grid;
        grid-template-columns:  1fr 1fr 2fr;
        grid-template-rows:     40% 60%;
        grid-template-areas:    'icon title title'
                                'icon events rating'
    }                              
    .hazard-label-wrapper{
        grid-area:              title;
        display:                grid;
        justify-content:        start;
        align-content:          end;
        font-size:              1.25vw;
        font-weight:            700;
        z-index:                10;
        line-height:            1;
        /* text-transform:         uppercase;
        letter-spacing:         0.1vw; */
    }
    .hazard-icon-wrapper{
        grid-area:              icon;
        display:                grid;
        justify-content:        center;
    }
    .hazard-event-wrapper{
        grid-area:              events;
        padding-bottom:         0.75vw;
        font-size:              1rem;
        font-weight:            600;
    }
    .marker-wrapper{
        grid-area:              1 / 3 / 3 / 4;
        display:                flex;
        justify-content:        center;
        align-items:            center;
    }

    .hazard-icon{
        fill:                   var(--pc-foreground);
        width:                  90%;
        height:                 100%;
    }
    .event{
        font-size:              0.75vw;
        font-weight:            300;
    }
    .marker{
        height:                 1vw;
        width:                  1vw;
        border-radius:          50%;
        border:                 1px solid var(--pc-foreground)   
    }
    .marker.filled{
        background:             var(--pc-foreground)
    }
    .marker:not(:last-of-type){
        margin-right:           0.2vw;
    }

    @media print{
        .hazard-label-wrapper{


        }
    }
</style>