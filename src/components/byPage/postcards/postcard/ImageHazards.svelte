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
        grid-area:              img;
        display:                grid;
    }
    @media print {

    }
</style>