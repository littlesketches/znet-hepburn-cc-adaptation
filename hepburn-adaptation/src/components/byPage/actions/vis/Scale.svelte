<script>
    import { fade }                 from 'svelte/transition';
    import { onMount }              from 'svelte';
    import * as d3                  from 'd3'
    import { ui, data }             from "../../../../data/stores.js";
    import { mapShapes }            from "../../../../data/maps.js";
    import { slugify }              from "../../../../utils/helpers.js"

    export let dims     = {}                
    export let scaleData     = []                
</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="scale-vis-container" in:fade>>
    <!-- <g class="scale-group" class:hidden="{$ui.state.actionVis.scene === 0}"> -->
    <g class="scale-group">
        {#each scaleData as obj, i}
        <g style = "transform: translate({dims.width * 0.25}px, {obj.yPos * dims.height + 30}px)">
            <path class = 'map-layer' d = { mapShapes[obj.Scale].path(mapShapes[obj.Scale].shape) }/>
        </g>
        <g style="transform: translate({dims.width * 0.25}px, {dims.height * obj.yPos}px)">
            <text class = "scale-label {slugify(obj.Scale)}" x = "0" dy = "-10" >{@html obj.Alias}</text>
            <text class = "action-label {slugify(obj.Scale)}" x = "0" dy = 20> 
                {#if obj["Linked adaptation actions"].length === 1} 
                    1 {@html ` ${obj.Scale} `} action
                {:else}
                    {@html ` ${obj["Linked adaptation actions"].length} `}{@html `${obj.Scale} ` } actions
                {/if}
            </text>
        </g>
        {/each}
    </g>
</g>



<!-- STYLING -->
<style>
    .hidden{
        opacity: 0;
    }
    .scale-group{
        transition:             all 800ms;
    }
    text{
        text-anchor:            middle;
    }
    .scale-label{
        fill:                   var(--midGrey);
        font-size:              60px;
        font-weight:            700;
        text-transform:         uppercase;
        pointer-events:         none;
    }
    .action-label{
        fill:                   var(--midGrey);
        font-size:              25px;
        font-weight:            400;
        text-transform:         lowercase;
        font-weight:            500;
    }
    .scale-label.local,
    .action-label.local{
        fill:                   var(--brightGreen);
    }

    .map-layer{
        stroke:                 var(--midGrey);
        stroke-width:           1px;
        fill:                   none;
        transform:              scale(1.5) rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
    }

    .large{
        transform:              scale(4);
        transition:             all 800ms;
        stroke:                 var(--brightGreen);
        stroke-width:           0.75px;
    }
    .large path{
        stroke-linejoin:    round;
    }
</style>