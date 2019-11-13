const initialState = [];

export const ListReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_LIST':
            return [
                ...state,
                action.payload
            ];
        case 'UPDATE_LIST':
            return [
                ...state.map(list => {
                    if(list.id !== action.payload.id){
                        return list;
                    }else{
                        return action.payload
                    }
                })
            ];
        default:
            return state;
    }
};