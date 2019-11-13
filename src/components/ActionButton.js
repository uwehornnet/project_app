import React, {useState} from 'react';
import styled from "styled-components";
import {Input} from "../misc/Form";
import {color} from "../misc/Theme";

const Container = styled.div`
    position: relative;
    white-space: pre;
`;

const Trigger = styled.div`
    display: flex;
    align-items: center;
    padding: 8px;
    color: rgba(${color}, .4);
    
    svg{
        height: 16px;
        width: auto;
        display: block;
        fill: rgba(${color}, .4)
    }
`;

export const ActionButton = ({onSave, placeholder, style, data}) => {
    const [form, showForm] = useState(false);
    const [value, setValue] = useState(data ? data : '');

    return(
        <Container>
            {form ? (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if(value === ''){
                        showForm(false)
                    }
                    onSave(value);
                    setValue('');
                }}>
                    <Input autoFocus value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => {
                        if(value === ''){
                            showForm(false)
                        }
                        onSave(value);
                        setValue('');
                    }}/>
                </form>
            ) : (
                <Trigger onClick={() => showForm(true)}>{data ? data : placeholder}</Trigger>
            )}
        </Container>
    );
};