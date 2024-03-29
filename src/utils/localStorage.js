export const loadState = () => {
    console.log('Loading state');
    try {
        const serializedState = localStorage.getItem('state');
        // console.log(serializedState);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // TODO: Handle write errors.
    }
}