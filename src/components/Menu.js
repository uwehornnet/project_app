import React, {useState, useRef} from 'react';
import styled from "styled-components";
import {modalBackgroundColor, color, dark, primary} from "../misc/Theme";
import {useOutsideAlerter} from "../helpers";
import {motion as animated} from "framer-motion";

const Container = styled.div`
    position: relative;
   
    .label{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        
        svg{
            height: 16px;
            width: auto;
            display: block;
            fill: rgba(${color}, .6);
        }
    }
    
    span{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        width: 100%;
        background: rgba(${primary}, 0);
        border-radius: 4px;
        color: rgba(${color}, .7);
        svg {
            height: 16px;
            width: auto;
            display: block;
            fill: rgba(${color}, .6);
        }
        
        &:hover{
            background: rgba(${primary}, .1);
            svg{
                fill: rgba(${primary}, 1);
            }
        }
    }
`;

const List = styled(animated.ul)`
    list-style: none;
    padding: 4px;
    margin: 0px;
    position: absolute;
    width: auto;
    min-width: 200px;
    ${props => {
        if(props.position && props.position === 'bottom'){
            return(`top: 100%;`);
        }else if(props.position && props.position === 'bottom-left'){
            return(`top: 100%; right: 0%;`)
        }else if(props.position && props.position === 'right'){
            return(`top: 20%; left: 80%;`)
        }else if(props.position && props.position === 'bottom-right'){
            return(`top: 100%; left: 0%;`)
        }else if(props.position && props.position === 'left'){
            return(`top: 20%; right: 80%;`)
        }else if(props.position && props.position === 'top'){
            return(`bottom: 20%; left: 80%;`)
        }else{
            return(`left: 40px; top: 20px;`);
        }
    }}
    background: ${modalBackgroundColor};
    border-radius: 4px;
    box-shadow: 0px 2px 9px -6px rgba(${dark}, .3);
    z-index: 9999;
    opacity: 0;
    
    li{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1rem;
        span, a{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            border-radius: 4px;
            padding: 8px;
            color: inherit;
            text-decoration: none;
            color: rgba(${color}, .7);
            white-space: pre;
            
            svg{
                height: 16px;
                width: auto;
                display: block;
                margin-right: 16px;
            }
            
            a{
                padding: 0px;
                background: transparent;
            }
        }
       
        &:hover{
            span{
                background: rgba(${primary}, .1);
                color: rgba(${primary}, 1);
                
                a{
                    padding: 0px;
                    background: transparent;
                    color: rgba(${primary}, 1);
                }
            }
        }
    }
    
`;

const Menu = ({label, items, position, style}) => {
    const element = useRef();
    const [list, showList] = useState(false);

    useOutsideAlerter(element, list, () => showList(!list));

    return(
        <Container ref={element} style={{...style}}>
            <span className={'label'} onClick={() => showList(!list)}>{label}</span>
            {list && (<List animate={{opacity: 1}} position={position}>
                {items && items.map((item,index) => (
                    <li key={index} onClick={() => {
                        item.onClick();
                        showList(!list)
                    }}>
                        <span>{item.label}</span>
                    </li>
                ))}
            </List>)}
        </Container>
    );
};

export default Menu;