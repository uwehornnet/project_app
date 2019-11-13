import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {ModalBody, ModalContainer, ModalHeader, ModalWrapper} from "../container/Modal";
import {Button, ColorPicker, Input, InputGroup, Label, Select} from "../misc/Form";
import {DatePicker} from "./DatePicker";
import {randomColor, uid, useOutsideAlerter} from "../helpers";
import {connect} from "react-redux";
import {Labeler} from "./Labeler";
import {primary} from "../misc/Theme";

const Columns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    svg{
    
        height: 100px;
        width: auto;
        display: block;
        margin: -60px 40px auto 20px;
    }
    form{
        flex: 1;
    }
`;

const CreateTaskModal = ({add_task, open, toggle, projects, add_board_task}) => {
    const elem = useRef();
    const [color, setColor] = useState(randomColor());
    const [name, setName] = useState('');
    const [project, setProject] = useState('');
    const [duedate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');

    useOutsideAlerter(elem, open, () => {
        setName('');
        setProject('');
        setDueDate('');
        setColor(randomColor());
        toggle();
    });

    const submitTask = (e) => {
        e.preventDefault();
        const task = {
            id: uid(),
            name: name,
            color: color,
            project: project !== '' ? projects.find(p => p.name === project).id : null,
            duedate: duedate !== '' ? duedate : null,
            createdAt: new Date()
        };

        add_task(task);

        add_board_task({
            project: task.project,
            board: 'progress',
            column: 'inbox',
            item: task.id
        });

        setName('');
        setProject('');
        setDueDate('');
        setColor(randomColor());
        toggle();
    };

    return open ? (
        <ModalWrapper>
            <ModalContainer
                ref={elem}
                animate={{
                    opacity: 1,
                    margin: '10vh auto auto auto'
                }}
            >
                <ModalHeader color={`rgba(${primary}, 1)`}>
                    <span>creating new Task ...</span>
                </ModalHeader>
                <ModalBody
                    style={{overflow: 'visible'}}
                >
                    <Columns>
                        <div>
                            <svg viewBox="0 0 512 512"><path d="m496.148 117.566c7.807 7.807 7.807 20.462 0 28.269l-28.268 28.279-42.413-42.413 28.269-28.269c7.807-7.817 20.472-7.817 28.279 0z" fill="#feb756"/><path d="m467.88 174.113-28.728 27.819-41.953-41.963-.45-.46 28.718-27.808z" fill="#4dbbeb"/><path d="m341.861 481.908c0 11.046-11.945 19.992-22.991 19.992h-288.882c-11.046 0-19.992-8.946-19.992-19.992v-371.849c0-11.046 8.946-19.992 19.992-19.992h288.882c11.046 0 22.991 8.946 22.991 19.992z" fill="#4dbbeb"/><path d="m302.877 438.227c0 8.451-9.138 15.295-17.589 15.295h-221.013c-8.451 0-15.295-6.844-15.295-15.295v-284.486c0-8.451 6.844-15.295 15.295-15.295h221.012c8.451 0 17.589 6.844 17.589 15.295z" fill="#fff"/><path d="m397.199 159.969 41.953 41.963-99.28 96.141-61.765 59.806-21.201-21.202-21.212-21.201 63.824-61.815 42.663-41.313 54.568-52.839z" fill="#fd3c65"/><path d="m278.107 357.879-63.614 21.211 21.201-63.614 21.212 21.201z" fill="#feb756"/><path d="m255.896 90.067v42.983h-159.935v-42.983c0-11.046 8.946-19.992 19.992-19.992h25.55c-3.439-5.908-5.558-12.675-5.558-19.992 0-22.051 17.933-39.984 39.984-39.984s39.984 17.933 39.984 39.984c0 7.317-2.119 14.084-5.558 19.992h25.55c11.045.001 19.991 8.947 19.991 19.992z" fill="#feb756"/><path d="m175.929 60.08c5.518 0 9.996-4.478 9.996-9.996s-4.478-9.996-9.996-9.996-9.996 4.478-9.996 9.996 4.478 9.996 9.996 9.996z"/><path d="m52.978 246.004c5.518 0 9.996-4.478 9.996-9.996s-4.478-9.996-9.996-9.996-9.996 4.478-9.996 9.996 4.479 9.996 9.996 9.996z"/><path d="m108.885 223.084c1.952 1.952 4.51 2.928 7.068 2.928s5.117-.976 7.068-2.928l39.984-39.984c3.903-3.903 3.903-10.233 0-14.137-3.903-3.903-10.233-3.903-14.137 0l-32.915 32.917-12.924-12.924c-3.903-3.903-10.233-3.903-14.137 0-3.903 3.903-3.903 10.233 0 14.137z"/><path d="m108.885 323.044c1.952 1.952 4.51 2.928 7.068 2.928s5.117-.976 7.068-2.928l39.984-39.984c3.903-3.903 3.903-10.233 0-14.137-3.903-3.903-10.233-3.903-14.137 0l-32.915 32.917-12.924-12.924c-3.903-3.903-10.233-3.903-14.137 0-3.903 3.903-3.903 10.233 0 14.137z"/><path d="m108.885 423.003c1.952 1.952 4.51 2.928 7.068 2.928s5.117-.976 7.068-2.928l39.984-39.984c3.903-3.903 3.903-10.233 0-14.137-3.903-3.903-10.233-3.903-14.137 0l-32.915 32.917-12.924-12.924c-3.903-3.903-10.233-3.903-14.137 0-3.903 3.903-3.903 10.233 0 14.137z"/><path d="m195.92 206.02h59.976c5.521 0 9.996-4.475 9.996-9.996s-4.475-9.996-9.996-9.996h-59.976c-5.521 0-9.996 4.475-9.996 9.996s4.476 9.996 9.996 9.996z"/><path d="m512 131.701c0-8.009-3.119-15.539-8.783-21.202l-14.129-14.129c-5.665-5.672-13.198-8.795-21.212-8.795-8.015 0-15.548 3.124-21.207 8.79l-28.216 28.216-66.595 64.49v-79.01c0-17.673-17.385-29.988-32.987-29.988h-54.698c-4.126-11.634-15.237-19.992-28.269-19.992h-11.042c.696-3.278 1.046-6.614 1.046-9.996 0-27.559-22.421-49.98-49.98-49.98s-49.98 22.421-49.98 49.98c0 3.382.35 6.718 1.046 9.996h-11.042c-13.031 0-24.142 8.358-28.269 19.992h-57.695c-16.535-.002-29.988 13.451-29.988 29.986v371.849c0 16.535 13.453 29.988 29.988 29.988h288.882c15.602 0 32.987-12.315 32.987-29.988v-181.531l91.749-88.845c1.111-.486 2.154-1.174 3.064-2.082.828-.828 1.468-1.768 1.945-2.768l19.152-18.545 7.179 7.179c1.887 1.887 2.927 4.396 2.927 7.065s-1.04 5.179-2.928 7.066l-56.547 56.547c-3.903 3.903-3.903 10.233 0 14.137 1.952 1.951 4.51 2.928 7.068 2.928s5.117-.977 7.068-2.928l56.547-56.547c5.664-5.664 8.782-13.194 8.782-21.202s-3.12-15.539-8.782-21.202l-7.067-7.067 21.201-21.208c5.665-5.666 8.785-13.196 8.785-21.204zm-72.734 56.207-28.271-28.277 14.36-13.906 28.275 28.275zm-161.047 155.947-28.274-28.267 146.687-142.048 28.27 28.277zm-38.155-9.878 19.539 19.534-29.306 9.771zm91.801-223.918v98.37l-22.991 22.264v-97.643c0-5.521-4.475-9.996-9.996-9.996h-32.987v-22.991h52.978c6.195 0 12.996 5.231 12.996 9.996zm-215.912-29.988h25.55c3.578 0 6.882-1.912 8.665-5.013s1.773-6.919-.026-10.011c-2.788-4.79-4.201-9.824-4.201-14.964 0-16.535 13.453-29.988 29.988-29.988s29.988 13.453 29.988 29.988c0 5.14-1.413 10.174-4.201 14.964-1.799 3.092-1.81 6.91-.026 10.011s5.088 5.013 8.665 5.013h25.55c5.512 0 9.996 4.484 9.996 9.996v32.987h-139.944v-32.987c0-5.511 4.484-9.996 9.996-9.996zm215.912 401.837c0 4.765-6.801 9.996-12.995 9.996h-288.882c-5.512 0-9.996-4.484-9.996-9.996v-371.849c0-5.512 4.484-9.996 9.996-9.996h55.977v22.991h-32.987c-5.521 0-9.996 4.475-9.996 9.996v62.974c0 5.521 4.475 9.996 9.996 9.996s9.996-4.475 9.996-9.996v-52.978h225.908v107.008l-37.107 35.934h-55.855c-5.521 0-9.996 4.475-9.996 9.996s4.475 9.996 9.996 9.996h35.212l-2.392 2.316c-.206.199-.394.409-.579.621-.03.035-.065.066-.095.102-.257.303-.489.619-.705.944-.044.066-.082.136-.125.203-.17.271-.327.547-.469.83-.044.087-.086.175-.127.263-.142.305-.269.615-.378.931-.015.044-.037.084-.052.128l-.047.142c-.003.009-.006.019-.009.028l-20.398 61.204-12.466 12.465c-3.903 3.903-3.904 10.233 0 14.136 1.952 1.952 4.51 2.928 7.068 2.928s5.117-.977 7.068-2.928l12.467-12.466 61.376-20.466c.048-.016.091-.04.139-.056.312-.109.619-.234.921-.375.063-.029.127-.055.189-.086.355-.174.702-.368 1.039-.587.027-.017.051-.038.078-.056.287-.191.565-.4.835-.624.095-.079.186-.162.279-.244.104-.093.212-.177.313-.275l3.822-3.701v87.563h-225.91v-172.93c0-5.521-4.475-9.996-9.996-9.996s-9.996 4.475-9.996 9.996v182.926c0 5.521 4.475 9.996 9.996 9.996h245.9c5.521 0 9.996-4.475 9.996-9.996v-116.917l22.991-22.263zm157.214-343.14-21.2 21.207-28.276-28.275 21.204-21.204c1.887-1.89 4.396-2.931 7.066-2.931s5.179 1.041 7.071 2.936l14.134 14.134c1.888 1.887 2.928 4.397 2.928 7.066s-1.038 5.177-2.927 7.067z"/></svg>
                        </div>
                        <form>
                            <div>
                                <Label>Name</Label>
                                <InputGroup>
                                    <ColorPicker
                                        color={color}
                                        onChange={(color) => {setColor(color)}}
                                    />
                                    <Input
                                        autoFocus
                                        value={name}
                                        placeholder={'How do you want to call the task?'}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                            {projects.length ? (
                                <div style={{marginTop: 24}}>
                                    <Label>Asignment</Label>
                                    <Select
                                        value={project}
                                        onChange={(project) => setProject(project)}
                                        onSelect={(project) => setProject(project)}
                                        items={projects.map(project => ({
                                            label: project.name,
                                            value: project.name
                                        }))}
                                        placeholder={'Which project do you want to asign this task?'}/>
                                </div>
                            ) : null}

                            <div style={{marginTop: 24}}>
                                <Label>Priority</Label>
                                <Select
                                    value={priority}
                                    onChange={(priority) => setPriority(priority)}
                                    onSelect={(priority) => setPriority(priority)}
                                    items={[
                                        {
                                            label: 'Urgent and Important',
                                            value: '4'
                                        },
                                        {
                                            label: 'Important, but not urgent',
                                            value: '3'
                                        },
                                        {
                                            label: 'Urgent, but not important',
                                            value: '2'
                                        },
                                        {
                                            label: 'Neither urgent nor important',
                                            value: '1'
                                        }
                                    ]}
                                    placeholder={'How urgent is this task'}/>
                            </div>

                            <div style={{marginTop: 24}}>
                                <Label>Task Duedate</Label>
                                <DatePicker value={duedate} onChange={(date) => setDueDate(date)} placeholder={'Deadline for this task?'}/>
                            </div>

                            <div style={{marginTop: 24, textAlign: 'right'}}>
                                <span
                                    style={{
                                        marginRight: 24,
                                        color: `rgba(${color}, .2)`
                                    }}
                                    onClick={() => {
                                        setName('');
                                        setProject('');
                                        setDueDate('');
                                        setPriority('');
                                        setColor(randomColor());
                                        toggle();
                                    }}
                                >cancel</span>
                                <Button  onClick={submitTask}>create Task</Button>
                            </div>
                        </form>
                    </Columns>
                </ModalBody>
            </ModalContainer>
        </ModalWrapper>
    ) : null;
};

const mapStateToProps = state => ({
    projects: state.projects
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);