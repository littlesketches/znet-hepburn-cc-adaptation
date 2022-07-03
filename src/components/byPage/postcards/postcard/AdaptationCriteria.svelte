<script>
	import { fade }         from 'svelte/transition';
    import * as d3          from 'd3'
    import { ui, data }     from "../../../../data/stores.js";
    import { slugify }      from "../../../../utils/helpers.js"
    import { schema }       from '../../../../data/schema.js';
    import { circleClockwise, circleAntiClockwise }      from "../../../../utils/icons.js"


    export let criteria = {}
    const dims     = {           // SVG dimensions
        width:          1600,
        height:         1600
    }              
    const radius = dims.width * 0.25
</script>


<!-- HTML COMPONENT MARKUP-->
<svg viewBox = "0 0 {dims.width} {dims.height}" width="100%">
    <g id ="screening-vis-container" in:fade>
        <g style = "transform: translate({dims.width * 0.5}px, {dims.height * 0.55}px)">
            {#each $data.schema.adaptationScreens.data as lens, i}
            <circle class = "{criteria[slugify(lens.Screen)]} {slugify(lens.Screen)}" r = {radius} style = "transform: translate({dims.width * lens.xPos}px, {dims.height * lens.yPos}px)" />
            {/each}

            {#each $data.schema.adaptationScreens.data as lens, i}
                {#if lens.lensPos === "top"}
                    <path id = "{slugify(lens.Screen)}-lensLabelPath" class = "label-path" d={circleClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 20 )} />
                    <text>
                        <textPath class = "{criteria[slugify(lens.Screen)]} lens-label {slugify(lens.Screen)}" href ="#{slugify(lens.Screen)}-lensLabelPath" startOffset="75%">
                            {@html criteria[slugify(lens.Screen)] === "Yes" ? lens.Screen : "Not "+lens.Screen }
                        </textPath>
                    </text>

                {:else if lens.lensPos === "left"}
                    <path id = "{slugify(lens.Screen)}-lensLabelPath" class = "label-path" d={circleAntiClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 110 )} />
                    <text>
                        <textPath class = "{criteria[slugify(lens.Screen)]} lens-label {slugify(lens.Screen)}" href ="#{slugify(lens.Screen)}-lensLabelPath" startOffset="32.5%">
                            {@html criteria[slugify(lens.Screen)] === "Yes" ? lens.Screen : "Not "+lens.Screen }
                        </textPath>
                    </text>

                {:else if lens.lensPos === "right"}
                    <path id = "{slugify(lens.Screen)}-lensLabelPath" class = "label-path" d={circleAntiClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 110 )} />
                    <text>
                        <textPath class = "{criteria[slugify(lens.Screen)]}  lens-label {slugify(lens.Screen)}" href ="#{slugify(lens.Screen)}-lensLabelPath" startOffset="12.5%">
                            {@html criteria[slugify(lens.Screen)] === "Yes" ? lens.Screen : "Not "+lens.Screen }
                        </textPath>
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
        stroke:             var(--unsureCriteria);
        stroke-width:       15px;
        mix-blend-mode:     multiply; 
    }
    circle.Yes{
        stroke:             var(--yesCriteria);
    }
    circle.No{
        stroke:             var(--noCriteria);
    }
    .lens-label.Yes{
        fill:               var(--yesCriteria);
    }
    .lens-label.No{
        fill:              var(--noCriteria);
    }
    .label-path{
        stroke:             none;
        fill:               none;
    }
    .lens-label{
        font-size:          120px;
        font-weight:        700;
        text-anchor:        middle;
        text-transform:     uppercase;  
        fill:               var(--unsureCriteria)
    }
</style>