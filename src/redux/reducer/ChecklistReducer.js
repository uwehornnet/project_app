const initialState = [];

export const ChecklistReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_CHECKLIST':
            return [
                ...state,
                action.payload
            ];
        case 'UPDATE_CHECKLIST':
            return [
                ...state.map(checklist => {
                    if(checklist.id !== action.payload.id){
                        return checklist;
                    }else{
                        return action.payload;
                    }
                })
            ];
        case 'DELETE_CHECKLIST':
            return [
                ...state.filter(checklist => checklist.id !== action.payload)
            ];
        default:
            return state;
    }
};