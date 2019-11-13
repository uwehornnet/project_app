import React from 'react';
import styled from "styled-components";
import {color, dark} from "../misc/Theme";
import {convertHMS} from "../helpers";

const Container = styled.div`
    display: flex;
    align-items: center;
    
    .output{
        display: flex;
        align-items: center;
        color: rgba(${color}, .2);
        margin-right: 16px;
        font-size: 1rem;
        svg{
            display: block;
            height: 12px;
            width: auto;
            margin-right: 4px;
            position: relative;
            top: -1px;
        }
    }
`;

const Button = styled.div`
    display: flex;
    width: 35px;
    height: 35px;
    border-radius: 20px;
    background: white;
    align-items: center;
    justify-content: center;
    
    svg{
        display: block;
        height: 14px;
        width: auto;
    }
`;

export const TimeTracker = ({onStart, onStop, recorded, recording, estimated}) => {
    return (
        <Container>
            {recording ? (
                <>
                    <span className={'output'}>
                        recording ...
                    </span>
                    <Button
                        style={{
                            marginLeft: 16
                        }}
                        onClick={onStop}
                    >
                        <svg
                            viewBox="0 0 124 124"
                            style={{
                                fill: '#fc5c65'
                            }}
                        ><path d="m6 124h112c3.3 0 6-2.7 6-6v-112c0-3.3-2.7-6-6-6h-112c-3.3 0-6 2.7-6 6v112c0 3.3 2.7 6 6 6z"/></svg>
                    </Button>
                </>
            ) : (
                <>
                    <span
                        className={'output'}
                    >
                        <svg viewBox="0 0 97.16 97.16" fill={`rgba(${dark}, .2)`}><path d="m48.58 0c-26.787 0-48.58 21.793-48.58 48.58s21.793 48.58 48.58 48.58 48.58-21.793 48.58-48.58-21.793-48.58-48.58-48.58zm0 86.823c-21.087 0-38.244-17.155-38.244-38.243s17.157-38.243 38.244-38.243 38.244 17.155 38.244 38.243-17.157 38.243-38.244 38.243z"/><path d="m73.898 47.08h-21.832v-26.25c0-2.209-1.791-4-4-4s-4 1.791-4 4v30.25c0 2.209 1.791 4 4 4h25.832c2.209 0 4-1.791 4-4s-1.791-4-4-4z"/></svg>
                        {convertHMS(recorded)}{estimated ? ` / ${convertHMS(estimated)}` : null}
                    </span>
                    <Button
                        onClick={onStart}
                    >
                        <svg
                            viewBox="0 0 41.999 41.999"
                            style={{
                                fill: '#26de81'
                            }}
                        ><path d="m36.068 20.176-29-20c-.307-.211-.705-.233-1.033-.062-.329.173-.535.513-.535.885v40c0 .372.206.713.535.886.146.076.306.114.465.114.199 0 .397-.06.568-.177l29-20c.271-.187.432-.494.432-.823s-.162-.636-.432-.823z"/></svg>
                    </Button>
                </>
            )}
        </Container>
    );
};