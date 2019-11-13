const initialBoards = [
    {
        id: 'scheduled',
        name: 'scheduled',
        columns: []
    }
];

const initialState = [
    ...initialBoards
];

export const BoardReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_BOARD':
            return [
                ...state,
                action.payload
            ];
        case 'ADD_COLUMN':
            return [
                ...state.map(board => {
                    if(board.id !== action.payload.board){
                        return board;
                    }else{
                        return {
                            ...board,
                            columns: [
                                ...board.columns,
                                action.payload.column
                            ]
                        }
                    }
                })
            ];
        case 'ADD_BOARD_TASK':
            return [
                ...state.filter(board => board.project !== action.payload.project),
                ...state.filter(board => board.project === action.payload.project).map(board => {
                    if(board.id === action.payload.board || board.name === action.payload.board){
                        return {
                            ...board,
                            columns: [
                                ...board.columns.map(column => {
                                    if(column.id === action.payload.column || column.name === action.payload.column){
                                        return {
                                            ...column,
                                            items: [
                                                ...column.items,
                                                action.payload.item
                                            ]
                                        };
                                    }else{
                                        return column
                                    }
                                })
                            ]
                        }
                    }else{
                        return {
                            ...board,
                            columns: [
                                ...board.columns.map(column => {
                                    if(column.name === 'inbox'){
                                        return {
                                            ...column,
                                            items: [
                                                ...column.items,
                                                action.payload.item
                                            ]
                                        }
                                    }else{
                                        return column
                                    }
                                })
                            ]
                        }
                    }
                })
            ];
        case 'UPDATE_BOARD':
            return [
                ...state.map(board => {
                    if(board.id !== action.payload.id){
                        return board;
                    }else{
                        const newBoard = {
                            ...action.payload
                        };

                        return newBoard;
                    }
                })
            ];
        case 'DELETE_BOARD':
            return [
                ...state.filter(board => board.id !== action.payload)
            ];
        default:
            return state;
    }
};