import styled from "styled-components";
import {backgroundColor, dark, color, white, modalBackgroundColor, inputBorderColor} from "../misc/Theme";
import {motion as animated} from "framer-motion";

export const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgba(${dark}, .8);
    z-index: 99999;
`;

export const ModalContainer = styled(animated.div)`
    position: relative;
    background: ${modalBackgroundColor};
    border-radius: 4px;
    width: 70%;
    max-width: 600px;
    opacity: 0;
    margin: 0vh auto auto auto;
    box-shadow: 0px 2px 9px -6px rgba(${dark}, .3);
`;

export const ModalHeader = styled.div`
    padding: 16px;
    border-bottom: 1px solid ${inputBorderColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    justify-content: ${props => props.justify ? props.justify : 'center'};
    color: ${props => props.color ? `rgba(${white}, 1)` : `rgba(${color}, 1)`};
    background: ${props => props.color ? props.color : `rgba(${backgroundColor}, 1)`};
    font-size: 1.2rem;
    
    .circleBtn{
        appearance: none;
        height: 30px;
        width: 30px;
        background: white;
        border-radius: 40px;
        border: none;
        padding: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        box-shadow: none;
        margin: 0px 0px 0px 8px;
        
        svg{
            height: 14px;
            width: auto;
            display: block;
            margin: 0px;
        }
        
        &:hover{
            outline: none;
            box-shadow: none;
        }
    }
`;

export const ModalBody = styled.div`
    padding: 24px;
    max-height: 70vh;
    overflow-Y: scroll;
    overflow-X: auto;
    min-height: 300px;
    color: rgba(${color}, .7);
    &::-webkit-scrollbar{
        display: none;
    }
`;