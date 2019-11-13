import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {backgroundColor, boardBackgroundColor, color, dark, modalBackgroundColor, primary, white} from "../misc/Theme";
import moment from "moment";
import {connect} from "react-redux";
import Card from "../components/Card";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TaskModal from "../components/TaskModal";
import {truncate} from "../helpers";
import {ActionButton} from "../components/ActionButton";
import {MegaMenu} from "../components/MegaMenu";
import {Switch} from "../components/Switch";

const View = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px 16px 16px 86px;
    background: ${backgroundColor};
`;

const ToolBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 40px;
`;

const Container = styled.div`
    flex: 1;
`;

const Title = styled.div`
    color: rgba(${color}, 1);
    
    svg{
        fill: rgba(${color}, .7)
    }
`;

const Columns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

const Column = styled.div`
    align-self: stretch;
    height: 100%;
    flex: 1;
`;

const Boards = styled.div`
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    overflow-x: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
`;

const Board = styled.div`
    background: rgba(${boardBackgroundColor}, .25);
    border-radius: 4px;
    min-width: 260px;
    max-width: 260px;
    margin-right: 8px;
    align-self: flex-start;
    
    span{
        display: block;
        padding: 4px;
        color: rgba(${color}, .3);
        border-radius: 4px;
    }
`;

const Header = styled.div`
    font-size: 1.2rem;
    color: rgba(${color}, .7);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    svg{
        display: block;
        height: 16px;
        width: auto;
        fill: rgba(${color}, .7);
        margin-right: 8px;
    }
`;

const Body = styled.div`
    position: relative;
    max-height: calc(100vh - 200px);
    overflow-y: scroll;
    padding: 8px;
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

const Footer  =styled.div`
    padding: 0px 8px 8px 8px;
`;

const Inner = styled.div`
    color: rgba(${color}, .7);
    position: absolute;
    z-index: 999;
    background: ${modalBackgroundColor};
    box-shadow: 0px 2px 9px -6px rgba(${dark}, .3);
    padding: 8px;
    border-radius: 4px;
    min-width: 200px;
    top: 32px;
    right: 0px;

    label{
        display: block;
        font-size: .9rem;
        color: rgba(${color}, .2);
        margin-bottom: 4px;
        margin-top: 8px;
    }
    
    svg{
        height: 14px;
        width: auto;
        display: block;
    }
    
    .item{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        border-radius: 4px;
        color: rgba(${color}, .7);
        
        svg{
            height: 14px;
            width: auto;
            display: block;
            fill: rgba(${color}, .4);
            margin-right: 8px;
        }
        
        &:hover{
            color: rgba(${primary}, 1);
            background: rgba(${primary}, .1);
            svg{
                fill: rgba(${primary}, 1);
            }
        }
    }
`;

const Schedule = ({projects, tasks, boards, add_column, update_board, update_task}) => {

    const width = 180;
    const array = [];
    const start = moment().subtract(1, 'month').startOf('month');
    const end = moment().endOf('month');
    while(start <= end){
        array.push(start.format('YYYY-MM-DD'));
        start.add(1, 'days');
    }

    const [dragging, setDragging] = useState(false);
    const [filter, setFilter] = useState(projects.map(project => project.id));
    const [completedTasks, showCompletedTasks] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [inbox, showInbox] = useState(false);
    const [currentTask, setCurrentTask] = useState(false);
    const [dates, setDates] = useState(array);
    const [menu, showMenu] = useState(false);
    const scrollContainer = useRef();

    useEffect(() => {
        if(scrollContainer && !scrolled){
            scrollContainer.current.scrollLeft = (width + 8) * Math.abs(moment().diff(dates[0], 'days'));

            setScrolled(true)
        }
    }, [dates]);

    const onScroll = (e) => {
        if(!dragging){
            e.persist();
            const scrollWidth = e.target.scrollWidth - e.target.offsetWidth;
            const scrolled = e.target.scrollLeft;

            if(scrollWidth - scrolled < 1000){
                const start = moment(dates[dates.length - 1]).add(1, 'month').startOf('month');
                const end = moment(dates[dates.length - 1]).add(1, 'month').endOf('month');
                const add = [];
                while(start <= end){
                    add.push(start.format('YYYY-MM-DD'));
                    start.add(1, 'days');
                }

                setDates(dates.concat(add))
            }
        }
    };

    const onDragEnd = ({source, destination, draggableId}) => {
        if(!destination){
            return;
        }

        setDragging(false);

        const board = {
            ...boards.find(board => board.id === 'scheduled')
        };

        const newBoard = {
            ...board,
            columns: Array.from(board.columns)
        };


        if(!newBoard.columns.find(column => column.id === destination.droppableId)){

            newBoard['columns'] = [
                ...newBoard.columns,
                {
                    id: destination.droppableId,
                    items: []
                }
            ]
        }

        if(source.droppableId === destination.droppableId && source.droppableId.toLowerCase() !== 'inbox'){
            newBoard['columns'] = [
                ...newBoard.columns.map(column => {
                    if(column.id !== source.droppableId){
                        return column;
                    }else{
                        const newColumn = {
                            ...column
                        };

                        const items = Array.from(column.items);
                        items.splice(source.index, 1);
                        items.splice(destination.index, 0, draggableId);

                        newColumn['items'] = items;

                        return newColumn;
                    }
                })
            ]
        }else if(destination.droppableId.toLowerCase() === 'inbox'){
            newBoard['columns'] = [
                ...newBoard.columns.map(column => {
                    if(column.id !== source.droppableId){
                        return column;
                    }else{
                        const newColumn = {
                            ...column
                        };

                        const items = Array.from(column.items);
                        items.splice(source.index, 1);
                        newColumn['items'] = items;
                        return newColumn;
                    }
                })
            ]

        }else{
            newBoard['columns'] = [
                ...newBoard.columns.map(column => {
                    if(column.id === source.droppableId){
                        // remove from source
                        const newItems = Array.from(column.items);
                        newItems.splice(source.index, 1);

                        return {
                            ...column,
                            items: newItems
                        };
                    }else if(column.id === destination.droppableId){

                        const newItems = Array.from(column.items);
                        newItems.splice(destination.index, 0, draggableId);

                        return {
                            ...column,
                            items: newItems
                        };
                    }else{
                        return column;
                    }
                })
            ]

        }

        update_board(newBoard);

        update_task({
            ...tasks.find(task => task.id === draggableId),
            scheduled: destination.droppableId.toLowerCase() === 'inbox' ? null : destination.droppableId
        })

    };

    const humanDate = (date) => {
        if(moment().format('YYYY-MM-DD') === date){
            return(
                <div>
                    <small
                        style={{
                            display: 'block',
                            fontSize: '0.8rem'
                        }}
                    >{moment(date).format('DD.MMMM YYYY')}</small>
                    <strong
                        style={{
                            fontWeight: 'normal'
                        }}
                    >Today</strong>
                </div>
            );
        }else{
            return(
                <div>
                    <small
                        style={{
                            display: 'block',
                            fontSize: '0.8rem'
                        }}
                    >{moment(date).format('DD.MMMM YYYY')}</small>
                    <strong
                        style={{
                            fontWeight: 'normal'
                        }}
                    >Tomorrow</strong>
                </div>
            );
        }
    };

    if(completedTasks){
        tasks = tasks.filter(task => !task.done);
    }

    return(
        <View>
            <ToolBar>
                <Title
                    style={{margin: '0px 16px 0px 8px', fontSize: '1.2rem', display: 'flex', alignItems: 'center'}}
                >
                    <span
                        onClick={() => showInbox(!inbox)}
                    >
                        <svg viewBox="0 0 438.533 438.533" style={{height: '14px', width: 'auto', display: 'block', marginRight: 8,}}><path d="m431.398 210.987-67.954-157.599c-1.903-4.762-5.373-8.757-10.421-11.991-5.041-3.239-10.037-4.854-14.985-4.854h-237.539c-4.949 0-9.945 1.615-14.987 4.854-5.042 3.234-8.52 7.229-10.422 11.991l-67.953 157.599c-4.759 11.611-7.137 23.315-7.137 35.115v137.618c0 4.949 1.807 9.23 5.424 12.848 3.619 3.613 7.902 5.424 12.851 5.424h401.991c4.948 0 9.229-1.811 12.847-5.424 3.614-3.617 5.421-7.898 5.421-12.848v-137.618c-.001-11.8-2.373-23.504-7.136-35.115zm-139.327 26.552-27.113 54.819h-91.367l-27.123-54.819h-90.221c.193-.38.428-1.14.715-2.282.287-1.14.525-1.903.715-2.283l60.526-141.607h202.138l60.521 141.607c.194.575.431 1.335.711 2.283.288.947.524 1.707.719 2.282z"/></svg>
                    </span>

                    Schedule your tasks ...
                </Title>
                <div
                    style={{display: 'flex'}}
                >
                    <MegaMenu
                        open={menu}
                        onClick={() => showMenu(!menu)}
                        label={<svg viewBox="0 0 408 408"><path d="m51 153c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zm306 0c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zm-153 0c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51z"/></svg>}
                    >
                        {menu ? (
                            <Inner>
                                <label>Toggle Projects</label>
                                {projects && projects.map(project => {
                                    return (
                                        <span key={project.id} className={'item'} onClick={() => {
                                            if(filter.includes(project.id)){
                                                setFilter([
                                                    ...filter.filter(id => id !== project.id)
                                                ])
                                            }else{
                                                setFilter([
                                                    ...filter,
                                                    project.id
                                                ])
                                            }
                                        }}>
                                            {truncate(project.name, 18)}

                                            <Switch checked={filter.includes(project.id)}/>
                                        </span>
                                    )
                                })}
                                <label>Filter Tasks</label>
                                <span className={'item'} onClick={() => {
                                    showCompletedTasks(!completedTasks)
                                }}>
                                    hide completed tasks
                                    <Switch checked={completedTasks}/>
                                </span>
                            </Inner>
                        ) : null}
                    </MegaMenu>
                </div>
            </ToolBar>
            <Container>
                <DragDropContext
                    onDragStart={() => {
                        setDragging(true)
                    }}
                    onDragUpdate={() => {}}
                    onDragEnd={onDragEnd}
                >
                    <Columns>
                        {inbox ? (
                            <Column style={{
                                maxWidth: width,
                                minWidth: width,
                                marginRight: 16,
                                alignSelf: 'stretch'
                            }}>
                                <Board
                                    style={{
                                        minWidth: width,
                                        maxWidth: width,
                                        background: `rgba(${dark}, .025)`,
                                        alignSelf: 'stretch',
                                        height: '100%'
                                    }}
                                >
                                    <Header>
                                        <svg viewBox="0 0 438.533 438.533"><path d="m431.398 210.987-67.954-157.599c-1.903-4.762-5.373-8.757-10.421-11.991-5.041-3.239-10.037-4.854-14.985-4.854h-237.539c-4.949 0-9.945 1.615-14.987 4.854-5.042 3.234-8.52 7.229-10.422 11.991l-67.953 157.599c-4.759 11.611-7.137 23.315-7.137 35.115v137.618c0 4.949 1.807 9.23 5.424 12.848 3.619 3.613 7.902 5.424 12.851 5.424h401.991c4.948 0 9.229-1.811 12.847-5.424 3.614-3.617 5.421-7.898 5.421-12.848v-137.618c-.001-11.8-2.373-23.504-7.136-35.115zm-139.327 26.552-27.113 54.819h-91.367l-27.123-54.819h-90.221c.193-.38.428-1.14.715-2.282.287-1.14.525-1.903.715-2.283l60.526-141.607h202.138l60.521 141.607c.194.575.431 1.335.711 2.283.288.947.524 1.707.719 2.282z"/></svg>
                                        Inbox
                                    </Header>
                                    <Droppable
                                        droppableId={'inbox'}
                                    >
                                        {(provided) => (
                                            <Body
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {tasks && tasks.filter(task => !task.scheduled && filter.includes(task.project)).map((task, index) => (
                                                    <Draggable
                                                        key={task.id}
                                                        index={index}
                                                        draggableId={task.id}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <Card
                                                                schedule
                                                                isDragging={snapshot.isDragging}
                                                                provided={provided}
                                                                innerRef={provided.innerRef}
                                                                task={task}
                                                                onClick={() => setCurrentTask(task)}
                                                            />
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Body>
                                        )}
                                    </Droppable>

                                </Board>
                            </Column>
                        ) : null}
                        <Column>
                            <Boards
                                ref={scrollContainer}
                                onScroll={onScroll}
                                style={{
                                    maxWidth: inbox ? 'calc(100vw - 300px)' : 'calc(100vw - 102px)'
                                }}
                            >
                                {dates.map((date, index) => {
                                    const scheduled = boards.find(board => board.id === 'scheduled');
                                    const column = scheduled.columns.find(column => column.id === date);

                                    return (
                                        <Board
                                            key={date}
                                            style={{
                                                minWidth: width,
                                                maxWidth: width
                                            }}
                                        >
                                            <Header
                                                style={{
                                                    background: moment().format('YYYY-MM-DD') === date ? `rgba(${primary}, 1)` : null,
                                                    color: moment().format('YYYY-MM-DD') === date ? `rgba(${white}, 1)` : null
                                                }}
                                            >
                                                {moment().format('YYYY-MM-DD') === date || moment().add(1, 'days').format('YYYY-MM-DD') === date ? humanDate(date) : (
                                                    <div>
                                                        <small
                                                            style={{
                                                                display: 'block',
                                                                fontSize: '0.8rem'
                                                            }}
                                                        >{moment(date).format('DD.MMMM YYYY')}</small>
                                                        <strong
                                                            style={{
                                                                fontWeight: 'normal'
                                                            }}
                                                        >{moment(date).format('dddd')}</strong>
                                                    </div>
                                                )}
                                            </Header>

                                            <Droppable
                                                droppableId={date}
                                            >
                                                {(provided) => (
                                                    <Body
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        {column && column.items.map((id, index) => {
                                                            const task = tasks.find(task => task.id === id);

                                                            if(task && filter.includes(task.project)){
                                                                return (
                                                                    <Draggable
                                                                        key={id}
                                                                        index={index}
                                                                        draggableId={id}
                                                                    >
                                                                        {(provided, snapshot) => (
                                                                            <Card
                                                                                schedule
                                                                                isDragging={snapshot.isDragging}
                                                                                provided={provided}
                                                                                innerRef={provided.innerRef}
                                                                                task={task}
                                                                                onClick={() => setCurrentTask(task)}
                                                                            />
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            }

                                                        })}
                                                        {provided.placeholder}
                                                    </Body>
                                                )}
                                            </Droppable>
                                            {/*<Footer>*/}
                                            {/*    <ActionButton*/}
                                            {/*        style={{maxWidth: '180px'}}*/}
                                            {/*        placeholder={'add task ...'}*/}
                                            {/*        onSave={(value) => {*/}
                                            {/*            if(value !== ''){*/}

                                            {/*            }*/}
                                            {/*        }}*/}
                                            {/*    />*/}
                                            {/*</Footer>*/}
                                        </Board>
                                    )
                                })}
                            </Boards>
                        </Column>
                    </Columns>
                </DragDropContext>

            </Container>

            <TaskModal open={currentTask} toggle={() => setCurrentTask(false)} id={currentTask.id}/>

        </View>
    );
};

const mapStateToProps = state => ({
    boards: state.boards,
    tasks: state.tasks,
    projects: state.projects
});

const mapDispatchToProps = dispatch => ({
    add_column: column => dispatch({
        type: 'ADD_COLUMN',
        payload: column
    }),
    update_board: board => dispatch({
        type: 'UPDATE_BOARD',
        payload: board
    }),
    update_task: task => dispatch({
        type: 'UPDATE_TASK',
        payload: task
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);