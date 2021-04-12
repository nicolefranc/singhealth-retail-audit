import { ADD_IMAGE, REMOVE_IMAGE, RESET_IMAGE_STATE, UPDATE_REMARKS, UPDATE_UPLOAD_STATUS } from "../redux-consts"

export const addImage = (id, images, lineItem) => (dispatch) => {
    dispatch({
        type: ADD_IMAGE,
        payload: { id, images, lineItem },
    })
}

export const removeImage = (id, index) => (dispatch) => {
    dispatch({
        type: REMOVE_IMAGE,
        payload: { id, index },
    })
}

export const updateRemarks = (id, remarks) => (dispatch) => {
    dispatch({
        type: UPDATE_REMARKS,
        payload: { id, remarks }
    })
}

export const updateUploadStatus = (id, images) => (dispatch) => {
    dispatch({
        type: UPDATE_UPLOAD_STATUS,
        payload: { id, images }
    })
}

export const resetImage = () => dispatch => {
    dispatch({ type: RESET_IMAGE_STATE })
}