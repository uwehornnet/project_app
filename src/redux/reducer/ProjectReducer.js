const initialState = [];

export const ProjectReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_PROJECT':
            return[
                ...state,
                action.payload
            ];
        case 'ADD_TAG':
            return [
                ...state.map(project => {
                    if(project.id !== action.payload.id){
                        return project;
                    }else{

                        const oldTags = project.tags ? project.tags : [];

                        return {
                            ...project,
                            tags: [
                                ...oldTags,
                                action.payload.tag
                            ]
                        };
                    }
                })
            ];
        case 'UPDATE_PROJECT':
            return[
                ...state.map(project => {
                    if(project.id !== action.payload.id){
                        return project;
                    }else{
                        return action.payload;
                    }
                })
            ];
        case 'DELETE_PROJECT':
            return[
                ...state.filter(project => project.id !== action.payload)
            ];
        default:
            return state;
    }
};