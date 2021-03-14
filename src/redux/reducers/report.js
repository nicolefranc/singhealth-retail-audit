import { INIT_NEW_REPORT, TOGGLE_COMPLIANT } from "../redux-consts";

const reportReducer = (state = {}, action) => {
    // console.log(action);
    switch(action.type) {
        case INIT_NEW_REPORT:
            return action.payload;
        case TOGGLE_COMPLIANT:
            const { cIndex, sIndex, compliance, compliantCount, totalCount, lineItems } = action.payload;
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
                // console.log(`Total complied at index ${index}: ${totalComplied}`);
                // console.log(`Total Applicable at index ${index}: ${totalApplicable}`);
            })
            
            // console.log(`Total Complied: ${totalComplied}`);
            // console.log(`Total Applicable: ${totalApplicable}`);
            // console.log(`Total Score (in %): ${(totalComplied / totalApplicable) * weightage}`);
            const score = (totalComplied / totalApplicable) * weightage;
            return {
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
            }
        default:
            return state;
    }
}

export default reportReducer;

// const i = [
//     {
//         category: 0,
//         subcategory: 0,
//         lineItem: "",
//         complied: true
//     }
// ]