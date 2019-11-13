import React from 'react';
import styled from "styled-components";
import {color, dark, grey, inputBackgroundColor, progressBackground, progressForeground} from "../misc/Theme";

const Container = styled.div`
    
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Meta = styled.div`
    color: rgba(${color}, .3);
    margin-right: 8px;
    display: flex;
    align-items: center;
    font-size: .9rem
    
    svg{
        display: block;
        height: 12px;
        width: auto;
        fill: rgba(${color}, .2);
        margin-left: 4px;
    }
`;

const Bar = styled.div`
    position: relative;
    background: ${progressBackground};
    height: 7px;
    width: 100%;
    display: block;
    border-radius: 10px;
    overflow: hidden;
    margin: 8px auto;
`;

const Progress = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width: ${props => props.progress ? `${props.progress}%` : '0%'};
    background: ${props => props.progress === 100 ? '#26de81' : progressForeground};
    transition: width .3s ease;
`;

export const ProgressBar = ({total, done, style, meta, label}) => {

    const progress = Math.floor((done / total) * 100);

    return (
        <Container style={{...style}}>
            {label ? (
                <label>{label}</label>
            ) : null}
            <FlexContainer>
                {meta ? (
                    <Meta>
                        {done}/{total}
                        {/*<svg viewBox="0 0 60.123 60.123"><path d="m57.124 51.893h-40.204c-1.657 0-3-1.343-3-3s1.343-3 3-3h40.203c1.657 0 3 1.343 3 3s-1.342 3-2.999 3z"/><path d="m57.124 33.062h-40.204c-1.657 0-3-1.343-3-3s1.343-3 3-3h40.203c1.657 0 3 1.343 3 3 .001 1.657-1.342 3-2.999 3z"/><path d="m57.124 14.231h-40.204c-1.657 0-3-1.343-3-3s1.343-3 3-3h40.203c1.657 0 3 1.343 3 3s-1.342 3-2.999 3z"/><circle cx="4.029" cy="11.463" r="4.029"/><circle cx="4.029" cy="30.062" r="4.029"/><circle cx="4.029" cy="48.661" r="4.029"/></svg>*/}
                    </Meta>
                ) : null}
                <Bar>
                    <Progress progress={progress}/>
                </Bar>
            </FlexContainer>

        </Container>
    );
};