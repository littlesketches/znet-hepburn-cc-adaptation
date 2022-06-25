<script>
    import { ui, data }     from '../../../data/stores.js'
	import { fade }    from 'svelte/transition';
import { filter, map } from 'd3';



</script>


<!-- HTML COMPONENT MARKUP -->

<table>
    <tr>
        <th>Risk theme</th>
        <th>Community risk</th>
        <th>Climate hazards</th>
        <th>Hazard events</th>
    </tr>

    {#each $data.schema.communityRisks.data as d, i}
    <tr>
        <td class = 'community-theme'>{d["Risk group"] ? d["Risk group"].join(" | ") : ''}</td>
        <td class = 'community-risk'>{d["Community risk"]}</td>
        <td class = 'hazard'>TBA</td>
        <td class = 'hazard-event'>{d["Hazard events"] ? d["Hazard events"].map(d => $data.schema.hazardEvents.data.filter(e => e.recordID === d)[0]["Hazard event"]).join(", ")  : 'None'} </td>
    </tr>
    {/each}

</table>

<!-- STYLING -->
<style>
    table{ 
        width: 100%;
         border-collapse: collapse;

    }
	th{
        font-size:      1rem;
        text-align:     left;
        padding:        1.25rem 0;
        border-bottom:   5px solid var(--brightGreen);
    }
    tr{ 
        font-size:      0.8rem;
        min-height:     1.5rem;
        line-height:    1.5;
        font-weight:    400;
        border-bottom:  0.25px solid var(--brightGreen);
    }
    td{
        padding:        0.5rem 1.5rem 0.5rem 0;
    }
    td.community-theme{
        width:          15%;
    }
    
    td.community-risk{
        width:          55%;
    }
    td.hazard,
    td.hazard-event{
        width:          15%;
    }
    @media print{
        table {
            page-break-inside:  auto;
        }
        tr {
            page-break-inside:  avoid;
            page-break-after:   auto;
        }
    }
</style>