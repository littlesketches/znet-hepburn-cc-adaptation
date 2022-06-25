<!-- MODAL MESSAGE COMPONENT-->
<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade }       from 'svelte/transition';
	import { ui }         from '../../../data/stores.js'

	onMount( () => {
        document.getElementById('main-page').style.pointerEvents = 'none'
	});
	onDestroy( () => {
        document.getElementById('main-page').style.pointerEvents =  null
	});

    function handleClose(){
        $ui.infoModal.message = null
        console.log($ui)
    };

    function handleConfirm(){
        console.log('Confirm')
        $ui.infoModal.message = null
    };

</script>

<!-- COMPONENT HTML MARKUP-->
{#if $ui.infoModal.message}
<section in:fade="{{duration: 500}}" out:fade="{{duration: 200}}" >    
    <div id =  "modal-message-container">
        <div>
            <h1>{@html $ui.infoModal.message.header} </h1>
            {@html $ui.infoModal.message.content}        
        </div>

        {#if $ui.infoModal.message.buttons}
            <div class = 'button-container'>
            {#each $ui.infoModal.message.buttons as button}
                <button on:click={button.function === 'close' ? handleClose : handleConfirm}>{@html button.text} </button>
            {/each}
            </div>
        {/if}
    </div>
</section>
{/if}

<!-- STYLE-->
<style>
    section{
        z-index:            1000;
        position:           fixed;
        width:              100vw;
        height:             100vh;    
        top:                0;    
        left:               0;    
        background:         rgba(255, 255, 255, 0.7);
        display:            grid;
        overflow:           scroll;
    }

    #modal-message-container{
        margin:            auto 15vw;
        min-height:        50vh;
        padding:           3rem;
        border:          #fff 3px solid;
        border-radius:      1.5rem;
        background:         radial-gradient(circle, rgba(7, 46, 64, 0.95), rgba(0, 0, 0, 0.95) 80%);
        color:              #fff;
        display:            flex;
        flex-direction:     column;
        justify-content:    space-between;
    }
    h1{
        text-align:             center;
        margin-block-start:     0;
        margin-block-end:       0;
        font-size:              2.75rem;
    }
    .button-container{
        display:            flex;
        gap:                1.5rem;
    }
    button {
        background-color:    #bed8d6;
        color:             rgba(3, 66, 77, 1);
        border-color:       #fff;
        font-weight:        700;
    }
    button:hover{
        background-color:     #1debde;
        font-weight:        900;
    }
</style>