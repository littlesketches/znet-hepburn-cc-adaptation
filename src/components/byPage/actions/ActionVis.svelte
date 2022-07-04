<script>
    import * as d3              from 'd3'
	import { onMount }          from 'svelte';
    import { ui, data }         from '../../../data/stores.js'
    import Legend               from './vis/Legend.svelte'
    import Force                from './vis/Force.svelte'
    import Intro                from './vis/Intro.svelte'
    import Hazard               from './vis/Hazard.svelte'
    import Type                 from './vis/Type.svelte'
    import Scale                from './vis/Scale.svelte'
    import Approach             from './vis/Approach.svelte'
    import FocusArea            from './vis/FocusArea.svelte'
    import Screening            from './vis/Screening.svelte'
    import Rating               from './vis/Rating.svelte'


    // Setup vis variables  
    let element
    let dims = {
        width:              1600, 
        height:             1600,
        nodeRadius:         22.5,
        nodeArcRadius:      27.5,
        flowNodeRadius:     0
    }

    // Node and schema data
    const nodes = $data.actions.map( d => d )

    const typeData =  {
        nodes:  $data.schema.actionTypeNodes.data,
        links:  $data.schema.actionTypeLinks.data
    }
    const scaleData =  $data.schema.actionScale.data.sort( (a, b) => a.rank - b.rank)
    const approachData = [
        {   name: 'Reduce risk',           
            standard: {x: dims.width * 0.3, y: dims.height * 0.4 },
            wide:     {x: dims.width * 0.15, y: dims.height * 0.25 }
        },
        {   name: 'Increase resilience',   
            standard: {x: dims.width * 0.7, y: dims.height * 0.4 },
            wide:     {x: dims.width * 0.85, y: dims.height * 0.25 }
        },
        {   name: 'None',   
            standard: {x: dims.width * 0.5, y: dims.height * 0.75 },
            wide:     {x: dims.width * 0.5, y: dims.height * 0.65 }
        }
    ]
    const ratingData = {
        noRegrets: {
            name: "No regrets",      y: 0.1 * dims.height
        },
        forRating: {
            name: "Actions for consideration",     y: 0.5 * dims.height
        },
        discard: {
            name: "Limited adaptation benefit",     y: 0.85 * dims.height
        },
        twoCriteria: {
            name: "Higher priority",     y: 0.35 * dims.height
        },
        oneCriteria: {
            name: "Lower priority",     y: 0.6 * dims.height
        },
        zeroCriteria: {
            name: "Uncertain adaptation benefit",     y: 0.75 * dims.height
        },
        discardCriteria: {
            name: "Limited adaptation benefit",     y: 0.85 * dims.height
        }
    }
    let schema

    // Scales 
    $ui.vis.nodes.scales = {
        radiusScale: d3.scaleOrdinal()
            .domain(["Local", "Regional","State", "National"])
            .range([
                dims.nodeArcRadius, 
                dims.nodeArcRadius * 1.2, 
                dims.nodeArcRadius * 1.4, 
                dims.nodeArcRadius * 1.6 
            ])
    }


    // Base force configurations
    const centerPos =  {x: dims.width * 0.5, y:dims.height * 0.5 }
    const centerForce = {
            x:  d3.forceX().x(centerPos.x),
            y:  d3.forceY().y(centerPos.y)
        }
    const radialForceCenter = d3.forceRadial()
        .x(centerPos.x)
        .y(centerPos.y)
        .radius(dims.width * 0.5)

    $: collisionType =  $ui.state.actionVis.nodes.shadow ? 'scale' : 'standard'

    $: forceCollide = (function(){
        const colissionMargin = 2.5
        switch(collisionType){
            case 'scale':
                return d3.forceCollide()
                    .radius(d => {
                        const actionScale =  $data.schema.actionScale.data.filter(e => e.recordID === d.Scale[0])[0].Scale   
                        return $ui.vis.nodes.scales.radiusScale(actionScale) + (actionScale === "Local" ? colissionMargin : 1)
                    })
                    .iterations(3)        

            case 'standard':
            default:
                return d3.forceCollide()
                    .radius(dims.nodeArcRadius + colissionMargin )
                    .iterations(3)
        }
        }()) 
    
    // Setup forces as reactive variables:
    $: focus = $ui.state.actionVis.nodes.focusArea 
    $: forces =  (function(){
            switch($ui.state.actionVis.nodes.force){
                case "ring-outside":
                    return [
                        ["x",           centerForce.x.strength(0.1)],
                        ["y",           centerForce.y.strength(0.1)],
                        ["collide",     forceCollide],
                        ["radial",      radialForceCenter.radius(dims.width * 0.65).strength(0.2) ],
                    ]

                case "ring-outer":
                    return [
                        ["x",           centerForce.x.strength(0.1)],
                        ["y",           centerForce.y.strength(0.1)],
                        ["collide",     forceCollide],
                        ["radial",      radialForceCenter.radius(dims.width * 0.45).strength(0.75) ],
                    ]

                case "ring-mid":
                    return [
                        ["x",           centerForce.x.strength(0.5)],
                        ["y",           centerForce.y.strength(0.5)],
                        ["collide",     forceCollide],
                        ["radial",      radialForceCenter.radius(dims.width * 0.25).strength(2) ]
                    ]

                case "ring-offscreen":
                    return [
                        ["x",           centerForce.x],
                        ["y",           centerForce.y],
                        ["collide",     forceCollide],
                        ["radial",      radialForceCenter.radius(dims.width * 5).strength(0.1) ]
                    ]

                case "ring-focusArea":
                    const focusAreaID = focus ? $data.schema.adaptationFocus.data.filter(d => d["Focus area"] === $ui.state.actionVis.nodes.focusArea)[0].recordID : null
                    return [
                        ["collide",     forceCollide],
                        ["x",           centerForce.x.strength(0.1)],
                        ["y",           d3.forceY().y(d => d["Focus areas"].indexOf(focusAreaID) > -1 ? dims.height * 0.4 : dims.height * 0.65)
                                            .strength(0.175)],
                        ["radial",      radialForceCenter
                                            .radius( d => d["Focus areas"].indexOf(focusAreaID) > -1 ? dims.width * 0.25 : dims.width * 0.45)
                                            .strength( d => d["Focus areas"].indexOf(focusAreaID) > -1 ? 0.05 : 0.25)
                        ]
                    ]

                case "top-line":
                    return [
                        ["x",           centerForce.x.strength(0.01)],
                        ["y",           d3.forceY().y(0).strength(2)],
                        ["collide",     forceCollide],
                    ]

                case "bottom-line":
                    return [
                        ["x",           centerForce.x.strength(0.04)],
                        ["y",           d3.forceY().y(dims.height).strength(0.5)],
                        ["collide",     forceCollide],
                    ]

                case "diagonal-up":
                    return [
                        ["x",           d3.forceX().x( (d, i) =>  i / $data.actions.length * dims.width * 0.5 + dims.width * 0.25  ).strength(0.5)],
                        ["y",           d3.forceY().y( (d, i) =>  (dims.height - i / $data.actions.length * dims.height) * 0.8   ).strength(0.5)],
                        ["collide",     forceCollide],
                    ]
                case "left-line":
                    return [
                        ["x",           d3.forceX().x(0).strength(2)],
                        ["y",           d3.forceY().y(dims.height * 0.5).strength(0.04)],
                        ["collide",     forceCollide],
                    ]

                case "right-line":
                    return [
                        ["x",           d3.forceX().x(dims.width).strength(0.2)],
                        ["y",           d3.forceY().y(dims.height * 0.5).strength(0.001)],
                        ["collide",     forceCollide],
                    ]

                case "arrow-down":
                    return [
                        ["collide",     forceCollide],
                        ["x",           centerForce.x.strength( (d, i) => i%2 === 0 ? 0.01 : 0.5) ],
                        ["y",           d3.forceY()
                                            .y((d, i) => i%2 === 0 ? dims.height : dims.height * 0.5)
                                            .strength( (d, i) => i%2 === 0 ? 0.2 : 0.02) 
                        ],
                        ["radial",      radialForceCenter
                                            .radius(dims.height * 0.25)
                                            .strength(  (d, i) => i%2 === 0 ? 2 : 0) ]
                    ]

                case "cluster-type": 
                    schema = $data.schema.actionTypes.data
                    const actionTypeNodes = $data.schema.actionTypeNodes.data
                    return [
                        ["x",           d3.forceX().x(d => {
                                            const type = schema.filter(e => e.recordID === d["Action type"][0])[0].Type
                                            return ( $data.schema.actionTypeNodes.data.filter(d => d.Name === type)[0].xPos * 0.5 + 0.5) *  dims.width 
                                        })
                        ],
                        ["y",           d3.forceY().y(d => {
                                            const type = schema.filter(e => e.recordID === d["Action type"][0])[0].Type
                                            return  $data.schema.actionTypeNodes.data.filter(d => d.Name === type)[0].yPos  *  dims.height 
                                        })
                        ],
                        ["collide",     forceCollide ],
                        ["charge",      d3.forceManyBody().strength(10) ]
                    ]


                case "cluster-concrete-abstract": 
                    schema = $data.schema.actionTypes.data
                    return [
                        ["x",           d3.forceX().x(dims.width * 0.5)],
                        ["y",           d3.forceY().y(d => {
                                            const type = schema.filter(e => e.recordID === d["Action type"][0])[0].Type
                                            return  ($data.schema.actionTypeNodes.data.filter(d => d.Name === type)[0].yPos + 0.1) *  dims.height 
                                        })
                        ],
                        ["collide",     forceCollide ],
                        ["charge",      d3.forceManyBody().strength(10) ]
                    ]

                case "cluster-concrete-abstract-right": 
                    schema = $data.schema.actionTypes.data
                    return [
                        ["collide",     forceCollide ],
                        ["x",           d3.forceX().x(dims.width)],
                        ["y",           d3.forceY().y(d => {
                                            const type = schema.filter(e => e.recordID === d["Action type"][0])[0].Type
                                            return  $data.schema.actionTypeNodes.data.filter(d => d.Name === type)[0].yPos  *  dims.height 
                                        })
                        ],
                        ["charge",      d3.forceManyBody().strength(10) ]
                    ]

                case "cluster-scale":
                    schema = $data.schema.actionScale.data
                    return [
                        ["collide",     forceCollide],
                        ["x",           d3.forceX().x(dims.width * 0.75).strength(0.02) ],
                        ["y",           d3.forceY().y( d =>  (schema.filter(e => e.recordID === d["Scale"][0])[0].yPos) * dims.height).strength(0.1) ]

                    ]

                case "cluster-approach":
                    schema = $data.schema.adaptationApproaches.data
                    return [
                        ["collide",     forceCollide ],
                        ["x",           d3.forceX().x(d => {
                                            if ([...new Set(d['Linked approach theme'])].length === 1){
                                                return approachData.filter(e => e.name === [...new Set(d['Linked approach theme'])][0])[0].standard.x
                                            } else {
                                                return dims.width * 0.5
                                            }
                                        }).strength(0.1)
                        ],
                        ["y",           d3.forceY().y(d => {
                                            if ([...new Set(d['Linked approach theme'])].length === 1){
                                                return approachData.filter(e => e.name === [...new Set(d['Linked approach theme'])][0])[0].standard.y
                                            } else {
                                                return dims.height * 0.4
                                            }
                                        }).strength(0.05)
                        ]
                    ]

                case "cluster-approach-wide":
                    schema = $data.schema.adaptationApproaches.data
                    return [
                        ["collide",     forceCollide ],
                        ["x",           d3.forceX().x(d => {
                                            if ([...new Set(d['Linked approach theme'])].length === 1){
                                                return approachData.filter(e => e.name === [...new Set(d['Linked approach theme'])][0])[0].wide.x
                                            } else {
                                                return dims.width * 0.5
                                            }
                                        }).strength(0.15)
                        ],
                        ["y",           d3.forceY().y(d => {
                                            if ([...new Set(d['Linked approach theme'])].length === 1){
                                                return approachData.filter(e => e.name === [...new Set(d['Linked approach theme'])][0])[0].wide.y
                                            } else {
                                                return (approachData[0].wide.y + approachData[1].wide.y) * 0.5
                                            }
                                        }).strength(0.1)
                        ]
                    ]

                case "cluster-hazards":
                    schema = $data.schema.hazards.data
                    return [
                        ["collide",     forceCollide],
                        ["x",           d3.forceX().x( d => {
                                            const hazard = d["Hazard"].length === 1 ? schema.filter(e => e.recordID === d["Hazard"][0])[0]["Hazard"] : null,
                                                i = schema.map(d => d.Hazard).indexOf(hazard)
                                            return hazard ? dims.width * 0.5 + (dims.width * 0.3) * Math.cos(i * (2 * Math.PI / schema.length) - Math.PI / 4) : dims.width * 0.5
                                        })
                        ],
                        ["y",           d3.forceY().y( d => {
                                            const hazard = d["Hazard"].length === 1 ? schema.filter(e => e.recordID === d["Hazard"][0])[0]["Hazard"] : null,
                                                i = schema.map(d => d.Hazard).indexOf(hazard)
                                            return hazard ? dims.width * 0.5 + (dims.width * 0.3) * Math.sin(i * (2 * Math.PI / schema.length) - Math.PI / 4) : dims.width * 0.5
                                        })
                        ],

                        ["radial",      radialForceCenter
                                            .radius(d => {
                                                const hazard = d["Hazard"].length === 1 ? schema.filter(e => e.recordID === d["Hazard"][0])[0]["Hazard"] : null,
                                                    i = schema.map(d => d.Hazard).indexOf(hazard)
                                                return hazard ? dims.width * 0.225 : 0 
                                            })
                                            .strength(0.25)
                        ]
                    ]

                case "cluster-screening":
                    schema = $data.schema.adaptationScreens.data
                    return [
                        ["collide",     forceCollide ],
                        ["x",           d3.forceX().x(d => {
                                            let value
                                            const screen = {}
                                            for( const obj of schema){  screen[obj.Screen] = d[obj.fieldName]  }

                                            if( screen.Flexible === 'Yes' && screen.Robust === "Yes"  && screen.Viable === "Yes" ){
                                                return dims.width * 0.5
                                            } else if( screen.Flexible === 'Yes'  && screen.Viable === "Yes" ){
                                                return dims.width * 0.5
                                            } else if( screen.Flexible === 'Yes' && screen.Robust === "Yes" ){
                                                return dims.width * 0.675
                                            } else if( screen.Viable === 'Yes' &&  screen.Robust === "Yes" ){
                                                return dims.width * 0.325
                                            } else if( screen.Flexible === 'Yes'){
                                                return dims.width * 0.75
                                            } else if( screen.Viable === 'Yes'){
                                                return dims.width * 0.25
                                            } else if( screen.Robust === 'Yes'){
                                                return dims.width * 0.5
                                            } else {
                                                return dims.width * 0.5 
                                            } 
                                        }).strength(0.3)
                        ],
                        ["y",           d3.forceY().y(d => {
                                            let value
                                            const screen = {}
                                            for( const obj of schema){ screen[obj.Screen] = d[obj.fieldName] }

                                            if( screen.Flexible === 'Yes' && screen.Robust === "Yes"  && screen.Viable === "Yes" ){
                                                return dims.height * 0.45
                                            } else if( screen.Flexible === 'Yes'  && screen.Viable === "Yes" ){
                                                return dims.height * 0.65
                                            } else if( screen.Flexible === 'Yes' && screen.Robust === "Yes" ){
                                                return dims.height * 0.35
                                            } else if( screen.Viable === 'Yes' &&  screen.Robust === "Yes" ){
                                                return dims.height * 0.35
                                            } else if( screen.Flexible === 'Yes'){
                                                return dims.height * 0.6
                                            } else if( screen.Viable === 'Yes'){
                                                return dims.height * 0.6
                                            } else if( screen.Robust === 'Yes'){
                                                return dims.height * 0.15
                                            } else {
                                                return dims.height * 0.85
                                            } 
                                        }).strength(0.3)
                        ]
                    ]

                case "cluster-noregets-vs-others":
                    return [
                        ["collide",     forceCollide],
                        ["x",           centerForce.x],
                        ["y",           d3.forceY().y(d =>  {
                                            switch( d["Screening outcome"]  ){
                                                case "=> No regrets": 
                                                    return ratingData.noRegrets.y
                                                case "=> Discard":
                                                    return ratingData.discard.y
                                                default:
                                                    return ratingData.forRating.y 
                                                }
                                        })
                        ]
                    ]

                case "cluster-adaptation-criteria":
                    return [
                        ["collide",     forceCollide],
                        ["x",           d3.forceX().x(d => {
                                            const screen = {}
                                            for( const obj of schema){  screen[obj.Screen] = d[obj.fieldName]  }
                                            if( screen.Flexible === 'Yes' && screen.Robust === "Yes"  && screen.Viable === "Yes" ){
                                                return dims.width * 0.65
                                            } else if( screen.Flexible === 'Yes'  && screen.Viable === "Yes" ){
                                                return dims.width * 0.8
                                            } else if( screen.Flexible === 'Yes' && screen.Robust === "Yes" ){
                                                return dims.width * 0.65
                                            } else if( screen.Viable === 'Yes' &&  screen.Robust === "Yes" ){
                                                return dims.width * 0.5
                                            } else if( screen.Flexible === 'Yes'){
                                                return dims.width * 0.8
                                            } else if( screen.Viable === 'Yes'){
                                                return dims.width * 0.65
                                            } else if( screen.Robust === 'Yes'){
                                                return dims.width * 0.5
                                            } else {
                                                return dims.width * 0.65
                                            }
                                        }).strength(0.15)
                        ],
                        ["y",           d3.forceY().y(d => {
                                            const screen = {}
                                            for( const obj of schema){ screen[obj.Screen] = d[obj.fieldName] }

                                            if( screen.Flexible === 'Yes' && screen.Robust === "Yes"  && screen.Viable === "Yes" ){
                                                return ratingData.noRegrets.y
                                            } else if( screen.Flexible === 'Yes'  && screen.Viable === "Yes" ){
                                                return ratingData.twoCriteria.y
                                            } else if( screen.Flexible === 'Yes' && screen.Robust === "Yes" ){
                                                return ratingData.twoCriteria.y
                                            } else if( screen.Viable === 'Yes' &&  screen.Robust === "Yes" ){
                                                return ratingData.twoCriteria.y
                                            } else if( screen.Flexible === 'Yes'){
                                                return ratingData.oneCriteria.y
                                            } else if( screen.Viable === 'Yes'){
                                                return ratingData.oneCriteria.y
                                            } else if( screen.Robust === 'Yes'){
                                                return ratingData.oneCriteria.y
                                            } else {
                                                return ratingData.zeroCriteria.y
                                            }
                                        }).strength(0.5)
                        ]                
                    ]

                case "cluster-rating":
                    return [
                        ["collide",     forceCollide],
                        ["x",           d3.forceX().x(dims.width* 0.65).strength(0.15)],
                        ["y",           d3.forceY().y(d => {
                                            const screen = {}
                                            for( const obj of schema){ screen[obj.Screen] = d[obj.fieldName] }

                                            if( screen.Flexible === 'Yes' && screen.Robust === "Yes"  && screen.Viable === "Yes" ){
                                                return ratingData.noRegrets.y - (d["Average hazard rating"] / 5 * dims.height * 0.2 - dims.height * 0.1)
                                            } else if( screen.Flexible === 'No' || screen.Robust === "No"  || screen.Viable === "No" ){
                                                return ratingData.discard.y 
                                            } else if( screen.Flexible === 'Yes'  && screen.Viable === "Yes" ){
                                                return ratingData.twoCriteria.y - (d["Average hazard rating"] / 5 * dims.height * 0.2 - dims.height * 0.1)
                                            } else if( screen.Flexible === 'Yes' && screen.Robust === "Yes" ){
                                                return ratingData.twoCriteria.y - (d["Average hazard rating"] / 5 * dims.height * 0.2 - dims.height * 0.1)
                                            } else if( screen.Viable === 'Yes' &&  screen.Robust === "Yes" ){
                                                return ratingData.twoCriteria.y - (d["Average hazard rating"] / 5 * dims.height * 0.2 - dims.height * 0.1)
                                            } else if( screen.Flexible === 'Yes'){
                                                return ratingData.oneCriteria.y - (d["Average hazard rating"] / 5 * dims.height * 0.2 - dims.height * 0.1)
                                            } else if( screen.Viable === 'Yes'){
                                                return ratingData.oneCriteria.y - (d["Average hazard rating"] / 5 * dims.height * 0.2 - dims.height * 0.1)
                                            } else if( screen.Robust === 'Yes'){
                                                return ratingData.oneCriteria.y - (d["Average hazard rating"] / 5 * dims.height * 0.2 - dims.height * 0.1)
                                            } else {
                                                return ratingData.zeroCriteria.y
                                            }
                                        }).strength(0.25)
                        ]                
                    ]


                case "cluster-center":
                default:
                    return [
                        ["x",           centerForce.x],
                        ["y",           centerForce.y],
                        ["collide",     forceCollide]
                    ]
            }
        }())

</script>


<!-- HTML COMPONENT MARKUP-->
<section>
    <!-- Visualations: -->
    <div bind:this="{element}">
        <figure>
            <svg viewBox = {`0 0 ${dims.width} ${dims.height}`}>
                <Legend {dims} />

                <!-- Scene layers BELOW the nodes-->
                {#if $ui.state.actionVis.act === 'approach' }
                    <Approach  {dims}  {approachData} />
                {:else if $ui.state.actionVis.act === 'scale' }
                    <Scale {dims} {scaleData} />
                {:else if $ui.state.actionVis.act === 'type' }
                    <Type  {dims} {typeData}/> 
                {:else if $ui.state.actionVis.act === 'focusArea' }
                    <FocusArea {dims}  />
                {:else if $ui.state.actionVis.act === 'screening' }
                    <Screening {dims}  />
                {:else if $ui.state.actionVis.act === 'rating' }
                    <Rating {dims} {ratingData} />
                {/if}

                <!-- Node layer-->
                <Force {dims} {forces} {nodes} />

                <!-- Scene layers ABOVE  the nodes-->
                {#if $ui.state.actionVis.act === 'intro' }
                    <Intro {dims} />
                {:else if $ui.state.actionVis.act === 'hazards' }
                    <Hazard {dims}  />
                {/if}

            </svg>
        </figure>
    </div>
</section>



<!-- STYLING -->
<style>
    section{
        min-height:         100vh;
    }

    figure {
        margin:             0;
        display:            grid;
        justify-items:      center;
        align-items:        center;
        overflow:           visible;
    }
    svg {
        max-width:          100%;
        max-height:         calc(100vh - 4rem);
        overflow:           visible;
    }
</style>
