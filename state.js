const State = (defs) => {
    const cbs = [];
    let state = {
        ...(defs || {}),
    };

    const onStateChange = () => {
        cbs.forEach((cb) => cb(state));
    };

    return {
        get: () => state,
        set: (vals) => {
            state = {
                ...vals,
            };
            onStateChange();
        },
        update: (key, val) => {
            state = {
                ...state,
                [key]: val,
            };
            onStateChange();
        },
        addListener: (cb) => {
            cbs.push(cb);
            onStateChange();
        },
    };
};

export default State;
