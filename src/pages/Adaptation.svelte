<script>
    import Logo                 from '../components/shared/Logo.svelte'
    import { gsap, ScrollTrigger } from "gsap/all";
	import { ui, data }         from '../data/stores.js'
	import { tsv }              from 'd3'
    import Type                 from '../components/byPage/actions/vis/Type.svelte'
    import ClimateVariables     from '../components/byPage/adaptation/vis/ClimateVariables.svelte'
    import ClimateHazards       from '../components/byPage/adaptation/vis/ClimateHazards.svelte'
    import ClimateRisks         from '../components/byPage/adaptation/vis/ClimateRisks.svelte'
    import RiskTable            from '../components/byPage/adaptation/RiskTable.svelte'

    const scrollTo = function(){
        document.querySelector(`section[act=${this.getAttribute('actName')}]`)
            .scrollIntoView({behavior: 'smooth'})
    };


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
            <span class = "title--mute">Adapting to</span><br/>
            climate change<br/>
            <span class = "title--highlight">in Hepburn</span>
        </h1>
        <div class="hero-content__text">
            <p>The climate is changing and we need to make sure our community will adapt to the risks of climate change. This includes more severe and frequent events like bushfires, floods, droughts and heatwaves. In this section we'll summarise the research and modelling of how Hepburn's climate is expected to change, and introduce the key concepts of climate change adpatation.
            </p>
        </div>
        <div class ="select">
            <!-- <div class = "select__heading"> In this section</div> -->
            <ul>
                <li class = "select__item" on:click={scrollTo} actName = "intro">Introduction</li>
                <li class = "select__item" on:click={scrollTo} actName = "variables">Climate variables</li>
                <li class = "select__item" on:click={scrollTo} actName = "hazards">Hazards and events</li>
                <li class = "select__item" on:click={scrollTo} actName = "risk">Climate risk</li>
                <li class = "select__item" on:click={scrollTo} actName = "communityRisk">Community risks</li>
                <li class = "select__item" on:click={scrollTo} actName = "riskAdaptiveCap">Risk and adaptive capacity</li> 
                <li class = "select__item" on:click={scrollTo} actName = "acitonType">Adaptation action</li>
            </ul>
        </div>
    </div>
</div>

<!-- Page content section-->
<div class = "content-wrapper">
    <!-- Intro Act wrapper content-->
    <section act = "intro"  class = "section-wrapper col-1-2">
        <div class = "narrative-wrapper">
            <div scene = 0>
                <hr>
                <h2>Climate change adaptation</h2>
                <p>We'll start by acknowledging that the climate is changing - regardless of mitigation efforts, because there's inertia from greenhouse gases that have already been released into the atmosphere - and that as a community, we need be ready for the impacts climate change. Climate change adaptation seems <em>fairly</em> simple then, or at least the goal of it is. Howt you need to know to better understand:</p>
                <ul>
                    <li>what we need to adapt to: how climate variables are projected to change and how this increases likelihood of climate hazard events</li>
                    <li>what we mean by climate risk through the potential impact on the community</li>
                    <li>how adaptation can be framed as managing and reducing risk; and increasing our resilience or adapative capacity</li>
                </ul>
            </div>
        </div>

        <div class = "vis-wrapper">
            <img src="./static/img/christian-bass-11UT32fql64-unsplash.jpg" alt=''>
        </div>
    </section>

    <!-- Climate variables Act-->
    <section act = "variables"  class = "section-wrapper col-2-1">
        <div class = "narrative-wrapper">
            <div scene = 0>
                <hr>
                <h2>Measuring how the climate is changing</h2>
                <p>Here we take a look at climate variables and how they're projected to change under different climate modelling scenarios. Climate variables are observations be can see in recognisable weather patterns, like temperature and rainfall: they are easy to grasp and associate with climate hazard events like floods, heatwaves, fires and drought.
                </p> 
                <p>The role of model projections and different climate scenarios will be used to highlight how the occurence of hazard events is expected to increase in every scenario. This reiterates the need to take action to adapt, and how its important that actions are robust and need to perform well under a wide range of climate futures.</p>
            </div>
        </div>

        <div class = "vis-wrapper">
            <ClimateVariables/>
        </div>
    </section>

    <!-- Climate hazards Act-->
    <section act = "hazards"  class = "section-wrapper col-1-2">
        <div class = "narrative-wrapper">
            <div scene = 0>
                <hr>
                <h2>Climate hazards in Hepburn</h2>
                <p>Not every impact of climate change is relavent to Hepburn (e.g. sea level rise). And not every climate hazard can be linked to climate change (e.g. wind events)
                </p> 
                <p>The role of model projections and different climate scenarios will be used to highlight how the occurence of hazard events is expected to increase in every scenario. This reiterates the need to take action to adapt, and how its important that actions are robust and need to perform well under a wide range of climate futures.</p>
                <p>The difference between a hazard and an event will also be clarifed, as well as the link to climate variables that drive thhe hazards. These relationaships will be presented in a visual to show how the change in cliamte, measured and observed in climate variables, increases the frequency and severity of hazards, and leads to more hazard events. </p>
                <p>Acknowledge that the IPCC has 'has developed the more general concept of ‘climatic impact driver’ to provide information about “natural or human-induced climate events or trends that may have an impact (detrimental or beneficial) on an element of society or ecosystems” </p> 
            </div>
        </div>

        <div class = "vis-wrapper">
            <ClimateHazards/>
        </div>
    </section>

    <!-- Climate risks and community impacts Act-->
    <section act = "risks"  class = "section-wrapper col-2-1">
        <div class = "narrative-wrapper">
            <div scene = 0>
                <hr>
                <h2>Climate risks and community impacts </h2>
                <p>This section will explain risk and iilustrate the concept of through potential community impacts(?).  These impacts can be quite specific and unqiue to Hepburn and the community, and are likely to be aggregated into themes and focus areas (for the region.)
                </p> 
                <p>The initial aim here is to make the concept of climate risks as tangible as posible by framing them as (potential) community impacts. An information visualisation might be possible here IF impacts/risks are well structured.</p>
                <p>Another consideration is the idea of risk as "the potential for adverse consequences" and "earlier definitions centred on the interaction between hazard, vulnerability and exposure" (which is more closley related to a section the inlcudes adaptive capacity) </p>
            </div>
        </div>

        <div class = "vis-wrapper">
              <ClimateRisks/> 
        </div>
    </section>

    <section act = "communityImpact"  class = "section-wrapper col-2-1 table invert">
        <div class = "invert-bg" >
            <div class ='invert-bg-clip'></div>
        </div>
        <div class = "narrative-wrapper">
            <div scene = 0>
                <h2>Translating risk into community impacts</h2>
                <p>This table would show all the identified community risks and the claimte hazards and events that are linked to them (note: list is unsorted and woudd be grouped by theme. Icons to be used for hazards). This table would be designed to suit the collated impact data.: "Risk bearer" may also be collected (i.e. 'parts of the community') and/or focus area could be tagged. 
                </p> 
            </div>
        </div>
        <div class = 'table-wrapper'>
            <RiskTable/> 
        </div>
    </section>

    <!-- Risk drivers and adaptive capacity-->
    <section act = "riskAdaptiveCap"  class = "section-wrapper col-1-2">
        <div class = "narrative-wrapper">
            <div scene = 0>
                <hr>
                <h2>Exposure, vulnerability and adapative capacity</h2>
                <p>Here we identify the exposure and vulnerability as key drivers of risk. And while exposure to a hazard is relatively easy to comprehend (as it has a tangible 'spatial' characteristic), vulnerabilty is more difficult to define and measure.</p>
                <p>An illustrative example might be to think about climate hazards in the developing world and how ill-prepapred some commiunties are in facing, responding to, and recovering from natural climate disasters. Not only might they ve more exposed to incerasing climate hazards, but (in general) they much more vulnerable than Australian's and their communities and institutions lack what's called '(coping and) adaptive capacity': these include the capcity to anticpate risk, to rspond to risk, and to recover and change. All of these considerations reduce risk and the impact on communities, of climate events.
                </p> 
                <p>The international example is extreme but real. It is easy to then recognise that there are differences in exposure, vulnerability and adaptive capacity between say, regional and urban areas of Victoria. And that that  </p>
                <p>Note: might use images rather than any diagramatic reprsentation. Or have a basic HTML relationship of: </p>
                <p><strong>Risk determinants = Hazard x Vulnerability x Exposure</strong></p>
            </div>
        </div>

        <div class = "vis-wrapper">
            <img src="./static/img/david-clode-Yg_sNKOiXvY-unsplash.jpg" alt=''>
        </div>
    </section>

    <!-- Action types-->
    <section act = "actions"  class = "section-wrapper col-2-1">
        <div class = "narrative-wrapper">
            <div scene = 0>
                <hr>
                <h2>What does adapatation action look like?</h2>
                <p>This section will emphasise taht not only do we need to take action to adapt to climate change, but that we need a suite of actions need to be well coordinated to respond to risk and build resilience. This is an obious but recurring theme with adapation: that it is a broad endeavaor that overlaps with many of our communities natural goals. In effect, a lot of the activities and actions we are already doing have adapation benefits. And a lot of adpation actions have other benefits (and potentially unintended consequences!)
                </p> 
                <p>We need to be mindful of all of these adaptation concepts and how they might be linked to our existing goals and intitiaves. We also need ot be mindful that there are a lot of differnet actors and stakaholder that are invovled in actions that have adaptation benefits. These actors all operate in their spheres of responsibility and influence; and so when we look at actions, a key goal is to not just look at individual actions, but to understand how all our acitons work together to meet our adpatation challenges.</p>
                <p>Ends with &rarr; to explore the action 'portfolio'
            </div>
        </div>

        <div class = "vis-wrapper">
            <svg viewBox = "0 0 1600 1600" width="100%">
                <Type/> 
            </svg>
        </div>
    </section>
</div>



<!-- STYLES -->
<style>
    /** PAGE / VIS STORY SECTION **/
    .content-wrapper{
        border-bottom:          5px #000 solid;
    }
    .section-wrapper{
        display:                grid;
        column-gap:             6rem;
        /* min-height:             100vh; */
        padding-bottom:         25vh;
    }
    .col-1-2{
        grid-template-columns:  1fr 2fr; 
        grid-template-areas:    'narrative vis';
    }
    .col-2-1{
        grid-template-columns:  2fr 1fr;
        grid-template-areas:    'vis narrative';
    }
    .col-2-1.table{
        grid-template-columns:  2fr 1fr;
        grid-template-areas:    
            'narrative ...'
            'table table';
    }
    .invert{
        color:                  var(--brightGreen);
    }
    .invert-bg{
        grid-area:              1 / 1 / 3 / 3;
        position:               relative;
        top:                    -10vh;
        left:                   -3rem;
        background-color:       var(--darkGreen);
        z-index:                -10;
        width:                  calc(100% + 6rem);
    }
    .invert-bg-clip{
        width:              0;
        height:             0;
        border-top:         10vh solid #ffffff;
        border-right:       100vw solid transparent;
    }
    .narrative-wrapper{
        grid-area:              narrative;
        height:                 fit-content;
    }
    .vis-wrapper{
        grid-area:              vis;
        display:                flex;
        align-content:          center;
        justify-content:        center;
        max-height:             calc(100vh - 6rem);
    }
    .table-wrapper{
        grid-area:              table;
        padding-bottom:          20vh;
    }
    img{
        object-fit:             cover;
        width:                  100%;
        height:                 100%;
    }

    hr{
        border-bottom:          5px #000 solid;
        margin-block-start:     0;
        margin-block-end:       0;
        border-style:           solid;
    }
    h1, h2{
        text-transform:         lowercase;
    }
    h2 {
        margin-top:             1rem;
        margin-bottom:          1rem;
        font-size:              2.5rem;
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

    .select__heading {
        display: inline-block;
        cursor: default;
        font-size: 0.65rem;
        font-weight: 700;
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

    .table-wrapper{
        width:                  100%;
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
            /* column-gap:             4rem;
            grid-template-columns:  calc(33% - 2rem) calc(67% - 2rem); */
        }
    }

    @media print{
        .hero-wrapper, 
        .section-wrapper{
            height:                 190mm;
            overflow:               hidden;
            grid-row-gap:           10mm;
            grid-column-gap:        20mm;
            padding:                10mm;
            page-break-after:       always;
        }
        .section-wrapper.table{
            height:                 initial;
            overflow:               visible;
            page-break-inside:      avoid;
        }
        .hero-content__title {
            font-size:              4.5rem;
        }
    }

</style>