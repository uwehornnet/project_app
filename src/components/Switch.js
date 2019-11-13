import React from 'react';
import styled from "styled-components";
import {dark, grey, primary, white} from "../misc/Theme";

const Container = styled.div`
    position: relative;
    height: 16px;
    width: 30px;
    border-radius: 10px;
    border: 1px solid rgba(${dark}, .1);
    background: ${props => props.checked ? `rgba(${primary}, 1)` : `rgba(${grey}, .75)`};
    transition: background .3s ease;
`;

const Dot = styled.div`
    height: 14px;
    width: 14px;
    border-radius: 10px;
    background: rgba(${white}, 1);
    position: absolute;
    left: 0px;
    transition: all 1s ease;
    
    &.checked{
        left: auto;
        right: 0px
        transition: all 1s ease;
    }
`;

export const Switch = ({checked}) => {
    return(
        <Container checked={checked}>
            <Dot className={checked ? 'checked' : 'unchecked'}/>
        </Container>
    )
};