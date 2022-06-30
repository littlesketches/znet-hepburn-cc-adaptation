<script>
	import { fade }                 from 'svelte/transition';
	import { onMount }              from 'svelte';
    import * as d3                  from 'd3'
    import { textWrap, slugify }    from "../../../../utils/helpers.js"
    import { ui, data }             from '../../../../data/stores.js';
    import { icons }                from "../../../../utils/icons.js"

    const dims = {
        width:              1600, 
        height:             1600,
    }    

    const eventsByHazard = [1].concat($data.schema.hazards.data
        .map( d => d["Linked hazard events"].length)
        .map((sum => value => sum += value)(0)))
        .map( (d, i) => d + i* 0.65 - 1)
</script>

<!-- HTML COMPONENT MARKUP-->
<figure class = "svg-container">
    <svg class = "climate-hazards-vis" viewBox = '0 0 {dims.width} {dims.height}'>
        <defs>
            <linearGradient id="gr-hazard" x1="0" y1="0" x2="100%" y2="100%">
                <stop stop-color="hsl(50, 100%, 70%)" offset="10%"/>
                <stop stop-color="hsl(320, 100%, 50%)" offset="90%"/>
            </linearGradient>
        </defs>

        <g style = 'transform: translate({0}px, {100}px)'>
            <g style='transform: translate({dims.width * 0.5}px, 0px)'>
                <text class = "header"> Climate <tspan class = "hazard-text">hazards</tspan> and community risks</text>
                <text class = "sub-header" y = 40>Linking hazards to risk</text>
                <text class = "sub-header" y = 70>.</text>
            </g>
        </g>

        <g class = "hazards-group" style="transform:translate({ dims.width * 0.25}px, 0px)">
            {#each $data.schema.hazards.data as obj , i}
            <g style="transform:translate(0px, {   (eventsByHazard[i] / $data.schema.hazardEvents.data.length * dims.height * 0.8) + dims.height * 0.2 }px)">
                <path class = "hazard-icon" d = {icons[slugify(obj.Hazard)]} style="transform:translate(0px, -80px) scale(1.25)" />
                <text class = "hazard-label">{@html obj.Hazard}</text>
                {#each $data.schema.hazardEvents.data.filter(d => d.Hazard[0] === obj.recordID) as d, i}
                <g style = 'transform: translate({0}px, {80 * i + 60}px)'>
                    <text class = "event-label">{@html d["Hazard event"]}</text>
                    <text class = "event-description" dy = 25>{@html d["Description"]}</text>
                </g>
                {/each}
            </g>
            {/each}
        </g>

        <!-- <g class = "risks-group">
            {#each $data.schema.hazardEvents.data.filter(d => d.Hazard[0] === obj.recordID) as d, i}
            <g style = 'transform: translate({0}px, {80 * i + 60}px)'>
                <text class = "event-label">{@html d["Hazard event"]}</text>
                <text class = "event-description" dy = 25>{@html d["Description"]}</text>
            </g>
            {/each}
        </g> -->

    </svg>
</figure>




<!-- STYLING-->
<style>
    figure {
        display:                block;
        width:                  100%;
        overflow:               hidden;
        background:              radial-gradient(circle, rgb(9, 63, 47)0%, rgba(29,1,36,1) 63%, rgba(2,0,36,1) 100%);
    }
    svg{ 
        overflow:               visible;
        max-height:             calc(100vh - 6rem);
    }
    .bg{
        fill:                   transparent; 
    }
    text{ 
        fill:                   #fff;
    }
    .header{
        font-size:              60px;
        font-weight:            700;    
        fill:                   #fff;
        text-anchor:            middle;  
    }
    .sub-header{
        text-anchor:            middle;  
        font-size:              25px;
        font-weight:            400;
    }
    .event-label{
        font-size:              40px;
        font-weight:            700;
        text-anchor:            middle;  
    }
    .event-description{
        font-size:              16px;
        font-weight:            300;
        text-anchor:            middle;  
    }
    .hazard-label{
        font-size:              68px;
        font-weight:            700;
        text-anchor:            middle;    
    }
    .hazard-label,
    .hazard-text{
        fill:                   url(#gr-hazard); 
    }
    .hazard-icon{
        fill:                   #fff;
        mix-blend-mode:         color-dodge;
        opacity:                0.2;
    }
</style>



