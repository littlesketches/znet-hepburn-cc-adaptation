<script>
	import { fade }         from 'svelte/transition';
    import * as d3          from 'd3'
    import { ui, data }     from "../../../../data/stores.js";
    import { slugify }      from "../../../../utils/helpers.js"
    import { schema }       from '../../../../data/schema.js';
    import { circleClockwise, circleAntiClockwise }      from "../../../../utils/icons.js"

    export let dims     = {           // SVG dimensions
        width:          1600,
        height:         1600
    }              

    const radius = dims.width * 0.25
    const noRegretslabel = { x: dims.width * 0.75, y: dims.width * 0.25  }
</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="screening-vis-container" in:fade>
    <g style = "transform: translate({dims.width * 0.5}px, {dims.height * 0.425}px)">
        {#each $data.schema.adaptationScreens.data as lens, i}
        <g class = {slugify(lens.Screen)} style = "transform: translate({dims.width * lens.xPos}px, {dims.height * lens.yPos}px)">
            <circle r = {radius}/>
        </g>
        {/each}

        {#each $data.schema.adaptationScreens.data as lens, i}
            {#if lens.lensPos === "top"}
                <path id = "{slugify(lens.Screen)}-lensLabelPath" class = "label-path" d={circleClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 70 )} />
                <path id = "{slugify(lens.Screen)}-lensQuestionPath" class = "label-path" d={circleClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 25 )} />
                <text>
                    <textPath class = 'lens-question-label {slugify(lens.Screen)}' href ="#{slugify(lens.Screen)}-lensQuestionPath" startOffset="75%">{@html lens.Description}</textPath>
                </text>
                <text>
                    <textPath class = 'lens-label {slugify(lens.Screen)}' href ="#{slugify(lens.Screen)}-lensLabelPath" startOffset="75%">{@html lens.Screen}</textPath>
                </text>

            {:else if lens.lensPos === "left"}
                <path id = "{slugify(lens.Screen)}-lensLabelPath" class = "label-path" d={circleAntiClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 80 )} />
                <path id = "{slugify(lens.Screen)}-lensQuestionPath" class = "label-path" d={circleAntiClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 25 )} />
                <text>
                    <textPath class = 'lens-question-label {slugify(lens.Screen)}' href ="#{slugify(lens.Screen)}-lensQuestionPath" startOffset="32.5%">{@html lens.Description}</textPath>
                </text>

                <text>
                    <textPath class = 'lens-label {slugify(lens.Screen)}' href ="#{slugify(lens.Screen)}-lensLabelPath" startOffset="32.5%">{@html lens.Screen}</textPath>
                </text>
            {:else if lens.lensPos === "right"}
                <path id = "{slugify(lens.Screen)}-lensLabelPath" class = "label-path" d={circleAntiClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 80 )} />
                <path id = "{slugify(lens.Screen)}-lensQuestionPath" class = "label-path" d={circleAntiClockwise({x: dims.width * lens.xPos, y: dims.height * lens.yPos}, radius + 25 )} />
                <text>
                    <textPath class = 'lens-question-label {slugify(lens.Screen)}' href ="#{slugify(lens.Screen)}-lensQuestionPath" startOffset="12.5%">{@html lens.Description}</textPath>
                </text>
                <text>
                    <textPath class = 'lens-label {slugify(lens.Screen)}' href ="#{slugify(lens.Screen)}-lensLabelPath" startOffset="12.5%">{@html lens.Screen}</textPath>
                </text>
            {/if}
        {/each}

        <g class = 'no-regrets-group' class:hidden="{$ui.state.actionVis.scene !== 2}">
            <path d = "M0,0 v{-radius * 0.33} l{radius * 0.5}, {-radius * 0.5} h{radius * 0.5}"/>
            <text class = 'no-regrets-label' x="{radius + 5}" y="{-0.833 * radius}"> No regrets actions</text>
            <text class = 'no-regrets-number' x="{radius + 5}" y="{-0.833 * radius + 35}">{$data.stats.actions.noRegrets} actions expected to be</text>
            <text class = 'no-regrets-number' x="{radius + 5}" y="{-0.833 * radius + 65}">robust, viable and flexible</text>
        </g>
    </g>
</g>



<!-- STYLING -->
<style>
    circle{
        fill:               var(--midGreen);
        stroke:             var(--brightGreen);
        stroke-width:       8px;
        mix-blend-mode:     screen; 
    }
    .hidden{
        opacity:            0
    }


    .label-path{
        stroke:             none;
        fill:               none;
    }
    .lens-label{
        font-size:          80px;
        font-weight:        700;
        dominant-baseline:  middle;
        text-anchor:        middle;
        text-transform:     uppercase;  
        fill:               var(--midGreen)
    }
    .lens-question-label{
        font-size:          25px;
        font-weight:        500;
        dominant-baseline:  middle;
        text-anchor:        middle;
    }

    .no-regrets-group{
        transition:         all 800ms;
        pointer-events:     none;
    }
    .no-regrets-group path{
        fill:               none;
        stroke:             var(--foreground);
        stroke-width:       10px;
        /* mix-blend-mode:     screen; */
    }
    .no-regrets-label{
        fill:               var(--foreground);
        font-size:          40px;
        font-weight:        700;
    }
    .no-regrets-number{
        fill:               var(--foreground);
        font-size:          25px;
        font-weight:        500;
    }
</style>