<!-- COMPONENT FOR THE ADAPTATION "ACTIONS" SECTION -->
<script>
	import { onMount }     from 'svelte';
    import { gsap, ScrollTrigger } from "gsap/all";
	import { ui, data }     from '../data/stores.js'
    import Logo             from '../components/shared/Logo.svelte'
    import ActionVis        from '../components/byPage/actions/ActionVis.svelte';
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
            <p>There's a lot to consider when thinking about the actions we need to take to prepare and adapt our community for climate change. In this section we'll take a closer look at key actions that area already happening in and around Hepburn, through a series of different adaptation 'lenses'. Our aim is to get a comprehensive idea of how we're responding, and what else we might need to do.
            </p>
        </div>
        <div class ="select">
            <ul>
                <li class = "select__item" on:click={scrollTo} actName = "intro">Introduction</li>
                <li class = "select__item" on:click={scrollTo} actName = "hazards">Hazards</li>
                <li class = "select__item" on:click={scrollTo} actName = "approach">Approach</li>
                <li class = "select__item" on:click={scrollTo} actName = "scale">Scale</li>
                <li class = "select__item" on:click={scrollTo} actName = "type">Type</li>
                <li class = "select__item" on:click={scrollTo} actName = "focusArea">Focus area</li>
                <li class = "select__item" on:click={scrollTo} actName = "screening">Adaptation criteria</li>
                <li class = "select__item" on:click={scrollTo} actName = "rating">Rating</li>
                <li class = "select__item" on:click={scrollTo} actName = "beyond">Beyond adaptation</li>
            </ul>
        </div>
    </div>
</div>

<!-- Page content section-->
<div class = "content-wrapper">
    <!-- Narrative pane content -->
    <div class = "narrative-wrapper">
        <div act = "intro" class = "act-narrative">
            <div scene = 0 force='cluster-center'>
                <hr>
                <h2>Making sense of adaptation actions</h2>
                <p>We've identified {@html $data.stats.actions.total} actions (so far) that are helping Hepburn adapt to climate change. Let's start by representing each action as a little <span class = "action-dot">dot</span> on the screen.</p> 
            </div>
            <div scene = 1 force="ring-outer">
                <p>This seems nice an orderly: {@html $data.stats.actions.total} actions <em>seems</em> reasonable...or is it!? Adaptation actions vary wildly in size, scope and focus: many of actions here have adaptation benefits, but aren't specifically being done to manage climate risks and impacts.</p>
            </div>
            <div scene = 2 act="intro" force = "arrow-down">
                <p>So how can we see how these actions match up to <em>our</em> adaptation needs? How can we tell if what we're doing is effective? Are we doing <em>enough</em>? And are we doing enough in the <em>right places?</em>
                </p>
                <p>This guide walks you through some key ways to view Hepburn's adaptation actions. It won't definitively answer these questions - because 'adaptation' doesn't have a single, measurable goal - but it will hopefully equip you with an understanding of what's being done, where there might be gaps, and potentially where you might be able to help our community adapt to climate change.
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
                <p>We want to see how our actions address each hazard. To begin with, we can <em>count how many</em> actions address each hazard. We could try to position each action near the hazards they are trying to address. But we quickly notice is that there are <strong>actions that address multiple hazards</strong>.
                </p>
            </div>
            <div act="hazards" scene = 2 force="cluster-center" nodeBase="false" nodeArcs = "true" nodeShapes = "false" nodeShadow = "false">
                <p>So how about we re-design our dots by putting some matching <span class="text-arcs">coloured arcs</span> around our actions. Its a bit busy, but now we can identify which actions address which hazards!
                </p>
            </div>
        </div>

        <div act = "approach" class = "act-narrative" legendHazards = 0.5 legendApproach = "false">
            <div scene = 0 force = "diagonal-up">
                <hr>
                <h2>Adaptation approaches</h2>
                <p>There are two approaches when in comes to adaptation:</p>
                <ul>
                    <li> We can <strong>reduce risk</strong>; and</li>
                    <li> We can <strong>increase resilience</strong></li>
                </ul>
                <p>Each of these  approaches contains a handful of more specific approaches, and our actions can take multiple approaches. What is obvious is that we want is good spread of actions so that our approach to adaptation is diverse.
                </p>
            </div>
            <div scene = 1 force="cluster-approach" nodeBase="false" nodeArcs = "true" nodeShapes = "false" nodeShadow = "false" >
                <p> We can try to position actions over these two approaches, but we again run into the problem with actions that both reduce risk and increase resilience. There might also be some actions that don't really fit either approach: usually because they're quite 'indirect' or 'high-level'.  
                </p>
            </div>
            <div act="approach" scene=2  force = "cluster-approach-wide"  nodeBase="false" nodeArcs = "true" nodeShapes = "true" nodeShadow = "false" >
                <p>So to help us better identify the adaptation approach of each action, we're going to put little triangle symbols inside each action. 
                </p>
            </div>
        </div>

        <div act = "scale" class = "act-narrative"  legendHazards = 0.35  legendApproach = 0.65 legendScale = "false">
            <div scene = 0 force="cluster-scale" nodeBase="false" nodeArcs = "true" nodeShapes = "true" nodeShadow = "false" nodeSymbol = "false">
                <hr>
                <h2>Actions scale</h2>
                <p>The next lens we'll look at our actions through concerns their <strong>scale</strong>. This is a classification of whether an action is specific to the <em>local</em> Hepburn area, or if the action operates at broader scale of either: a <em>regional</em> level (e.g. Grampians or Central Highlands), the Victorian <em>state</em> level, or at a <em>national</em> level.
                </p>
            </div>
            <div scene = 1 force="cluster-scale" nodeBase="false" nodeArcs = "true" nodeShapes = "true" nodeShadow = "true" nodeSymbol = "false" >
                <p>How might we visualise scale? The obvious indicator for scale is size &mdash; maybe we could adjust the overall size of each action? However <strong>we're interested in how these actions affect Hepburn</strong>, so it doesn't make much sense to visually weight a national action over a local one. So what we'll do is add a subtle, shadow-y ring around the actions that are beyond local scale and move on!
                </p>
            </div>
        </div>

        <div act = "type" class = "act-narrative"  legendHazards = 0.2  legendApproach = 0.5 legendScale = 0.8 >
            <div scene = 0 force = "right-line" >
                <hr>
                <h2>Types of actions</h2>
            </div>
            <div scene = 1  force = "cluster-concrete-abstract-right">
                <p>Now that we can see some of the key characteristics of our actions, we can start to think about more sophisticated classifications that give us insight into how well coordinated our adaptation are.</p>
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
                <h2>Adaptation focus areas</h2>
                <p><strong>Five focus areas</strong> have were identified through a <a href="https://adaptgrampians.com.au/wp-content/uploads/2021/06/Grampians_Region_Climate_Adaptation_Strategy_Situation_Analysis_Final_.pdf" target ="_blank">climate adaptation situational analysis study</a> for broader <a href="https://adaptgrampians.com.au/" target ="_blank"> Grampians region</a>. These areas are another useful lens for assessing how well distributed our adaptation actions are across <strong> areas that matter to Hepburn</strong>.</p>
                <p>For Hepburn, we've added a sixth important focus area of <strong>healing country</strong> to highlight the importance of actions that embrace the views and practices of Traditional Owners' to manage climate risk.</p>
                <p>Now of course, many actions address multiple focus areas - so we'll another way to show which actions gravitate to a given focus area. To do this, <strong>you can tap on any of the focus area names to see which actions relate to that area.</strong></p>
            </div>
        </div>

        <div act = "screening" class = "act-narrative">
            <div scene = 0  force="cluster-screening">
                <hr>
                <h2>Key adaptation criteria</h2>
            </div>
            <div scene = 1 force="cluster-screening">
                <p>We've looked at different ways to classify and cluster actions that hopefully provides some insight into how they collectively respond to our adaptation challenge. Now we're going to look at ways of evaluating and prioritising these actions.
                </p>
                <p>We start by answering three simple questions of each action that are aligned to key <strong>adaptation criteria</strong>. These are questions that can be answered with a(n emphatic) "yes" or "no", or "unsure". These questions simply consider whether an action is <strong>robust</strong>, <strong>flexible</strong> and/or <strong>viable</strong>.</p>
            </div>
            <div scene = 2 force="cluster-screening">
                <p>Actions that meet all criteria are automatically classed as <strong>no regrets actions</strong>: there's no reason to not do these actions, so we should implement and support them!</p>
                <p>Actions that answer "no" to <em>any of the three criteria</em> are considered to have limited adaptation benefit, or may lead to maladaptation. These actions are de-prioritised and essentially discarded from consideration. Next we'll look at How we might go further and prioritise these actions.</p>
            </div>    
        </div>

        <div act = "rating" class = "act-narrative">
            <div scene = 0 force="cluster-noregets-vs-others">
                <hr>
                <h2>Prioritising adaptation actions</h2>
                <p>We've separated our actions into three groups based on key adaptation criteria. So what next?
                </p>
            </div>
            <div scene = 1 force="cluster-adaptation-criteria">
                <p>We can use our adaptation criteria further to create priority tiers for those actions that met two, one or none of the criteria. This is a imperfect way of stratifying actions but is relatively logical and robust: actions that expected to meet more key adaptation criteria float to the top.
                </p>
            </div>
            <div scene = 2 force="cluster-rating">
                <p>Next, we'll differentiate actions by rating how effective they're expected to be at responding to climate hazards. We've rated each action on the (expected) efficacy of their response to each hazard that it addresses. This is a subjective (1 to 5) rating that accounts for the size and scope of the action: so it takes into consideration how ambitious the action is, and how much it might achieve against the hazards it addresses. We use this process to differentiate actions <em>within their priority tiers.</em> 
                </p>
                <p>What we're left with is a loosely prioritised a view of our adaptation actions!
                </p>
            </div>
        </div>

        <div act = "beyond" class = "act-narrative">
            <div scene = 0 force="ring-mid">
                <hr>
                <h2>Beyond the adaptation lens</h2>
                <p>We've taken a look at our adaptation actions as a <strong>collective</strong>, through a series lenses and perspectives. We've even tried to assess and rank our actions. But is that enough? Do we now know what to do to adapt to climate change?!
                </p>
                <p>Well unfortunately, like all complex challenges, there are (yet) <strong>more characteristics that need to be considered</strong> that can be equally sophisticated and obtuse. Areas that we haven't 'analysed' here include:
                </p>
                <ul>
                    <li>action timing and dependencies and/or mutual exclusivity;</li>
                    <li>synergies (and dis-synergies) of adaptation benefits;</li>
                    <li>the roles of influence and responsibility; and</li>
                    <li>idea that actions can have adaptation co-benefits and unintended consequences.</li>
                </ul>  
                <p>These last concepts are critical to remember as there can be many reasons to proceed or not proceed with an action that have nothing to do with climate change adaptation. Our challenge as a community is not to precisely account for each of these sophisticated characteristics. Instead, we can use our understanding of what makes for a good adaptation response to support and coordinate actions that we are confident will lead to comprehensive and practical adaptation benefits for our community.
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
        grid-area:              select;
        color:                  var(--color-select);
        font-size:              0.65rem;
    }
    .select__item {
        margin:                 0 0 0 0.5rem;
        display:                inline-block;
        cursor:                 pointer;
        font-size:              0.65rem;
        font-weight:            300;
    }
    .select__item:hover {
        color:                  var(--foreground);
        font-weight:            700;
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