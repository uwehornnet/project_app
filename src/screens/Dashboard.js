import React from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {backgroundColor, color} from "../misc/Theme";
import {Link} from "react-router-dom";
import {ProgressBar} from "../components/ProgressBar";

const Container = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-template-rows: repeat(auto-fill, 100px);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
    padding: 40px 16px 16px 86px;
    background: ${backgroundColor};
    
    &::-webkit-scrollbar{
        display: none;
    }
`;

const GridCard = styled(Link)`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
    border-radius: 4px;
    background: ${backgroundColor};
    box-shadow: 0px 2px 6px -4px rgba(0,0,0, .1);
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    line-height: 1.4;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    transition: background .4s ease;
`;

const Title = styled.div`
    display: block;
    color: rgba(${color}, .7)
`;

const Meta = styled.div`
    display: flex;
`;

const Dashboard = ({projects, tasks}) => {
    return(
        <Container>
            {projects && projects.map(project => {
                let bg = project.color ? project.color : null;

                if(project.background && project.background.charAt(0) !== '#'){
                    bg = `url(${project.background})`;
                }

                return (
                    <GridCard to={`/project/${project.id}`} key={project.id} style={{background: bg}}>
                        <Title>{project.name}</Title>
                        <ProgressBar
                            total={tasks && tasks.filter(task => task.project === project.id).length}
                            done={tasks && tasks.filter(task => task.project === project.id && task.done).length}
                        />
                    </GridCard>
                )
            })}
        </Container>
    );
};

const mapStateToProps = state => ({
    projects: state.projects,
    tasks: state.tasks
});

export default connect(mapStateToProps)(Dashboard);