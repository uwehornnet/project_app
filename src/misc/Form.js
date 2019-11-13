import React, {useEffect, useState, useRef} from 'react';
import styled from "styled-components";
import {backgroundColor, color, dark, inputBackgroundColor, inputBorderColor, primary} from "./Theme";
import {useOutsideAlerter, colors} from "../helpers";

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const Button = styled.button`
    appearance: none;
    padding: 4px 16px;
    font-size: 1rem;
    outline: none;
    box-shadow: none;
    color: ${props => props.secondary ? `rgba(${dark}, .4)` : `white`};
    background: ${props => props.secondary ? `transparent` : `rgba(${primary}, 1)`};
    border: ${props => props.secondary ? `none` : `2px solid rgba(${primary}, 1)`};
    border-radius: 4px;
    margin: 4px;
    width: ${props => props.fullWidth ? '100%' : 'auto'};

    &:hover,
    &:active,
    &:focus{
        outline: none;
        box-shadow: none;
    }
    
    svg{
        fill: ${props => props.secondary ? `rgba(${primary}, 1)`: `rgba(255, 255, 255, 1)`};
        display: block;
        height: 16px;
        width: auto;
    }
`;

export const Label = styled.label`
    display: block;
    font-size: .9rem;
    color: rgba(${color}, .4);
    margin-bottom: 4px;
`;

export const Input = styled.input`
    appearance: none;
    font-size: 1rem;
    border: 1px solid ${inputBorderColor};
    background: ${inputBackgroundColor} !important;
    padding: 6px;
    color: rgba(${color}, .7) !important;
    box-shadow: none;
    outline: none;
    display: block;
    width: 100%;
    border-radius: 4px;
    height: 32px;
    min-width: 160px;
    
    &:hover,
    &:active,
    &:focus{
        box-shadow: none;
        outline: none;
    }
`;

export const TextArea = styled.textarea`
    appearance: none;
    border: 1px solid ${inputBorderColor};
    background: ${inputBackgroundColor};
    color: rgba(${color}, .7);
    padding: 8px;
    font-size: 1rem;
    border-radius: 4px;
    outline: none;
    box-shadow: none;
    width: 100%;
    
    &:hover,
    &:active,
    &:focus{
        outline: none;
        box-shadow: none;
    }
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 4px 0px;
    
    input{
        border-radius: 0px;
        &:last-of-type{
            flex: 1;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }
    
    label{
        flex: ${props => props.grow ? '0' : '1'};
    }
`;

const ColorPickerContainer = styled.div`
    position: relative;
    height: 32px;
    width: 20px;
    display: flex;
    align-items: center;
    span{
        height: 100%;
        width: 20px;
        display: block;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
`;

const Picker = styled.div`
    position: absolute;
    width: 100px;
    height: 100px;
    top: 100%;
    background: ${inputBackgroundColor};
    border-radius: 4px;
    padding: 8px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 24px);
    grid-template-rows: repeat(auto-fill, 24px);
    grid-column-gap: 4px;
    grid-row-gap: 4px;
    z-index: 999;
    box-shadow: 0px 1px 6px -3px rgba(0,0,0, .3);
    
    span{
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 4px;
    }
`;

export const ColorPicker = ({color, onChange, style}) => {
    const elem = useRef();
    const [picker, showPicker] = useState(false);

    useOutsideAlerter(elem, picker, () => showPicker(!picker));

    return (
        <ColorPickerContainer>
            <span
                style={{...style, backgroundColor: color && color !== '' ? color : 'whitesmoke'}}
                onClick={() => showPicker(!picker)}
            />

            {picker ? (
                <Picker ref={elem}>
                    {colors.map(color => (
                            <span
                                key={color}
                                style={{backgroundColor: color}}
                                onClick={() => {
                                    onChange(color);
                                    showPicker(!picker);
                                }}
                            />
                        )
                    )}

                </Picker>
            ) : null}
        </ColorPickerContainer>
    );
};

const Selection = styled.div`
    position: absolute;
    left: 0px;
    top: 32px;
    width: 100%
    background: ${backgroundColor};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0px 1px 6px -3px rgba(0,0,0, .3);
    z-index: 999;
    
    ul{
        padding: 0px;
        margin: 0px;
        list-style: none;
        width: 100%;
        
        li{
            padding: 8px;
            margin: 0px;
            border-bottom: 1px solid ${inputBackgroundColor};
            color: rgba(${color}, .6);
            font-size: 1rem
            
            &:last-of-type{
                border-bottom: none;
            }
            
            &:hover{
                color: rgba(${primary}, 1);
                background: rgba(${primary}, .2);
            }
        }
    }
`;

export const Select = ({items, value, onChange, onSelect, placeholder, style}) => {
    const [list, showList] = useState(false);
    const [filter, setFilter] = useState(value);
    const [filteredItems, setFilteredItems] = useState([]);

    const elem = useRef();

    useOutsideAlerter(elem, list, () => {
        showList(!list);
    });

    useEffect(() => {
        setFilteredItems(items.filter(item => item.label.includes(filter)));
    }, [filter]);

    useEffect(() => {
        setFilteredItems(items.filter(item => item.label.includes(value)));
    }, [value]);

    return(
        <Container ref={elem}>
            <Input
                style={{...style}}
                placeholder={placeholder}
                value={filter}
                onFocus={() => showList(!list)}
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
                onBlur={() => {
                    if(filter !== ''){
                        onSelect(filter);
                    }
                }}
            />

            {list ? (
                <Selection>
                    <ul>
                        {filteredItems && filteredItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    if(item.value){
                                        setFilter(item.value);
                                        onSelect(item.value);
                                        showList(!list)
                                    }else{
                                        setFilter(item.label);
                                        onSelect(item.label);
                                        showList(!list)
                                    }


                                }}
                            >{item.label}</li>
                        ))}
                    </ul>
                </Selection>
            ) : null}
        </Container>
    );
};

const CheckboxContainer = styled.div`
    position: relative;
`;

const CheckboxTrigger = styled.div`
    background: ${inputBackgroundColor};
    border: 2px solid ${inputBorderColor};
    display: block;
    height: 20px;
    width: 20px;
    border-radius: 15px;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg{
        display: block;
        height: 12px;
        width: auto;
        fill: #26de81;
    }
`;

export const Checkbox = ({checked, onChange, label}) => {

    return (
        <CheckboxContainer>
            <CheckboxTrigger onClick={() => onChange(!checked)}>
                {checked ? (
                    <svg viewBox="0 0 448.8 448.8"><path d="m142.8 323.85-107.1-107.1-35.7 35.7 142.8 142.8 306-306-35.7-35.7z"/></svg>
                ) : null}
            </CheckboxTrigger>

            {label ? label : null}
        </CheckboxContainer>
    );
};

const DropdownContainer = styled.div`
    position: relative;
    min-width: ${props => props.width ? props.width : '200px'};
    
    .trigger{
        padding: 8px;
        height: 32px;
        color: rgba(${dark}, .6);
    }
    
    ul{
        position: absolute;
        z-index: 9999;
        ${props => {
            if(props.position && props.position === 'bottom-left'){
                return `
                    top: 32px;
                    left: 0px;
                `;
            }else if(props.position && props.position === 'bottom-right'){
                return `
                    top: 32px;
                    right: 0px;
                `;
            }else if(props.position && props.position === 'right'){
                return `
                    left: 0px;
                `;
            }else if(props.position && props.position === 'left'){
                return `
                    right: 0px;
                `;
            }else {
                return `
                    top: 24px;
                `;
            }
        }}
        width: 100%;
        min-width: 200px;
        list-style: none;
        margin: 0px;
        padding: 0px;
        background: ${backgroundColor};
        border: 1px solid whitesmoke;
        border-radius: 4px;
        padding: 4px;
        box-shadow: 0px 1px 6px -3px rgba(0,0,0, .3);
        
        li{
            padding: 2px 0px;
            white-space: pre;
            span{
                display: block;
                padding: 8px;
                color: rgba(${dark}, .6);
                border-radius: 4px;
                
                &:hover,
                &.current{
                    color: rgba(${primary}, 1);
                    background: rgba(${primary}, .1);
                }
            }
        }
    }
`;

export const DropDown = ({items, onSelect, selected, placeholder, style, width, position}) => {
    const [open, setOpen] = useState(false);

    const elem = useRef();

    useOutsideAlerter(elem, open, () => {
        setOpen(!open);
    });

    return (
        <DropdownContainer
            width={width}
            position={position}
            style={{...style}}
        >
            <span
                className={'trigger'}
                onClick={() => setOpen(!open)}
            >
                {selected ? items.find(item => item.id === selected).label : placeholder}
            </span>
            {open ? (
                <ul
                    ref={elem}
                >
                    {items && items.map(item => (
                        <li key={item.id}>
                            <span
                                className={item.id === selected ? 'current dropdownBtn' : 'dropdownBtn'}
                                onClick={() => {
                                    onSelect(item.id);
                                    setOpen(!open)
                                }}
                            >
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : null}
        </DropdownContainer>
    );
};