<!-- FULL SCREEN MODAL NAVIGATION MENU COMPONENT -->
<script>
	import { fade }             from 'svelte/transition';
	import { ui }               from '../../../data/stores.js'
	import { componentContent } from '../../../data/content.js'

</script>

<!---- COMPONENT HTML MARKUP ---->
<section id = "help-modal" in:fade="{{duration: 500}}" out:fade="{{duration: 250}}" >
     <div class = 'title-container'>
        <h2>{@html componentContent.info[$ui.page].header}</h2>
    </div>    
     <div class = 'content-container'>
        {@html componentContent.info[$ui.page].content}
    </div>
</section>



<!---- CSS STYLING ---->
<style>
    section{
        position:   fixed;
        top:        0;
        left:       0;
        z-index:    200;
        display:    grid;
        grid-template-columns: 1fr 2fr;
        width:      100vw;
        height:     100vh;
        background: rgba(0, 37, 54, 0.95);
        background: radial-gradient(circle, rgba(2, 93, 136, 0.95), rgba(0, 37, 54, 0.95) 80%);
        color:    #fff;
    }
    h2{
        font-weight:    700;
        font-size:      3.5vw;
    }
    .title-container{
        grid-area:     1 / 1 / 2 / 2;
        padding:       7.5vh 0 0 7.5vh ;
    }
    .content-container{
        grid-area:      1 / 2 / 2 / 3;
        padding:        7.5vh 0;  
        margin:         1rem 7.5vh;  
    }
</style>