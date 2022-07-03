<script>
    import { ui, data }     from '../../../data/stores.js'
	import { fade }         from 'svelte/transition';

    const rowspanData = $data.schema.riskArea.data.map( d => {
        return {
            area:       d["Risk area"],
            count:      $data.schema.communityRisks.data.filter(e => e["Risk area"][0] === d.recordID).length,
        }
    })
    const rowspanIndexes = [0].concat(rowspanData.map(d => d.count).reduce((a, x, i) => [...a, x + (a[i-1] || 0)], [])  ) 
</script>


<!-- HTML COMPONENT MARKUP -->
<table>
    <thead>
        <tr>
            <th>Risk area</th>
            <th>Climate risk to the community</th>
            <th>Hazard events</th>
            <!-- <th>Climate hazards</th> -->
        </tr>
    </thead>

    {#each $data.schema.communityRisks.data as d, i}
        {@const riskGroupArray = d["Risk area"].map(recordID => $data.schema.riskArea.data.filter(e => e.recordID === recordID)[0]["Risk area"]) } 
        {@const riskArray = [...new Set(d["Linked hazards"])].map(recordID => $data.schema.hazards.data.filter(e => e.recordID === recordID)[0]["Hazard"] )  }
        <tr>
            {#if rowspanIndexes.indexOf(i) > -1}
            {@const spanData = rowspanData[rowspanIndexes.indexOf(i)]}
            <td class = 'community-theme' rowspan={spanData.count} >{ riskGroupArray ? riskGroupArray.join(", ") : '' }</td>
            {/if}
            <td class = 'community-risk'>{d["Community risk"]}</td>
            <td class = 'hazard-event'>{d["Hazard events"] ? d["Hazard events"].map(d => $data.schema.hazardEvents.data.filter(e => e.recordID === d)[0]["Hazard event"]).join(", ")  : 'None'} </td>
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
        font-size:          1rem;
        text-align:         left;
        padding:            1.25rem 0;
        border-bottom:      5px solid var(--brightGreen);
    }
    tr{ 
        font-size:          0.8rem;
        min-height:         1.5rem;
        line-height:        1.5;
        font-weight:        400;
        border-bottom:      0.25px solid var(--brightGreen);
    }
    td{
        padding:        0.5rem 1.5rem 0.5rem 0;
    }
    td.community-theme{
        width:          20%;
    }
    td.community-risk{
        width:          60%;
    }
    td.hazard-event{
        width:          20%;
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