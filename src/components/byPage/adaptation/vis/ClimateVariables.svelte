<script>
	import { fade }                 from 'svelte/transition';
	import { onMount }              from 'svelte';
	import * as d3                  from 'd3';

    import { textWrap, slugify }    from "../../../../utils/helpers.js"
    import { ui, data }             from '../../../../data/stores.js';


    export let dims = {
        width:              1600, 
        height:             1600,   
        variableSpacing:    105
    }    

    const chartDims  = {
        width:              350,
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
        return d3.scaleLinear()
            .range([ 0, -chartDims.height])
            .domain(d3.extent(dataPoints))
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
        const variablesLayer = d3.select('.text-wrap-layer')
        variablesLayer.selectAll('.variable-description')
            .data( $data.schema.climateVariablesCH.data)
            .join('text').classed('variable-description', true)
            .attr('x', 50)
            .attr('y',(d, i) => dims.variableSpacing * i + 20)
            .attr('dy', 0)
            .text( d => d.Description)
            .style('fill', '#fff')
            .style('font-weight', 300)
            .style('font-size', 14)
            .call(textWrap, 450, 1.1, false)
    }) 

</script>

<!-- HTML COMPONENT MARKUP-->
<figure class = "svg-container">
    <svg class = "climate-variables-vis" viewBox = '0 0 {dims.width} {dims.height}' width="100%">
        <rect class = "bg" x = "-300" y = 0 width = {dims.width + 600} height = {dims.height}/>
        <text class = "source" x = {dims.width - 50} y = {dims.height - 20}>Source: All projection data and variable defintions from CSIRO and the Victorian Government, 2019</text>

        <g style = 'transform: translate({0}px, {100}px)'>
            <g style='transform: translate({50}px, 0px)'>
                <text class = "header"> Climate variables</text>
                <text class = "sub-header" y = 40>Meaures of the climate models used in</text>
                <text class = "sub-header" y = 70>the Victorian Climate Projections 2019</text>
                <text class = "sub-header" y = 100>for the Central Highlands region</text>
            </g>
            <g style='transform: translate({dims.width * 0.5 - chartDims.width * 0.5}px, 0px)'>
                <text class = "header">Projections</text>
                <text class = "sub-header" y = 40>Range of projected change for the </text>
                <text class = "sub-header" y = 70><tspan class="rcp-45">RCP 4.5</tspan> and <tspan class="rcp-85">RCP 8.5</tspan> scenarios </text>
                <text class = "sub-header" y = 100>from 2019 (baseline) to 2090 </text>
            </g>
            <g style='transform: translate({dims.width * 0.725}px, 0px)'>
                <text class = "header">Hazards</text>
                <text class = "sub-header" y = 40>How climate variables and trends</text>
                <text class = "sub-header" y = 70>are linked to the climate hazards</text>
                <text class = "sub-header" y = 100>facing Hepburn Shire</text>
            </g>
        </g>

        <g class = "links-group">
            {#each $data.schema.climateVariablesCH.data as nodeObj, i }
                {#if nodeObj["Linked hazards"] }
                    {#each nodeObj["Linked hazards"] as recordID} 
                        {@const hazard = $data.schema.hazards.data.filter(d => d.recordID === recordID)[0].Hazard}
                        {@const sourcePos = {
                                x: dims.width * 0.67 - 50,
                                y: dims.variableSpacing * i + dims.height * 0.25
                            }
                        }
                        {@const targetPos = {
                                x:  dims.width * 0.85, 
                                y: ($data.schema.hazards.data.map(d => d.Hazard).indexOf(hazard) / $data.schema.hazards.data.length * dims.height * 0.7) + dims.height * 0.25
                            } 
                        }
                        <path class = "gridline" d = {d3.linkHorizontal()({
                            source: [sourcePos.x, sourcePos.y],
                            target: [targetPos.x, targetPos.y]
                        })}/>
                    {/each}
                {/if}
            {/each}
        </g>

        <g class = "chart-group" style = 'transform: translate(0px, {dims.height * 0.25}px)'>
            {#each [2019, 2030, 2050, 2070, 2090] as year}
                <g style = 'transform: translate({dims.width * 0.5 - chartDims.width * 0.5}px, {0}px)'>
                    <path class = "gridline"  d = "M{scaleX(year)}, {-chartDims.height - 10} V{dims.height * 0.715}"/>
                    <text class ="label-year" x ={scaleX(year)} y = {-chartDims.height - 20}>{@html year}</text>
                    <text class ="label-year" x ={scaleX(year)} y = {dims.height * 0.715 + 15}>{@html year}</text>
                </g>
            {/each}
            <g class = "text-wrap-layer"></g>

            {#each $data.schema.climateVariablesCH.data as d, i}
                {@const chartData45 = $data.climate.variables.projectedChange["RCP4.5"].Annual[d.Variable]  }
                {@const chartData85 = $data.climate.variables.projectedChange["RCP8.5"].Annual[d.Variable]  }
                {@const chartUnit = $data.schema.climateVariablesCH.data.filter(e => e.Variable ===  d.Variable)[0]["Change unit"]  }
                {@const max = $data.climate.variables.projectedChange["RCP8.5"].Annual[d.Variable] ? d3.max([$data.climate.variables.projectedChange["RCP8.5"].Annual[d.Variable].Upper["2090"], $data.climate.variables.projectedChange["RCP4.5"].Annual[d.Variable].Upper["2090"] ]) : 0 }
                {@const min = $data.climate.variables.projectedChange["RCP8.5"].Annual[d.Variable] ? d3.min([$data.climate.variables.projectedChange["RCP8.5"].Annual[d.Variable].Lower["2090"], $data.climate.variables.projectedChange["RCP4.5"].Annual[d.Variable].Lower["2090"] ]) : 0 }
                {@const scaleY = getScaleY(d.Variable)   }

                <g style = 'transform: translate({0}px, {dims.variableSpacing * i}px)'>
                    <path class = 'gridline' d = "M{50}, 0 H{dims.width * 0.67 - 50}" />
                    <text class = "variable-label" style = 'transform: translate({50}px, {-10}px)'>
                        {@html d.Variable}
                    </text>
                    <g  style = 'transform: translate({dims.width * 0.5 - chartDims.width * 0.5}px, {0}px)'>
                        <g style = 'transform: translate(0px, {-scaleY(0)}px)'>
                            <path class = "area-chart rcp-45" d = "{chartPath(chartData45, scaleY, d.Variable)}"/>
                            <path class = "area-chart rcp-85" d = "{chartPath(chartData85, scaleY, d.Variable)}"/>
                            <text class ="unit-label" style = 'transform: translate({chartDims.width + 5}px, {scaleY(max) + 6}px)'>
                                {#if max > 0}+{/if}{max} {chartUnit}
                            </text>
                            <text class ="unit-label" style = 'transform: translate({chartDims.width + 5}px, {scaleY(min) + 6}px)'>
                                {#if min > 0}+{/if} {min} {chartUnit}
                            </text>
                        </g>                  
                    </g>
                </g>
            {/each}
        </g>

        <g class = "hazards-group">
            {#each $data.schema.hazards.data as obj , i}
            <g style="transform:translate({ dims.width * 0.825}px, {(i / $data.schema.hazards.data.length * dims.height * 0.7) + dims.height * 0.25 + 20}px)">
                <text class = "hazard-label">{@html obj.Hazard}</text>
                <text class = "hazard-trend" y = 35>{@html obj.Trend}</text>
            </g>
            {/each}
        </g>

    </svg>
</figure>


<!-- STYLING-->
<style>

figure {
    display:                block;
    width:                  100%;
    overflow:               hidden;
    background:              radial-gradient(circle, rgba(15,73,85,1) 0%, rgba(29,1,36,1) 63%, rgba(2,0,36,1) 100%);
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
    fill:                   var(--brightGreen);
}
.sub-header{
    font-size:              25px;
    font-weight:            400;
}
.variable-label{
    font-size:              25px;
    font-weight:            700;
}
.no-data-label{
    text-anchor:            middle;
    font-weight:            700;
    font-size:              18px;
}
.hazard-label{
    font-size:              60px;
    font-weight:            700;
    text-anchor:            middle;    
}
.hazard-trend{
    font-size:              25px;
    font-weight:            500;
    text-anchor:            middle;    
}
.area-chart{
    mix-blend-mode:         screen;
}

.rcp-45{ 
    fill:                   var(--rcp45)
}
.rcp-85{
    fill:                   var(--rcp85);
}
.gridline{
    stroke:                 var(--midGrey);
    fill:                   none;
}

.source,
.label-year,
.unit-label{
    font-size:              14px;
    font-weight:            300;

}
.label-year{
    text-anchor:            middle;  
}
.source{
    font-size:              10px;
    text-anchor:            end;  
}
</style>



