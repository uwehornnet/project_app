const initialState = [];

export const CustomerReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_CUSTOMER':
            return [
                ...state,
                action.payload
            ];
        default:
            return [
                ...state
            ]
    }
};