<!-- IMAGE WITH EFFECTS -->
<script>
    export let imgURL 
</script>


<!-- HTML COMPONENT MARKUP -->
<section class ="img-wrapper">
    <!-- <div class='img-container watercolor-effect before' style = "background-image:url({imgURL})"></div> -->
    <!-- <div class='img-container pencil-effect'        style = "background-image:url( {imgURL}) , url({imgURL} )"></div>
    <div class='img-container watercolor-effect'        style = "background-image:url( {imgURL}) , url({imgURL} )"></div>
    <div class='img-container watercolor-effect after'  style = "background-image:url( {imgURL})"></div>
    <div class = "overlay"></div> -->
    <img src="{imgURL}">
</section>

<!-- STYLES -->
<style>

    /* Duotone */
    .img-wrapper {
        grid-area:           img;
        background-color:    var(--brightGreen);
        display:             flex;
        flex:                1 1 100%;
        overflow:            hidden;
        padding:             var(--spacing);
        position:            relative;
        height:              var(--postacard-img-height);
    }

    .img-wrapper img {
        filter:              grayscale(100%) contrast(1) blur(var(--blur));
        flex:                1 0 100%;
        max-width:           100%;
        mix-blend-mode:      var(--bg-blend);
        object-fit:          cover;
        opacity:             var(--opacity);
        position:            relative;
    }

    .img-wrapper::before {
        background-color:    var(--foreground);
        bottom:              0;
        content:             '';
        height:              100%;
        left:                0;
        mix-blend-mode:      var(--fg-blend);
        position:            absolute;
        right:               0;
        top:                 0;
        width:               100%;
        z-index:             1;
    }


    /* IMAGE EFFECTS */
    .pencil-effect {
        background-size: cover;
        /* background-blend-mode: difference;
        background-position: calc(50% - 1px) calc(50% - 1px), calc(50% + 1px) calc(50% + 1px);
        filter: brightness(2) invert(1) grayscale(1);
        box-shadow: inset 0 0 0 1px black; */
    }
    .watercolor-effect {
        background-size: cover;
        /* mix-blend-mode: multiply;
        background-position: calc(50% - 1px) calc(50% - 1px), calc(50% + 1px) calc(50% + 1px);
        filter:  sepia(0.1) brightness(1) blur(2px) contrast(2);
        opacity: 1 */
    }
    /* .watercolor-effect.before {
        background-size: cover;
        background-blend-mode: difference;
        background-position: calc(50% - 1px) calc(50% - 1px), calc(50% + 1px) calc(50% + 1px);
        filter: brightness(2) invert(1) grayscale(1);
        box-shadow: inset 0 0 0 1px black;
    }
    .watercolor-effect.after {
        background-size: cover;
        background-position: center;
        mix-blend-mode: multiply;
        background-blend-mode: multiply;
        filter: brightness(1.3) blur(2px) contrast(2) sepia(1);
    } */
    /* 
    .watercolor-effect:before, .watercolor-effect:after {
        display: block;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
    }
    .watercolor-effect:before {
        background-image: url(photo.jpg), url(photo.jpg);
        background-blend-mode: difference;
        background-position: calc(50% - 1px) calc(50% - 1px), calc(50% + 1px) calc(50% + 1px);
        filter: brightness(2) invert(1) grayscale(1);
        box-shadow: inset 0 0 0 1px black;
    }
    .watercolor-effect:after {
        background-image: url(photo.jpg);
        background-position: center;
        mix-blend-mode: multiply;
        filter: brightness(1.3) blur(2px) contrast(2);
    } */
</style>