const initialState = [];

export const TaskReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TASK':
            return[
                ...state,
                action.payload
            ];
        case 'UPDATE_TASK':
            return [
                ...state.map(task => {
                    if(task.id !== action.payload.id){
                        return task;
                    }else{
                        return action.payload;
                    }
                })
            ];
        case 'REORDER':
            return state;
        case 'DELETE_TASK':
            return [
                ...state.filter(task => task.id !== action.payload)
            ];
        default:
            return state;
    }
};