export  { 
    schema,
}

const schema = {
    actionTypes: {
        data:           [],
        fields:         ["Type", "Description", "Response type", 'Description', 'Linked adaptation actions', 'recordID']
    },
    hazardEvents: {
        data:           [],
        fields:         ["Hazard event", "Hazard", "Type", "Climate variables", "Description", "Linked adaptation actions", "recordID"]
    },
    hazards: {
        data:           [],
        fields:         ["Hazard","Trend", "Climate hazard (IPCC)",  "Linked hazard events", "Link climate variables", "Linked adaptation actions", "recordID"]
    },
    climateVariables: {
        data:           [],
        fields:         ["Variable", "Alias", "Data availability", "Unit", "Change unit", "Description", "order", "Linked hazards", "Linked hazard events", "recordID"]
    },
    ipccHazards: {
        data:           [],
        fields:         ["IPCC impactHazard (IPCC)", "Description", "Linked hazards", "recordID"]
    },
    adaptationFocus: {
        data:           [],
        fields:         ["Focus area", "Alias", "Description", "Linked adaptation actions", "recordID"]
    },
    adaptationApproaches: {
        data:           [],
        fields:         ["Adaptation and risk approach", "Approach theme", "Description", "Linked approach theme", "Linked adaptation actions", "recordID"]
    },
    communityRisks: {
        data:           [],
        fields:         ["Community risk", "Risk area", "Risk bearer", "Hazard events", "Linked hazards", "IPCC impact", "recordID"]
    },
    riskArea: {
        data:           [],
        fields:         ["Risk area", "Description", "recordID"]
    },
    ipccImpacts: {
        data:           [],
        fields:         ["IPCC impact", "IPCC Impact theme", "Impacted system", "Description", "Hazard", "Baseline frequency", "Projected frequency", "recordID"]
    },
    actionScale: {
        data:           [],
        fields:         ["Scale", "Alias",  "Description", "rank", "radius", "yPos",  "Linked adaptation actions", "recordID"]
    },
    actionTypeNodes: {
        data:           [],
        fields:         ["Name", "Class",  "xPos", "yPos", "curveYoffset", "nodeCurve", "recordID"]
    },
    actionTypeLinks: {
        data:           [],
        fields:         ["Name", "_source",  "_target", "midX", "midY"]
    },
    adaptationScreens: {
        data:           [],
        fields:         ["Screen", "Description", "fieldName", "xPos", "yPos", "lensPos"]
    },
    riskDeterminants: {
        data:           [],
        fields:         ["Name"]
    }

}

