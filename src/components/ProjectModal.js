import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {ModalBody, ModalContainer, ModalHeader, ModalWrapper} from "../container/Modal";
import {ColorPicker, Input, Select, TextArea} from "../misc/Form";
import {DatePicker} from "./DatePicker";
import {convertHMS, useOutsideAlerter} from "../helpers";
import styled from "styled-components";
import {backgroundColor, dark, inputBackgroundColor, primary, color} from "../misc/Theme";
import moment from "moment";


const Toolbar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: -24px -24px 24px -24px;
    padding: 8px 16px;
    background: ${inputBackgroundColor}
`;

const Group = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Tracker = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: rgba(${color}, .5);
`;

const Icon = styled.div`
    background: ${backgroundColor};
    height: 70px;
    width: 70px;
    border-radius: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    
    svg{
        display: block;
        height: 35px;
        width: auto;
    }
`;

const ProjectModal = ({add_list, project, lists, tasks, open, toggle, update_project, settings}) => {
    const elem = useRef();
    const [list, setList] = useState(project.list);
    const [name, setName] = useState(project.name);
    const [duedate, setDueDate] = useState(project.duedate);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [trackedTime, setTrackedTime] = useState(0);
    const [datepicker, showDatepicker] = useState(false);
    const filteredTasks = tasks.filter(task => task.project === project.id);

    useOutsideAlerter(elem, open, () => {
        showDatepicker(false);
        toggle();
    });

    useEffect(() => {
        let estimate = 0;
        let tracked = 0;
        filteredTasks.forEach(task => {
            if(task.estimatedTime) {
                estimate += task.estimatedTime
            }

            if(task.recorded) {
                tracked += task.recorded
            }
        });

        setEstimatedTime(estimate);
        setTrackedTime(tracked);
    });

    return open ? (
        <ModalWrapper>
            <ModalContainer
                ref={elem}
                animate={{
                    opacity: 1,
                    margin: '10vh auto auto auto'
                }}
                style={{maxWidth: 700, borderRadius: 8}}
            >
                <ModalHeader style={{padding: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8}} justify={'space-between'} color={project.color}>
                    <div>
                        Edit Project ...
                    </div>

                    <div
                        style={{display: 'flex', alignItems: 'center'}}
                    >
                        <div style={{position: 'relative'}}>
                            <button className={'circleBtn'} onClick={() => showDatepicker(!datepicker)}>
                                <svg viewBox="0 0 361.77 361.77" fill={project.color ? project.color : `rgba(${primary}, 1)`}><path d="m323.885 43.77h-27.5v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-129v-18.77c0-13.807-11.193-25-25-25h-1c-13.807 0-25 11.193-25 25v18.77h-27.5c-13.807 0-25 11.193-25 25v268c0 13.809 11.193 25 25 25h286c13.807 0 25-11.191 25-25v-268c0-13.807-11.194-25-25-25zm-17 278.5h-252v-203h252z"/><path d="m89.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 211.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m89.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m159.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/><path d="m229.136 281.134h43.498c2.209 0 4-1.791 4-4v-43.498c0-2.209-1.791-4-4-4h-43.498c-2.209 0-4 1.791-4 4v43.498c0 2.209 1.791 4 4 4z"/></svg>
                            </button>

                            {datepicker ? (
                                <DatePicker
                                    visibel={true}
                                    style={{background: 'transparent', padding: 0, border: 'none', margin: 0, width: 'auto', textAlign: 'right', color: `rgba(${dark}, .7)`, fontSize: '.9rem'}}
                                    value={duedate}
                                    onChange={(date) => {
                                        update_project({
                                            ...project,
                                            duedate: date
                                        });
                                        setDueDate(date)
                                    }}
                                    placeholder={'Deadline?'}
                                />
                            ) : null}
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody style={{overflow: 'visible'}}>
                    <Toolbar>
                        <Group>
                            <span style={{display: 'block', color: `rgba(${color}, .7)`, fontSize: '.9rem', whiteSpace: 'pre', marginRight: 8}}>in List</span>
                            <Select
                                style={{background: 'transparent', border: 'none', padding: 0, margin: '-2px 0px 0px 0px', color: `rgba(${dark}, .7)`, fontSize: '.9rem'}}
                                value={list}
                                onChange={(list) => setList(list)}
                                onSelect={(selectedList) => {
                                    if(!lists.find(list => list === selectedList)){
                                        add_list({name: selectedList});
                                    }

                                    update_project({
                                        ...project,
                                        list: selectedList
                                    });
                                }}
                                items={lists.map(item => item.name)}
                                placeholder={''}
                            />
                        </Group>
                    </Toolbar>

                    <Toolbar style={{padding: 16}}>
                        <Tracker>
                            <Icon>
                                <svg viewBox="0 0 64 64"><path d="m61 44h-28a2 2 0 0 1 -2-2v-2h6v-20h24l-6 12z" fill="#3b73a5"/><path d="m9 16h26a2 2 0 0 1 2 2v22a0 0 0 0 1 0 0h-28a0 0 0 0 1 0 0v-24a0 0 0 0 1 0 0z" fill="#69b1d5"/><path d="m5 8h4v53h-4z" fill="#7d8d9c"/><circle cx="7" cy="7" fill="#e33e5c" r="4"/><g fill="#fff"><path d="m9 19h12v2h-12z"/><path d="m48 39h11v2h-11z"/><path d="m44 39h2v2h-2z"/></g><path d="m4 10.974v51.026h6v-21h20v1a3 3 0 0 0 3 3h28a1 1 0 0 0 .9-1.447l-5.782-11.553 5.782-11.553a1 1 0 0 0 -.9-1.447h-23v-1a3 3 0 0 0 -3-3h-25v-4.026a5 5 0 1 0 -6 0zm4 49.026h-2v-48.1a5 5 0 0 0 2 0zm30-20v-19h21.382l-5.277 10.553a1 1 0 0 0 0 .894l3.277 6.553h-9.382v2h10.382l1 2h-26.382a1 1 0 0 1 -1-1v-1h5a1 1 0 0 0 1-1zm-3-23a1 1 0 0 1 1 1v21h-26v-18h11v-2h-11v-2zm-28-13a3 3 0 1 1 -3 3 3 3 0 0 1 3-3z"/><path d="m44 39h2v2h-2z"/></svg>
                            </Icon>

                            <span>
                                <small style={{display: 'block', marginBottom: '4px'}}>Deadline</small>
                                <span style={{fontSize: '1.2rem'}}>{project.duedate ? moment(project.duedate).format('DD.MMMM YYYY') : 'not set'}</span>
                            </span>
                        </Tracker>
                        <Tracker>
                            <Icon>
                                <svg viewBox="0 0 60 60" style={{position: 'relative', top: '-3px', left: '-2px'}}><g fill="none"><g transform="translate(11 1)"><circle cx="24" cy="34" fill="#02a9f4" r="24"/><path d="m24 10c-.5 0-1 0-1.5.05 12.6273361.8163672 22.4516137 11.296302 22.4516137 23.95s-9.8242776 23.1336328-22.4516137 23.95h1.5c13.254834 0 24-10.745166 24-24s-10.745166-24-24-24z" fill="#0377bc"/><circle cx="24" cy="34" fill="#f5f5f5" r="20"/><path d="m24 14c-.51 0-1 0-1.5.08 10.311759.9250893 18.2129354 9.5668283 18.2129354 19.92s-7.9011764 18.9949107-18.2129354 19.92c.5 0 1 .08 1.5.08 11.045695 0 20-8.954305 20-20s-8.954305-20-20-20z" fill="#cfd8dc"/><path d="m32.94 32h-6.94v-6.94c.0026983-.281948-.1081133-.5531337-.3074898-.7525102s-.4705622-.3101881-.7525102-.3074898h-1.88c-.281948-.0026983-.5531337.1081133-.7525102.3074898s-.3101881.4705622-.3074898.7525102v6.94h-6.94c-.281948-.0026983-.5531337.1081133-.7525102.3074898s-.3101881.4705622-.3074898.7525102v1.88c-.0026983.281948.1081133.5531337.3074898.7525102s.4705622.3101881.7525102.3074898h6.94v6.94c-.0026983.281948.1081133.5531337.3074898.7525102s.4705622.3101881.7525102.3074898h1.88c.281948.0026983.5531337-.1081133.7525102-.3074898s.3101881-.4705622.3074898-.7525102v-6.94h6.94c.281948.0026983.5531337-.1081133.7525102-.3074898s.3101881-.4705622.3074898-.7525102v-1.88c.0026983-.281948-.1081133-.5531337-.3074898-.7525102s-.4705622-.3101881-.7525102-.3074898z" fill="#f44335"/><rect fill="#ffdc00" height="5" rx="2.5" width="12" x="18"/><path d="m27.5 0h-3c1.3807119 0 2.5 1.11928813 2.5 2.5s-1.1192881 2.5-2.5 2.5h3c1.3807119 0 2.5-1.11928813 2.5-2.5s-1.1192881-2.5-2.5-2.5z" fill="#fec108"/><path d="m22 5h4v5.09h-4z" fill="#0377bc"/></g><g fill="#000"><path d="m43.94 32h-5.94v-5.94c0-1.1377066-.9222934-2.06-2.06-2.06h-1.88c-1.1377066 0-2.06.9222934-2.06 2.06v5.94h-5.94c-1.1377066 0-2.06.9222934-2.06 2.06v1.88c0 1.1377066.9222934 2.06 2.06 2.06h5.94v5.94c0 1.1377066.9222934 2.06 2.06 2.06h1.88c1.1377066 0 2.06-.9222934 2.06-2.06v-5.94h5.94c1.1377066 0 2.06-.9222934 2.06-2.06v-1.88c0-1.1377066-.9222934-2.06-2.06-2.06zm0 4h-6.94c-.5522847 0-1 .4477153-1 1l-.06 7-1.94-.06v-6.94c0-.5522847-.4477153-1-1-1l-7-.06.06-1.94h6.94c.5522847 0 1-.4477153 1-1l.06-7 1.94.06v6.94c0 .5522847.4477153 1 1 1h6.94l.06.06z"/><path d="m38 10.19v-3.19h.5c1.9329966 0 3.5-1.56700338 3.5-3.5s-1.5670034-3.5-3.5-3.5h-7c-1.9329966 0-3.5 1.56700338-3.5 3.5s1.5670034 3.5 3.5 3.5h.5v3.19c-4.8841437.5871405-9.4846176 2.6089827-13.22 5.81h-8.78c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1h6.69c-1.1298755 1.2307958-2.1348012 2.5706967-3 4h-8.69c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1h7.56c-.6331558 1.2863899-1.1550601 2.6246059-1.56 4h-8c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1h7.5c-.2735535 1.3177859-.4407584 2.6554251-.5 4h-9c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1h9c.0493545 1.3437638.2065262 2.6813953.47 4h-7.47c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1h8c.4049399 1.3753941.9268442 2.7136101 1.56 4h-7.56c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1h8.65c.8651988 1.4293033 1.8701245 2.7692042 3 4h-6.65c-.55228475 0-1 .4477153-1 1s.44771525 1 1 1h8.78c8.1354569 6.9699548 19.8075025 7.9817874 29.021014 2.5157895 9.2135116-5.465998 13.9203506-16.19475 11.7029392-26.6756381s-10.8661485-18.3840393-21.5039532-19.6501514zm-8-6.69c0-.82842712.6715729-1.5 1.5-1.5h7c.8284271.00000001 1.5.67157288 1.5 1.5s-.6715729 1.49999999-1.5 1.5h-7c-.8284271 0-1.5-.67157288-1.5-1.5zm4 3.5h2v3c-.33 0-.66 0-1 0s-.67 0-1 0zm1 51c-12.7025492 0-23-10.2974508-23-23s10.2974508-23 23-23 23 10.2974508 23 23c0 6.0999793-2.4232073 11.9501193-6.736544 16.263456s-10.1634767 6.736544-16.263456 6.736544z"/><path d="m49.85 20.15h-.06c-8.187274-8.1223341-21.392726-8.1223341-29.58 0h-.06v.06c-8.1223341 8.187274-8.1223341 21.392726 0 29.58v.06h.06c8.187274 8.1223341 21.392726 8.1223341 29.58 0h.06s0 0 0-.06c8.1223341-8.187274 8.1223341-21.392726 0-29.58 0 0 .02-.04 0-.06zm2.15 15.85h2c-.2406409 4.3441568-1.971143 8.4726404-4.9 11.69l-1.37-1.38c-.2536586-.2536586-.623374-.3527236-.9698781-.2598781-.346504.0928455-.6171545.363496-.71.71-.0928455.3465041.0062195.7162195.2598781.9698781l1.38 1.37c-3.2173596 2.928857-7.3458432 4.6593591-11.69 4.9v-2c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1v2c-4.3441568-.2406409-8.4726404-1.971143-11.69-4.9l1.38-1.37c.3921222-.3921222.3921222-1.0278778 0-1.42s-1.0278778-.3921222-1.42 0l-1.37 1.38c-2.9106754-3.2243802-4.6232096-7.3521174-4.85-11.69h1.95c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1h-1.95c.2267904-4.3378826 1.9393246-8.4656198 4.85-11.69l1.37 1.38c.1877666.1893127.4433625.2957983.71.2957983s.5222334-.1064856.71-.2957983c.1893127-.1877666.2957983-.4433625.2957983-.71s-.1064856-.5222334-.2957983-.71l-1.38-1.37c3.2243802-2.9106754 7.3521174-4.6232096 11.69-4.85v1.95c0 .5522847.4477153 1 1 1s1-.4477153 1-1v-1.95c4.3378826.2267904 8.4656198 1.9393246 11.69 4.85l-1.38 1.37c-.1893127.1877666-.2957983.4433625-.2957983.71s.1064856.5222334.2957983.71c.1877666.1893127.4433625.2957983.71.2957983s.5222334-.1064856.71-.2957983l1.37-1.38c2.928857 3.2173596 4.6593591 7.3458432 4.9 11.69h-2c-.5522847 0-1 .4477153-1 1s.4477153 1 1 1z"/></g></g></svg>
                            </Icon>

                            <span>
                                <small style={{display: 'block', marginBottom: '4px'}}>tracked time</small>
                                <span style={{fontSize: '1.2rem'}}>{convertHMS(trackedTime)}</span>
                            </span>

                        </Tracker>
                        <Tracker>
                            <Icon>
                                <svg viewBox="0 0 64 64"><path d="m61 2h-36c-.55 0-1 .45-1 1v27h22v-12h16v-15c0-.55-.45-1-1-1z" fill="#d3a06c"/><path d="m47 2v8l-2-2-2 2-2-2-2 2v-8z" fill="#fcd770"/><path d="m46 30v-12h16v17c0 .55-.45 1-1 1h-3v-6z" fill="#e6e9ed"/><path d="m14 24v6h-3c-1.66 0-3-1.34-3-3 0-.83.34-1.58.88-2.12s1.29-.88 2.12-.88z" fill="#37bc9b"/><path d="m11 30h3 10 22 12v6 22h-4v-24h-46v-7c0 1.66 1.34 3 3 3z" fill="#5cd6b3"/><path d="m54 58v4h-52v-28h6 46z" fill="#37bc9b"/><path d="m11 38h17c-5.52 0-10 4.48-10 10s4.48 10 10 10h-17c0-2.76-2.24-5-5-5v-10c2.76 0 5-2.24 5-5z" fill="#5cd6b3"/><path d="m50 43v10c-2.76 0-5 2.24-5 5h-17c5.52 0 10-4.48 10-10s-4.48-10-10-10h17c0 2.76 2.24 5 5 5z" fill="#5cd6b3"/><g fill="#e6e9ed"><path d="m11 58h-5v-5c2.76 0 5 2.24 5 5z"/><path d="m6 38h5c0 2.76-2.24 5-5 5z"/><path d="m50 53v5h-5c0-2.76 2.24-5 5-5z"/><path d="m50 38v5c-2.76 0-5-2.24-5-5z"/></g><circle cx="28" cy="48" fill="#fcd770" r="10"/><path d="m29 41h-2v2h-2v6h4v2h-4v2h2v2h2v-2h2v-6h-4v-2h4v-2h-2z"/><path d="m51 59v-22h-46v22zm-4.858-2c.364-1.399 1.459-2.495 2.858-2.858v2.858zm2.858-15.142c-1.399-.364-2.495-1.459-2.858-2.858h2.858zm-4.91-2.858c.423 2.507 2.403 4.486 4.91 4.91v8.181c-2.507.423-4.486 2.403-4.91 4.91h-9.786c2.835-1.993 4.696-5.281 4.696-9.001s-1.861-7.008-4.695-9zm-16.09 18c-4.963 0-9-4.037-9-9s4.037-9 9-9 9 4.037 9 9-4.037 9-9 9zm-18.142-18c-.363 1.399-1.459 2.495-2.858 2.858v-2.858zm-2.858 15.142c1.399.363 2.495 1.459 2.858 2.858h-2.858zm4.91 2.858c-.423-2.507-2.403-4.486-4.91-4.91v-8.18c2.507-.423 4.486-2.403 4.91-4.91h9.786c-2.835 1.992-4.696 5.28-4.696 9s1.861 7.008 4.695 9z"/><path d="m61 1h-36c-1.103 0-2 .897-2 2v26h-8v-6h-4c-2.206 0-4 1.794-4 4v6h-6v30h54v-4h4v-22h2c1.103 0 2-.897 2-2v-32c0-1.103-.897-2-2-2zm-21 2h6v4.586l-1-1-2 2-2-2-1 1zm-15 0h13v9.414l3-3 2 2 2-2 3 3v-9.414h13v14h-16v12h-20zm-14 22h2v4h-2c-1.103 0-2-.897-2-2s.897-2 2-2zm42 36h-50v-26h50zm4-4h-2v-24h-46v-2.556c.591.344 1.268.556 2 .556h46zm2-22v-6h-12v-10h14v16z"/><path d="m49 25h10v2h-10z"/><path d="m49 21h2v2h-2z"/><path d="m53 21h6v2h-6z"/></svg>
                            </Icon>

                            <span>
                                <small style={{display: 'block', marginBottom: '4px'}}>calculated costs</small>
                                <span style={{fontSize: '1.2rem'}}>
                                    <em style={{fontSize: '.9rem', marginRight: 8, position: 'relative', top:  -4}}>{Math.floor((trackedTime / 3600) * 65).toFixed(2)}</em>
                                    <strong>{((estimatedTime / 3600) * (settings.expenses.profit10 ? settings.expenses.profit10 : 0)).toFixed(2)}</strong>
                                </span>
                            </span>
                        </Tracker>
                    </Toolbar>

                    <Group>
                        <ColorPicker
                            color={project.color}
                            onChange={(color) => {
                                update_project({
                                    ...project,
                                    color: color,
                                });
                            }}
                            style={{
                                height: 16,
                                width: 16,
                                borderRadius: 10,
                                margin: 'auto',
                            }}/>
                        <Input
                            style={{fontSize: '1.4rem', border: 'none', marginLeft: 8}}
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            onBlur={() => {
                                if(name !== ''){
                                    update_project({
                                        ...project,
                                        name: name
                                    })
                                }
                            }}
                        />
                    </Group>

                    <TextArea
                        value={project.description}
                        placeholder={'Enter project description ...'}
                        style={{marginTop: 24, minHeight: 140}}
                    />

                </ModalBody>
            </ModalContainer>
        </ModalWrapper>
    ) : null;
};

const mapStateToProps = state => ({
    lists: state.lists,
    tasks: state.tasks,
    settings: state.settings
});

const mapDispatchToProps = dispatch => ({
    add_list: list => dispatch({
        type: 'ADD_LIST',
        payload: list
    }),
    update_project: project => dispatch({
        type: 'UPDATE_PROJECT',
        payload: project,
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal)