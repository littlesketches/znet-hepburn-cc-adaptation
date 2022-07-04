<script>
	import { fade } 	        from 'svelte/transition';
	import { onMount }          from 'svelte';
	import { ui, data }         from './data/stores.js'	 
    import { gsap, Quad, Quint, Expo} from 'gsap'
    import { Revealer }         from './utils/revealers.js'
	import Postcards 		    from './pages/Postcards.svelte'
	import Adaptation 		    from './pages/Adaptation.svelte'
	import Actions 		        from './pages/Actions.svelte'
	import Logo 		        from './components/shared/Logo.svelte'

	export let actionData;
	export let schemaData;
	export let climateData;
	export let queryParams = {};


    // Store loaded action data and schema
    $data.actions       = actionData["Adaptation actions"]
    $data.stakeholders  = actionData["Stakeholders"]
    $data.references    = actionData["References"]
    $data.schema        = schemaData
    $data.climate       = climateData

    // Calc and store data stats
    $data.stats.actions = {
        total:         $data.actions.length,
        noRegrets:     $data.actions.filter(d => d["Screening outcome"] === "=> No regrets").length ,
        byHazard:   (function(){
                        const obj = {}
                        for (const d of $data.schema.hazards.data){   
                            obj[d.Hazard] = !d["Linked adaptation actions"] ? 0 : d["Linked adaptation actions"].length     
                        }
                        return obj
                    }()),
        byHazardEvent: (function(){
                        const obj = {}
                        for (const d of $data.schema.hazardEvents.data){  
                            obj[d["Hazard event"]] = !d["Linked adaptation actions"] ? 0 : d["Linked adaptation actions"].length  
                        }
                        return obj
                    }()),

        byApproach:   (function(){
                        const obj = {}
                        for (const d of $data.schema.adaptationApproaches.data){   
                            obj[d["Adaptation and risk approach"]] = !d["Linked adaptation actions"] ?  0 : d["Linked adaptation actions"].length  
                        }
                        return obj
                    }()),
        byApproachType:   (function(){
                        const obj = { "Improve risk and resilience": 0 }
                        const approachThemes = [...new Set($data.schema.adaptationApproaches.data.map(d => d["Approach theme"]))]
                        for (const theme of approachThemes){   obj[theme] = 0  }
                        for (const d of $data.actions){

                            if([...new Set(d["Linked approach theme"])].length === 1) obj[d["Linked approach theme"][0]]++ 
                            if([...new Set(d["Linked approach theme"])].length === 2) obj["Improve risk and resilience"]++
                        }
                        return obj
                    }()),
        byType:   (function(){
                        const obj = {}
                        for (const d of $data.schema.actionTypes.data){   
                            obj[d["Type"]] = !d["Linked adaptation actions"] ?  0 : d["Linked adaptation actions"].length  
                        }
                        return obj
                    }()),
        byFocus:   (function(){
                        const obj = {}
                        for (const d of $data.schema.adaptationFocus.data){   
                            obj[d["Focus area"]] = !d["Linked adaptation actions"] ?  0 : d["Linked adaptation actions"].length  }

                        return obj
                    }()),
        byScale:   (function(){
                        const obj = {}
                        for (const d of $data.schema.actionScale.data){   
                            obj[d["Scale"]] = !d["Linked adaptation actions"] ?  0 : d["Linked adaptation actions"].length  
                        }
                        return obj
                    }())
    } 

    console.log('Data:', $data)

    // Homepage interactions (applied onMount)
    let showPage, showMenu, onEnterHoverFn
    onMount( async () => {
        // 1. Add element references
        $ui.el.app = document.getElementById('app-container')
        $ui.el.homeContainer = document.querySelector('.homepage')
        $ui.el.pageContainer = document.querySelector('.content--container')
        $ui.el.homeMenuItems = document.querySelectorAll('.hero__menu-item')
        $ui.el.homeTitle = document.querySelector('.hero__title')

        // 2. Typography: splitting le // remainingtters for animation 
        charming(  $ui.el.homeTitle);
        let titleLetters = [... $ui.el.homeTitle.querySelectorAll('span')];
        titleLetters.sort(() => Math.round(Math.random())-0.5);
        let letters      = titleLetters.filter(_ => Math.random() < .5);              // some random letters
        let otherletters = titleLetters.filter(el => letters.indexOf(el) < 0);        // remaining

        // 3. Revealer transitions and animations 
        const revealer = new Revealer($ui.el.homeContainer, {angle: 3});
        const transitions = [];
        const overlayElems = [...document.querySelectorAll('.overlay')];
        const transitionsTotal = overlayElems.length;

        overlayElems.forEach((overlay,i) => transitions.push(new Revealer(overlay, {angle: i % 2 === 0 ? -3 : 3})));

        // Interactions
        // b. Animate to content page
        showPage = function(page){
            window.scrollTo({ top: 0, behavior: 'smooth' })
            $ui.page = typeof(this) !== 'undefined' ? this.getAttribute('name') : page
            $ui.el.app.classList.add('overflow')

            $ui.el.homeContainer.classList.add('content--hidden');
            const ease = Expo.easeInOut;
            const duration = 1.2;

            $ui.animation.pageToggleTimeline = gsap.timeline()
                // Animate overlay page elements (optional)
                .to($ui.el.homeMenuItems, {
                    duration:       duration, 
                    ease:           ease,
                    y:              -150,
                    scaleY:         1.1,
                    opacity:        0,
                    stagger: {
                        amount:     0.04,
                    }
                }, 0)

                .to(otherletters, {
                    duration:       duration*0.8,
                    ease:           ease,
                    yPercent:       -100,
                    scaleX:         0.8,
                    scaleY:         1.5,
                    opacity:        0,
                    stagger: {
                        amount:     0.04,
                    }
                }, 0)

                // "Unreveal effect" (inner moves to one direction and reverse moves to the opposite one)
                .to(revealer.DOM.inner, {
                    duration,
                    ease: ease,
                    yPercent: -100
                }, 0)

                .to(revealer.DOM.reverse, {
                    duration,
                    ease: ease,
                    yPercent: 100
                }, 0)

                // Animate transitions
                let t = 0;
                for (let i = 0; i <= transitionsTotal-1; ++i) {
                    t = 0.2*i+0.2
                    $ui.animation.pageToggleTimeline 
                    .to(transitions[transitionsTotal-1-i].DOM.inner, {
                        duration:   duration,
                        ease:       ease,
                        yPercent: -100
                    }, t);
                }


        };

        // c. Animate back to home page menu
        showMenu = () => {           
            if($ui.state.postcards.view === 'postcard'){
                $ui.state.postcards.view = 'table'
            } else {
                $ui.el.app.classList.remove('overflow')   
                $ui.el.homeContainer.classList.remove('content--hidden');         // Pointer events related class
                $ui.animation.pageToggleTimeline.reverse();   
            }
        };

        // d. Hover animation on the hero "enter" element
        let enterHoverAnimationRunning = false;
        onEnterHoverFn = () => {
            if ( enterHoverAnimationRunning )  return false;
            enterHoverAnimationRunning = true;
            
            letters = titleLetters.filter(_ => Math.random() < .5);
            otherletters = titleLetters.filter(el => letters.indexOf(el) < 0);

            gsap.timeline({onComplete: () => enterHoverAnimationRunning = false})
                .to( letters, {
                    duration:   0.2,
                    ease:       Quad.easeIn,
                    yPercent:   100,
                    opacity:    0,
                    stagger:    {
                        each:   0.04
                    }
                })
                .to(letters, {
                    duration:   0.6,
                    ease:       Quint.easeOut,
                    yPercent:   0,
                    opacity:    1,
                    stagger:    {
                        each:   0.08,
                        delay:  0.2
                    }
                })
        };

        // Set page view if set via query param
        if(queryParams.get('page')) showPage(queryParams.get('page'))
        if(queryParams.get('postcards')) $ui.state.postcards.view = queryParams.get('postcards')

    });

</script>


<!-- HTML COMPONENT MAKUP-->

<main id = "app-container"> 
    <!-- "Page" section with basic control flow -->
    <section class = "chapters">
        {#if  $ui.page === 'adaptation'}        <Adaptation/>
        {:else if $ui.page === 'actions'}       <Actions/>
        {:else if $ui.page === 'postcards'}     <Postcards/>
        {/if}
    </section> 

    <button class="back" aria-label="Back to homepage" on:click={showMenu}></button>

    <!-- Homepage section -->
    <section class="homepage">
        <div class="content__move">
            <div class="content__reverse">
                <div class="hero__container">
                    <div class="frame">
                        <div class="frame__title-wrapper">
                            <h1 class="frame__title">Hepburn Shire &mdash;&mdash; guide to adaptation action </h1>
                            <div class="frame__links"> </div>
                        </div>
                        <div class = "frame__logo-wrapper">
                            <div class = 'logo-container'>
                                <Logo type={'width'}/>
                            </div>

                        </div>
                    </div>

                    <div class="hero__menu">
                        <div class="hero__menu-item">
                            <div class="hero__img" style="background-image: url(https://hepburnznet.org.au/wp-content/uploads/2020/06/Zero-Net-Emissions-About-2.jpg)"> </div>
                            <a class="hero__menu-label" name="adaptation" on:click={showPage} on:mouseenter="{onEnterHoverFn}">context + concepts</a>
                        </div>
                        <div class="hero__menu-item">
                            <div class="hero__img" style="background-image: url(https://hepburnznet.org.au/wp-content/uploads/2020/06/Zero-Net-Emissions-Hepburn-Wind-Farm-Home-3.jpg)"> </div>
                            <a class="hero__menu-label" name="actions"  on:click={showPage} on:mouseenter="{onEnterHoverFn}">action collection</a>
                        </div>
                        <div class="hero__menu-item">
                            <div class="hero__img" style="background-image: url(https://hepburnznet.org.au/wp-content/uploads/2020/08/Zero-Net-Emissions-Hepburn-Wind-Community-Hero.jpg)"> </div>
                            <a class="hero__menu-label" name="postcards" on:click={showPage} on:mouseenter="{onEnterHoverFn}">action postcards</a>
                        </div>
                    </div>

                    <h2 class="hero__title">
                        Climate change<br>
                        <span class = "highlight">adaptation</span><br>
                        in Hepburn</h2>
                </div>
            </div>
        </div>
    </section>

    <!-- Home - chapter page transitions -->
    <section class = "transitions">
        <div class="overlay overlay--1">
            <div class="overlay__inner overlay__inner--color-1"></div>
        </div>
        <div class="overlay overlay--2">
            <div class="overlay__inner overlay__inner--color-2"></div>
        </div>
        <div class="overlay overlay--3">
            <div class="overlay__inner overlay__inner--color-3"></div>
        </div>
    </section>
</main>



<!-- STYLES -->
<style>
    main {
        position:               relative;
        width:                  100%;
        height:                 100vh;
        display:                grid;
        align-items:            center;
        overflow:               hidden;
    }
    :global(main.overflow){
        overflow:               initial;
    }

    a {
        text-decoration: none;
        color: var(--color-link);
        outline: none;
    }

    a:hover,
    a:focus {
        color: var(--color-link-hover);
        outline: none;
    }
 

    /**** BACK TO HOMEPAGE BUTTON  ****/
    .back {
        position:       fixed;
        top:            1.25rem;
        left:           0.5rem;
        z-index:        10;
        background:     url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32px' height='22px' viewBox='0 0 32 22' %3E %3Cpath d='M1.301 10.658L11.615.344 14.39 3.12 8.616 8.893H30.73v3.923H8.617l5.773 5.774-2.775 2.774L1.301 11.05a.28.28 0 0 1 0-.392z' stroke='%23000000' stroke-width='1px' fill='none'/%3E %3C/svg%3E") no-repeat 50% 50%;
        margin:         0;
        border:         0;
        grid-area:      back;
        width:          32px;
        height:         22px;
        align-self:     start;
        cursor:         pointer;
    }

    .back:focus,
    .back:hover {
        outline: none;
        background: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32px' height='22px' viewBox='0 0 32 22' %3E %3Cpath d='M1.301 10.658L11.615.344 14.39 3.12 8.616 8.893H30.73v3.923H8.617l5.773 5.774-2.775 2.774L1.301 11.05a.28.28 0 0 1 0-.392z' stroke='%23000000' stroke-width='1px' fill='%23000000'/%3E %3C/svg%3E") no-repeat 50% 50%;
    }


    /**** CONTENT CONTAINERS: HOME OVERLAY AND PAGES  ****/
    :global(.content--hidden) {
        pointer-events:         none;
    }


    /**** HOMEPAGE - HERO SECTION ****/
    .homepage,
    .content__move{
        height:                 100vh;
        display:                grid;
        grid-template-columns:  100%;
        grid-template-rows:     100%; 
        align-items:            center;
        justify-self:           center;
    }
    .homepage {
        position:               fixed;
        height:                 100%;
        z-index:                10;
    }
    .content__move {
        will-change:            transform;
        overflow:               hidden;
        background:             var(--color-hero-bg);
    }
    .frame {
        padding:                3rem 5vw;
        text-align:             center;
        position:               relative;
        text-transform:         lowercase;
        color:                  var(--color-text-frame);
    }

    .frame__title {
        font-size: 1rem;
        margin: 0 0 1rem;
        font-weight: normal;
    }
    .frame__logo-wrapper{
        display:                flex;
        grid-area:              1 / 2 / 2 / 3;
        height:                 7.5vh;
        align-content:          center;
        justify-content:        flex-end;
    }

    .hero__container {
        position:               relative;
        display:                grid;
        grid-template-rows:     auto 40vh 20vh auto;
        grid-template-columns:  100%;
        align-items:            center;
        justify-items:          center;
        width:                  100vw;
        height:                 100vh;
    }
    .hero__menu{
        width:                  80vw;
        height:                 100%;
        max-height:             600px;
        grid-row:               2 / span 2;
        grid-column:            1;
        display:                grid;
        grid-template-columns:  repeat(3, 1fr);
        column-gap:             5vw;        
    }
    .hero__menu-label{
        cursor:                 pointer;
        position:               relative;
        color:                  var(--color-enter);
        font-size:              1.4rem;
        will-change:            transform;
    }
    .hero__menu-label::after {
        content:                '';
        position:               absolute;
        width:                  100%;
        height:                 1px;
        background:             currentColor;
        transform:              scale3d(0,1,1);
        opacity:                0;
        top:                    calc(100% + 0.15rem);
        left:                   0;
        transform-origin:       0% 50%;
        transition:             opacity 0.3s, transform 0.3s;
    }
    .hero__menu-label:hover::after {
        opacity: 1;
        transform: scale3d(1,1,1);
    }
    .hero__img {
        background-position:    50% 0%;
        background-size:        cover;
        height:                 100%;
        width:                  100%;
        max-height:             600px;
        transition:             all 300ms;
        filter:                 grayscale(1) brightness(0.5);
    }
    .hero__img:hover{
        filter:                 grayscale(0.2) brightness(1);
    }
    .hero__title {
        position:               relative;
        grid-row:               2 / span 2;
        grid-column:            1;
        font-family:            tenez, sans-serif;
        font-weight:            700;
        font-size:              6vw;
        line-height:            1;
        margin:                 0;
        color:                  var(--color-hero-title);
        cursor:                 default;
    }

    .highlight{
        color:                  var(--brightGreen);
    }

    /**** PAGE TRANSITION OVERLAYS ****/
    .overlay {
        position:               fixed;
        top:                    0;
        left:                   0;
        width:                  100%;
        height:                 100%;
        display:                flex;
        align-items:            center;
        justify-content:        center;
        pointer-events:         none;
    }
    .overlay__inner {
        width:                  200%;
        height:                 200%;
        position:               relative;
        flex:                   none;
        background:             var(--color-overlay);
        will-change:            transform;
    }

    .overlay__inner--color-1 {
        background: var(--color-overlay-1);
    }
    .overlay__inner--color-2 {
        background: var(--color-overlay-2);
    }
    .overlay__inner--color-3 {
        background: var(--color-overlay-3);
    }




    /**** MEDIA QUERIES ****/
    @media screen and (min-width: 53em) {
        .frame {
            position:               absolute;
            top:                    0;
            left:                   0;
            text-align:             left;
            display:                grid;
            align-content:          space-between;
            width:                  100%;
            max-width:              none;
            height:                 100vh;
            padding:                2rem 3rem;
            pointer-events:         none;
            grid-template-columns:  50% 50%;
            grid-template-rows:     auto auto auto;
            grid-template-areas: 
                'title demos'
                '... ...'
                '... ...';
        }
        .frame__title-wrapper {
            grid-area: title;
            display: flex;
        }
        .frame__title {
            margin: 0;
        }
        .frame__demos {
            margin: 0;
            grid-area: demos;
            justify-self: end;
        }
        .frame__links {
            grid-area: links;
            padding: 0;
            justify-self: end;
            margin: 0 0 0 2rem;
        }
    }




    /**************** PRINT STYLESHEET  ************/
    @media print {
        @page {
            size: A4 landscape;
        }
        main{
            padding: 0;
        }
        .back, 
        .homepage, 
        .transitions{
            display:    none;
        }
    }   


</style>