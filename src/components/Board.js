import React, {useState} from 'react';
import styled from "styled-components";
import {Draggable, Droppable} from "react-beautiful-dnd";
import Card from "./Card";
import {ActionButton} from "./ActionButton";
import {randomColor, uid} from "../helpers";
import {boardBackgroundColor, color} from "../misc/Theme";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Input} from "../misc/Form";

const Container = styled.div`
    background: rgba(${boardBackgroundColor}, .25);
    border-radius: 4px;
    min-width: 260px;
    max-width: 260px;
    margin-right: 16px;
    transition: background .3s ease;
    
    span{
        display: block;
        padding: 4px;
        color: rgba(${color}, .7);
        border-radius: 4px;
    }
`;

const Header = styled.div`
    font-size: 1.2rem;
    color: rgba(${color}, 1);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    svg{
        display: block;
        height: 16px;
        width: auto;
        fill: rgba(${color}, .7);
        margin-right: 8px;
    }
`;

const Body = styled.div`
    padding: 8px;
    position: relative;
    max-height: calc(100vh - 200px);
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    
    span{
        display: block;
        text-align: center;
        color: rgba(${color}, .3);
        padding: 4px;
    }
`;

const Footer = styled.div`
    padding: 0px 8px 8px 8px;
`;

const Board = ({board, column, index, tasks, onClick, add_task, add_board_task, update_board, match}) => {

    const [name, setName] = useState(column.name);
    const [form, showForm] = useState(false);

    const submitForm = () => {
        const id = column.id;

        update_board({
            ...board,
            columns: [
                ...board.columns.map(column => {
                    if(column.id !== id){
                        return column;
                    }else{
                        return {
                            ...column,
                            name: name
                        }
                    }
                })
            ]
        })
    }

    return (
    <Draggable
        draggableId={column.id}
        index={index}
    >
        {(provided, snapshot) => (
            <Container
                isDragging={snapshot.isDragging}
                {...provided.draggableProps}
                ref={provided.innerRef}
            >
                <Header
                    {...provided.dragHandleProps}
                >
                    {column && column.name.toLowerCase() === 'inbox' ? (
                        <svg viewBox="0 0 438.533 438.533"><path d="m431.398 210.987-67.954-157.599c-1.903-4.762-5.373-8.757-10.421-11.991-5.041-3.239-10.037-4.854-14.985-4.854h-237.539c-4.949 0-9.945 1.615-14.987 4.854-5.042 3.234-8.52 7.229-10.422 11.991l-67.953 157.599c-4.759 11.611-7.137 23.315-7.137 35.115v137.618c0 4.949 1.807 9.23 5.424 12.848 3.619 3.613 7.902 5.424 12.851 5.424h401.991c4.948 0 9.229-1.811 12.847-5.424 3.614-3.617 5.421-7.898 5.421-12.848v-137.618c-.001-11.8-2.373-23.504-7.136-35.115zm-139.327 26.552-27.113 54.819h-91.367l-27.123-54.819h-90.221c.193-.38.428-1.14.715-2.282.287-1.14.525-1.903.715-2.283l60.526-141.607h202.138l60.521 141.607c.194.575.431 1.335.711 2.283.288.947.524 1.707.719 2.282z"/></svg>
                    ) : null}

                    {form ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if(name !== ''){
                                    submitForm()
                                }
                                showForm(!form)
                            }}
                        >
                            <Input
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => {
                                    if(name !== ''){
                                        submitForm()
                                    }
                                    showForm(!form)
                                }}
                            />
                        </form>
                    ) : (
                        <span
                            onClick={() => showForm(!form)}
                        >
                        {name}
                    </span>
                    )}
                </Header>

                <Droppable
                    droppableId={column && column.id}
                    type={'cards'}
                >
                    {(provided) => (
                        <Body
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {column && column.items.map((id, index) => {
                                const task = tasks.find(task => task.id === id);
                                if(task) {
                                    return (
                                        <Draggable
                                            key={id}
                                            index={index}
                                            draggableId={id}
                                        >
                                            {(provided, snapshot) => (
                                                <Card
                                                    provided={provided}
                                                    innerRef={provided.innerRef}
                                                    task={task}
                                                    onClick={() => onClick(task)}
                                                    isDragging={snapshot.isDragging}
                                                />
                                            )}
                                        </Draggable>
                                    );
                                }else{
                                    return null;
                                }
                            })
                            }
                            {provided.placeholder}
                        </Body>
                    )}

                </Droppable>
                <Footer>
                    <ActionButton placeholder={'add task ...'} onSave={(value) => {
                        if(value !== ''){

                            const task = {
                                id: uid(),
                                project: match.params.id,
                                name: value,
                                color: randomColor(),
                                createdAt: new Date()
                            };

                            add_task(task);

                            add_board_task({
                                project: match.params.id,
                                board: board.id,
                                column: column.id,
                                item: task.id
                            })
                        }
                    }}/>
                </Footer>

            </Container>
        )}
    </Draggable>
    );
};

const mapStateToProps = state => ({
    tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
    add_task: task => dispatch({
        type: 'ADD_TASK',
        payload: task
    }),
    add_board_task: data => dispatch({
        type: 'ADD_BOARD_TASK',
        payload: data
    }),
    update_board: board => dispatch({
        type: 'UPDATE_BOARD',
        payload: board
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Board))