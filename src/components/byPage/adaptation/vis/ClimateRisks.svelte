<script>
	import { fade }                 from 'svelte/transition';
	import { onMount }              from 'svelte';
    import * as d3                  from 'd3'
    import { textWrap, slugify }    from "../../../../utils/helpers.js"
    import { ui, data }             from '../../../../data/stores.js';
    import { icons, circleAntiClockwise }   from "../../../../utils/icons.js"

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

            <linearGradient id="gr-risk" x1="0" y1="0" x2="100%" y2="100%">
                <stop stop-color="hsl(144, 97%, 70%)" offset="30%"/>
                <stop stop-color="hsl(236, 60%, 85%)" offset="90%"/>
            </linearGradient>
        </defs>

        <g style = 'transform: translate({0}px, {100}px)'>
            <g style='transform: translate({dims.width * 0.5}px, 0px)'>
                <text class = "header">Determinants of <tspan class = "risk-text">Climate risk</tspan></text>
                <text class = "sub-header" y = 40>How climate hazards interact with hazard exposure and vulnerability to form risk.</text>
                <text class = "sub-header" y = 70>And the how our response through adaptation and mitigation actions can manage and frame climate risk.</text>
            </g>
        </g>

        <g class = "risk-ovals-group" style="transform:translate({dims.width * 0.5}px, { dims.height * 0.55}px)">
            <circle class = "response-circle" r={dims.width * 0.35}/>
            <g style="transform:translate({dims.width * 0.1}px, {dims.width * 0}px)">
                {#each $data.schema.riskDeterminants.data as obj , i}
                <g class = "oval-group {slugify(obj.Name)}">
                    <ellipse class = "oval-bg"  cx="0" cy="0" rx="{dims.width * 0.2}" ry="{dims.width * 0.125}" style="transform-origin: {-dims.width * 0.1}px 0; transform:rotate({i * 360 / $data.schema.riskDeterminants.data.length - 90}deg)"/>
                    <ellipse class = "oval-fg"  cx="0" cy="0" rx="{dims.width * 0.2}" ry="{dims.width * 0.125}" style="transform-origin: {-dims.width * 0.1}px 0; transform:rotate({i * 360 / $data.schema.riskDeterminants.data.length - 90}deg)"/>
                    <g style="transform-origin: {-dims.width * 0.1}px 0; transform:rotate({i * 360 / $data.schema.riskDeterminants.data.length -90}deg)">
                        <text class = "determinant-label" 
                            x = {dims.width * 0.1 * (i === 2 ? -1 : 1)} 
                            style="transform:rotate({i === 2 ? 180 : 0}deg)">
                            {obj.Name}
                        </text>
                    </g>
                </g>
                {/each}
            </g>
            <text class = "center-label risk-label" dy = 40>Risk</text>
            <path id = "response-label-path" class = "label-path" d={circleAntiClockwise({x: 0, y: 0}, dims.width * 0.35 + 45 )} />
            <text>
                <textPath class = 'response-label' href ="#response-label-path" startOffset="25%">Response to climate change</textPath>
            </text>
        </g>

    </svg>
</figure>



<!-- STYLING-->
<style>
    figure {
        display:                block;
        width:                  100%;
        overflow:               hidden;
        background:              radial-gradient(circle, #207127 0%, rgba(29,1,36,1) 63%, rgba(2,0,36,1) 100%);
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
    .risk-text{
        fill:                   url(#gr-risk); 
    }


    .oval-bg{
        fill:                   rgb(0 145 103);
        mix-blend-mode:         plus-lighter;
    }
    .oval-fg{       
        fill:                   #fff;
        opacity:                0.3;
    }
    .determinant-label{
        fill:                   #767676;
        font-size:              45px;
        font-weight:            700;
        mix-blend-mode:         multiply;
        text-anchor:            middle;
    }
    .center-label{
        fill:                   url(#gr-risk); 
        fill:                   var(--darkGreen);
        font-size:              80px;
        text-anchor:            middle;
        font-weight:            700;
    }

    .response-circle{
        stroke:                 var(--brightGreen);
        stroke-width:           10px;
        fill:                   rgb(69 100 77);
        mix-blend-mode:         luminosity;
    }

    .label-path{
        fill:                   none;
        stroke:                   none;
    }
    .response-label{
        font-size:              45px;
        font-weight:            700;
        text-anchor:            middle;
    }

</style>



