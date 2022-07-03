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
        color:                  var(--foreground);
    }
    div{
        color:                  var(--midGrey);
        font-weight:            300;
        line-height:            1.35;
    }

    @media print {
        section{
            overflow:           hidden;
        }
    }
</style>