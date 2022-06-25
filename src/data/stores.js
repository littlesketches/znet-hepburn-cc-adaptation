// User interface store objects
import { writable } from 'svelte/store';


export const ui = writable({
    page:               null,
    state: {
        actionVis:  {
            act:                'intro',
            scene:              0,
            nodes:  {
                force:              'cluster-center',
                focusArea:          null,
                base:               true,
                shadow:             false,
                arcs:               false,
                shapes:             false,
                symbols:            false
            },
            legend: {
                hazards:        false,
                approach:       false,
                scale:          false

            }
        }
    }, 
    el:        {},
    animation: {},
    vis: {
        nodes: {
            scales: {}
        }
    }
})


export const data = writable({
    actions:            null,
    stakeholders:       null,
    references:         null,
    stats:              {}
})
