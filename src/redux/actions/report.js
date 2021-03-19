import { INIT_NEW_REPORT, TOGGLE_COMPLIANT } from "../redux-consts"

// TODO: Implement save to localstorage
export const initReport = (report) => (dispatch) => {
    dispatch({
        type: INIT_NEW_REPORT,
        payload: report
    });
};

export const toggleCompliant = (cIndex, sIndex, compliance, compliantCount, totalCount, lineItems) => (dispatch) => {
    // console.log(`Action: ${cIndex}, ${sIndex}`)
    dispatch({
        type: TOGGLE_COMPLIANT,
        payload: {
            cIndex,
            sIndex,
            compliance,
            compliantCount,
            totalCount,
            lineItems
        }
    });
};