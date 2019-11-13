export const handleProjectCardDrop = (source, destination, draggableId, board, callback) => {
    const newBoard = {
        ...board,
        columns: Array.from(board.columns)
    };

    if(source.droppableId === destination.droppableId){
        const reorderedItems = Array.from(newBoard.columns.find(column => column.id === source.droppableId).items);

        reorderedItems.splice(source.index, 1);
        reorderedItems.splice(destination.index, 0, draggableId);

        newBoard['columns'] = [
            ...newBoard.columns.map(column => {
                if (column.id !== source.droppableId) {
                    return column;
                } else {
                    const newColumn = {
                        ...column,
                        items: reorderedItems
                    };
                    return newColumn
                }
            })
        ];
    }else{
        newBoard['columns'] = [
            ...newBoard.columns.map(column => {
                if (column.id === source.droppableId) {
                    // remove from source
                    const newItems = Array.from(column.items);
                    newItems.splice(source.index, 1);

                    const sourceColumn = {
                        ...column
                    };

                    sourceColumn['items'] = newItems;

                    return sourceColumn;
                } else if(column.id === destination.droppableId){
                    // add to destination
                    const newItems = Array.from(column.items);
                    newItems.splice(destination.index, 0, draggableId);

                    const destinationColumn = {
                        ...column
                    };

                    destinationColumn['items'] = newItems;

                    return destinationColumn;
                }else{
                    return column;
                }
            })
        ];

    }

    callback(newBoard);
};

export const handleColumnDrop = (source, destination, draggableId, board, callback) => {
    const newColumns = Array.from(board.columns);
    const draggedColumn = board.columns.find(column => column.id === draggableId);

    newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, draggedColumn);

    const newBoard = {
        ...board,
        columns: [
            ...newColumns
        ]
    };
    callback(newBoard)
};