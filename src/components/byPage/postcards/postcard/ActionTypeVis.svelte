<script>
	import { fade, scale }          from 'svelte/transition';
	import { onMount }              from 'svelte';
    import * as d3                  from 'd3'
    import { textWrap, slugify }    from "../../../../utils/helpers.js"
    import { ui, data }             from '../../../../data/stores.js';

    export let actionType

    const dims = {
        width:              1600, 
        height:             1600,
    }            
    const typeData     = {
        nodes:  $data.schema.actionTypeNodes.data,
        links:  $data.schema.actionTypeLinks.data
    }                

</script>


<!-- HTML COMPONENT MARKUP-->
<svg viewBox="0 0 {dims.width} {dims.height}" width="100%"  in:fade>
    <g class = "flow-diagram"  style='transform:translate({dims.width * 0.5}px, 0px)'>
        <g class = 'connector-container'>
            {#each typeData.links as link}
                {@const source = typeData.nodes.filter(e => e.Name === link._source.replaceAll('\"', '') )[0]}
                {@const target = typeData.nodes.filter(e => e.Name === link._target.replaceAll('\"', '') )[0]}
                {@const path = typeof link.midX !== 'undefined' ? 
                        `M${(source.xPos * 0.5 ) * dims.width }, ${source.yPos * dims.height} 
                        L${(link.midX * 0.5 ) * dims.width}, ${link.midY * dims.height} 
                        L${(target.xPos * 0.5 ) * dims.width}, ${target.yPos * dims.height}`
                        : `M${(source.xPos * 0.5 ) * dims.width }, ${source.yPos * dims.height} 
                            L${(target.xPos * 0.5 ) * dims.width}, ${target.yPos * dims.height}` }

                <path class = "flow" d = {path}/>
            {/each}
        </g>
        <g class = 'action-type-node-container'>
            {#each typeData.nodes as node}
            <circle class = "node {slugify(node.Class)}" class:selected={node.Name === actionType}
                style = "transform: translate( {node.xPos * 0.5 * dims.width}px, {node.yPos * dims.height}px)"  
            />
            {/each}
        </g>
    </g>
</svg>

<!-- STYLING -->
<style>
    .flow{
        fill:               none;
        stroke:             var(--midGrey);
        stroke-width:       4px;
        stroke-linejoin:    round;
        stroke-linecap:     round;
    }
    .node{
        r:                  40;
        fill:               var(--lightGrey);
        stroke:             var(--midGrey);
        stroke-width:       4px;
    }
    .node.selected{
        fill:               var(--brightGreen);
    }


</style>