<!--  NAVIGATION COMPONENT: NAV BUTTON, MODAL MENU and HELO MODAL-->
<script>
	import ModalMenu      from './ModalMenu.svelte';
	import ModalHelp      from './ModalHelp.svelte';
	import { fade }       from 'svelte/transition';
	import { ui }         from '../../../data/stores.js'

	/* Menu modal functions */
	function toggleMenu() {
        $ui.state.showMenuModal = !$ui.state.showMenuModal
	};

    /* Overlay page modal */
	function closeModalPage() {
        $ui.byPage.discover.overlay = false
        $ui.byPage.connect.overlay = false
        $ui.byPage.share.overlay = false
        $ui.byPage.manage.overlay = false


        // Hack to hide components that dont' destroy properly when changing page state the store      
        if(document.getElementById('new-project')) document.getElementById('new-project').style.display = 'none'
        if(document.getElementById('project-overlay')) document.getElementById('project-overlay').style.display = 'none'
        if(document.getElementById('stakeholder-overlay')) document.getElementById('stakeholder-overlay').style.display = 'none'

	};

    // Help options and modal
    function showHelpOption(){ this.classList.add('inactive') };
    function hideHelpOption(){ this.classList.remove('inactive') };

    // Help modal page
    function openHelpModal(){
        $ui.state.showHelpModal = true
        $ui.state.showNav = true
        document.getElementById('helpButton').style.opacity = "0"
    };

    function closeHelpModal(){
        $ui.state.showHelpModal = false
        if($ui.page === 'home') $ui.state.showNav = true
        document.getElementById('helpButton').style.opacity = null
    };

</script>


<!---- COMPONENT MARKUP HTML ---->
<!-- 1. Navigation menu -->
<nav transition:fade>   
    <!-- Help button : top left-->
    <div class = "helpButton-container" >
        <div id="helpButton" on:mouseover={showHelpOption} on:focus={showHelpOption} on:click={openHelpModal}>
            <svg id = "help-icon" class ="help-icon nav-icon" width = "45%" viewbox = "0 0 50 50">
                <circle cx = 25 cy = 25 r = 22.5></circle>
                <text x = 25 y = 40>i</text>
            </svg>
        </div>
    </div>

    <!-- Menu nav button : top right-->
    {#if $ui.state.showNav}
    <div class = "menuButton-container">
        <!-- A. Menu and help modal -->
        {#if !$ui.byPage.discover.overlay && !$ui.byPage.connect.overlay && !$ui.byPage.share.overlay  && !$ui.byPage.manage.overlay }            
            <!-- 1. Toggle the modal menu-->
            {#if !$ui.state.showHelpModal}
                <svg id = "menu-icon" class ="nav-icon" width = "100%" viewbox = "0 0 50 50" on:click={toggleMenu} class:invert={$ui.state.showMenuModal}>
                    <circle cx = 25 cy = 25 r = 22.5></circle>         
                    {#if !$ui.state.showMenuModal}
                    <text x = 25 y = 30>Menu</text>
                    {:else}
                    <text x = 25 y = 30>Close</text>
                    {/if}
                </svg>
            <!-- 2. Close the help modal-->
            {:else}
                <svg id = "menu-icon" class ="nav-icon invert" width = "100%" viewbox = "0 0 50 50" on:click={closeHelpModal}>
                    <circle cx = 25 cy = 25 r = 22.5></circle>         
                    <text x = 25 y = 30>Close</text>
                </svg>        
            {/if}

        <!-- B. Close any page overlay-->
        {:else}
        <svg id = "menu-icon" class ="nav-icon" width = "100%" viewbox = "0 0 50 50" on:click={closeModalPage}>
            <circle cx = 25 cy = 25 r = 22.5></circle>         
            <text x = 25 y = 30>Close</text>
        </svg>
        {/if}
    </div>
    {/if}
</nav>

<!-- 2. Modal menu or help -->
{#if $ui.state.showMenuModal}
<ModalMenu/>
{/if}

{#if $ui.state.showHelpModal}
<ModalHelp/>
{/if}


<!---- CSS STYLING ---->
<style>
    /* "BORDER" UI navigation options */
    nav{
        display:                grid;
        grid-template-columns:  7.5vh 1fr 7.5vh;
        grid-template-rows:     7.5vh 1fr 7.5vh;
        position:               fixed;
        top:                    0;
        left:                   0;
        width:                  100vw;
        height:                 100vh;
        z-index:                500;
        pointer-events:         none;
    }
    .menuButton-container {
        grid-area:              1 / 3 / 2 / 4;
        padding:                8px;
    }
    .helpButton-container {
        grid-area:              1 / 1 / 2 / 1;
        pointer-events:         all;
    }
    /* Navigation icon styling */
    svg#menu-icon:hover{
        text-decoration:        underline;
    }
    .nav-icon {
        cursor:                 pointer;
        pointer-events:         bounding-box;
    }
    .nav-icon circle{
        fill:                   none;
        stroke:                 var(--darkGrey);
        stroke-width:           1px;
    }
    .nav-icon text{
        font-family:            'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        fill:                   var(--darkGrey);
        font-size:              13.5px;
        text-anchor:            middle;
        text-transform:         uppercase;
    }
    .nav-icon.invert circle{
        stroke:                 #fff;
    }
    .nav-icon.invert text{
        fill:                   #fff;
    }

    /* Help button */
     #helpButton{
        position:           relative;
        top:                0;
        left:               0;
        opacity:            0;
        height:             7.5vw;
        width:              7.5vw; 
        clip-path:          polygon(0 0, 100% 0, 0 100%);
        background-color:   rgb(226, 255, 36);
        pointer-events:     none;
        transition:         200ms all;
        transform:          translate(-1vw, -1vw)
    }
    #helpButton.active{
        cursor:             pointer;
        pointer-events:     all;
    }
    #helpButton:hover{
        opacity:            1;
        transform:          translate(0, 0)
    }
    #helpButton svg{
        padding:            8px 2.5vw 2.5vw 8px;
        fill:               var(--darkGrey);
    }

    .help-icon{
        /* pointer-events: none; */
    }
    .help-icon text{
        font-family:            'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        fill:                   var(--darkGrey);
        font-size:              40px;
        font-weight:            100;
        text-anchor:            middle;
        text-transform:         lowercase;
        text-decoration:        none;
    }
</style>