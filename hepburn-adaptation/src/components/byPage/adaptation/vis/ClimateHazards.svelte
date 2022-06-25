<script>
	import { fade }                 from 'svelte/transition';
	import { onMount }              from 'svelte';
    import * as d3                  from 'd3'
    import { textWrap, slugify }    from "../../../../utils/helpers.js"
    import { ui, data }             from '../../../../data/stores.js';
    import { icons, circleClockwise }       from "../../../../utils/icons.js"


    export let dims = {
        width:              1600, 
        height:             1600,
    }    
</script>

<!-- HTML COMPONENT MARKUP-->
<figure class = "svg-container">
    <svg class = "climate-variables-vis" viewBox = '0 0 {dims.width} {dims.height}'>

        <g style = 'transform: translate({dims.width * 0.5}px, {dims.height * 0.05}px)'>
            <text class = 'header'>Climate hazards &rarr; events</text> 
            <text class = "event-description" dy = 50>Visual to link the hazards to hazard events (with implied increase in frequency and severity from variables projection) </text> 

            {#each $data.schema.hazards.data as d, i}
            <g style = 'transform: translate({dims.width * -0.25}px, {300 * i + dims.height * 0.25}px)'>
                <text class = "hazard-label">{@html d["Hazard"]}</text>
            </g>
            {/each}

            {#each $data.schema.hazardEvents.data as d, i}
            <g style = 'transform: translate({dims.width * 0.25}px, {100 * i + dims.height * 0.25}px)'>
                <text class = "event-label">{@html d["Hazard event"]}</text>
                <text class = "event-description" dy = 30>{@html d["Description"]}</text>
            </g>
            {/each}
        </g>
    </svg>
</figure>


<!-- STYLING-->
<style>
figure {
    display:                block;
    border:                 0.5px solid #ccc;
    width:                  100%;
    height:                 100%;
}
svg{ 
    overflow: visible;
}
text{
    dominant-baseline:      middle;
    text-anchor:            middle;
    font-size:              80px;
    font-weight:            700;
}
.header,
.event-label{
    text-transform:         uppercase;
}
.hazard-label{
    font-size:              60px;
    font-weight:            700;
    text-transform:         uppercase;
}
.event-label{
    font-size:              40px;
    text-anchor:            middle;
}
.event-description{
    font-size:              25px;
    text-anchor:            middle;
    font-weight:            300;    
}
</style>



