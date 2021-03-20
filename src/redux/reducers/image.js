import { ADD_IMAGE, REMOVE_IMAGE, UPDATE_REMARKS } from "../redux-consts";

const imageReducer = (state= {}, action) => {
    switch(action.type) {
        case ADD_IMAGE:
            return addImage(state, action.payload);
        case REMOVE_IMAGE:
            return removeImage(state, action.payload);
        case UPDATE_REMARKS:
            return updateRemarks(state, action.payload);
        default:
            return state;
    }
}

const addImage = (state, payload) => {
    const { id, images } = payload;
    return {
        ...state,
        [id]: { images }
    }
}

const removeImage = (state, payload) => {
    const { id, index } = payload;
    const images = state[id].images.filter((img, idx) => index !== idx);

    return {
        ...state,
        [id]: { images }
    }
}

const updateRemarks = (state, payload) => {
    const { id, remarks } = payload;
    return {
        ...state,
        [id]: { remarks, images: state[id]?.images }
    }
}

export default imageReducer;