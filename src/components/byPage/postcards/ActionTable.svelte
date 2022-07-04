<script>
    import { ui, data }     from '../../../data/stores.js'
    import { icons, mapIcons }        from '../../../utils/icons.js'
    import { slugify }      from '../../../utils/helpers.js'
	import { fade }         from 'svelte/transition';

    function openPostcard(actionData){
        $ui.state.postcards.view = 'postcard'
        $ui.state.postcards.selectedAction = actionData
    }
</script>


<!-- HTML COMPONENT MARKUP -->
<table>
    <thead>
        <tr>
            <th class = 'name'>Action name</th>
            <th class = 'leads'>Lead(s)</th>
            <th class = 'status'>Status</th>
            <th class = 'scale'>Scale</th>
            <th class = 'type'>Type</th>
            <th class = 'focusAreas'>Focus areas</th>
            <th class = 'hazards'>Hazards</th>
            <th class = 'assessment'>Assessment</th>
        </tr>
    </thead>

    {#each $data.actions as d, i}
    {@const leads = d["Project leads"].map(id => $data.stakeholders.filter(e => e.recordID === id)[0].Name  )}
    {@const type  = d["Action type"].map(id => $data.schema.actionTypes.data.filter(e => e.recordID === id)[0].Type)[0] }
    {@const scale = d["Scale"].map(id => $data.schema.actionScale.data.filter(e => e.recordID === id)[0].Scale)[0] }
    {@const focusAreas = d["Focus areas"].map(id => $data.schema.adaptationFocus.data.filter(e => e.recordID === id)[0]) }
    {@const hazards = d["Hazard"].map(id => $data.schema.hazards.data.filter(e => e.recordID === id)[0]) }
    {@const tier = d["Screening outcome"] === "=> No regrets" ? "No regrets" 
                    : d["Screening outcome"] === "=> Discard" ? "No adaptation benefit"
                        : d["# Criteria met"] === 2 ? "High priority"
                            : d["# Criteria met"] === 1 ? "Low priority" : "Adaptation benefit uncertain"
    }
        <tr class ="action-row" on:click={() => openPostcard(d)}>
            <td class = 'name'>{d.Name}</td>
            <td class = 'leads'>{leads.join(', ')}</td>
            <td class = 'status'>{d.Status}</td>
            <td class = 'scale'>
                <div class ="icon-container">
                    <svg class ='icon' viewBox="-50 -50 100 100" width="80%">
                        <path d = {mapIcons[scale]}/>
                    </svg>
                    <div class ="icon-label">{@html scale}</div>
                </div>
            </td>
            <td class = 'type'>{type}</td>
            <td class = 'focusAreas'>
                <div class ="icon-cell-container">
                {#each focusAreas as obj}
                    <div class ="icon-container">
                        <svg class ='icon' viewBox="-50 -50 100 100" width="80%">
                            <path d = {icons[slugify(obj.Alias)]}/>
                        </svg>
                        <div class ="icon-label">{@html obj.Alias}</div>
                    </div>
                {/each}
                </div>
            </td>
            <td class = 'hazards'>
                <div class ="icon-cell-container">
                {#each hazards as obj}
                    <div class ="icon-container">
                        <svg class ='icon' viewBox="-50 -50 100 100" width="80%">
                            <path d = {icons[slugify(obj.Hazard)]}/>
                        </svg>
                        <div class ="icon-label">{@html obj.Hazard}</div>
                    </div>
                {/each}
                </div>
            </td>
            <td class = 'assessment'>{tier}</td>
        </tr>
    {/each}
</table>


<!-- STYLING -->
<style>
    table{ 
        width:              100%;
        border-collapse:    collapse;
    }
	th{
        font-size:          0.8rem;
        text-align:         left;
        padding:            1.25rem 0.5rem;
        border-bottom:      5px solid var(--brightGreen);
    }
    tr{ 
        font-size:          0.65rem;
        line-height:        1.25;
        font-weight:        400;
        border-bottom:      0.25px solid var(--brightGreen);
    }
    td.name{
        font-weight:        600;
    }
    td{
        height:             5rem;
        padding:            0.5rem;
    }

    td.name,    th.name,
    td.leads,   th.leads,
    td.hazards, th.hazards,
    td.focusAreas, th.focusAreas{
         width:             20%;
    }
    td.scale,   th.scale,
    td.type,    th.type,
    td.status,  th.status, 
    td.assessment, th.assessment{
         width:             5%;
    }
    td.status,
    td.assessment{
        text-align:         center;
    }
    .action-row{
        transition:         100ms all;
        cursor:             pointer;
        fill:               var(--midGrey);
    }
    .action-row:hover{
        background-color:   var(--darkGreen);
        color:              var(--brightGreen);
        fill:               var(--brightGreen);
    }
    .icon-cell-container{
        display:            flex;
        align-content:      center;
    }
    .icon-container{
        width:              2.5rem;
        display:            flex;
        flex-direction:     column;
        align-items:        center;
    }
    .icon-label{
        font-size:          0.45rem;
        text-align:         center;
    }

    @media print{
        table {
            page-break-inside:  auto;
        }
        tr {
            page-break-inside:  avoid;
            page-break-after:   auto;
        }
        thead tr{
            padding-top:        1rem;
        }
    }
</style>