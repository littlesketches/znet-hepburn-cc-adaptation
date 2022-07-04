<script>
	import { onMount }      from 'svelte';
	import { fade }         from 'svelte/transition';
    import * as d3          from 'd3'
    import { schema }       from '../../../../data/schema.js';
    import { ui, data }     from "../../../../data/stores.js";
    import { icons  }       from "../../../../utils/icons.js"
    import { slugify, textWrap  }     from "../../../../utils/helpers.js"

    export let dims     = {}                // SVG dimensions
    const sortedFocus = $data.schema.adaptationFocus.data.sort( (x, y) => {
        if (x.Alias < y.Alias) {return -1;}
        if (x.Alias > y.Alias) {return 1;}
        return 0
    })

    function selectFocus(event){
        const focus = this.getAttribute('name') === 'null' ? null :this.getAttribute('name'), 
            index = this.getAttribute('index') === 'null' ? null :this.getAttribute('index') 
        $ui.state.actionVis.nodes.focusArea = focus
        d3.selectAll('.focus-area-label, .focus-area-action-label, .icon').classed('selected', false)
        d3.selectAll('.focus-area-label').classed('mute', true)
        d3.select(this).classed('selected', true).classed('mute', false)
        d3.selectAll(`.focus-area-action-label.${slugify(focus)}, .icon.${slugify(focus)}`).classed('selected', true)
        d3.select('.instruction').classed('hidden', true)
        d3.select('.selector-wrapper')
            .style("transform" ,  `translate(0px, ${100 * ((sortedFocus.length -1) * 0.5 - index )}px)`)
        d3.selectAll('.focus-area-description').classed('hidden', true)
        d3.select(`.focus-area-description.${slugify(focus)}`).classed('hidden', false)
    };

    // Add text wrapped lables
    onMount( () =>{
        const container = d3.select('.focus-area-description-container')

        container.selectAll('.focus-area-description')
            .data(sortedFocus)
            .join('text')
            .attr('class', d => `${slugify(d["Focus area"])} focus-area-description hidden` )
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', 0)
            .style('transition', 'all 300ms')
            .style('pointer-events', 'none')
            .style('font-size', 25)
            .style('font-weight', 300)
            .style('fill', 'var(--midGrey)')
            .style('text-anchor', 'middle')
            .text(d => d.Description)
            .call(textWrap, dims.width * 0.667, 1.25, true)
    })

</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="focus-area-vis-container" in:fade>    
    <g class = 'selector-container'  style = "transform: translate({dims.width * 0.5}px, {dims.height * 0.25}px)">
        <g class = 'selector-wrapper'>
            <text class = "instruction" y = "{-100 * (sortedFocus.length) * 0.5 - 50}">Tap on a focus area to view actions</text> 
            {#each  sortedFocus.sort( (a,b) => a.Alias < b.Alias) as obj, i}
            <g style = "transform: translate({0}px, {100 * (i - (sortedFocus.length - 1) * 0.5 )}px)" >
                <text on:click={selectFocus} class = "focus-area-label" name ="{(obj["Focus area"])}" index ={i}>
                    {@html obj["Alias"]}
                </text>
                <text class = "focus-area-action-label {slugify(obj["Focus area"])}" dy = "-80">{@html obj["Linked adaptation actions"].length} actions related to</text>
                <path class = 'icon {slugify(obj["Focus area"])}' d = {icons[slugify(obj["Alias"])]} style = "transform: translate({0}px, {-250}px) scale(3)" />
            </g>
            {/each}
        </g>
    </g>
    <g class="focus-area-description-container"style = "transform: translate({dims.width * 0.5}px, {dims.height * 0.575}px)"></g>
</g>



<!-- STYLING -->
<style>
    .focus-area-label, 
    .focus-area-action-label{
        text-anchor:        middle;
        fill:               var(--midGrey);
        transition:         all 300ms;
    }
    .selector-wrapper{
        transition:         all 800ms;
    }
    .focus-area-label{
        font-size:          80px;
        font-weight:        700;
        text-transform:     uppercase;
        cursor:             pointer;
        opacity:            0.25;
    }
    :global(.focus-area-label.mute){
        opacity:            0.05;
    }
    .focus-area-label:hover{
        opacity:            1;
    }
    :global(.focus-area-label.selected){
        opacity:            1;
        fill:               var(--focusArea);
    }
    .focus-area-action-label, 
    .icon{
        opacity :           0;
        pointer-events:     none;
        font-size:          40px;
        font-weight:        700;
        fill:               var(--focusArea);
    }
    .focus-area-label,
    .focus-area-action-label{
        text-shadow:        
            1px 1px 3px #fff,
            3px 3px 5px #fff,
            5px 5px 10px #fff,
            7.5px 7.5px 15px #fff,
            -1px -1px 3px #fff,
            -3px -3px 5px #fff,
            -5px -5px 10px #fff,
            -7.5px -7.5px 15px #fff;
    }
    :global(.focus-area-action-label.selected),
    :global(.icon.selected){
        opacity:            1
    }
    .instruction{
        font-size:          40px;
        font-weight:        700;
        text-anchor:        middle;
        fill:               var(--focusArea);
        transition:         all 300ms;
        pointer-events:     none;
    }
</style>