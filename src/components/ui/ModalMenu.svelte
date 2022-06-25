<!-- FULL SCREEN MODAL NAVIGATION MENU COMPONENT -->
<script>
	import { fade }     from 'svelte/transition';
	import { ui }       from '../../../data/stores.js'
	import { slugify }  from '../../../utils/helpers.js'

    function switchPage(){
        $ui.page = this.getAttribute('name').toLowerCase()
        $ui.state.showMenuModal = false
        $ui.state.showNav = $ui.page !== 'home' ? true : false
        
        console.log('Now showing ', $ui.page)
        console.log($ui.state)
    };

</script>

<!---- COMPONENT HTML MARKUP ---->
<section in:fade="{{duration: 500}}" out:fade="{{duration: 250}}" >
     <div class = 'title-container'>
        <h1>Navigate</h1>
        <div name = 'home' on:click={switchPage}>
            <div class = 'menu-title no-padding'>&larr; Home</div>
        </div>
    </div>    
    <div class = 'page-nav-container'>
        <ul class = 'unformatted'>
            {#each $ui.items.pages as page (slugify(page.name)) }
            <li name = {page.name} on:click={switchPage}>
                <div class = 'menu-title'>{page.name.toLowerCase() === $ui.page ? ":" : ''} {@html page.name} </div>
                <div class = 'menu-shortDesc'>{@html page.shortDesc} </div> 
            </li>
            {/each}
        </ul>
    </div>
</section>



<!---- CSS STYLING ---->
<style>
    section{
        position:           fixed;
        top:                0;
        left:               0;
        z-index:            200;
        display:            grid;
        grid-template-columns: 1fr 2fr;
        width:              100vw;
        height:             100vh;
        background:         radial-gradient(circle, rgba(7, 46, 64, 0.95), rgba(0, 0, 0, 0.95) 80%);
        color:            #fff;
    }
    h1{
        font-weight:        700;
        font-size:          6vw;
        margin-block-start: 0;
        margin-block-end:   0;
    }
    .title-container{
        grid-area:          1 / 1 / 2 / 2;
        padding:            7.5vh;
    }
    .page-nav-container{
        grid-area:          1 / 2 / 2 / 3;
        padding:            7.5vh 0;  
        margin:             1rem 7.5vh;  
    }
    .title-container div, 

    li{
        cursor:             pointer;
        padding:            2rem 0;
        /* display:            block;
        width:              100%; */
    }
    li:not(:first-child){
        border-top: 1px #fff solid;
    }
    li:first-child{
        padding-top: 0;
    }

    .title-container div:hover,
    li:hover{
        color:          var(--modalLight)
    }
    .title-container,
    .menu-title{
        text-transform: lowercase;
    }
    .menu-title{
        font-size:      2rem;
    }
    .menu-title.no-padding{
        padding:         0;
    }
    .menu-shortDesc{
        padding-top:    0.5rem;
        font-size:      1rem;
        font-weight:    100;
    }

</style>