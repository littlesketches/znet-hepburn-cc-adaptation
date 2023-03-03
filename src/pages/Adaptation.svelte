<script>
    import Logo                 from '../components/shared/Logo.svelte'
	import { ui, data }         from '../data/stores.js'
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
            <span class = "title--highlight">in Hepburn Shire</span>
        </h1>
        <div class="hero-content__text">
            <p>The climate is changing and we need to make sure our community is ready to adapt to future with more frequent and severe climate-related events like bushfires, floods, droughts and heatwaves. In this section, we will: summarise the latest climate change modelling for Hepburn Shire; introduce the key concepts that underpin climate change adaptation; and identify the climate risks facing our community.
            </p>
        </div>
        <div class ="select">
            <!-- <div class = "select__heading"> In this section</div> -->
            <ul>
                <li class = "select__item" on:click={scrollTo} actName = "intro">Introduction</li>
                <li class = "select__item" on:click={scrollTo} actName = "variables">Climate variables</li>
                <li class = "select__item" on:click={scrollTo} actName = "hazards">Hazards and events</li>
                <li class = "select__item" on:click={scrollTo} actName = "climateRisk">Climate risk</li>
                <li class = "select__item" on:click={scrollTo} actName = "communityRisk">Community impact</li>
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
                <p>Our climate <em>is</em> changing. The Paris Agreement - the legally binding international treaty on climate change - sets the goal of <strong>limiting global warming to well below 2, preferably to 1.5 degrees celsius</strong>, compared to pre-industrial levels. To achieve this, the world needs to reduce, eliminate and draw down greenhouse gas emissions. And in Hepburn Shire, we've been coordinating actions to reduce emissions through <a class ='underline' href = "https://hepburnznet.org.au/" target="_blank">Z-NET Hepburn</a>. These emissions reduction actions also known as <em>mitigation</em> actions. But how do we deal with the climate change we're already locked into? 
                </p>
                <p>This is where climate change adaptation comes in: it's the "process of adjustment to actual or expected climate and its effects". In other words, making sure our community is prepared and able to cope with climate change. On the surface, adaptation seems <em>fairly</em> straightforward however it encompasses a chain of concepts - many of which overlap with other domains and 'ways of seeing the world' - which can make adaptation difficult to fully grasp. 
                </p>
                <p>This aim of this guide is help you understand what adaptation is all about, and why it matters to the Hepburn Shire community.
                </p>
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
                <h2>How the climate is changing</h2>
                <p>Let's start with some definitions (and data!) <strong>Climate variables</strong> are observations that you might recognise from weather forecasts and meteorological data. These are ways we can describe and measure climate change.
                </p>
                <p>It gets more interesting when we look at climate models that project how these variables might change over time. Modelling by <a href = "https://www.climatechange.vic.gov.au/victorias-changing-climate" target ="_blank"> CSIRO for the Victorian Government (DEECA)</a> for the Central Highlands region (which includes Hepburn Shire) <a href = "https://www.climatechangeinaustralia.gov.au/en/projects/victorian-climate-projections-2019/vcp19-accessing-datasets/" target ="_blank">projects the change in each climate variable</a> between 2019 and 2090. Each model projection assumes an emissions scenarios that corresponds to a "Representative Concentration Pathway" (RCP) that corresponds to different levels of average global warming by 2100. The <strong>RCP4.5</strong> and <strong>RCP8.5</strong> scenarios shown here and correspond to global warming of 4.5&#8451; and 8.5&#8451; respectively, by 2100. 
                </p>
                <p>We can (very simply) think of these as medium and higher warming scenarios. But more importantly, together they are illustrate<strong> the general trend and level of uncertainty</strong> of climate modelling for Hepburn Shire.
                </p>
                <p>The last idea we'll consider here is <strong>climate hazards</strong> and how they are driven by climate variables. Four hazards were identified in a <a href ="https://adaptgrampians.com.au/wp-content/uploads/2021/06/Grampians_Region_Climate_Adaptation_Strategy_Situation_Analysis_Final_.pdf" target="_blank">situational analysis</a> (by RMIT) that supports the regional <a href="https://adaptgrampians.com.au/"target="_blank" >Adapt Grampians</a>  initiative, which includes Hepburn Shire. These <strong> hazards represent threats to our community </strong>that will be <strong> amplified under all climate change scenarios</strong>.    
               </p>
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
                <h2>Climate hazards in Hepburn Shire</h2>
                <p>Hazards are quite easy for us to understand, however it's their related <strong>climate events</strong> that are directly experienced by the community. Climate events come in two kinds:</p>
                <ul>
                    <li><strong>Shocks</strong>: these are intense, shortly sustained events that are commonly known natural (or climate) disasters; and </li>
                    <li><strong>Stresses</strong>: these are events that build and compound over longer periods.</li>
                </ul>
                <p>Climate scientists - aided by models and projections - tell us that climate change will lead to <strong>more frequent and more intense climate events</strong>. Armed with these warnings, our next challenge is to understand what climate risks means to Hepburn Shire.
                </p> 
            </div>
        </div>

        <div class = "vis-wrapper">
            <ClimateHazards/>
        </div>
    </section>

    <!-- Risk drivers and adaptive capacity-->
    <section act = "climateRisk"  class = "section-wrapper col-2-1">
        <div class = "narrative-wrapper">
            <div scene = 0>
                <hr>
                <h2>Climate risk</h2>
                <p>The core definition of climate risk &mdash; provided by the <a href="https://www.ipcc.ch/site/assets/uploads/2021/02/Risk-guidance-FINAL_15Feb2021.pdf" target="_blank">IPCC</a> &mdash; is the <strong>"potential for adverse consequence for human or ecological systems</strong> [.. and I]n the context of climate change, risks can arise from potential <em>impacts</em> of climate change as well as human <em>responses</em> to climate change". 
                </p>
                <p>We'll start by focusing on risk in the context of the impacts of climate change as these impacts are directly experienced by the community. These <strong>"risks result from dynamic interactions between climate-related hazards with the exposure and vulnerability of the affected human or ecological system to the hazards"</strong>. In other words, the hazards that we've been talking about are just one determinant of risk: we also need to consider the concepts of <strong>exposure</strong> and <strong>vulnerability</strong>. 
                </p>
                <p>Exposure to a hazard (related event) is hopefully an easy concept to grasp, because events are spatial and protection often involves a physical response or intervention. Vulnerability is trickier as it involves our individual and collective capacities to adapt to and cope with "adverse consequences". Vulnerability is closely associated with <strong>adaptive capacity</strong> and  <strong>resilience</strong> (which is often be used in other closely related contexts). For our purposes, we think of resilience and adaptive capacity as having similar qualities that reduce vulnerability.
                </p>
                <p>The <strong>response</strong> to climate change can also <a href = "https://www.sciencedirect.com/science/article/pii/S2590332221001792" target="_blank">be considered as a fourth determinant or risk</a>. We'll look at this in more detail by examining Hepburn Shire's adaptation actions (in the next module). But before we do that, let's take a closer look at climate risk in community level.
                </p> 
            </div>
        </div>

        <div class = "vis-wrapper">
              <ClimateRisks/> 
        </div>
    </section>

    <!-- Climate risks and community impacts Act-->
    <section act = "communityRisk"  class = "section-wrapper col-1-2">
        <div class = "narrative-wrapper">
            <div scene = 0>
                <hr>
                <h2>Climate risks and community impacts </h2>
                <p>We've traversed a number concepts of concepts and definitions that help us link projected climate change to risk. But we haven't yet given a concrete example of a risk to the community. The following table of risks frame a wide range of climate risks as potential impacts on the community. These are tangible examples of what climate risk means to Hepburn Shire, and help us to understand what's at stake.
                </p> 
                <p>Risks are grouped into "risk areas" that help to classify them into broader themes that can help us think about the wide-ranging impacts of climate hazards and events. Risks and risk areas have been sourced and reviewed by the Hepburn community and reflect their concerns, inputs and experience of how these known climate hazards affect the community.</p>
            </div>
        </div>

        <div class = "vis-wrapper">
            <img src="./static/img/david-clode-Yg_sNKOiXvY-unsplash.jpg" alt=''>
        </div>
    </section>

    <!-- Community impact table-->
    <section act = "communityImpact"  class = "section-wrapper table invert">
        <div class = "invert-bg" >
            <div class ='invert-bg-clip'></div>
        </div>
        <div class = "narrative-wrapper">
            <div scene = 0>
                <h2>Translating risk into community impacts</h2>
            </div>
        </div>
        <div class = 'table-wrapper'>
            <RiskTable/> 
        </div>
    </section>
</div>



<!-- STYLES -->
<style>
    /** PAGE / VIS STORY SECTION **/
    .section-wrapper{
        display:                grid;
        column-gap:             6rem;
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
    .table{
        grid-template-columns:   1fr;
        grid-template-areas:    
            'narrative'
            'table';
        padding-bottom:         0;
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
        height:                 calc(100% + 15vh);
    }
    .invert-bg-clip{
        width:                  0;
        height:                 0;
        border-top:             10vh solid #ffffff;
        border-right:           100vw solid transparent;
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
        /* width:                  3rem; */
        height:                 1px;
        background:             currentColor;
        top:                    100%;
        left:                   0;
    }
        .title--mute{           color:  var(--midGrey);     }
        .title--highlight{      color:  var(--brightGreen); }

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
        .select__item {
            display: block;
            margin: 0;
        }

        .content-wrapper{
            width:                  calc(100% - 6rem);
            padding:                2rem 0;
            margin:                 0 3rem;
            display:                grid;
        }
    }

    @media print{
        p, ul{
            font-size:              9pt;
        }
        .hero-wrapper, 
        .section-wrapper{
            height:                 190mm;
            overflow:               hidden;
            grid-row-gap:           10mm;
            grid-column-gap:        10mm;
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
        .select{
            display:                none
        }
    }

</style>