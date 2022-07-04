<script>
	import { fade, scale }                 from 'svelte/transition';
	import { onMount }              from 'svelte';
    import * as d3                  from 'd3'
    import { textWrap, slugify }    from "../../../../utils/helpers.js"
    import { ui, data }             from '../../../../data/stores.js';

    export let dims = {
        width:              1600, 
        height:             1600,
    }            
    export let typeData     = {
        nodes:  $data.schema.actionTypeNodes.data,
        links:  $data.schema.actionTypeLinks.data
    }                

    // Drawn on mount to allow for calling of text wrapping
    onMount( () => {    
        const connectors = d3.select('.connector-container'),
            actionTypeNodes =  d3.select('.action-type-node-container'),
            responseNodes = d3.select('.outcomes-label-container')

        // Action type nodes
        actionTypeNodes.selectAll('.action-type-node')
            .data(typeData.nodes)
            .join( enter => {
                const group = enter.append('g').attr("class", d => slugify(d.Class))
                    .style('transform' , d => `translate( ${(d.xPos * 0.5 ) * dims.width}px, ${d.yPos * dims.height}px`)

                const bg = group.append('rect')
                    .style('fill', 'var(--bg-color)')
                    .style('stroke',   d => d.Class ==='foundation' ? 'var(--lightGreen)' : 'none')
                    .style('stroke-width',  '2px')
                    .style('border-radius',  '3px')
                    .style('rx',  '5px')
                    .style('ry',  '5px')

                group.append('path').classed('flow', true)
                    .style('transform', d =>  d.nodeCurve !== "invert" ? `translate(0px, ${d.curveYoffset}px)` : `translate(0px, ${d.curveYoffset - 20}px) scaleY(-1)`)
                    .attr('d', d => d.Class === 'type' ? "M -100 10 C -30 50, 30 50, 100 10" : null)
                    .classed('remove', d => d.Class !== 'type')
                    .style('fill', 'var(--bg-color')

                let text
                text = group.append('text').classed(`action-node-label `, true)
                    .attr('x' , 0).attr('y',  5).attr('dy' , 0)
                    .text(d => d.Name)
                    .classed(d => d.Class, true)
                    .call(textWrap, dims.width * 0.2, 1.1, true)

                let box = text.node().getBBox()

                bg.attr('width', d => d.Class === 'foundation' ? box.width + 80 : 180)
                bg.attr('height',d => (d.Class === 'foundation' || d.Class === 'response') ? box.height + 50:  70)
                bg.attr('x', d => d.Class === 'foundation' ? -box.width * 0.5 - 40 : -90)
                bg.attr('y', d => (d.Class === 'foundation' || d.Class === 'response') ? -box.height * 0.5 - 30 : -35)
            })

    
        // Links 
        for ( const link of typeData.links){
            const source = typeData.nodes.filter(e => e.Name === link._source.replaceAll('\"', '') )[0]
            const target = typeData.nodes.filter(e => e.Name === link._target.replaceAll('\"', '') )[0]

            connectors.append('path').classed('flow', true)
                .attr('d', typeof link.midX !== 'undefined' ? 
                    `M${(source.xPos * 0.5 ) * dims.width }, ${source.yPos * dims.height} 
                    L${(link.midX * 0.5 ) * dims.width}, ${link.midY * dims.height} 
                    L${(target.xPos * 0.5 ) * dims.width}, ${target.yPos * dims.height}`
                     : `M${(source.xPos * 0.5 ) * dims.width }, ${source.yPos * dims.height} 
                        L${(target.xPos * 0.5 ) * dims.width}, ${target.yPos * dims.height}` 
                )
        }
    })

</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="type-vis-container" in:fade>
    <g class = "spectrum-group">
        <g style='transform:translate({$ui.state.actionVis.scene !== 3 ? 0 : dims.width * 0.5}px, {$ui.state.actionVis.scene !== 3 ? dims.height* 0.05 : dims.height* 0.025}px)'>
            <text class = "spectrum-label abstract" class:centered="{$ui.state.actionVis.scene === 3}"><tspan class:none="{$ui.state.actionVis.scene !== 3}">More</tspan> Abstract</text> 
            <text class = "spectrum-sub-label" dy="35" class:centered="{$ui.state.actionVis.scene === 3}">Builds capacity</text> 
        </g>
        <g style='transform:translate({$ui.state.actionVis.scene !== 3 ? 0 : dims.width * 0.5}px, {$ui.state.actionVis.scene !== 3 ? dims.height* 0.65 : dims.height* 0.85}px)'>
            <text class = "spectrum-label concrete" class:centered="{$ui.state.actionVis.scene === 3}"><tspan class:none="{$ui.state.actionVis.scene !== 3}">More</tspan> Concrete</text> 
            <text class = "spectrum-sub-label"class:centered="{$ui.state.actionVis.scene === 3}" dy="35" >Responds to risk</text> 
        </g>
    </g>
    <g class = "flow-diagram"  class:hidden="{$ui.state.actionVis.scene === 3}"style='transform:translate({dims.width * 0.5}px, 0px)'>
        <g class = 'connector-container'></g>
        <g class = 'action-type-node-container'></g>
        <g class = 'outcomes-label-container'></g>
    </g>
</g>


<!-- STYLING -->
<style>
    .none{
        display:            none;
    }
    .hidden{
        opacity:            0;
    }
    .flow-diagram,
    .spectrum-group{
        transition:         all 800ms;
    }
    .spectrum-label{
        font-size:          50px;
        font-weight:        700;
        text-transform:     uppercase;

    }
    .concrete{
        fill:               var(--midGreen);
    }
    .abstract{
        fill:               var(--brightGreen);
    }
    .centered{
        text-anchor:        middle;
    }
    .spectrum-sub-label{
        font-size:          25px;
        font-weight:        300;
        fill:               var(--midGrey);
    }

    :global(rect.box),
    :global(path.flow){
        fill:               none;
        stroke:             var(--lightGreen);
        stroke-width:       2px;
        stroke-linejoin:    round;
        stroke-linecap:     round;
    }

    :global(.type .action-node-label){
        fill:               var(--midGrey);
        font-size:          25px;
        text-anchor:        middle;
        font-weight:        500;
        text-shadow:        1px 1px 1px #fff,   -1px -1px 1px #fff,
                            2px 2px 2.5px #fff, -2px -2px 2.5px #fff,
                            3px 3px 5px #fff,   -3px -3px 5px #fff;
    }
    :global(.foundation .action-node-label),
    :global(.response .action-node-label){
        fill:               var(--midGrey);
        font-weight:        700;
        font-size:          25px;
        text-anchor:        middle;
        text-transform:     uppercase;
        text-shadow:        3px 3px 3px #fff, -3px -3px 3px #fff;
    }

</style>