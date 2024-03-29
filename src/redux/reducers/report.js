import { INIT_NEW_REPORT, RESET_REPORT_STATE, TOGGLE_COMPLIANT, UPDATE_AUDIT_DETAILS } from "../redux-consts";

const reportReducer = (state = {}, action) => {
    // console.log(action);
    switch(action.type) {
        case INIT_NEW_REPORT:
            return initReport(state, action.payload);
        case TOGGLE_COMPLIANT:
            const { cIndex, sIndex, compliantCount, totalCount, lineItems } = action.payload;
            let weightage = state.checklist[cIndex].weightage;
            let totalComplied = 0;
            let totalApplicable = 0;
            let subcatScore = (compliantCount === 0 || totalCount === 0) ? 0 : (compliantCount / totalCount) * 100;
            const subcategories = [
                            ...state.checklist[cIndex].subcategories.slice(0, sIndex),
                            {
                                ...state.checklist[cIndex].subcategories[sIndex],
                                subcatScore,
                                lineItems: lineItems
                            },
                            ...state.checklist[cIndex].subcategories.slice(sIndex + 1)
                        ]
            subcategories.map((subcategory, index) => {
                totalComplied += subcategory.lineItems.filter(item => item.complied).length;
                totalApplicable += subcategory.lineItems.filter(item => item.complied != null).length;
            })
            
            const score = (totalComplied / totalApplicable) * weightage;
            const newReportState = {
                ...state,
                checklist: [
                    ...state.checklist.slice(0, cIndex),
                    {
                        ...state.checklist[cIndex],
                        score,
                        subcategories
                    },
                    ...state.checklist.slice(cIndex + 1)
                ]
            };
            const auditScore = calculateAuditScore(newReportState.checklist);
            newReportState.auditScore = auditScore;
            return newReportState;
        case UPDATE_AUDIT_DETAILS:
            return updateAuditDetails(state, action.payload);
        case RESET_REPORT_STATE:
            return {};
        default:
            return state;
    }
}

const initReport = (state, payload) => {
    console.log(payload);
    let report = { type: payload.type, tenantId: payload.tenantId };

    report.checklist = payload.checklist.map(category => {
        let newCategory = { id: category.id, category: category.category, weightage: category.weightage, score: category.score };
        
        newCategory.subcategories = category.subcategories.map(subcategory => {
            let newSubcategory = { id: subcategory.id, subcategory: subcategory.subcategory, subcatScore: subcategory.subcatScore };
            
            newSubcategory.lineItems = subcategory.lineItems.map(item => {
                let lineItem = { id: item.id, lineItem: item.lineItem, complied: item.complied };
                return lineItem;
            })

            return newSubcategory;
        })
        return newCategory;
    })

    console.log(report);
    return report;
    // return payload;
}

const calculateAuditScore = (checklist) => {
    let scores = [];
    let total = 0;
    scores = checklist.map(category => {
        total += category.score;
        return category.score
    });
    console.log(total);
    return total;
}

const updateAuditDetails = (state, { key, value }) => {
    const newState = { ...state };
    newState[key] = value;
    console.log(newState);
    return newState;
}

export default reportReducer;
