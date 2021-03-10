import { INIT_NEW_REPORT, TOGGLE_COMPLIANT } from "../redux-consts";

const reportReducer = (state = {}, action) => {
    console.log(action);
    switch(action.type) {
        case INIT_NEW_REPORT:
            return action.payload;
        case TOGGLE_COMPLIANT:
            const { cIndex, sIndex, compliance, lineItems } = action.payload;
            // console.log(`Reducer: ${cIndex}, ${sIndex}`);
            let weightage = state.checklist[cIndex].weightage;
            let score = state.checklist[cIndex].score;
            let itemsCount = lineItems.length;
            let rawScore = (score / weightage) * itemsCount;
            // let rawWeight = ;
            // console.log('Line items below:');
            console.log(`Weightage: ${weightage}`);
            console.log(`Score: ${score}`);
            console.log(`Raw score: ${rawScore}`);
            // console.log(`Raw weight: ${rawWeight}`);
            console.log('==================================');
            // console.log(state.checklist[cIndex].subcategories[sIndex])
            // console.log(state);
            switch (compliance) {
                case false:
                    rawScore = rawScore > 0 ? rawScore - 1 : 0;
                    score = (rawScore / itemsCount) * weightage;
                    console.log(`New raw score: ${rawScore}`);
                    console.log(`New score (in %): ${score}`);
                    break;
                case null:
                    itemsCount = itemsCount > 0 ? itemsCount - 1 : 0;
                    score = (rawScore / itemsCount) * weightage;
                    console.log(`New item count: ${itemsCount}`);
                    console.log(`New raw score: ${rawScore}`);
                    console.log(`New score (in %): ${score}`);
                    break;
                default:
                    if (score === weightage) {
                        return score;
                    } else {
                        rawScore = rawScore < itemsCount ? rawScore + 1 : itemsCount;
                        score = (rawScore / itemsCount) * weightage;
                        console.log(`New raw score: ${rawScore}`);
                        console.log(`New score (in %): ${score}`);
                    }
            }
            return {
                ...state,
                checklist: [
                    ...state.checklist.slice(0, cIndex),
                    {
                        ...state.checklist[cIndex],
                        weightage,
                        score,
                        subcategories: [
                            ...state.checklist[cIndex].subcategories.slice(0, sIndex),
                            {
                                ...state.checklist[cIndex].subcategories[sIndex],
                                lineItems: lineItems
                            },
                            ...state.checklist[cIndex].subcategories.slice(sIndex + 1)
                        ]
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