<script>
	import { fade }                 from 'svelte/transition';
	import { onMount }              from 'svelte';
    import  * as d3                 from 'd3';
    import { ui, data }             from "../../../../data/stores.js";
    import { textWrap, slugify }    from "../../../../utils/helpers.js"
    import { triangle }    from "../../../../utils/icons.js"

    export let dims     = {}                // SVG dimensions
    export let approachData = []


    // Attach the approach ;lables
    onMount( () =>{

        const reduceRisk = ["Reduce exposure", "Reduce vulnerability", "Transfer risk" ]
        const increaseResilience = ["Prepare, respond and recover", "Increase resilience to changing risks", "Transformation" ]
        const riskGroup = d3.select('.risk-label-group')
        const resilienceGroup = d3.select('.resilience-label-group')

        riskGroup.selectAll('.approach-label')
            .data(reduceRisk)
            .join('text').classed('risk approach-label', true)
            .attr('x' , 0)
            .attr('y' , (d, i) => i * -50 - 80)
            .attr('dy', 0)
            .text(d => d)

        resilienceGroup.selectAll('.approach-label')
            .classed('resilience approach-label', true)
            .data(increaseResilience)
            .join('text')
            .attr('x' , 0)
            .attr('y' , (d, i) => i * 50 + 80)
            .attr('dy', 0)
            .text(d => d )
    })
</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="approach-vis-container" in:fade>
    <g class:hidden="{$ui.state.actionVis.scene === 2}">
        <g class = 'approach-group risk-group' class:reset="{$ui.state.actionVis.scene > 0}" >
            <path class=" approach-shape risk" d={triangle(dims.width * 0.333, 'down')}   
                style = "transform: translate({approachData[0].standard.x}px, {approachData[0].standard.y}px)"/>
            <text class = "risk label-main" style = "transform: translate({approachData[0].standard.x}px, {approachData[0].standard.y - dims.height * 0.175}px)">
                Reduce risks
            </text>
            <g class='risk-label-group risk'  style = "transform: translate({approachData[0].standard.x}px, {approachData[0].standard.y - dims.height * 0.175}px)"></g>
        </g>
        <g class = 'approach-group resilience-group' class:reset="{$ui.state.actionVis.scene > 0}" >
            <path class="approach-shape resilience" d={triangle(dims.width * 0.333, 'up')} 
                style = "transform: translate({approachData[1].standard.x}px, {approachData[1].standard.y}px)"/>
            <text class = "resilience label-main" style = "transform: translate({approachData[1].standard.x}px, {approachData[1].standard.y + dims.height * 0.175}px)">
                Increase resilience
            </text>
            <g class='resilience-label-group resilience'  style = "transform: translate({approachData[1].standard.x}px, {approachData[0].standard.y + dims.height * 0.175}px)"></g>
        </g>
    </g>

    <g class:hidden="{$ui.state.actionVis.scene !== 2}">
        <text style = "transform: translate({approachData[1].wide.x}px, {approachData[1].wide.y  + dims.height * 0.15}px)">
            <tspan class = "label-number" >{@html $data.stats.actions.byApproachType["Increase resilience"]} actions that</tspan> 
            <tspan class = "label" x = 0 dy = 60>increase</tspan> 
            <tspan class = "label" x = 0 dy = 60>resilience</tspan> 
        </text>
        <text style = "transform: translate({approachData[0].wide.x}px, {approachData[0].wide.y + dims.height * 0.15}px)">
            <tspan class = "label-number" >{@html $data.stats.actions.byApproachType["Reduce risk"]} actions that</tspan> 
            <tspan class = "label" x = 0 dy = 60>reduce</tspan>
            <tspan class = "label" x = 0 dy = 60>risk</tspan>
        </text>
        <text style = "transform: translate({dims.width * 0.5}px, {(approachData[0].wide.y + approachData[1].wide.y) * 0.5 + dims.height * 0.15}px)">
            <tspan class = "label-number" >{@html $data.stats.actions.byApproachType["Improve risk and resilience"]} actions that</tspan> 
            <tspan class = "label" x = 0 dy = 60>improve risk</tspan>
            <tspan class = "label" x = 0 dy = 60>and resilience</tspan>
        </text>
        <text style = "transform: translate({approachData[2].wide.x}px, {approachData[2].wide.y + dims.height * 0.1}px)">
            <tspan class = "label-number" >{@html $data.stats.actions.byApproachType["None"]} actions that are</tspan> 
            <tspan class = "label-small" x = 0 dy = 30>too indirect to be assigned </tspan>
            <tspan class = "label-small" x = 0 dy = 30>an adaptation approach</tspan>
        </text>
    </g>
</g>



<!-- STYLING -->
<style>
    #approach-vis-container g{
        pointer-events:     none;
        transition:         all 800ms;
    }
    .hidden{
        opacity: 0;
    }
    .approach-group{
        transition:         all 2000ms;
    }
    .risk-group{
        transform:          translateY(-200px);
    }
    .resilience-group{
        transform:          translateY(200px);
        transition:         all 2000ms;
    }
    .reset{
        transform:          translateY(0px)
    }
    .approach-shape {
        stroke-width:       2px;
        fill:               none ;
        transition:         all 2000ms;
    }
    .risk{
        fill:               var(--risk-bg);
    }
    .resilience{
        fill:               var(--resilience-bg);
    }

    text{
        text-anchor:        middle;
        fill:               var(--approach-bg);
    }

    .label,
    .label-main{
        font-weight:        700;
        text-anchor:        middle;
        text-transform:     uppercase;
        dominant-baseline:  middle;
    }
    .label-main{
        font-size:          80px;
    }
    .label{
        font-size:          60px;
    }
    .risk-label-group,
    .resilience-label-group{
        font-size:          40px;
        font-weight:        400;
        text-anchor:        middle;
    }

    .label-small{
        font-size:          25px;
        font-weight:        500;
    }
    .label-number{
        font-size:          25px;
        font-weight:        500;
    }




</style>