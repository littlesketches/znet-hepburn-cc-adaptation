<script>
    import { ui, data }     from '../../../data/stores.js'
	import { fade }         from 'svelte/transition';


    console.log($data.schema.communityRisks.data)

</script>


<!-- HTML COMPONENT MARKUP -->

<table>
    <tr>
        <th>Risk theme</th>
        <th>Community risk</th>
        <th>Hazard events</th>
        <!-- <th>Climate hazards</th> -->
    </tr>

    {#each $data.schema.communityRisks.data as d, i}
    {@const riskGroupArray = d["Risk area"].map(recordID => $data.schema.riskArea.data.filter(e => e.recordID === recordID)[0]["Risk area"]) } 
    {@const riskArray = [...new Set(d["Linked hazards"])].map(recordID => $data.schema.hazards.data.filter(e => e.recordID === recordID)[0]["Hazard"] )  }

    <tr>
        <td class = 'community-theme'>{ riskGroupArray ? riskGroupArray.join(", ") : '' }</td>
        <td class = 'community-risk'>{d["Community risk"]}</td>
        <td class = 'hazard-event'>{d["Hazard events"] ? d["Hazard events"].map(d => $data.schema.hazardEvents.data.filter(e => e.recordID === d)[0]["Hazard event"]).join(", ")  : 'None'} </td>
        <!-- <td class = 'hazard'>{riskArray ? riskArray.join(", ") : '' }</td> -->
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