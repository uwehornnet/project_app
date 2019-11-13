import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Checkbox, Input} from "../misc/Form";
import {backgroundColor, dark, color, modalBackgroundColor, inputBackgroundColor} from "../misc/Theme";
import {uid} from "../helpers";
import {connect} from "react-redux";
import {ProgressBar} from "./ProgressBar";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {ActionButton} from "./ActionButton";

const Container = styled.div`
    position: relative;
    margin-top: 24px;
    
    .button{
        color: rgba(${color}, .5);
        padding: 4px;
        background: transparent;
        margin-top: 16px;
        border-radius: 4px;
        display: inline-block;
        
        &:hover{
            background: rgba(${dark}, .1);
        }
    }
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .trash{
        margin-right: 8px;
    
        svg{
            height: 12px;
            width: auto;
            display: block;
            fill: rgba(${color}, .4)
        }
    }
    
    .toggle{
        color: rgba(${color}, .4);
        white-space: pre;
        margin-right: 8px;
    }
`;

const List = styled.div`
    position: relative;
`;

const Todo = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px;
    background: ${inputBackgroundColor};
    border-radius: 4px;
    margin-top: 8px;
    color: ${props => props.done ? `rgba(${color}, .2)` : `rgba(${color}, .5)`};
    text-decoration: ${props => props.done ? 'line-through' : 'none'};
    
    &:hover{
       
    }
`;

const TodoTitle = ({title, onSave}) => {
    const [form, showForm] = useState(false);
    const [value, setValue] = useState(title);

    const onSubmit = (e) => {
        e.preventDefault();
        if(value !== ''){
            onSave(value);
        }
        showForm(false);
    };

    let render = (
        <span
            style={{
                flex: 1
            }}
            onClick={() => showForm(!form)}
        >
            {value}
        </span>
    );

    if(form) {
        render = (
            <form onSubmit={onSubmit}>
                <Input
                    autoFocus
                    value={value}
                    onChange={(e) => {setValue(e.target.value)}}
                    onBlur={onSubmit}
                    style={{
                        height: 'auto',
                        padding: 0,
                        background: inputBackgroundColor,
                        border: 'none'
                    }}
                />
            </form>
        );
    }


    return (
        render
    );
};

const Todolist = ({id, checklists, update_checklist, delete_checklist}) => {
    const [checklist, setChecklist] = useState(false);
    const [name, setName] = useState('');
    const [form, showForm] = useState(false);
    const [value, setValue] = useState('');
    const [completed, showCompleted] = useState(false);

    useEffect(() => {
        setChecklist(id && checklists.find(checklist => checklist.id === id));
    });

    useEffect(() => {
        setName(checklist ? checklist.name : '');
    }, [checklist]);

    const addListEntries = (e) => {
        e.preventDefault();
        if(value === ''){
            setValue('');
            showForm(false);
            return;
        }
        update_checklist({
            ...checklist,
            items: [
                ...checklist.items,
                {
                    id: uid(),
                    name: value,
                    done: false
                }
            ]
        });

        setValue('');
    };

    let render = (
        <span className={'button'} onClick={() => showForm(!form)}>new item ...</span>
    );

    if(form) {
        render = (
            <form onSubmit={addListEntries} style={{marginTop: 16}}>
                <Input
                    value={value}
                    autoFocus
                    placeholder={'What needs to be done?'}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={addListEntries}
                />
            </form>
        );
    }

    const onDragEnd = ({source, destination, draggableId}) => {
        if(!destination){
            return;
        }

        const newItems = Array.from(checklist.items.filter(item => item.id !== draggableId));
        const entry = checklist.items.find(item => item.id === draggableId);
        newItems.splice(destination.index, 0, entry);

        const newChecklist = {
            ...checklist,
            items: [
                ...newItems
            ]
        };
        update_checklist(newChecklist)

    }

    return (
        <Container>
            <DragDropContext
                onDragStart={() => {}}
                onDragUpdate={() => {}}
                onDragEnd={onDragEnd}
            >
                <FlexContainer>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={'Give your Checklist a name ...'}
                        onBlur={() => {
                            if(name !== ''){
                                update_checklist({
                                    ...checklist,
                                    name: name
                                })
                            }
                        }}
                        style={{
                            border: 'none',
                            fontSize: '1.1rem',
                            color: `rgba(${color}, .7)`,
                            background: modalBackgroundColor,
                            marginRight: 16
                        }}
                    />

                    <FlexContainer>
                        <span className={'toggle'} onClick={() => showCompleted(!completed)}>
                            {completed ? 'hide completed' : 'show completed'}
                        </span>
                        <span className={'trash'} onClick={() => delete_checklist(checklist && checklist.id)}>
                            <svg viewBox="0 0 438.529 438.529"><path d="m417.689 75.654c-1.711-1.709-3.901-2.568-6.563-2.568h-88.224l-19.985-47.676c-2.854-7.044-7.994-13.04-15.413-17.989-7.426-4.948-14.948-7.421-22.559-7.421h-91.363c-7.611 0-15.131 2.473-22.554 7.421-7.424 4.949-12.563 10.944-15.419 17.989l-19.985 47.676h-88.22c-2.667 0-4.853.859-6.567 2.568-1.709 1.713-2.568 3.903-2.568 6.567v18.274c0 2.664.855 4.854 2.568 6.564 1.714 1.712 3.904 2.568 6.567 2.568h27.406v271.8c0 15.803 4.473 29.266 13.418 40.398 8.947 11.139 19.701 16.703 32.264 16.703h237.542c12.566 0 23.319-5.756 32.265-17.268 8.945-11.52 13.415-25.174 13.415-40.971v-270.662h27.411c2.662 0 4.853-.856 6.563-2.568 1.708-1.709 2.57-3.9 2.57-6.564v-18.274c.002-2.664-.861-4.854-2.569-6.567zm-248.388-35.976c1.331-1.712 2.95-2.762 4.853-3.14h90.504c1.903.381 3.525 1.43 4.854 3.14l13.709 33.404h-127.91zm177.872 340.613c0 4.186-.664 8.042-1.999 11.561-1.334 3.518-2.717 6.088-4.141 7.706-1.431 1.622-2.423 2.427-2.998 2.427h-237.542c-.571 0-1.565-.805-2.996-2.427-1.429-1.618-2.81-4.188-4.143-7.706-1.331-3.519-1.997-7.379-1.997-11.561v-270.664h255.815v270.664z"/><path d="m137.04 347.172h18.271c2.667 0 4.858-.855 6.567-2.567 1.709-1.718 2.568-3.901 2.568-6.57v-164.454c0-2.663-.859-4.853-2.568-6.567-1.714-1.709-3.899-2.565-6.567-2.565h-18.271c-2.667 0-4.854.855-6.567 2.565-1.711 1.714-2.568 3.904-2.568 6.567v164.454c0 2.669.854 4.853 2.568 6.57 1.713 1.711 3.9 2.567 6.567 2.567z"/><path d="m210.129 347.172h18.271c2.666 0 4.856-.855 6.564-2.567 1.718-1.718 2.569-3.901 2.569-6.57v-164.454c0-2.663-.852-4.853-2.569-6.567-1.708-1.709-3.898-2.565-6.564-2.565h-18.271c-2.664 0-4.854.855-6.567 2.565-1.714 1.714-2.568 3.904-2.568 6.567v164.454c0 2.669.854 4.853 2.568 6.57 1.712 1.711 3.903 2.567 6.567 2.567z"/><path d="m283.22 347.172h18.268c2.669 0 4.859-.855 6.57-2.567 1.711-1.718 2.562-3.901 2.562-6.57v-164.454c0-2.663-.852-4.853-2.562-6.567-1.711-1.709-3.901-2.565-6.57-2.565h-18.268c-2.67 0-4.853.855-6.571 2.565-1.711 1.714-2.566 3.904-2.566 6.567v164.454c0 2.669.855 4.853 2.566 6.57 1.718 1.711 3.901 2.567 6.571 2.567z"/></svg>
                        </span>
                    </FlexContainer>

                </FlexContainer>
                <Droppable
                    droppableId={id}
                >
                    {(provided) => (
                        <List
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {checklist && checklist.items.filter(item => !item.done).map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    index={index}
                                    draggableId={item.id}
                                >
                                    {(provided) => (
                                        <Todo
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            key={item.id}
                                            done={item.done}
                                        >
                                            <Checkbox
                                                checked={item.done}
                                                onChange={() => {
                                                    update_checklist({
                                                        ...checklist,
                                                        items: [
                                                            ...checklist.items.map(l => {
                                                                if(l.id !== item.id){
                                                                    return l;
                                                                }else{
                                                                    return {
                                                                        ...item,
                                                                        done: !item.done
                                                                    }
                                                                }
                                                            })
                                                        ]
                                                    })

                                                }}
                                            />
                                            <TodoTitle title={item.name} style={{flex: 1}} onSave={(name) => {

                                                const updatedList = {
                                                    ...checklist,
                                                    items: [
                                                        ...checklist.items.map(l => {
                                                            if(l.id !== item.id){
                                                                return l;
                                                            }else{
                                                                return {
                                                                    ...item,
                                                                    name: name
                                                                }
                                                            }
                                                        })
                                                    ]
                                                }

                                                console.log(updatedList)

                                                update_checklist(updatedList)
                                            }}/>
                                        </Todo>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {completed ? (
                                checklist && checklist.items.filter(item => item.done).map((item, index) => (
                                    <Todo
                                        key={item.id}
                                        done={item.done}
                                    >
                                        <Checkbox
                                            checked={item.done}
                                            onChange={() => {
                                                update_checklist({
                                                    ...checklist,
                                                    items: [
                                                        ...checklist.items.map(l => {
                                                            if(l.id !== item.id){
                                                                return l;
                                                            }else{
                                                                return {
                                                                    ...item,
                                                                    done: !item.done
                                                                }
                                                            }
                                                        })
                                                    ]
                                                })

                                            }}
                                        />
                                        <TodoTitle title={item.name} style={{flex: 1}} onSave={() => {}}/>
                                    </Todo>
                                ))
                            ) : null}


                        </List>
                    )}
                </Droppable>


                {render}
            </DragDropContext>
        </Container>
    );
};

const mapStateToProps = state => ({
    checklists: state.checklists
});

const mapDispatchToProps = dispatch => ({
    update_checklist: checklist => dispatch({
        type: 'UPDATE_CHECKLIST',
        payload: checklist
    }),
    delete_checklist: id => dispatch({
        type: 'DELETE_CHECKLIST',
        payload: id
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Todolist)