import React from 'react';
import styled from "styled-components";
import {dark, white} from "../misc/Theme";


const Container = styled.div`
    background: rgba(${white}, 1);
    border: 1px solid rgba(${dark}, .15);
    padding: 2px;
    border-radius: 4px;
    height: 16px;
    width: 16px;
    min-width: 16px;
    min-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    
    svg{
        height: 14px;
        width: auto;
        display: block;
        fill: #26de81
    }
`;

export const Done = ({done, toggle}) => {
    return(
        <Container onClick={() => toggle()}>
            {done ? (
                <svg viewBox="0 0 448.8 448.8"><path d="m142.8 323.85-107.1-107.1-35.7 35.7 142.8 142.8 306-306-35.7-35.7z"/></svg>
            ) : null}
        </Container>
    );
};