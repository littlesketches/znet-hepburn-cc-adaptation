<script>
	import { fade }         from 'svelte/transition';
    import * as d3          from 'd3'
    import { ui, data }     from "../../../../data/stores.js";
    import { slugify }      from "../../../../utils/helpers.js"
    import { schema }       from '../../../../data/schema.js';
    import { circleClockwise, circleAntiClockwise }      from "../../../../utils/icons.js"

    export let dims     = {}                // SVG dimensions
    export let ratingData = {}
    const markerWidth = 25
</script>


<!-- HTML COMPONENT MARKUP-->
<g id ="rating-vis-container" in:fade>

    <g class = "rating-scale-group">
        <g class:hidden="{$ui.state.actionVis.scene !==0}">
            <g class = "no-regrets scale-group" style="transform:translate({50}px , {ratingData.noRegrets.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10} y=15 >{@html ratingData.noRegrets.name}</text>
            </g>
            <g class = "for-rating scale-group" style="transform:translate({50}px , {ratingData.forRating.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}  y=15 >{@html ratingData.forRating.name}</text>
            </g>
            <g class = "discard scale-group" style="transform:translate({50}px , {ratingData.discard.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}  y=15 >{@html ratingData.discard.name}</text>
            </g>
        </g>

        <g class:hidden="{$ui.state.actionVis.scene ===0}">
            <g class = "no-regrets scale-group" style="transform:translate({50}px , {ratingData.noRegrets.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}  y=15 >{@html ratingData.noRegrets.name}</text>
            </g>
            <g class = "two-criteria scale-group" style="transform:translate({50}px , {ratingData.twoCriteria.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}   y=15 >{@html ratingData.twoCriteria.name}</text>
            </g>
            <g class = "one-criteria scale-group" style="transform:translate({50}px , {ratingData.oneCriteria.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}   y=15 >{@html ratingData.oneCriteria.name}</text>
            </g>
            <g class = "zero-criteria scale-group" style="transform:translate({50}px , {ratingData.zeroCriteria.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}  y=15  >{@html ratingData.zeroCriteria.name}</text>
            </g>
            <g class = "exclude scale-group" style="transform:translate({50}px , {ratingData.discard.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}   y=15 >{@html ratingData.discard.name}</text>
            </g>
        </g>
    </g>
</g>



<!-- STYLING -->
<style>
    .hidden{
        opacity:            0
    }
    .scale-group{
        transition:         all 800ms;
    }
    .scale-group path{
        stroke:             var(--midGrey);
        stroke-width:       2px;
        fill:               none;
    }
    .scale-group text{
        font-size:          40px;
        font-weight:        700;
    }
    .no-regrets text{
        fill: var(--noRegrets)
    }
    .for-rating text{
        fill: var(--forRating)
    }
    .one-criteria text{
        fill: var(--oneCriteria)
    }
    .two-criteria text{
        fill: var(--twoCriteria)
    }
    .exclude text,
    .discard text{
        fill: var(--discardCriteria)
    }
    .zero-criteria text{
        fill: var(--zeroCriteria)
    }
</style>