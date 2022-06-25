<!-- MAIN CONTENT BLOCK -->
<script>
    import showdown     from 'showdown'
    import { schema }   from  '../../../../data/schema.js' 
    export let actionData 

    // HTML converter
    const converter = new showdown.Converter()

    const risks = actionData["Direct risks addressed"] ? actionData["Direct risks addressed"].map(d => schema.climateRisks.data.filter(e => e.recordID === d)[0].Risk ) : []
    const riskGroups = actionData["Risk group"]  ? actionData["Risk group"]  : []

</script>

<!-- HTML COMPONENT MAKRUP-->
<section class ="main">
    <div class = "about-container">
        <h3>About the action</h3>
        <div class = "about-content">
            {@html converter.makeHtml(actionData.Description)}
        </div>
    </div>
    <div class = "risk-group-wrapper">
        <h3>Community benefits</h3>
        <div class = "risk-group-container">
            <div class = "risk-group-header">Risk groups</div>
            <div class = "risk-group-tag-container">
                {#each riskGroups as riskGroup }
                <div>{@html riskGroup}</div>
                {/each}
            </div>
        </div>
        <div class = "risk-group-container">
            <div class = "risk-group-header">Risks</div>
            <div class = "risk-list">
                <ul>
                    {#each risks as risk }
                    <li>{@html risk}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</section>


<!-- STYLES -->
<style>
    section{
        grid-area:          main;
        text-align:         left;
    }
    h3{
        margin-block-start: 0;
        margin-block-end: 0rem;
        color: var(--brightGreen);
        color: var(--foreground);
    }

    div{
        color: var(--midGrey);
        font-weight: 300;
        line-height: 1.35;
    }
    ul{
        margin-block-end: 0;
        margin-block-start: 0;
        padding-inline-start: 1rem;
    }
    li{
        margin-bottom:      0.5rem;
    }   

    .risk-group-wrapper{
        padding-top: 1rem;  
    }
    .risk-group-container{
        display: grid;
        grid-template-columns: 1fr 4fr;
        font-size: 0.8rem;    
        margin-top: 1rem;;
    }
    .risk-group-header{
        font-weight:            200;
        text-transform:         uppercase;
        letter-spacing:         0.125rem;
    }
    .risk-group-tag-container div{
        display:            inline-flex;
        padding:            0.25rem 0.5rem;
        font-size:          0.65rem;
        font-weight:        600;
        border-radius:      1rem;
        border:             solid 1px #000;
    }


    @media print {
        section{
            /* max-height:        45vh; */
            overflow:           hidden;
        }
    }


</style>