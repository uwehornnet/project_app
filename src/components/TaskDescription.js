import React, {useState} from 'react';
import styled from "styled-components";
import {color, modalBackgroundColor} from "../misc/Theme";

const Container = styled.div`
    position: relative;
    
    textarea{
        margin-top: 8px;
        display: block;
        width: 100%;
        background: ${modalBackgroundColor};
        border-radius: 4px;
        outline: none;
        box-shadow: none;
        border: none;
        padding: 8px;
        font-size: 1rem;
        color: rgba(${color}, .7);
        
        &:hover,
        &:focus{
            background: ${modalBackgroundColor};
            outline: none;
            box-shadow: none;
            border: none;
        }
    }
`;

const Trigger = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    &::before{
        content: '';
        position: absolute;
        top: 50%;
        left: 0px;
        width: 100%;
        height: 1px;
        background: ${modalBackgroundColor};
        z-index: 1;
    }
    
    span{
        position: relative;
        z-index: 2;
        padding: 3px 8px;
        color: rgba(${color}, .2);
        background: ${modalBackgroundColor};
    }
`;

const Editor = styled.div`
    
`;

export const TaskDescription = ({value, onSave}) => {
    const [content, setContent] = useState(value);
    const [description, showDescription] = useState(false);

    return (
        <Container>
            {description ? (
                <textarea value={content} placeholder={'Enter your task description ...'} onChange={(e) => setContent(e.target.value)} onBlur={() => {
                    onSave(content)
                }}/>
            ) : null}
            <Trigger>
                <span onClick={() => showDescription(!description)}>{description ? 'hide description' : 'show description'}</span>
            </Trigger>
        </Container>
    );
};