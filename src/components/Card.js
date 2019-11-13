import React from 'react';
import styled from "styled-components";
import {cardBackgroundColor, dark, color} from "../misc/Theme";
import moment from "moment";
import {connect} from "react-redux";
import {ProgressBar} from "./ProgressBar";
import {truncate} from "../helpers";
import {Done} from "./Done";

const Container = styled.div`
    background: ${cardBackgroundColor};
    padding: 10px 8px 4px 8px;
    border-radius: 4px;
    border-left: ${props => props.color ? `7px solid ${props.color}` : `7px solid ${cardBackgroundColor}`};
    position: relative;
    margin-top: 8px;
    color: rgba(${dark}, .8);
    box-shadow: ${props => props.isDragging ? `0px 3px 14px -4px rgba(${dark}, .1)` : null};
    
    i{
        display: flex;
        align-items: center;
        color: rgba(${color}, .3);
        font-size: .8rem;
        margin-right: 10px;
        
        svg {
            height: 10px;
            width: auto;
            display: block
            margin-right: 4px;
            position: relative;
            top: -1px;
        }
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    align-items: center;
    
    span{
        text-align: left !important;
        display: block;
        text-decoration: ${props => props.done ? 'line-through' : null} !important;
        color: ${props => props.done ? `rgba(${dark}, .2)` : `rgba(${dark}, .7)`} !important;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgba(${dark}, .3);
`;

const Tag = styled.div`
    height: 7px;
    width: 24px;
    border-radius: 7px;
    margin-right: 4px;
    background-color: ${props => props.color ? props.color : null};
`;

const Priority = styled.div`
    margin-right: 8px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    svg {
        display: block;
        height: 12px;
        width: auto;
        fill: #fc5c65
    }
`;

const Card = ({schedule, projects, isDragging, style, task, checklists, onClick, innerRef, provided = {}, update_task, add_time}) => {

    const project = projects.find(project => project.id === task.project);
    const lists = checklists.filter(checklist => checklist.parent === task.id);
    const entries = [];

    lists.forEach(list => {
        list.items.forEach(item => entries.push(item))
    });

    return(
        <Container
            isDragging={isDragging}
            style={{ ...style}}
            color={schedule ? project.color : task.color}
            // onClick={onClick}
            ref={innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >

            {schedule ? (
                <small style={{display: 'block'}}>
                    <span style={{
                        display: 'inline-block',
                        height: 4,
                        width: 4,
                        borderRadius: '4px',
                        background: task.color,
                        marginRight: 8
                    }}/>
                    {truncate(project.name, 20)}
                </small>
            ) : null}
            <Title
                done={task.done}
            >
                <Done done={task.done} toggle={() => {
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
                }}/>
                <span onClick={onClick}>{task.name}</span>
            </Title>


            {task.tags ? (
                <FlexContainer style={{marginTop: 8}}>
                    {task.tags.map((tag, index) => (
                        <Tag key={index} color={tag.color}/>
                    ))}
                </FlexContainer>
            ) : null}

            {lists.length ? (
                <ProgressBar total={entries.length} done={entries.filter(entry => entry.done).length}/>
            ) : null}

            <FlexContainer style={{marginTop: 6}}>
                {task.priority && task.priority > 1 ? (
                    <Priority>
                        {task.priority === 2 ? (
                            <svg viewBox="0 0 50 50"><path d="m21.714 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.45-.926 1.903.309 2.465.926c.561.617.842 1.381.842 2.291s-.281 1.663-.842 2.261c-.562.596-1.383.895-2.465.895s-1.898-.299-2.45-.895c-.551-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.019l-.39-31.357h5.831z"/></svg>
                        ) : null}
                        {task.priority === 3 ? (
                            <>
                                <svg viewBox="0 0 50 50"><path d="m13.714 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.449-.926c1.083 0 1.904.309 2.465.926s.842 1.381.842 2.291-.281 1.663-.842 2.261c-.561.596-1.382.895-2.465.895-1.082 0-1.898-.299-2.449-.895-.551-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.02l-.39-31.357h5.831z"/><path d="m29.555 43.812c0-.91.274-1.674.826-2.291.551-.617 1.367-.926 2.449-.926s1.903.309 2.463.926c.562.617.842 1.381.842 2.291s-.28 1.663-.842 2.261c-.56.596-1.381.895-2.463.895s-1.898-.299-2.449-.895c-.552-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.021l-.39-31.357h5.83z"/></svg>
                            </>
                        ) : null}
                        {task.priority === 4 ? (
                            <>
                                <svg viewBox="0 0 50 50"><path d="m5.714 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.449-.926c1.083 0 1.904.309 2.465.926s.842 1.381.842 2.291-.281 1.663-.842 2.261c-.561.596-1.382.895-2.465.895-1.082 0-1.898-.299-2.449-.895-.551-.598-.826-1.351-.826-2.261zm5.62-9.58h-5.02l-.389-31.357h5.831z"/><path d="m21.554 43.812c0-.91.275-1.674.826-2.291s1.368-.926 2.449-.926c1.082 0 1.904.309 2.463.926.562.617.842 1.381.842 2.291s-.28 1.663-.842 2.261c-.56.596-1.381.895-2.463.895s-1.898-.299-2.449-.895c-.551-.598-.826-1.351-.826-2.261zm5.621-9.58h-5.02l-.39-31.357h5.83z"/><path d="m37.393 43.812c0-.91.276-1.674.829-2.291.55-.617 1.366-.926 2.449-.926 1.08 0 1.903.309 2.462.926.562.617.842 1.381.842 2.291s-.279 1.663-.842 2.261c-.559.596-1.382.895-2.462.895-1.083 0-1.899-.299-2.449-.895-.553-.598-.829-1.351-.829-2.261zm5.623-9.58h-5.02l-.391-31.357h5.829z"/></svg>
                            </>
                        ) : null}
                    </Priority>
                ) : null}
                {task.duedate ? (
                    <i style={{
                        color: moment(task.duedate).diff(moment(), 'days') < 3 ? '#fc5c65' : '#2bcbba'
                    }}>
                        <svg viewBox="0 0 512 512" fill={ moment(task.duedate).diff(moment(), 'days') < 3 ? '#fc5c65' : '#2bcbba'}><path d="m472.928 34.752c-4.416-3.008-10.016-3.552-14.944-1.6-1.024.416-106.88 42.048-195.168.384-76.096-35.968-159.904-19.136-198.816-7.776v-9.76c0-8.832-7.168-16-16-16s-16 7.168-16 16v32 256 192c0 8.832 7.168 16 16 16s16-7.168 16-16v-180.672c28.384-9.184 112.608-31.136 185.184 3.136 34.592 16.352 70.784 21.792 103.648 21.792 63.2 0 114.016-20.128 117.184-21.408 6.016-2.464 9.984-8.32 9.984-14.848v-256c0-5.312-2.656-10.272-7.072-13.248z"/></svg>
                        {moment(task.duedate).format('DD.MMMM YYYY')}
                    </i>
                ) : null}
            </FlexContainer>


        </Container>
    );
};

const mapStateToProps = state => ({
    checklists: state.checklists,
    projects: state.projects
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);