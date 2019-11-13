const initialState = [];

export const TemplateReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TEMPLATE':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
}