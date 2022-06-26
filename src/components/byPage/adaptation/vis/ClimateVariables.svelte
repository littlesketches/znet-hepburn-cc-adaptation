<script>
	import { fade }                 from 'svelte/transition';
	import { onMount }              from 'svelte';
	import * as d3                  from 'd3';

    import { textWrap, slugify }    from "../../../../utils/helpers.js"
    import { ui, data }             from '../../../../data/stores.js';

    export let dims = {
        width:              1600, 
        height:             1600,
    }    

    const chartDims  = {
        width:              300,
        height:             90
    }

    const scaleX = d3.scaleLinear()
        .range([ 0, chartDims.width])
        .domain([2019, $data.climate.schema.years[$data.climate.schema.years.length-1] ])
    
    function getScaleY(variable){
        const chartData45 = $data.climate.variables.projectedChange["RCP4.5"].Annual[variable]
        const chartData85 = $data.climate.variables.projectedChange["RCP8.5"].Annual[variable]
        
        if(typeof $data.climate.variables.projectedChange["RCP4.5"].Annual[variable] === 'undefined') return null

        const chartData45_points = [0]
            .concat(Object.values(chartData45.Lower))
            .concat(Object.values(chartData45.Median))
            .concat(Object.values(chartData45.Upper))

        const chartData85_points = [0]
            .concat(Object.values(chartData85.Lower))
            .concat(Object.values(chartData85.Median))
            .concat(Object.values(chartData85.Upper))

        const dataPoints = chartData45_points.concat(chartData85_points)
        const range = d3.mean(dataPoints) > 0 ? [ 0, -chartDims.height] : [chartDims.height, 0]
        const domain = d3.mean(dataPoints) > 0 ? d3.extent(dataPoints) : d3.extent(dataPoints).map(d => d - d3.max(dataPoints))

        return d3.scaleLinear()
            .range(range)
            .domain(domain)
    };

    function chartPath(chartData, scaleY, variable){
        const areaData = [
            [ 2019, 0, 0 ],
            [ 2030,
              d3.min([Object.values(chartData.Lower)[0], Object.values(chartData.Median)[0], Object.values(chartData.Upper)[0] ]),
              d3.max([Object.values(chartData.Lower)[0], Object.values(chartData.Median)[0], Object.values(chartData.Upper)[0] ]) ],
            [ 2050,
              d3.min([Object.values(chartData.Lower)[1], Object.values(chartData.Median)[1], Object.values(chartData.Upper)[1] ]),
              d3.max([Object.values(chartData.Lower)[1], Object.values(chartData.Median)[1], Object.values(chartData.Upper)[1] ]) ],
            [ 2070,
              d3.min([Object.values(chartData.Lower)[2], Object.values(chartData.Median)[2], Object.values(chartData.Upper)[2] ]),
              d3.max([Object.values(chartData.Lower)[2], Object.values(chartData.Median)[2], Object.values(chartData.Upper)[2] ]) ],
            [ 2090,
              d3.min([Object.values(chartData.Lower)[3], Object.values(chartData.Median)[3], Object.values(chartData.Upper)[3] ]),
              d3.max([Object.values(chartData.Lower)[3], Object.values(chartData.Median)[3], Object.values(chartData.Upper)[3] ]) ]
        ]

        const areaGenerator = d3.area()
            .x( d => scaleX(+d[0]) )
            .y0( d => scaleY(+d[1]) )
            .y1( d => scaleY(+d[2]) )

        return areaGenerator(areaData)
    };


    onMount( () => {
        const textLayer = d3.select('.text-wrap-layer')
        textLayer.selectAll('.variable-description')
            .data( $data.schema.climateVariablesCH.data)
            .join('text').classed('variable-description', true)
            .attr('x', 50)
            .attr('y',(d, i) => 110 * i + 15)
            .attr('dy', 0)
            .text( d => d.Description)
            .style('fill', '#fff')
            .call(textWrap, 500, 1.1, false)

    }) 

</script>

<!-- HTML COMPONENT MARKUP-->
<figure class = "svg-container">
    <svg class = "climate-variables-vis" viewBox = '0 0 {dims.width} {dims.height}'>
        <rect class = "bg" x = 0 y = 0 width = {dims.width} height = {dims.height}/>

        <g style = 'transform: translate({dims.width * 0.5}px, {dims.height * 0.075}px)'>
            <text class = 'header'>Climate variables &rarr; trends  &rarr; hazards</text> 
            <text class = "variable-description" dy = 50> List of variables included in the Australian Climate Futures modelling tool: projection trend visualisation, and grouped to hazards</text> 

            <!-- {#each $data.schema.climateVariables.data as d, i}
            <g style = 'transform: translate({-dims.width * 0.25}px, {85 * i + 150}px)'>
                <text class = "variable-label">{@html d.Variable}</text>
                <text class = "variable-description" dy = 30>{@html d["Australian Climate Futures tool full name"]}</text>
            </g>
            {/each} -->

        </g>
        <g>
            <g class = "links">

            </g>


            <g style = 'transform: translate(0px, {dims.height * 0.2}px)'>
                {#each [2019, 2030, 2050, 2070, 2090] as year}
                    <g style = 'transform: translate({dims.width * 0.5 - chartDims.width * 0.5}px, {0}px)'>
                        <path class = "gridline"  d = "M{scaleX(year)}, {-chartDims.height} V{dims.height * 0.75}"/>
                        <text class ="label-year" x ={scaleX(year)} y = {-chartDims.height - 10}>{@html year}</text>
                        <text class ="label-year" x ={scaleX(year)} y = {dims.height * 0.75 + 15}>{@html year}</text>
                    </g>
                {/each}
                <g class = "text-wrap-layer"></g>

                {#each $data.schema.climateVariablesCH.data as d, i}
                    {@const chartData45 = $data.climate.variables.projectedChange["RCP4.5"].Annual[d.Variable]  }
                    {@const chartData85 = $data.climate.variables.projectedChange["RCP8.5"].Annual[d.Variable]  }
                    {@const scaleY = getScaleY(d.Variable)   }
                    {@const direction = 'up'  }

                    <g style = 'transform: translate({0}px, {110 * i}px)'>
                        <path class = 'gridline' d = "M{50}, 0 H{dims.width * 0.67 - 50}" />

                        <text class = "variable-label" style = 'transform: translate({50}px, {-10}px)'>
                            {@html d.Variable}
                        </text>

                        <g  style = 'transform: translate({dims.width * 0.5 - chartDims.width * 0.5}px, {0}px)'>
                            {#if chartData45}
                            <g>
                                <path class = "area-chart rcp-45" d = "{chartPath(chartData45, scaleY, d.Variable)}"></path>
                                <!-- <path class = "area-chart rcp-45 winter" d = "{chartPath(chartData45_Winter, d.Variable)}"></path>
                                <path class = "area-chart rcp-45 summer" d = "{chartPath(chartData45_Summer, d.Variable)}"></path> -->
                                <path class = "area-chart rcp-85" d = "{chartPath(chartData85, scaleY, d.Variable)}"></path>
                            </g>
                            {:else}
                            <text class = "no-data-label" style = 'transform: translate({chartDims.width * 0.5}px, {0}px)'>
                                No projection modelling
                            </text>
                            {/if}                        
                        </g>
                    </g>



                {/each}

                {#each $data.schema.hazards.data as d, i}
                <g style = 'transform: translate({dims.width * 0.85}px, {300 * i}px)'>
                    <text class = "hazard-label">{@html d["Hazard"]}</text>
                </g>
                {/each}

            </g>
        </g>
    </svg>
</figure>


<!-- STYLING-->
<style>
figure {
    display:                block;
    width:                  100%;
    height:                 100%;
}
svg{ 
    overflow: visible;
}
.bg{
    fill:           rgb(38, 38, 38);
}
text{ 
    fill:                   #fff;
}
.header{
    font-size:              80px;
    font-weight:            700;
    text-anchor:            middle;
    fill:                   #fff;
}

.variable-label{
    font-size:              25px;
    font-weight:            700;
    fill:                   #fff;
}
.no-data-label{
    text-anchor:            middle;
}
.variable-description{
    font-size:              25px;
    text-anchor:            middle;
    font-weight:            300;    
    fill:                   #fff;
}
.hazard-label{
    font-size:              60px;
    font-weight:            700;
    fill:                   #fff;
    text-anchor:            middle;    
}
.area-chart{
    mix-blend-mode:         screen;
}

.rcp-45{
    fill: aqua
}
.rcp-85{
    fill: rgb(226, 31, 252)
}
.gridline{
    stroke:             rgba( 255, 255, 255, 0.5);
    fill:               none;
}
.label-year{
    fill:                   #fff;
    text-anchor:            middle;  
}
.variable-description{
    fill:                   #fff;
    text-anchor:            middle;  
}
</style>



