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


<!-- HTML COMPONENT MARKUP-->
<section class ="main">
    <div class = "about-container">
        <h3>About the action</h3>
        <div class = "about-content">
            {@html converter.makeHtml(actionData.Description)}
        </div>
    </div>
        {#if (actionData["More info #1 URL"] && actionData["More info #1 description"]) 
            ||  (actionData["More info #2 URL"] && actionData["More info #2 description"]) 
            ||  (actionData["More info #3 URL"] && actionData["More info #3 description"])  
        }
        <div class ="further-info-container">
            <h3>Further information</h3>
            <ul>
            {#if actionData["More info #1 URL"] && actionData["More info #1 description"] }
                <li><a href = {actionData["More info #1 URL"]}  target="_blank">{@html actionData["More info #1 description"]} </a></li>
            {/if}
            {#if actionData["More info #2 URL"] && actionData["More info #2 description"] }
                <li><a href = {actionData["More info #2 URL"]}  target="_blank">{@html actionData["More info #2 description"]} </a></li>
            {/if}
            {#if actionData["More info #3 URL"] && actionData["More info #3 description"] }
                <li><a href = {actionData["More info #3 URL"]}  target="_blank">{@html actionData["More info #3 description"]} </a></li>
            {/if}
            </ul>
        </div>
        {/if}
</section>


<!-- STYLES -->
<style>
    section{
        grid-area:              main;
        text-align:             left;
    }
    h3{
        font-size:              1.25vw;
        margin-block-start:     0;
        margin-block-end:       0rem;
        color:                  var(--pc-foreground);
    }
    div{
        color:                  var(--midGrey);
        font-weight:            300;
        line-height:            1.35;
    }
    ul{
        padding-inline-start:   1rem;
        margin-block-start:     0.5em;
        margin-block-end:       0.5em;
    }
    li{
        font-size:              1vw;
    }
    .further-info-container{
        padding-top:            1rem
    }
    @media print {
        section{
            overflow:           hidden;
        }
        .further-info-container{
            display:            none;
        }
    }
</style>