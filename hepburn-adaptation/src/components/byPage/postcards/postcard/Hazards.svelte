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
    <h3>Response to climate hazards and events</h3>
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
        grid-area: hazards;
    }
    h3{
        margin-block-start:     0;
    }

    .hazards-wrapper {
        grid-area:              hazards;
        color:                  var(--foreground);
        background-color:       var(--brightGreen);
        padding:                var(--spacing);
        height:                 var(--postacard-img-height);
    }

    .hazards-container{
        display:                flex;
        flex-direction:         column;
        justify-content:        space-between;
    }

    /* Hazard container styling */
    .hazard-container{
        padding-bottom:         0.5rem;
        font-weight:            600;
        display:                grid;
        grid-template-columns:  1fr 1fr 2fr;
        grid-template-areas:    'icon title title'
                                'icon events rating'
    }                              

    .hazard-label-wrapper{
        grid-area:              title;
        display:                grid;
        justify-content:        start;
        align-content:          end;
        font-size:             1rem;
        z-index:                10;
        line-height:            1;
        text-transform:         uppercase;
    }
    .hazard-icon-wrapper{
        grid-area:              icon;
        display:                grid;
        justify-content:        center;
        align-content:          start;
    }
    .hazard-event-wrapper{
        grid-area:              events;
        padding-bottom:         0.5rem;
        font-size:              1rem;
        font-weight:            600;
    }
    .marker-wrapper{
        grid-area:              rating;
        display:                flex;
        justify-content:        center;
        align-items:            center;
    }

    .hazard-icon{
        fill:                   var(--foreground);
        width:                  100%;
    }
    .event{
        font-size:                  0.5rem;
        font-weight:                300;
    }


    .marker{
        height:                 0.75rem;
        width:                  0.75rem;
        border-radius:          50%;
        border:                 1px solid var(--foreground)   
    }
    .marker.filled{
        background:             var(--foreground)
    }
    .marker:not(:last-of-type){
        margin-right:           0.125rem;
    }

    @media print{
        .hazard-label-wrapper{


        }
    }
</style>