const initialState = [];

export const TimerReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TIME':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};