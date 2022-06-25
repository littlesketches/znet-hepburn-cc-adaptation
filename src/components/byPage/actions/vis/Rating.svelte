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
        <g class = "no-regrets scale-group" style="transform:translate({50}px , {ratingData.noRegrets.y}px)">
            <path d = "M5, 0 h{markerWidth}" />
            <text x = {markerWidth + 10} >{@html ratingData.noRegrets.name}</text>
        </g>

        <g class = "for-rating scale-group"  class:hidden="{$ui.state.actionVis.scene !==0}" style="transform:translate({50}px , {ratingData.forRating.y}px)">
            <path d = "M5, 0 h{markerWidth}" />
            <text x = {markerWidth + 10}  >{@html ratingData.forRating.name}</text>
        </g>

        <g class:hidden="{$ui.state.actionVis.scene ===0}">
            <g class = "two-criteria scale-group" style="transform:translate({50}px , {ratingData.twoCriteria.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}  >{@html ratingData.twoCriteria.name}</text>
            </g>
            <g class = "one-criteria scale-group" style="transform:translate({50}px , {ratingData.oneCriteria.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}  >{@html ratingData.oneCriteria.name}</text>
            </g>
            <g class = "zero-criteria scale-group" style="transform:translate({50}px , {ratingData.zeroCriteria.y}px)">
                <path d = "M5, 0 h{markerWidth}" />
                <text x = {markerWidth + 10}  >{@html ratingData.zeroCriteria.name}</text>
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
        stroke-width:       5px;
        fill:               none;

    }
    .scale-group text{
        fill:                var(--midGrey);
        dominant-baseline:  middle;
        font-size:          40px;
        font-weight:        700;
    }

</style>