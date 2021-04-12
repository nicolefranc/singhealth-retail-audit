import { ADD_IMAGE, REMOVE_IMAGE, RESET_IMAGE_STATE, UPDATE_REMARKS, UPDATE_UPLOAD_STATUS } from "../redux-consts";

const imageReducer = (state= {}, action) => {
    switch(action.type) {
        case ADD_IMAGE:
            return addImage(state, action.payload);
        case REMOVE_IMAGE:
            return removeImage(state, action.payload);
        case UPDATE_REMARKS:
            return updateRemarks(state, action.payload);
        case UPDATE_UPLOAD_STATUS:
            return updateUploadStatus(state, action.payload);
        case RESET_IMAGE_STATE:
            return {};
        default:
            return state;
    }
}

const addImage = (state, payload) => {
    const { id, images, lineItem } = payload;
    console.log(state[id]);
    const newState = !state[id] ? { images, lineItem } : { ...state[id], images, lineItem };
    return {
        ...state,
        [id]: newState
    }
}

const removeImage = (state, payload) => {
    const { id, index } = payload;
    const images = state[id].images.filter((img, idx) => index !== idx);
    const links = state[id].links?.filter((img, idx) => index !== idx);

    return {
        ...state,
        [id]: { ...state[id], images, links }
    }
}

const updateRemarks = (state, payload) => {
    const { id, remarks } = payload;
    const newState = !state[id] ? { remarks } : { ...state[id], remarks };
    return {
        ...state,
        [id]: newState
    }
}

const updateUploadStatus = (state, payload) => {
    const { id, images } = payload;
    let links = images.map(image => image.uri);
    const newState = !state[id] ? { links, uploaded: true } : { ...state[id], links, upload: true };
    return {
        ...state,
        [id]: newState
    }
}

export default imageReducer;