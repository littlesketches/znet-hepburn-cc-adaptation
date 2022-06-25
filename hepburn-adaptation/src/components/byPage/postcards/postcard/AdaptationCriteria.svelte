<script>
	import { fade }         from 'svelte/transition';
    import * as d3          from 'd3'
    import { ui, data }     from "../../../../data/stores.js";
    import { slugify }      from "../../../../utils/helpers.js"
    import { schema }       from '../../../../data/schema.js';
    import { circleClockwise, circleAntiClockwise }      from "../../../../utils/icons.js"


    export let criteria ={
        flexible:       true,
        robust:         true,
        viable:        false
    }
    const dims     = {           // SVG dimensions
        width:          1600,
        height:         1400
    }              

    const radius = dims.width * 0.25

</script>


<!-- HTML COMPONENT MARKUP-->
<svg viewBox = "0 0 {dims.width} {dims.height}" width="75%">
    <g id ="screening-vis-container" in:fade>
        <g style = "transform: translate({dims.width * 0.5}px, {dims.height * 0.5}px)">
            {#each $data.schema.adaptationScreens.data as lens, i}
            <circle class:selected="{criteria[slugify(lens.Screen)]}"  class = {slugify(lens.Screen)} r = {radius} style = "transform: translate({dims.width * lens.xPos}px, {dims.height * lens.yPos}px)" />
            {/each}

            {#each $data.schema.adaptationScreens.data as lens, i}
                {#if lens.lensPos === "top"}
                    <path id = "{slugify(lens.Screen)}-lensLabelPath" class = "label-path" d={circleClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 70 )} />
                    <text>
                        <textPath class:selected="{criteria.robust}" class = 'lens-label {slugify(lens.Screen)}' href ="#{slugify(lens.Screen)}-lensLabelPath" startOffset="75%">{@html lens.Screen}</textPath>
                    </text>

                {:else if lens.lensPos === "left"}
                    <path id = "{slugify(lens.Screen)}-lensLabelPath" class = "label-path" d={circleAntiClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 80 )} />
                    <text>
                        <textPath class:selected="{criteria.flexible}"class = 'lens-label {slugify(lens.Screen)}' href ="#{slugify(lens.Screen)}-lensLabelPath" startOffset="32.5%">{@html lens.Screen}</textPath>
                    </text>
                {:else if lens.lensPos === "right"}
                    <path id = "{slugify(lens.Screen)}-lensLabelPath" class = "label-path" d={circleAntiClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 80 )} />
                    <text>
                        <textPath class:selected="{criteria.viable}" class = 'lens-label {slugify(lens.Screen)}' href ="#{slugify(lens.Screen)}-lensLabelPath" startOffset="12.5%">{@html lens.Screen}</textPath>
                    </text>
                {/if}
            {/each}
        </g>
    </g>
</svg>


<!-- STYLING -->
<style>
    circle{
        fill:               transparent;
        stroke:             var(--lightGrey);
        stroke-width:       15px;
        mix-blend-mode:     multiply; 
    }
    circle.selected{
        stroke:             var(--brightGreen);
    }
    .label-path{
        stroke:             none;
        fill:               none;
    }
    .lens-label{
        font-size:          120px;
        font-weight:        700;
        dominant-baseline:  middle;
        text-anchor:        middle;
        text-transform:     uppercase;  
        fill:               var(--lightGrey)
    }
    .lens-label.selected{
        fill:               var(--brightGreen);
    }
</style>