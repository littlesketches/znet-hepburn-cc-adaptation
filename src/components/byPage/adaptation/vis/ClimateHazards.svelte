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

    const shockStressOffsets = [0 , 150, 300, 450, 600, 750, 900, 1050, 1200    ]
    const hazardOffset = 0.65
    const eventOffset = 75
    const textLength = 550

    const eventsByHazard = [1].concat($data.schema.hazards.data
        .map( d => d["Linked hazard events"].length)
        .map((sum => value => sum += value)(0)))
        .map( (d, i) => d + i * hazardOffset - 1)


    onMount( () => {
        d3.selectAll('event.description')
        $data.schema.hazards.data.forEach( (obj, i) => {
             $data.schema.hazardEvents.data.filter(e => e.Hazard[0] === obj.recordID).forEach( (d, j)  => {
                const group = d3.select('.event-description-group')
                    .append('g')
                    .style('transform', `translate(${0}px, ${ 0 + ((eventsByHazard[i] / $data.schema.hazardEvents.data.length * dims.height * 0.8) + dims.height * 0.2)  + (eventOffset * j + 60)}px` )

               const label = group.append('text')
                    .classed('event-label', true)
                    .style('font-size',  40)
                    .style('font-weight',  700)
                    .style('text-anchor',  'middle')
                    .style('fill', '#fff')
                    .text(d["Hazard event"])

                group.append('text').classed('event-description', true)
                    .attr('dy', 0)
                    .attr('x', d.Type === 'Shock' ? dims.width * 0.125 : -dims.width * 0.125 - textLength)
                    .attr('y', 0)
                    .style('font-size',  14)
                    .style('fill', '#fff')
                    .text(d["Description"])
                    .call( textWrap, textLength, 1.05, true)

            
                group.append('path')
                    .style('stroke', '#fff')
                    .style('stroke-widhth', 2)
                    .style('fill', 'none')
                    .attr('d', `M${(d.Type === 'Shock' ? -1 : 1) * label.node().getBBox().width * 0.5 }, 10 
                                H${(d.Type === 'Shock' ? 1 : -1) * (dims.width * 0.5 - 50) }`)
            })
        })
    })
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
                <text class = "header"> Climate <tspan class = "hazard-text">hazards</tspan> and events</text>
                <text class = "sub-header" y = 40>There are four climate hazards that trigger events that impact the Hepburn community.</text>
                <text class = "sub-header" y = 70>Projected climate change is projected to increase the frequecy and intensity of these events.</text>
            </g>
        </g>

        <g class = "shock-stress-group">    
            {#each shockStressOffsets as offset}
            <g style="transform: translate({0}px, {dims.width * 0.25 + offset}px)">
                <text class = "type-label shock" style="transform: translate({dims.width - 50}px, {0}px)">Shock</text>
                <text class = "type-label stress" style="transform: translate({50}px, {0}px)">Stress</text>
            </g>
            {/each}
        </g>

        <g class = "hazards-group" style="transform:translate({ dims.width * 0.5}px, 0px)">
            {#each $data.schema.hazards.data as obj , i}
            <g style = "transform:translate(0px, {   (eventsByHazard[i] / $data.schema.hazardEvents.data.length * dims.height * 0.8) + dims.height * 0.2 }px)">
                <path class = "hazard-icon" d = {icons[slugify(obj.Hazard)]} style="transform:translate(0px, -80px) scale(1.25)" />
                <text class = "hazard-label">{@html obj.Hazard}</text>
            </g>
            {/each}
            <g class = 'event-description-group'> </g>
        </g>

    </svg>
</figure>


<!-- STYLING-->
<style>

    figure {
        display:                block;
        width:                  100%;
        overflow:               hidden;
        background:              radial-gradient(circle, rgb(63, 31, 9)0%, rgba(29,1,36,1) 63%, rgba(2,0,36,1) 100%);
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
        /* fill:                   url(#gr-hazard);  */
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
    .type-label{
        font-size:              180px;
        font-weight:            700;
        text-anchor:            middle;    
        mix-blend-mode:         difference;
        fill:                   #c5ffff;
        opacity:                0.05;
        text-transform:         uppercase;
    }
    .shock{
        text-anchor:            end;   
        letter-spacing:         10px;
    }
    .stress{
        text-anchor:            start;   
    }
</style>



