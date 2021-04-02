import { INIT_NEW_REPORT, RESET_REPORT_STATE, TOGGLE_COMPLIANT, UPDATE_AUDIT_DETAILS } from "../redux-consts"

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

export const updateAuditDetails = (key, value) => dispatch => {
    dispatch({
        type: UPDATE_AUDIT_DETAILS,
        payload: { key, value }
    })
}

export const resetReport = () => dispatch => {
    dispatch({ type: RESET_REPORT_STATE });
}