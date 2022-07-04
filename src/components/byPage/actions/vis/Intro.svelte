<script>
	import { fade }         from 'svelte/transition';
    import * as d3          from 'd3'
    import { ui, data }     from "../../../../data/stores.js";
    import { textWrap  }    from "../../../../utils/helpers.js"
    import { icons  }       from "../../../../utils/icons.js"

    export let dims     = {}                // SVG dimensions

    
</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="intro-vis-container" in:fade>
    <g class = "container" class:hidden = "{$ui.state.actionVis.scene === 0 }"
        style = "transform: translate({dims.width * 0.5}px, {dims.height * 0.5}px)">

        <text class = "number">
            {@html $data.stats.actions.total}
        </text>
        <text y= "100">adaptation</text>
        <text y= "200">actions</text>
    </g>
</g>



<!-- STYLING -->
<style>
    .container{
        transition: 1000ms all
    }
    .container.hidden{
        opacity:    0;
    }
    text{
        pointer-events:     none;
        font-size:          100px;
        font-weight:        700;
        text-anchor:        middle;
        fill:               var(--midGrey);
    }
    text.number{ 
        font-size:  400px;
    }
</style>