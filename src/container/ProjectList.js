import React, {useState} from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import {backgroundColor} from "../misc/Theme";
import {Input} from "../misc/Form";
import {uid} from "../helpers";

const Container = styled.div`
    background: ${backgroundColor};
    border-radius: 8px;
`;

const ProjectList = ({add_project, projects}) => {
    const [value, setValue] = useState('');
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(value !== ''){
            add_project({
                id: uid(),
                name: value,
                createdAt: new Date()
            })
        }

        setValue('');
    };


    return(
        <Container>
            <form>
                <Input value={value} placeholder={'name your new Project ...'} onChnage={(e) => setValue(e.target.value)} onBlur={handleFormSubmit}/>
            </form>

            {projects && projects.map(project => (
                <div>project</div>
            ))}
        </Container>
    );
};

const mapStateToProps = state => ({
    projects: state.projects
});

const mapDispatchToProps = dispatch => ({
    add_project: project => dispatch({
        type: 'ADD_PROJECT',
        payload: project
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);