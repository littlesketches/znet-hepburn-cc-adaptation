<!-- COMPONENT FOR THE ADAPTATION "ACTIONS" SECTION -->
<script>
	import { onMount }     from 'svelte';
    import { gsap, ScrollTrigger } from "gsap/all";
	import { ui, data }     from '../data/stores.js'
    import Logo             from '../components/shared/Logo.svelte'
    import ActionVis        from '../components/byPage/actions/ActionVis.svelte';
    import Table            from '../components/byPage/actions/Table.svelte';
	import Switch 		    from '../components/shared/Switch.svelte'


    const scrollTo = function(){
        document.querySelector(`div[act=${this.getAttribute('actName')}]`)
            .scrollIntoView({behavior: 'smooth'})
    };

    const updateScene = (el) =>{
        // Update the scene number and node forces
        if(el.getAttribute('scene'))        $ui.state.actionVis.scene = +el.getAttribute('scene') 
        if(el.getAttribute('force'))        $ui.state.actionVis.nodes.force = el.getAttribute('force')
        // Change node marker state
        if(el.getAttribute('nodeBase'))     $ui.state.actionVis.nodes.base   = el.getAttribute('nodeBase')   === "true" ? true : false
        if(el.getAttribute('nodeArcs'))     $ui.state.actionVis.nodes.arcs   = el.getAttribute('nodeArcs')   === "true" ? true : false
        if(el.getAttribute('nodeShapes'))   $ui.state.actionVis.nodes.shapes = el.getAttribute('nodeShapes') === "true" ? true : false
        if(el.getAttribute('nodeSymbol'))   $ui.state.actionVis.nodes.symbols = el.getAttribute('nodeSymbol') === "true" ? true : false
        if(el.getAttribute('nodeShadow'))   $ui.state.actionVis.nodes.shadow = el.getAttribute('nodeShadow') === "true" ? true : false
    }


    const updateAct = (el) => {
        // Update the act
        if(el.getAttribute('act'))          $ui.state.actionVis.act = el.getAttribute('act') 
        // Change the legend view
        if(el.getAttribute('legendHazards'))   $ui.state.actionVis.legend.hazards  = el.getAttribute('legendHazards')  === "false" ? false : +el.getAttribute('legendHazards')
        if(el.getAttribute('legendApproach'))  $ui.state.actionVis.legend.approach = el.getAttribute('legendApproach') === "false" ? false : +el.getAttribute('legendApproach')
        if(el.getAttribute('legendScale'))     $ui.state.actionVis.legend.scale    = el.getAttribute('legendScale')    === "false" ? false : +el.getAttribute('legendScale')

        // Reset focus area dorce
        $ui.state.actionVis.nodes.focusArea = null
        flowDiagramState = null
    }

    // Add scroll trigger functionlity after DOM is mounted    
    onMount( () => {
        const debug = {
            actPin:            false,
            actAppear:         false,
            scene:             false
        }

        // ScrollTrigger to pin page content wrapper and page wrappers (no tweens)
        gsap.registerPlugin(ScrollTrigger); 

        // 1. "Acts": pin each narrative "page" (with associated background visual):  
        const actData = document.querySelectorAll('.act-narrative')
        actData.forEach( (el, i) => {
            // Trigger to pin narrative section to top of page while scenes enter/play
            gsap.to(el, {       
                scrollTrigger: {
                    trigger:            el,
                    start:              "top 5%",   
                    end:                "bottom 5%",    
                    pin:                true,
                    scrub:              true,
                    markers:            debug.actPin
                }
            })
            // Trigger to call onStart/onReverseComplete to update state when act appears on screen (bottom)
            gsap.to(el, {       
                scrollTrigger: {
                    trigger:            el,
                    start:              "top bottom",   
                    end:                 "top bottom",    
                    scrub:              true,
                    markers:            debug.actAppear
                },
                onStart:               () => updateAct(el),
                onReverseComplete:     () => {
                    const prevEl = i === 0 ? actData[0] : actData[i-1] 
                    updateAct(prevEl)

                    const lastSceneEl = prevEl.lastChild
                    updateScene(lastSceneEl)
                }
            })
        })

        // 2. "Scenes": are parts of "Acts" and are named bysequential integer
        for (const el of actData){
            const sections = Array.from(el.children)

            sections.forEach( (el, i) => {
                gsap.fromTo(el, 
                    {
                        opacity:                0,
                        x:                      i == 0 ? 0 : 0, 
                        y:                      0,
                    },
                    {       
                        scrollTrigger: {
                            trigger:            el,
                            start:              i == 0 ? "top 90%" : "top 50%" ,   
                            end:                i == 0 ? "+=80%"   : "+=25%" ,    
                            scrub:              true,
                            markers:            debug.scene
                        },
                        opacity:                1,
                        x:                      0,
                        y:                      0,
                        onStart:               () => updateScene(el),
                        onReverseComplete:     () => updateScene(i === 0 ? sections[0] : sections[i-1])  
                    }
                )
            })
        }
    })


    // Seutp the flow diagram switch function
    let flowDiagramState = null;
    const flowDiagramOptions = ['Abstract to concrete', 'Action type flow']
    $: {
        if($ui.state.actionVis.act === 'type' && flowDiagramState === flowDiagramOptions[0]){
            $ui.state.actionVis.nodes.force = 'cluster-concrete-abstract'
            $ui.state.actionVis.scene = 3 
        } else if($ui.state.actionVis.act === 'type' && flowDiagramState === flowDiagramOptions[1]){
            $ui.state.actionVis.nodes.force = 'cluster-type'
            $ui.state.actionVis.scene = 2 
        }
    } 


</script>

<!-- HTML COMPONENT MARKUP -->
<!-- Hero page section-->
<div class = 'hero-wrapper'>
    <div class="hero-content">
        <!-- Hero page section -->
        <div class="hero-logo">
            <div class="hero-logo__wrapper"><Logo/></div>
        </div>
        <h1 class="hero-content__title">
            <span class = "title--mute">understanding</span><br/>
            adaptation<br/>
            <span class = "title--highlight">actions</span>
        </h1>
        <div class="hero-content__text">
            <p>There's a lot to consider when thinking about the actions we need prepare and adapt our community for the impacts of climate change. In this section we'll take a closer look at key actions that that area already happening in and around Hepburn, through a series of different adaptation lenses. Our aim is to get a comprehensive idea of how we're responding, and what else we might need to do.
            </p>
        </div>
        <div class ="select">
            <ul>
                <li class = "select__item" on:click={scrollTo} actName = "intro">Introduction</li>
                <li class = "select__item" on:click={scrollTo} actName = "hazards">Hazards</li>
                <li class = "select__item" on:click={scrollTo} actName = "approach">Appraoch</li>
                <li class = "select__item" on:click={scrollTo} actName = "scale">Scale</li>
                <li class = "select__item" on:click={scrollTo} actName = "other">Other</li>
                <li class = "select__item" on:click={scrollTo} actName = "type">Type</li>
                <li class = "select__item" on:click={scrollTo} actName = "focusArea">Focus area</li>
                <li class = "select__item" on:click={scrollTo} actName = "screening">Adaptation criteria</li>
                <li class = "select__item" on:click={scrollTo} actName = "rating">Ranking</li>
                <li class = "select__item" on:click={scrollTo} actName = "outro">Outro</li>
            </ul>
        </div>
    </div>
</div>

<!-- Page content section-->
<div class = "content-wrapper">
    <!-- Narrative pane content-->
    <div class = "narrative-wrapper">
        <div act = "intro" class = "act-narrative">
            <div scene = 0 force='cluster-center'>
                <hr>
                <h2>Making sense of adaptation actions</h2>
                <p>We've identified {@html $data.stats.actions.total} actions (so far) that are helping Hepburn adapt to climate change. Let's start by representing each action as a little <span class = "action-dot">dot</span> on the screen.</p> 
            </div>
            <div scene = 1 force="ring-outer">
                <p>This seems nice an orderly: {@html $data.stats.actions.total} actions <em>seems</em> reasonable...or is it!? Adaptation actions vary wildy in size, scope and focus: many of actions here have adaptation benefits, but aren't specifically being done to manage climate risks and impacts.</p>
            </div>
            <div scene = 2 act="intro" force = "arrow-down">
                <p>So how can we see how these actions match up to <em>our</em> adaptation needs? How can we tell if what we're doing is effective? Are we doing enough? And are we doing enough in ther right places?
                </p>
                <p>This guide will walk you through some key ways to look at Hepburn's adaptation actions. It won't definitively answer these questions - becuase 'adaptation' and our 'adaptive capacity' aren't quantifiable - but it will hopefully equip you with an understanding of what's being done, where there might be gaps, and potentially where you might be able to help our community adapt to climate change.
                </p>
            </div>
        </div>

        <div act = "hazards" class = "act-narrative" legendHazards = "false" >
            <div act="hazards" scene = 0 force="cluster-center" >
                <hr>
                <h2>Actions vs climate hazards</h2>
                <p>There are <strong>four climate hazards</strong> facing Hepburn, each of which increases the likelihood of climate events that pose risks to the community.
                </p>
            </div>
            <div scene = 1 force="cluster-hazard" nodeBase="true" nodeArcs = "false" nodeShapes = "false" nodeShadow = "false">
                <p>We want to see how our actions address each hazard. To begin with, we can count how many actions address each hazard. We can also try to position each action near the hazards they are trying to address. But what we quickly notice is that there are <strong>many actions that address multiple hazards</strong>.
                </p>
            </div>
            <div act="hazards" scene = 2 force="cluster-center" nodeBase="false" nodeArcs = "true" nodeShapes = "false" nodeShadow = "false">
                <p>So how about we re-design our dots by putting some matching <span class="text-arcs">coloured arcs</span> on our actions. Its a bit busy, but now we some idea about which actions address which hazards!
                </p>
            </div>
        </div>

        <div act = "approach" class = "act-narrative" legendHazards = 0.5 legendApproach = "false">
            <div scene = 0 force = "diagonal-up">
                <hr>
                <h2>Adaptive capacity and approaches</h2>
                <p>There are two broad approaches when in comes improving adaptive capacity:</p>
                <ul>
                    <li> We can <strong>reduce risk</strong>; and</li>
                    <li> We can <strong>increase resilience</strong></li>
                </ul>
                <p>Each of these broad approaches contains a handful of more specific types or approaches, and our actions can take multiple approaches. What we want is good spread of actions so that we have a diversified approach to building of capacity to adapt.
                </p>
            </div>
            <div scene = 1 force="cluster-approach" nodeBase="false" nodeArcs = "true" nodeShapes = "false" nodeShadow = "false" >
                <p> We can try to position actions over these broad approaches, but we again run into the problem with actions that both reduce risk and increase resilience. There might also be somes actions that don't really fit either approach: usually because they're quite 'indirect' or 'high-level'.  
                </p>
            </div>
            <div act="approach" scene=2  force = "cluster-approach-wide"  nodeBase="false" nodeArcs = "true" nodeShapes = "true" nodeShadow = "false" >
                <p>So to help us better identify the adaptation approach of each action, we're going to put little triangle symbols inside each action. 
                </p>
            </div>

        </div>

        <div act = "scale" class = "act-narrative"  legendHazards = 0.35  legendApproach = 0.65>
            <div scene = 0 force="cluster-scale" nodeBase="false" nodeArcs = "true" nodeShapes = "true" nodeShadow = "false" nodeSymbol = "false">
                <hr>
                <h2>Actions scale</h2>
                <p>The next lens we'll take to look at our actions through is their <strong>scale</strong>. This is a classification of whether an action is specific to the <em>local</em> Hepburn area, or if the action operates at broader scale of say, the <em>regional</em> level (e.g. Grampians), the Victorian <em>state</em> level, or at a <em>national</em> level.
                </p>
            </div>
            <div scene = 1 force="cluster-scale" nodeBase="false" nodeArcs = "true" nodeShapes = "true" nodeShadow = "true" nodeSymbol = "false" >
                <p>How might we visualise scale? The obvious indicator for scale is size &mdash; we could adjust the overall size of each action. However <strong>we're interested in how these actions affect Hepburn</strong>, so it doesn't make much sense to visually weight a national action over a local one. So what we'll do is add a sublte, shadow-y ring around the actions that are beyond local scale and move on!
                </p>
            </div>
        </div>


        <div act = "other" class = "act-narrative"  legendHazards = 0.25  legendApproach = 0.5 legendScale = 0.75>
            <div scene = 0 force="cluster-center">
                <hr>
                <h2>Healing country </h2>
                <p>Placeholder section for and other action traits that might represented as a mark/symbol on the action. At this point the action 'dots' are becoming quite intricate and so only a simple mark at the center is proposed. This example is a simple small dot.
                </p>
            </div>
            <div scene = 1 force="cluster-center" nodeBase="false" nodeArcs = "true" nodeShapes = "true" nodeShadow = "true" nodeSymbol = "true" >
                <p>Healing county is a candidate and may end up being the only one that uses this, in which case this section would be re-shaped to be about how to indicate actions that have a healing county component (and/or traditioanl owners consultation??). If included here, a legend entry would be created. Note that if other classifiers are included (with a different symbol)
                </p>
            </div>
        </div>

        <div act = "type" class = "act-narrative" >
            <div scene = 0 force = "right-line" >
                <hr>
                <h2>Types of actions</h2>
            </div>
            <div scene = 1  force = "cluster-concrete-abstract-right">
                <p>Now that we can see some of the key characteristics of our actions, we can start to think about more sophisticated classifcations that give us insight into how well coordinated our adaptation are.</p>
                <p>This diagram shows how actions of different <strong>types</strong> might be connected, and how the knowledge gained from more <em>abstract</em> actions, helps to inform more <em>concrete</em> responses to climate risk.</p>
            </div>
            <div scene = 2 force="cluster-type"> 
                <p>We could see how actions are distributed by type by positioning them on the diagram. This view helps us see what types of actions are taking place, and where more attention might be required.</p>

                <p>We can also used these classifications to reveal how actions are distributed on a more focused action type spectrum between <em>more abstract to more concrete</em> using this switch below.</p> 

                <Switch bind:value={flowDiagramState} options={flowDiagramOptions} />
            </div>
        </div>

        <div act = "focusArea" class = "act-narrative" >
            <div scene = 0 force="ring-focusArea" >
                <hr>
                <h2>Actions in focus areas</h2>
                <p><strong>Five focus areas</strong> have been identified for the Hepburn Shire from a series of studies and research of climate risks in the broader Grampians region. These  areas are another useful lens for assessing how well distributed our adapatation actions are across <strong> areas that matter to Hepburn</strong>.</p>
                <p>Now of course, many actions address multiple focus areas - so we'll another way to show which actions gravitate to a given focus area. To do this, <strong>you can tap on any of the focus area names to see which actions relate to that area.</strong></p>
            </div>
        </div>

        <div act = "screening" class = "act-narrative">
            <div scene = 0  force="cluster-screening">
                <hr>
                <h2>Key adaptation criteria</h2>
            </div>
            <div scene = 1 force="cluster-screening">
                <p>We've looked at different ways to classify and cluster actions that hopefully provides some insight into how they collectivley respond to our adapatation challenge. Now we're going to look at ways of evaluating and prioritising these actions.
                </p>
                <p>We start by answering three simple questions of each action that are aligned to key <strong>adapatation criteria</strong>. These are questions that can be answered with a(n emapthic) "yes", or a "no" or "unsure". And they simply consider whether an action is <strong>robust</strong>, <strong>flexible</strong> and/or <strong>viable</strong>.</p>
            </div>
            <div scene = 2 force="cluster-screening">
                <p>Actions that meet all criteria are automatically considered as <strong>no regrets actions</strong>: there's is no reason to not do these actions, so we should implement and support them!</p>
                <p>The actions that aren't immediately screened (by these questions) to being no regrets, are the one's that we look at more closely... </p>
            </div>    
        </div>

        <div act = "rating" class = "act-narrative">
            <div scene = 0 force="cluster-noregets-vs-others">
                <hr>
                <h2>rating actions for climate change adaptation</h2>
                <p>We've separated our actions into two groups: those that are no regrets actions, and those that need a bit more consideration.
                </p>
            </div>
            <div scene = 1 force="cluster-adaptation-criteria">
                <p>We can use our adaptation screening criteria further by creating tiers for those actions that met two, one or none of the criteria. Again, this is a imperfect way of stratifying actions but is relateively logical and robust: actions that meeti more key adapation criteria tend to float to the top.
                </p>
            </div>
            <div scene = 2 force="cluster-rating">
                <p>The last way we'll evaluate these action is by rating how effective they are at respondin to the climate hazards. We know that every action repond to at least one climate hazard, and so we've rated each action on the (expected) efficacy of their response to each cliamte hazard (and its associated climate events). This is a subjective 1 to 5 rating that accounts for the size and scope of the action, and so does take into consider how ambitious the action is, and how much it might achive. So to reiterate, these are subjective ratings that help us differentiate actions <em>within thier tier.</em>    
                </p>
                <p>***To add: screening for uintended consequnces and the role co-benefits in deciding if an action should be done. This might also link to other paradignms and movements (e.g. circular economy, doughnut economics, environmental economic, resilience etc.)
                </p>
            </div>
        </div>

        <div act = "outro" class = "act-narrative">
            <div scene = 0 force="ring-mid">
                <hr>
                <h2>What next?</h2>
                <p>Placeholder outro section that would reinforce to the audience that the response to climate change adapation needs to be taken as a collection of actions, working together; and the importance of always revisiting this portfolio perspective of the actions, against the climate risks. This should raise questions about the usefulness of being too dogmatic around prioritisation; and might be.</p>
                <p>
                Coordination is critical however understanding this perspective should hopefully help everyone understand how they can support, contribuute to, and develop new actions that help the community adapt to climate change. Making link to taking a deeper dive into the actions would be good (to to logically lead into the postcard section)
                </p>
            </div>

        </div>
    </div>

    <!-- Visualsation pane content: the 'stage'-->
    <div class = "vis-wrapper">
        <div class = "action-vis-wrapper">
             <ActionVis/>
        </div>
    </div>
</div>



<!-- STYLES -->
<style>
    /** PAGE / VIS STORY SECTION **/
    .content-wrapper{
        display:                grid;
        column-gap:             2rem;
        grid-template-columns:  calc(33% - 3rem) calc(67% - 3rem);
        border-bottom:          5px #000 solid;
    }
    .narrative-wrapper{
        grid-column:            1;
        height:                 fit-content;
    }
    .vis-wrapper{
        grid-column:            2;
    }
    .action-vis-wrapper{
        position:               -webkit-sticky;
        position:               sticky;
        top:                    5%;
    }
    .act-narrative{
        min-height:             100vh;
        padding-bottom:         10vh;
    }
    hr{
        border-bottom:          5px #000 solid;
        margin-block-start:     0;
        margin-block-end:       0;
        border-style:           solid;
    }
    h2 {
        margin-top:             3rem;
        margin-bottom:          3rem;
        font-size:              2.5rem;
        text-transform:         lowercase;
    }   

    /** HERO SECTION **/
    .hero-content {
        padding:                2rem;
        align-items:            center;
        justify-self:           center;
        display:                grid;
        grid-template-columns:  50% 50%;
        grid-template-rows:     calc(25vh - 1rem) calc(25vh - 1rem) calc(50vh - 2rem);
        grid-template-areas: 	
            'back logo'
            'title title'
            'text select'
    }

    .hero-content__title {
        grid-area:              title;
        font-weight:            700;
        font-size:              2.5rem;
        line-height:            1;
        position:               relative;
        margin:                 0 0 1rem 0;
        padding:                0 0 1rem 0;

        align-self:             start;
    }
    .hero-content__title::after {
        content:                '';
        position:               absolute;
        width:                  3rem;
        height:                 1px;
        background:             currentColor;
        top:                    100%;
        left:                   0;
    }
        .title--mute{       color:  var(--midGrey);     }
        .title--highlight{  color:  var(--brightGreen); }

    .hero-content__text {
        grid-area:              text;
    }

    .hero-logo{
        grid-area:              logo;
        align-self:             start;
        justify-self:           end;
    }    
    .hero-logo__wrapper{
        max-width:              100px;
    }

    .select {
        grid-area: select;
        color: var(--color-select);
        font-size: 0.65rem;
    }

    .select__heading {
        display: inline-block;
        cursor: default;
        font-size: 0.65rem;
        font-weight: 700;
    }

    .select__item {
        margin: 0 0 0 0.5rem;
        display: inline-block;
        cursor: pointer;
        font-size: 0.65rem;
        font-weight: 300;
        color: var(--foreground);
    }

    .select__item:hover {
        color: var(--brightGreen);
        font-weight: 700;
    }


    /* Typography */
    .action-dot,
    .text-arcs{
        position:           relative;
    }
    .action-dot::before{
        content:            "";
        position:           absolute;
        background-color:   var(--brightGreen);
        border-radius:      50%;
        width:              1rem;
        height:             1rem;    
        z-index:            -10;
        margin:             0 auto;
		left:               0;
        right:              0;
        top:                0.125rem;
        opacity:            0.5;

    }

    .text-arcs::before{
        content:            "";
        position:           absolute;
        height:             5px;
        z-index:            -10;      
        background:         linear-gradient(to right, var(--flood), var(--heat), var(--fire), var(--drought)) ;
        margin:             0 auto;
		left:               0;
        right:              0;
        bottom:             -4px;
		width:              100%;

    }


    @media screen and (min-width: 53em) {
        .hero-content {
            padding:                3rem 3rem 2rem;
            grid-template-columns:  calc(50% - 2rem) calc(50% - 2rem) ;
            column-gap:             4rem;
            grid-template-areas: 	
                'back logo'
                'title title'
                'text select'
        }
        .hero-content__title {
            font-size: 4.5rem;
            margin: 0 0 4rem 0;
            padding: 0 0 2rem 0;
        }
        .hero-content__text {
            max-width: var(--min-col-width);
        }

        .select {
            text-align: right;
            margin-top: auto;
            align-self: end;
        }
        .select__heading {
            display: block;
        }
        .select__item {
            display: block;
            margin: 0;
        }

        .content-wrapper{
            width:                  calc(100% - 6rem);
            padding:                2rem 0;
            margin:                 0 3rem;
            display:                grid;
            column-gap:             4rem;
            grid-template-columns:  calc(33% - 2rem) calc(67% - 2rem);
        }
    }
</style>