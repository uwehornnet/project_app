import React, {useState} from 'react';
import styled from "styled-components";
import {motion as animated} from "framer-motion";
import {backgroundColor, dark} from "../misc/Theme";
import {Input} from "../misc/Form";

const Container = styled(animated.div)`
    position: absolute;
    opacity: 0;
    top: -10px;
    padding: 8px;
    background: ${backgroundColor};
    border-radius: 4px;
    min-width: 210px;
    box-shadow: 0px 2px 9px -6px rgba(${dark}, .3);
    z-index: 999;
`;

export const ListCreator = ({open, toggle, onSave}) => {

    const [name, setName] = useState('');

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(name === ''){
            toggle();
            return;
        }

        onSave(name);
        setName('');
        toggle();
    };

    return open ? (
        <Container animate={{
            top: '32px',
            opacity: 1
        }}>
            <form onSubmit={onFormSubmit}>
                <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} onBlur={onFormSubmit} placeholder={'Name of your Checklist'}/>
            </form>
        </Container>
    ) : null;
};