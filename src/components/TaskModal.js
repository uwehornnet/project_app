import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {ModalBody, ModalContainer, ModalHeader, ModalWrapper} from "../container/Modal";
import {ColorPicker, Input} from "../misc/Form";
import {DatePicker} from "./DatePicker";
import {uid, useOutsideAlerter} from "../helpers";
import styled from "styled-components";
import {dark, inputBackgroundColor, primary, white, color, modalBackgroundColor} from "../misc/Theme";
import Labeler from "./Labeler";
import {motion as animated} from "framer-motion";
import Todolist from "./Todolist";
import {TaskDescription} from "./TaskDescription";
import {ListCreator} from "./ListCreator";
import {Calendar} from '../misc/Icons';
import {TimeTracker} from "./TimeTracker";
import moment from "moment";
import {TimeEditor} from "./TimeEditor";


const Toolbar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: -24px -24px 24px -24px;
    padding: 8px 16px;
    background: rgba(${inputBackgroundColor}, .05)
`;

const Group = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.justify ? props.justify : 'space-between'};
    
    svg{
        display: block;
        height: 12px;
        width: auto;
        fill: rgba(${color}, .2);
        margin-right: 4px;
    }
`;

const Tag = styled(animated.div)`
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: .9rem;
    margin-right: 8px;
    display: flex;
    align-items: center;
    opacity: 0;
    position: relative;
    top: -10px;
    
    svg{
        fill: rgba(${color}, .4);
        height: 8px;
        width: auto;
        display: block;
        margin-left: 8px;
    }
`;

const PriorityList = styled.ul`
    list-style: none;
    padding: 0px;
    margin: 0px;
    position: absolute;
    top: 32px;
    left: 0px;
    background: ${modalBackgroundColor};
    color: ${color};
    min-width: 200px;
    border-radius: 4px;
    padding: 4px;
    
    li{
        list-style: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px;
        border-radius: 4px;
        background: transparent
        font-size: .9rem;
        white-space: pre;
        
        i{
            display: flex;
            flex-direction: row;
            min-width: 40px;
            
        }
        
        svg{
            height: 12px;
            width: auto;
            display: block;
            fill: rgba(${color}, 1);
        }
        
        &:hover{
            background: rgba(${primary}, .1);
            color: rgba(${primary}, 1);
            
            svg {
                fill: rgba(${primary}, 1);
            }
        }
    }
`;

const TaskModal = ({add_time, timer, checklists, add_checklist, id, tasks, open, toggle, update_task, deleteTask}) => {
    const elem = useRef();
    const [task, setTask] = useState(false);
    const [name, setName] = useState('');

    const [labelEditor, showLabelEditor] = useState(false);
    const [listCreator, showListCreator] = useState(false);
    const [timeEditor, showTimeEditor] = useState(false);
    const [priorityList, showPriorityList] = useState(false);

    let trackedTime = 0;
    timer.filter(time => time.task === id).forEach(time => {
       trackedTime += time.time
    });

    useOutsideAlerter(elem, open, () => {
        toggle();
        showLabelEditor(false);
        showListCreator(false);
    });

    useEffect(() => {
        setTask(tasks.find(task => task.id === id));
    }, [id, tasks]);

    useEffect(() => {
        setName(task ? task.name : '')
    }, [task]);


    return open && task ? (
        <ModalWrapper>
            <ModalContainer
                ref={elem}
                animate={{
                    opacity: 1,
                    margin: '10vh auto auto auto'
                }}
            >
                <ModalHeader style={{ padding: 8}} justify={'space-between'} color={task.color}>
                    <div>Edit Task ...</div>
                    <div style={{display: 'flex'}}>

                        <button className={'circleBtn'} onClick={() => {
                            if(!task.done && task.recording){
                                const recordedTime = task.recorded ? task.recorded + (moment().unix() - task.recording.started) : moment().unix() - task.recording.started

                                update_task({
                                    ...task,
                                    done: !task.done,
                                    recording: false,
                                    recorded: 0,
                                });

                                add_time({
                                    task: task.id,
                                    time: recordedTime,
                                    createdAt: new Date()
                                });
                            }else{
                                update_task({
                                    ...task,
                                    done: !task.done
                                });
                            }
                        }}>
                            <svg viewBox="0 0 448.8 448.8" fill={task.done ? '#26de81' : `rgba(${dark}, .2)`}><path d="m142.8 323.85-107.1-107.1-35.7 35.7 142.8 142.8 306-306-35.7-35.7z"/></svg>
                        </button>

                        <div style={{position: 'relative'}}>
                            <button className={'circleBtn'} onClick={() => showPriorityList(!priorityList)}>
                                {task.priority <= 2 || !task.priority? (
                                    <svg viewBox="0 0 50 50" fill={task.color ? task.color : `rgba(${primary}, 1)`}><path d="m21.714 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.45-.926 1.903.309 2.465.926c.561.617.842 1.381.842 2.291s-.281 1.663-.842 2.261c-.562.596-1.383.895-2.465.895s-1.898-.299-2.45-.895c-.551-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.019l-.39-31.357h5.831z"/></svg>
                                ) : null}
                                {task.priority === 3 ? (
                                    <>
                                        <svg viewBox="0 0 50 50" fill={task.color ? task.color : `rgba(${primary}, 1)`}><path d="m13.714 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.449-.926c1.083 0 1.904.309 2.465.926s.842 1.381.842 2.291-.281 1.663-.842 2.261c-.561.596-1.382.895-2.465.895-1.082 0-1.898-.299-2.449-.895-.551-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.02l-.39-31.357h5.831z"/><path d="m29.555 43.812c0-.91.274-1.674.826-2.291.551-.617 1.367-.926 2.449-.926s1.903.309 2.463.926c.562.617.842 1.381.842 2.291s-.28 1.663-.842 2.261c-.56.596-1.381.895-2.463.895s-1.898-.299-2.449-.895c-.552-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.021l-.39-31.357h5.83z"/></svg>
                                    </>
                                ) : null}
                                {task.priority === 4 ? (
                                    <>
                                        <svg viewBox="0 0 50 50" fill={task.color ? task.color : `rgba(${primary}, 1)`}><path d="m5.714 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.449-.926c1.083 0 1.904.309 2.465.926s.842 1.381.842 2.291-.281 1.663-.842 2.261c-.561.596-1.382.895-2.465.895-1.082 0-1.898-.299-2.449-.895-.551-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.02l-.389-31.357h5.831z"/><path d="m21.554 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.449-.926c1.082 0 1.904.309 2.463.926.562.617.842 1.381.842 2.291s-.28 1.663-.842 2.261c-.56.596-1.381.895-2.463.895s-1.898-.299-2.449-.895c-.551-.598-.826-1.351-.826-2.261zm5.621-9.58h-5.02l-.39-31.357h5.83z"/><path d="m37.393 43.812c0-.91.276-1.674.829-2.291.55-.617 1.366-.926 2.449-.926 1.08 0 1.903.309 2.462.926.562.617.842 1.381.842 2.291s-.279 1.663-.842 2.261c-.559.596-1.382.895-2.462.895-1.083 0-1.899-.299-2.449-.895-.553-.598-.829-1.351-.829-2.261zm5.623-9.58h-5.02l-.391-31.357h5.829z"/></svg>
                                    </>
                                ) : null}
                            </button>

                            {priorityList ? (
                                <PriorityList>
                                    <li onClick={() => {
                                        update_task({
                                            ...task,
                                            priority: 4
                                        })
                                        showPriorityList(!priorityList)
                                    }}>
                                        <i>
                                            <svg viewBox="0 0 50 50"><path d="m5.714 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.449-.926c1.083 0 1.904.309 2.465.926s.842 1.381.842 2.291-.281 1.663-.842 2.261c-.561.596-1.382.895-2.465.895-1.082 0-1.898-.299-2.449-.895-.551-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.02l-.389-31.357h5.831z"/><path d="m21.554 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.449-.926c1.082 0 1.904.309 2.463.926.562.617.842 1.381.842 2.291s-.28 1.663-.842 2.261c-.56.596-1.381.895-2.463.895s-1.898-.299-2.449-.895c-.551-.598-.826-1.351-.826-2.261zm5.621-9.58h-5.02l-.39-31.357h5.83z"/><path d="m37.393 43.812c0-.91.276-1.674.829-2.291.55-.617 1.366-.926 2.449-.926 1.08 0 1.903.309 2.462.926.562.617.842 1.381.842 2.291s-.279 1.663-.842 2.261c-.559.596-1.382.895-2.462.895-1.083 0-1.899-.299-2.449-.895-.553-.598-.829-1.351-.829-2.261zm5.623-9.58h-5.02l-.391-31.357h5.829z"/></svg>
                                        </i>

                                        Urgent and Important
                                    </li>

                                    <li onClick={() => {
                                        update_task({
                                            ...task,
                                            priority: 3
                                        })
                                        showPriorityList(!priorityList)
                                    }}>
                                        <i>
                                            <svg viewBox="0 0 50 50"><path d="m13.714 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.449-.926c1.083 0 1.904.309 2.465.926s.842 1.381.842 2.291-.281 1.663-.842 2.261c-.561.596-1.382.895-2.465.895-1.082 0-1.898-.299-2.449-.895-.551-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.02l-.39-31.357h5.831z"/><path d="m29.555 43.812c0-.91.274-1.674.826-2.291.551-.617 1.367-.926 2.449-.926s1.903.309 2.463.926c.562.617.842 1.381.842 2.291s-.28 1.663-.842 2.261c-.56.596-1.381.895-2.463.895s-1.898-.299-2.449-.895c-.552-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.021l-.39-31.357h5.83z"/></svg>
                                        </i>

                                        Important, but not urgent
                                    </li>

                                    <li
                                        onClick={() => {
                                            update_task({
                                                ...task,
                                                priority: 2
                                            })
                                            showPriorityList(!priorityList)
                                        }}
                                    >
                                        <i>
                                            <svg viewBox="0 0 50 50"><path d="m21.714 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.45-.926 1.903.309 2.465.926c.561.617.842 1.381.842 2.291s-.281 1.663-.842 2.261c-.562.596-1.383.895-2.465.895s-1.898-.299-2.45-.895c-.551-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.019l-.39-31.357h5.831z"/></svg>
                                        </i>

                                        Urgent, but not important
                                    </li>

                                    <li
                                        onClick={() => {
                                            update_task({
                                                ...task,
                                                priority: 1
                                            })
                                            showPriorityList(!priorityList)
                                        }}
                                    >
                                        <i>
                                        </i>

                                        Neither urgent nor important
                                    </li>
                                </PriorityList>
                            ) : null}
                        </div>

                        <div style={{position: 'relative'}}>
                            <button className={'circleBtn'} onClick={() => showListCreator(!listCreator)}>
                                <svg viewBox="0 0 60.123 60.123" fill={task.color ? task.color : `rgba(${primary}, 1)`}><path d="m57.124 51.893h-40.204c-1.657 0-3-1.343-3-3s1.343-3 3-3h40.203c1.657 0 3 1.343 3 3s-1.342 3-2.999 3z"/><path d="m57.124 33.062h-40.204c-1.657 0-3-1.343-3-3s1.343-3 3-3h40.203c1.657 0 3 1.343 3 3 .001 1.657-1.342 3-2.999 3z"/><path d="m57.124 14.231h-40.204c-1.657 0-3-1.343-3-3s1.343-3 3-3h40.203c1.657 0 3 1.343 3 3s-1.342 3-2.999 3z"/><circle cx="4.029" cy="11.463" r="4.029"/><circle cx="4.029" cy="30.062" r="4.029"/><circle cx="4.029" cy="48.661" r="4.029"/></svg>
                            </button>

                            <ListCreator
                                open={listCreator}
                                toggle={() => showListCreator(!listCreator)}
                                onSave={(checklistName) => add_checklist({
                                    id: uid(),
                                    name: checklistName,
                                    parent: task.id,
                                    items: [],
                                    createdAt: new Date()
                                })}
                            />
                        </div>

                        <div style={{position: 'relative'}}>
                            <button className={'circleBtn'} onClick={() => showLabelEditor(!labelEditor)}>
                                <svg viewBox="0 0 542.183 542.183" fill={task.color ? task.color : `rgba(${primary}, 1)`}><path d="m432.544 310.636c0-9.897-3.521-18.559-10.564-25.984l-204.136-203.852c-7.232-7.238-16.939-13.374-29.121-18.416-12.181-5.043-23.319-7.565-33.407-7.565h-118.771c-9.896 0-18.464 3.619-25.694 10.848-7.235 7.233-10.851 15.799-10.851 25.698v118.771c0 10.088 2.519 21.219 7.564 33.404 5.046 12.185 11.187 21.792 18.417 28.837l204.139 204.422c7.043 7.043 15.608 10.564 25.694 10.564 9.898 0 18.562-3.521 25.984-10.564l140.186-140.47c7.039-7.045 10.56-15.604 10.56-25.693zm-315.34-138.616c-7.139 7.138-15.752 10.709-25.841 10.709-10.085 0-18.698-3.571-25.837-10.709-7.139-7.139-10.705-15.749-10.705-25.837 0-10.089 3.566-18.702 10.705-25.837 7.139-7.139 15.752-10.71 25.837-10.71 10.089 0 18.702 3.571 25.841 10.71 7.135 7.135 10.707 15.749 10.707 25.837-.001 10.088-3.572 18.698-10.707 25.837z"/><path d="m531.612 284.655-204.139-203.851c-7.23-7.238-16.939-13.374-29.122-18.417-12.177-5.042-23.313-7.564-33.402-7.564h-63.953c10.088 0 21.222 2.522 33.402 7.564 12.185 5.046 21.892 11.182 29.125 18.417l204.137 203.851c7.046 7.423 10.571 16.084 10.571 25.981 0 10.089-3.525 18.647-10.571 25.693l-134.191 134.19c5.718 5.9 10.759 10.182 15.133 12.847 4.38 2.666 9.996 3.998 16.844 3.998 9.903 0 18.565-3.521 25.98-10.564l140.186-140.47c7.046-7.046 10.571-15.604 10.571-25.693-.004-9.898-3.525-18.559-10.571-25.982z"/></svg>
                            </button>

                            {labelEditor ? (
                                <Labeler
                                    onSelect={(tag) => {

                                        const tags = task.tags ? [...task.tags, tag] : [tag];

                                        update_task({
                                            ...task,
                                            tags: tags
                                        })
                                    }}
                                    values={[]}
                                    open={labelEditor}
                                    toggle={() => showLabelEditor(!labelEditor)}/>
                            ) : null}
                        </div>

                        <div style={{position: 'relative'}}>
                            <button className={'circleBtn'} onClick={() => showTimeEditor(!timeEditor)}>
                                <svg viewBox="0 0 97.16 97.16" fill={task.color ? task.color : `rgba(${primary}, 1)`}><path d="m48.58 0c-26.787 0-48.58 21.793-48.58 48.58s21.793 48.58 48.58 48.58 48.58-21.793 48.58-48.58-21.793-48.58-48.58-48.58zm0 86.823c-21.087 0-38.244-17.155-38.244-38.243s17.157-38.243 38.244-38.243 38.244 17.155 38.244 38.243-17.157 38.243-38.244 38.243z"/><path d="m73.898 47.08h-21.832v-26.25c0-2.209-1.791-4-4-4s-4 1.791-4 4v30.25c0 2.209 1.791 4 4 4h25.832c2.209 0 4-1.791 4-4s-1.791-4-4-4z"/></svg>
                            </button>

                            {timeEditor ? (
                                <TimeEditor
                                    onSelect={(time) => {
                                        update_task({
                                            ...task,
                                            estimatedTime: time
                                        })
                                    }}
                                    value={task.estimatedTime ? task.estimatedTime : 0}
                                    open={timeEditor}
                                    toggle={() => showTimeEditor(!timeEditor)}/>
                            ) : null}
                        </div>

                        <button className={'circleBtn'} onClick={() => {
                            deleteTask(task.id);
                            toggle()
                        }}>
                            <svg viewBox="0 0 438.529 438.529" fill={task.color ? task.color : `rgba(${primary}, 1)`}><path d="m417.689 75.654c-1.711-1.709-3.901-2.568-6.563-2.568h-88.224l-19.985-47.676c-2.854-7.044-7.994-13.04-15.413-17.989-7.426-4.948-14.948-7.421-22.559-7.421h-91.363c-7.611 0-15.131 2.473-22.554 7.421-7.424 4.949-12.563 10.944-15.419 17.989l-19.985 47.676h-88.22c-2.667 0-4.853.859-6.567 2.568-1.709 1.713-2.568 3.903-2.568 6.567v18.274c0 2.664.855 4.854 2.568 6.564 1.714 1.712 3.904 2.568 6.567 2.568h27.406v271.8c0 15.803 4.473 29.266 13.418 40.398 8.947 11.139 19.701 16.703 32.264 16.703h237.542c12.566 0 23.319-5.756 32.265-17.268 8.945-11.52 13.415-25.174 13.415-40.971v-270.662h27.411c2.662 0 4.853-.856 6.563-2.568 1.708-1.709 2.57-3.9 2.57-6.564v-18.274c.002-2.664-.861-4.854-2.569-6.567zm-248.388-35.976c1.331-1.712 2.95-2.762 4.853-3.14h90.504c1.903.381 3.525 1.43 4.854 3.14l13.709 33.404h-127.91zm177.872 340.613c0 4.186-.664 8.042-1.999 11.561-1.334 3.518-2.717 6.088-4.141 7.706-1.431 1.622-2.423 2.427-2.998 2.427h-237.542c-.571 0-1.565-.805-2.996-2.427-1.429-1.618-2.81-4.188-4.143-7.706-1.331-3.519-1.997-7.379-1.997-11.561v-270.664h255.815v270.664z"/><path d="m137.04 347.172h18.271c2.667 0 4.858-.855 6.567-2.567 1.709-1.718 2.568-3.901 2.568-6.57v-164.454c0-2.663-.859-4.853-2.568-6.567-1.714-1.709-3.899-2.565-6.567-2.565h-18.271c-2.667 0-4.854.855-6.567 2.565-1.711 1.714-2.568 3.904-2.568 6.567v164.454c0 2.669.854 4.853 2.568 6.57 1.713 1.711 3.9 2.567 6.567 2.567z"/><path d="m210.129 347.172h18.271c2.666 0 4.856-.855 6.564-2.567 1.718-1.718 2.569-3.901 2.569-6.57v-164.454c0-2.663-.852-4.853-2.569-6.567-1.708-1.709-3.898-2.565-6.564-2.565h-18.271c-2.664 0-4.854.855-6.567 2.565-1.714 1.714-2.568 3.904-2.568 6.567v164.454c0 2.669.854 4.853 2.568 6.57 1.712 1.711 3.903 2.567 6.567 2.567z"/><path d="m283.22 347.172h18.268c2.669 0 4.859-.855 6.57-2.567 1.711-1.718 2.562-3.901 2.562-6.57v-164.454c0-2.663-.852-4.853-2.562-6.567-1.711-1.709-3.901-2.565-6.57-2.565h-18.268c-2.67 0-4.853.855-6.571 2.565-1.711 1.714-2.566 3.904-2.566 6.567v164.454c0 2.669.855 4.853 2.566 6.57 1.718 1.711 3.901 2.567 6.571 2.567z"/></svg>
                        </button>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Toolbar>
                        <Group>
                            {Calendar}
                            <DatePicker
                                style={{background: 'transparent', border: 'none', margin: 0, width: 'auto', color: `rgba(${dark}, .2)`, fontSize: '1rem'}}
                                value={task.duedate}
                                onChange={(duedate) => update_task({
                                    ...task,
                                    duedate: duedate
                                })}
                                placeholder={'Deadline?'}/>
                        </Group>

                        <TimeTracker
                            onStart={() => {
                                tasks.forEach(task => {
                                    if(task.recording){
                                        const recordedTime = task.recorded ? task.recorded + (moment().unix() - task.recording.started) : moment().unix() - task.recording.started

                                        update_task({
                                            ...task,
                                            recording: false,
                                            recorded: 0,
                                        });

                                        add_time({
                                            task: task.id,
                                            time: recordedTime,
                                            createdAt: new Date()
                                        });
                                    }
                                });

                                update_task({
                                    ...task,
                                    recording: {
                                        started: moment().unix()
                                    }
                                })
                            }}
                            onStop={() => {
                                const recordedTime = task.recorded ? task.recorded + (moment().unix() - task.recording.started) : moment().unix() - task.recording.started

                                update_task({
                                    ...task,
                                    recording: false,
                                    recorded: 0,
                                });

                                add_time({
                                    task: task.id,
                                    time: recordedTime,
                                    createdAt: new Date()
                                });
                            }}
                            recorded={trackedTime}
                            recording={task.recording}
                            estimated={task.estimatedTime}
                        />
                    </Toolbar>

                    <Group>
                        <ColorPicker
                            color={task.color}
                            onChange={(color) => update_task({
                                ...task,
                                color: color
                            })}
                            style={{
                                height: 16,
                                width: 16,
                                borderRadius: 10,
                                margin: 'auto'
                            }}
                        />
                        <Input
                            style={{fontSize: '1.4rem', border: 'none', marginLeft: 8}}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => update_task({
                                ...task,
                                name: name
                            })}
                        />
                    </Group>
                    <Group justify={'flex-start'} style={{marginTop: 16}}>
                        {task.tags && task.tags.map((tag, index) => (
                            <Tag
                                key={index}
                                animate={{
                                    opacity: 1,
                                    top: 0
                                }}
                                style={{backgroundColor: tag.color}}
                            >
                                {tag.name}
                                <span onClick={() => {
                                    update_task({
                                        ...task,
                                        tags: [
                                            ...task.tags.filter(t => t.name !== tag.name)
                                        ]
                                    })
                                }}>
                                    <svg viewBox="0 0 41.756 41.756"><path d="m27.948 20.878 12.343-12.342c1.953-1.953 1.953-5.119 0-7.071-1.951-1.952-5.119-1.952-7.07 0l-12.343 12.344-12.343-12.344c-1.951-1.952-5.119-1.952-7.07 0-1.953 1.953-1.953 5.119 0 7.071l12.342 12.342-12.342 12.342c-1.953 1.953-1.953 5.119 0 7.071.975.977 2.256 1.464 3.535 1.464 1.278 0 2.56-.487 3.535-1.464l12.343-12.342 12.343 12.343c.976.977 2.256 1.464 3.535 1.464s2.56-.487 3.535-1.464c1.953-1.953 1.953-5.119 0-7.071z"/></svg>
                                </span>
                            </Tag>
                        ))}
                    </Group>

                    <TaskDescription
                        value={task.description ? task.description : ''}
                        onSave={(content) => update_task({
                            ...task,
                            description: content
                        })}
                    />

                    <div>
                        { task && checklists.filter(checklist => checklist.parent === task.id).map(checklist => (
                            <Todolist
                                key={checklist.id}
                                id={checklist.id}
                            />
                        ))}
                    </div>
                </ModalBody>
            </ModalContainer>
        </ModalWrapper>
    ) : null;
};

const mapStateToProps = state => ({
    tasks: state.tasks,
    checklists: state.checklists,
    timer: state.timer
});

const mapDispatchToProps = dispatch => ({
    update_task: task => dispatch({
        type: 'UPDATE_TASK',
        payload: task
    }),
    add_time: time => dispatch({
        type: 'ADD_TIME',
        payload: time
    }),
    add_checklist: checklist => dispatch({
        type: 'ADD_CHECKLIST',
        payload: checklist
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);