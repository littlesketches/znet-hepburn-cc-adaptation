<script>
	import { fade }         from 'svelte/transition';
    import * as d3          from 'd3'
    import { ui, data }     from "../../../../data/stores.js";
    import { textWrap, slugify  }    from "../../../../utils/helpers.js"
    import { icons, circleClockwise }       from "../../../../utils/icons.js"

    export let dims     = {}                // SVG dimensions

    const hazards = $data.schema.hazards.data

    //  Arc variables
    const arcWidth = 50
    const arc =  d3.arc().cornerRadius(20)

</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="hazard-vis-container" in:fade>
    <!-- Hazard arcs-->
    <g class = "node-arcs" style = "transform: translate({dims.width * 0.5}px, {dims.height * 0.5}px)"
        class:coloured="{$ui.state.actionVis.scene > 1}" 
        >
        <g class = "node-arcs-wrapper" class:rotate="{$ui.state.actionVis.scene > 1}" >
            {#each hazards as hazard, i }
                <path class = "hazard-arc {slugify(hazard.Hazard)}" d = {arc({
                    innerRadius: dims.width * 0.3,
                    outerRadius: dims.width * 0.3 + arcWidth,
                    startAngle: i * (2 * Math.PI / hazards.length),
                    endAngle: i * (2 * Math.PI / hazards.length) + (2 * Math.PI / hazards.length)
                    })}
                />

                <path class = "hazard-icon {slugify(hazard.Hazard)}" d = {icons[slugify(hazard.Hazard)]} 
                    style = "transform: translate(
                        {(dims.width * 0.3 + 200) * Math.cos(i * (2 * Math.PI / hazards.length) - Math.PI / 4) }px, 
                        {(dims.width * 0.3 + 200) * Math.sin(i * (2 * Math.PI / hazards.length) - Math.PI / 4) }px 
                    ) scale(2.5) rotate({(45 * i * 2) + 45}deg)"
                />
                <!-- Hazard label -->
                <path id = "{slugify(hazard.Hazard)}-labelPath" class = "label-path" d={circleClockwise({x: 0, y: 0}, dims.width * 0.3 + 75 )} style="transform:rotate({i * 360/hazards.length + 135}deg)"/>
                <text>
                    <textPath class = 'hazard-label {slugify(hazard.Hazard)}' href ="#{slugify(hazard.Hazard)}-labelPath" startOffset="50%">{@html hazard.Hazard}</textPath>
                </text>
                <!-- Events label -->
                <path id = "{slugify(hazard.Hazard)}-event-labelPath" class = "label-path" d={circleClockwise({x: 0, y: 0}, dims.width * 0.3 - 35 )} style="transform:rotate({i * 360/hazards.length + 135}deg)"/>
                <text>
                    <textPath class = 'event-label {slugify(hazard.Hazard)}' href ="#{slugify(hazard.Hazard)}-event-labelPath" startOffset="50%">
                        {@html  hazard["Linked hazard events"].map(d => $data.schema.hazardEvents.data.filter( e => e.recordID === d)[0]["Hazard event"]).join(" | ")}
                    </textPath>
                </text>

                <!-- Action count label -->

                <path id = "{slugify(hazard.Hazard)}-actionCount-labelPath" class = "label-path" d={circleClockwise({x: 0, y: 0}, dims.width * 0.3 + arcWidth * 0.5 )} style="transform:rotate({i * 360/hazards.length + 135}deg)"/>
                <text class:hidden="{$ui.state.actionVis.scene === 0}">
                    <textPath class = 'actionCount-label' href ="#{slugify(hazard.Hazard)}-actionCount-labelPath" startOffset="50%">
                        {@html  hazard["Linked adaptation actions"].length} actions
                    </textPath>
                </text>

            {/each}
        </g>
    </g>
</g>



<!-- STYLING -->
<style>
    text{
        dominant-baseline:  middle;
        text-anchor:        middle;
    }
    .node-arcs-wrapper{
        transition: 800ms all;
    }
    .hidden{
        opacity: 0
    }
    .rotate{
        animation: rotation 60s infinite linear; 
    }
    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
    .hazard-arc,
    .hazard-icon,
    .hazard-label,
    .event-label{
        fill:               var(--midGrey);
        transition:         all 800ms;
    }
    .hazard-arc{
        stroke:             transparent;
        stroke-width:       5px;
    }
    .label-path{
        stroke:             none;
        fill:               none;
    }
    .hazard-label{
        font-size:          60px;
        font-weight:        700;
        dominant-baseline:  middle;
        text-anchor:        middle;
        text-transform:     uppercase;
    }
    .event-label{
        font-weight:        500;
        font-size:          30px;
    }
    .actionCount-label {
        font-weight:        700;
        fill:               #fff;
        font-size:          30px;
    }
    /* Hazard colours */
    .coloured * .flood{     fill: var(--flood) }
    .coloured * .flood-and-storm{     fill: var(--flood) }
    .coloured * .heat{      fill: var(--heat)  }
    .coloured * .fire{      fill: var(--fire)  }
    .coloured * .drought{   fill: var(--drought)  }
</style>