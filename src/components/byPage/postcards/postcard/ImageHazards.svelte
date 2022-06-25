<!-- IMAGE AND HAZARDS -->
<script>
    import Image    from   './Image.svelte'
    import Hazards  from   './Hazards.svelte'

    export let actionData 

    $: imgURL = actionData.image ? actionData.image[0].url : null
</script>


<!-- HTML COMPONENT MARKUP -->
<section class = "imgHazard">
    <Image {imgURL}/>
    <Hazards {actionData}/>
</section>


<!-- STYLES -->
<style>
    section{
        grid-area:              imgHaz;
        display:                grid;
        grid-template-columns:  1fr 0.5fr;
        grid-template-rows:     1fr;
        grid-template-areas:    'img hazards';
    }

    @media print {

    }
</style>