import React, {useState} from 'react';
import styled from "styled-components";
import {motion as animated} from "framer-motion";
import {backgroundColor} from "../misc/Theme";
import {Button} from "../misc/Form";
import {uid} from "../helpers";

const Container = styled(animated.div)`
    position: relative;
    margin-top: 24px;
    
    textarea{
        appearance: none;
        background: ${backgroundColor};
        width: 100%;
        border: 1px solid whitesmoke;
        border-radius: 4px;
        padding: 8px;
        min-height: 200px;
        font-size: 1rem;
        outline: none;
        box-shadow: none;
        
        &:hover,
        &:focus,
        &:active{
            outline: none;
            box-shadow: none;
        }
    }
`;


export const Editor = ({open, item, toggle, onSave}) => {

    const [content, setContent] = useState(item ? item.content : '');

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(content !== ''){
            onSave({
                id: uid(),
                content: content
            })
        }
        setContent('');
        toggle();
    };

    return open ? (
        <Container>
            <form onSubmit={onFormSubmit}>
                <textarea placeholder={'Enter the description ... '} value={content} onChange={(e) => setContent(e.target.value)} onBlur={() => {
                    if(!toggle && item){
                        onSave({
                            ...item,
                            content: content
                        })
                    }
                }}/>
                {toggle ? (
                    <div style={{textAlign: 'right'}}>
                        <Button secondary onClick={() => {
                            toggle()
                        }}>cancel</Button>
                        <Button type={'submit'}>save</Button>
                    </div>
                ) : null}
            </form>
        </Container>
    ) : null;
};