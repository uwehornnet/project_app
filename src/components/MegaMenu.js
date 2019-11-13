import React, {useRef} from 'react';
import styled from "styled-components";
import {useOutsideAlerter} from "../helpers";
import {primary, color, modalBackgroundColor} from "../misc/Theme";

const Container = styled.div`
    position: relative;
    
    .menu{
        position: absolute;
        background: ${modalBackgroundColor};
        box-shadow: 0px 2px 9px -6px rgba(${color}, .3);
        padding: 8px;
        border-radius: 4px;
        min-width: 240px;
        top: 32px;
        right: 0px;
        
        label{
            display: block;
            margin-top: 8px;
        }
    }
`;

const Label = styled.div`
    padding: 8px;
    border-radius: 4px;
    color: rgba(${color}, .7);
    text-align: center;
    
    svg{
        height: 14px;
        width: auto;
        display: block;
        fill: rgba(${color}, .7);
    }
    
    &:hover{
        color: rgba(${primary}, 1);
        background: rgba(${primary}, .1);
        svg{
            fill: rgba(${primary}, 1);
        }
    }
`;



export const MegaMenu = ({onClick, open, label, children, position, style}) => {

    const element = useRef();
    useOutsideAlerter(element, open, onClick);


    return(
        <Container ref={element} position={position}>
            <Label
                style={{...style}}
                onClick={onClick}
            >
                {label}
            </Label>

            {children}
        </Container>
    )
};