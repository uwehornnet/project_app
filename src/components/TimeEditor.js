import React, {useRef} from 'react';
import styled from "styled-components";
import {backgroundColor, dark, primary, white} from "../misc/Theme";
import {useOutsideAlerter} from "../helpers";

const Container = styled.div`
    position: absolute;
    top: 32px;
    left: 50%;
    width: 200px;
    transform: translateX(-50%);
    z-index: 99999;
    padding: 8px;
    border-radius: 4px;
    background: ${backgroundColor};
    box-shadow: 0px 2px 9px -6px rgba(${dark}, .3);
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 40px);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
`;

const Element = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(${white}, 1);
    background: rgba(${dark}, .2);
    border-radius: 4px;
    font-size: .9rem;
    
    &:hover,
    &.current {
        background: rgba(${primary}, .2);
        color: rgba(${primary}, 1);
    }
`;

export const TimeEditor = ({onSelect, toggle, open, value}) => {
    const element = useRef();
    useOutsideAlerter(element, open, () => toggle());
    const items = [
        {
            label: '15m',
            time: 900
        },
        {
            label: '30m',
            time: 1800
        },
        {
            label: '45m',
            time: 2700
        },
        {
            label: '1h',
            time: 3600
        },
        {
            label: '2h',
            time: 7200
        },
        {
            label: '4h',
            time: 14400
        },
        {
            label: '8h',
            time: 28800
        },
        {
            label: '12h',
            time: 43200
        },
        {
            label: '24h',
            time: 86400
        },
        {
            label: '48h',
            time: 172800
        },
    ];

    return(
        <Container ref={element}>
            <Grid>
                {items.map(item => (
                    <Element
                        key={item.time}
                        onClick={() => {
                            onSelect(item.time);
                            toggle();
                        }}
                        className={value === item.time ? 'current' : null}
                    >
                        {item.label}
                    </Element>
                ))}
            </Grid>
        </Container>
    );
};