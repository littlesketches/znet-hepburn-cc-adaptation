<script>
	import { fade }                 from 'svelte/transition';
    import * as d3                  from 'd3'
    import { ui, data }             from "../../../../data/stores.js";
    import { icons, triangle  }     from "../../../../utils/icons.js"
    import { textWrap, slugify }    from "../../../../utils/helpers.js"

    export let dims     = {}                // SVG dimensions

    const iconRadius = dims.nodeRadius * 1.5
    // Action node shape
    const arc =  d3.arc()
</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="legend-container"  transition:fade>

    <g style="transform: translate( 0px, {dims.height - 70}px)">
        <!-- Hazards addressed -->
        <g class = "legend-group" class:hidden="{!$ui.state.actionVis.legend.hazards}" style="transform: translate({dims.width * $ui.state.actionVis.legend.hazards}px, 0px)">
            <text class = "legend-title" style="transform: translate(0px, {-iconRadius - 20}px)">Hazards addressed</text>
            <g style="transform: translate({-($data.schema.hazards.data.length -1) * 3.25 * 0.5 * iconRadius }px, 0px)">
                {#each  $data.schema.hazards.data as obj, i}
                <g class = {slugify(obj.Hazard)} style="transform: translate({i * iconRadius * 3.25}px, {0}px)">
                    <circle r = {iconRadius} class = "hazard-circle "/>
                    <path class = "hazard-icon" d = {icons[slugify(obj.Hazard)]}></path>
                    <text class = "hazard-label" style="transform: translate(0px, {iconRadius + 25 }px)">{@html obj.Alias}</text>
                </g>
                {/each}
            </g>
        </g>

        <!-- Adaptation approach -->
        <g class = "legend-group" class:hidden="{!$ui.state.actionVis.legend.approach}" style="transform: translate({dims.width * $ui.state.actionVis.legend.approach}px, 0px)">
            <text class = "legend-title center" style="transform: translate(0px, {-iconRadius - 20}px)"> Adaptation approach</text>
            <g>
                <g style = "transform: translate({-iconRadius * 3.5 }px, {0}px)">
                    <path class="approach-group risk" d={triangle(iconRadius, 'down')}/>
                    <text class="approach-label risk" style = "transform: translate(0px, {iconRadius + 10}px)">
                        <tspan>Reduce</tspan>
                        <tspan dy = 20 x = 0>risk</tspan>
                    </text>
                </g>
                <g style = "transform: translate({iconRadius * 3.5}px, {0}px)">
                    <path class="approach-group resilience" d={triangle(iconRadius, 'up')}  style = "transform: translate(0px, {0}px)"/>
                    <text class="approach-label risk" style = "transform: translate(0px, {iconRadius + 10}px)">
                        <tspan>Reduce</tspan><tspan dy = 20 x = 0>risk</tspan>
                    </text>
                </g>
                <g>
                    <path class="approach-group risk" d={triangle(iconRadius, 'down')}  />
                    <path class="approach-group resilience" d={triangle(iconRadius, 'up')} />
                    <text class="approach-label risk resilience" style = "transform: translate({0}px, {iconRadius + 10}px)">
                        <tspan>Improve risk</tspan><tspan dy = 20 x = 0>and resilience</tspan>
                    </text>
                </g>
            </g>
        </g>

        <!-- Action scale -->
        <g class = "legend-group" class:hidden="{!$ui.state.actionVis.legend.scale}" style="transform: translate({dims.width * $ui.state.actionVis.legend.scale}px , 0px)">
            <text class = "legend-title" style="transform: translate(0px, {-iconRadius - 20}px)">Action scale </text>
            <g style="transform: translate({-($data.schema.hazards.data.length -1) * 3.35 * 0.5 * iconRadius }px, 0px)">
                {#each  $data.schema.actionScale.data.map(d => d.Scale) as scale, i}
                <g class = {slugify(scale)} style="transform: translate({i * iconRadius * 3.35}px, {0}px)">
                    <circle r = {$ui.vis.nodes.scales.radiusScale(scale)} class = "scale-circle "/>
                    <circle r = {dims.nodeRadius + 2.5} class = "scale-node"/>
                    <text class = "scale-label" style="transform: translate(0px, {iconRadius + 25 }px)">{@html scale}</text>
                </g>
                {/each}
            </g>
        </g>
    </g>
</g>



<!-- STYLING -->
<style>
    #legend-container,
    .legend-group{
        transition:         all 800ms;
    }

    .hidden{
        opacity:            0;
        pointer-events:     none;
    }
    .center{
        text-anchor:        middle
    }
    .legend-title{
        text-anchor:        middle;
        font-size:          20px;
        fill:               var(--midGrey);
    }

    /* Hazard legend styling */
    .hazard-circle{
        fill:               none;
        stroke-width:       5px;
    }

    .flood .hazard-circle{     stroke:     var(--flood) }
    .flood-and-storm .hazard-circle{     stroke:     var(--flood) }
    .heat .hazard-circle{      stroke:     var(--heat) }
    .drought .hazard-circle{   stroke:     var(--drought) }
    .fire .hazard-circle{      stroke:     var(--fire) }

    .hazard-label,
    .scale-label,
    .approach-label{
        font-size:          20px;
        font-weight:        500;
        text-anchor:        middle;
        fill:               var(--midGrey);
    }
    .hazard-icon{
        transform:          scale(0.75)
    }
    .flood .hazard-label,   .flood .hazard-icon {    fill:     var(--flood) }
    .flood-and-storm .hazard-label,  .flood-and-storm .hazard-icon {    fill:     var(--flood) }
    .heat .hazard-label,    .heat .hazard-icon {     fill:     var(--heat) }
    .drought .hazard-label, .drought .hazard-icon {  fill:     var(--drought) }
    .fire .hazard-label,    .fire .hazard-icon{      fill:     var(--fire) }

    /* Adaptaion appraoch styling */
    .risk{          fill:    var(--approach-bg);}
    .resilience{    fill:    var(--approach-bg); }

    /* Action scale */
    .scale-node {
        fill:             #fff;
        stroke:             var(--midGrey);
        stroke-width:       5px;
    }
    .local    .scale-circle{  fill:    var(--scale-local) }  
    .regional .scale-circle{  fill:    var(--scale-regional) }  
    .state    .scale-circle{  fill:    var(--scale-state) }  
    .national .scale-circle{  fill:    var(--scale-national) }  


</style>