<!-- TITLE BLOCK-->
<script>
    import Logo         from '../../../shared/Logo.svelte'
	import {  data }    from '../../../../data/stores.js' 

    export let actionData 
</script>


<!-- HTML COMPONENT MARKUP-->
<section class ="title">
    <div class = "main-title">
        <h1 class:three-line="{actionData.Name.length > 70}">{@html actionData.Name}</h1>
        {#if actionData["Project leads"]}
        <h3>Led by            
            {#each actionData["Project leads"].map(d => $data.stakeholders.filter(e => e.recordID === d)[0].Name)  as lead, i}
                {#if i  > 0}
                    {#if i === actionData["Project leads"].length - 1}&nbsp;and {:else}, {/if}
                {/if}
                {@html lead}  
            {/each}
        </h3>
        {/if}
    </div>
</section>


<!-- STYLES -->
<style>
    section{
        grid-area:              title;
        display:                grid;
        border-bottom:          5px solid var(--pc-foreground);
        height:                 fit-content;
    }
    h1{
        font-size:              3.5vw;
        font-weight:            800;
        text-align:             left;
        margin-block-end:       0rem;
        margin-block-start:     0rem;
        text-transform:         uppercase;
        line-height:            1;
        padding-top:            5vh;                
        color:                  var(--pc-foreground);
    }
    h1.three-line{
        font-size:              3vw;
        line-height:            1;
    }
    h3{
        text-align:             left;
        font-size:              1.25vw;
        margin-block-start:     0.75rem;
        color:                  var(--midGrey);
    }

    .main-title{
        align-self:             flex-start;
        padding-right:          5vw;
        display:                flex;
        flex-direction:         column;
        height:                 100%;
        justify-content:        space-between;
    }
</style>