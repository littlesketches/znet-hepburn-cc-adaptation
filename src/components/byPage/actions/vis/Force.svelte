<script>
	import { fade }         from 'svelte/transition';
	import { onMount }      from 'svelte';
    import * as d3          from 'd3'
    import { ui, data }     from "../../../../data/stores.js";
    import { slugify }      from "../../../../utils/helpers.js"
    import { mapIcons, triangle }     from "../../../../utils/icons.js";



    const hazardSchema = $data.schema.hazards.data

    // Node interaction
    function highlightNode(){  
        d3.select(this).raise()
        this.classList.add('selected') 
    };
    function muteNode(){  
        this.classList.remove('selected') 
    };


    // Utility function for translating elements
    const move = (x, y) => `transform: translate(${x}px, ${y}px`

    export let dims     = {}                // SVG dimensions
    export let nodes    = []                // an array of our particles
    export let forces   = []                // an array of [name, force] pairs

    let appliedForceNames  = []
    let renderedNodes   = []

    // Reactive variables for canvas dimensions and force simulation
    $: simulation = d3.forceSimulation()
        .nodes(nodes)
        .velocityDecay(0.4)
        .on("tick", tick)     

    $: { 
        // Re-initialize forces when they change
        forces.forEach(([name, force]) => {
            simulation.force(name, force)
        })

        // Remove old forces
        const newForceNames = forces.map(([name]) => name)
        const oldForceNames = appliedForceNames.filter( force => !newForceNames.includes(force) )
        oldForceNames.forEach(name => simulation.force(name, null) )

        // Update the applied forces
        appliedForceNames = newForceNames

        // Kick off simulation
        simulation.alpha(1)
        simulation.restart()
    }

    $: drag =  (simulation) => {
        function dragstarted(event, d) {
            if (!event.active) {
                simulation
                    .alphaTarget(0.3)
                    .restart()
            };
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        function dragged(event, d) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }                
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0.01);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    // Simulation tick function
    function tick(){
        renderedNodes = [...nodes] // update the renderedDots reference to trigger an update
    }

    // Action node shape
    const arc =  d3.arc().cornerRadius(10)

</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="force-vis-container" transition:fade>
    <defs>
        <linearGradient id="solids" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:var(--heat);stop-opacity:1" />
        <stop offset="33%" style="stop-color:var(--heat);stop-opacity:1" />
        <stop offset="33%" style="stop-color:var(--flood);stop-opacity:1" />
        <stop offset="67%" style="stop-color:var(--flood);stop-opacity:1" />
        <stop offset="67%" style="stop-color:var(--drought);stop-opacity:1" />
        <stop offset="100%" style="stop-color:var(--drought);stop-opacity:1" />
        </linearGradient>            
    </defs>

    {#each renderedNodes as node, i}
    <g class = "node-group" index = {i} style="{move(node.x, node.y)}" 
        on:mouseover={highlightNode} on:focus={highlightNode} on:mouseout={muteNode}       on:blur={muteNode}>

        <g class = "node-wrapper">

            <g class = "node-scale-wrapper" style="transform: scale(1)">
                <!-- Node scale shadow -->
                {#if $ui.state.actionVis.nodes.shadow}
                <circle class = "node-shadow {slugify($data.schema.actionScale.data.filter(d => d.recordID === node.Scale[0])[0].Scale)}" 
                    r="{$ui.vis.nodes.scales.radiusScale($data.schema.actionScale.data.filter(d => d.recordID === node.Scale[0])[0].Scale)}"> 
                </circle>
                {/if}

                <!-- Base node circle -->
                <circle class = "node-base"  r="{dims.nodeRadius}"
                    class:node-color="{!$ui.state.actionVis.nodes.base}"></circle>

                <!-- Hazard arcs-->
                {#if $ui.state.actionVis.nodes.arcs}
                <g class = "node-arcs">
                    {#each node["Hazard"] as hazard, i }
                        <path class = {slugify(hazardSchema.filter(d => d.recordID === hazard)[0].Hazard)} d = {arc({
                            innerRadius: dims.nodeRadius,
                            outerRadius: dims.nodeArcRadius,
                            startAngle: i * (2 * Math.PI / node["Hazard"].length),
                            endAngle: i * (2 * Math.PI / node["Hazard"].length) + (2 * Math.PI / node["Hazard"].length)
                            })}
                        />
                    {/each}
                </g>
                {/if}

                <!-- Approach triangles -->
                {#if $ui.state.actionVis.nodes.shapes}
                <g class = "approach-triangles">
                    {#if node["Linked approach theme"]}
                        {#if node["Linked approach theme"].includes('Increase resilience') }
                        <path class="approach-triangle resilience" d={triangle(dims.nodeRadius, 'up')} />
                        {/if}
                        {#if node["Linked approach theme"].includes('Reduce risk') }
                        <path class="approach-triangle risk" d={triangle(dims.nodeRadius, 'down')} />
                        {/if}
                    {/if}
                </g>
                {/if}

                <!-- Overlay symbol: Unused circle marker n-->
                {#if $ui.state.actionVis.nodes.symbols}

                <path class ="symbol" 
                    d ={arc({
                        innerRadius: dims.nodeRadius* 0  + 0,
                        outerRadius: dims.nodeArcRadius *0  + 8,
                        startAngle: 0,
                        endAngle: 2 * Math.PI
                        })}></path>
                {/if}

            </g>

            <!-- Label -->
            <g class = "label">
                <text class = "label-text">{@html node.Name}</text>                
            </g>
        </g>
    </g>
    {/each}
</g>



<!-- STYLING -->
<style>
    .node-group{
        cursor:             pointer;
    }
    .node-group:focus{
        outline:            0;
    }
    .node-base, 
    .node-shadow, 
    .approach-triangle, 
    .label-text,
    .symbol, 
    .node-wrapper{
        transition:             0.5s all
    }
    .node-base{
        fill:                   var(--nodeBase);
    }
    
    :global(.node-group.selected .node-wrapper){
        transform:              scale(2)
    }
    :global(.node-group.selected text.label-text){
        display:                initial;
    }
    :global(.node-group.selected .approach-triangle){
        opacity:                0.5;
    }

    circle.node-shadow {
        pointer-events:         none;
    }
    .node-color{
        fill:                   var(--bg-color);
        fill:                   rgba(255, 255, 255, 0.7);
    }
    .node-shadow{
        fill:                   var(--scale-shadow);
    }

    .label{
        cursor:                 pointer;
    }
    .label-bg{
        fill:                   var(--bg-color);
    }
    .label-text{
        fill:                   var(--darkGreen);
        display:                none;
        text-anchor:            middle;
        pointer-events:         none;
        font-size:              10px;
        font-weight:            700;
        text-shadow:            #fff 1px 1px 0.5px, 
                                #fff -1px -1px 0.5px; 
        transition:             0.5s all
    }

    .risk{                      fill:  var(--approach-bg);}
    .resilience{                fill:  var(--approach-bg); }
 
    /* Hazard colours */
    .flood{                     fill: var(--flood) }
    .flood-and-storm{           fill: var(--flood) }
    .heat{                      fill: var(--heat)  }
    .fire{                      fill: var(--fire)  }
    .drought{                   fill: var(--drought)  }

    /* Symbols for special characteristics */
    .symbol{
        fill:               transparent;
        display:             none;
    }
    .symbol.healing-country{
        display:            initial;
        fill:               var(--healing-country)  
    }

</style>