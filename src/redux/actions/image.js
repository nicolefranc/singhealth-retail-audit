import { ADD_IMAGE, REMOVE_IMAGE } from "../redux-consts"

export const addImage = (id, images) => (dispatch) => {
    dispatch({
        type: ADD_IMAGE,
        payload: { id, images },
    })
}

export const removeImage = (id, index) => (dispatch) => {
    dispatch({
        type: REMOVE_IMAGE,
        payload: { id, index },
    })
}