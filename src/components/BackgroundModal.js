import React, {useRef} from 'react';
import styled from "styled-components";
import {ModalBody, ModalContainer, ModalHeader, ModalWrapper} from "../container/Modal";
import {bgImages, useOutsideAlerter} from "../helpers";
import {backgroundColor, color} from "../misc/Theme";



const Container = styled.div``;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 85px);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
`;

const Box = styled.div`
    width: 100%;
    height: 85px;
    border-radius: 8px;
    position: relative;
    transition: all .3s ease;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${backgroundColor};
    color: rgba(${color}, .7);
    &:hover{
        top: -3px;
        transition: all .3s ease;
    }
`;

export const BackgroundModal = ({open, toggle, onSave, project}) => {

    const elem = useRef();
    useOutsideAlerter(elem, open, () => {
        toggle();
    });

    return open ? (
        <ModalWrapper>
            <ModalContainer
                ref={elem}
                animate={{
                    opacity: 1,
                    top: '50%'
                }}
            >
                <ModalHeader style={{padding: 16}} justify={'space-between'} color={project.color}>
                    Change project background ...
                </ModalHeader>
                <ModalBody style={{overflow: 'visible'}}>
                    <Grid>
                        <Box
                            onClick={() => {
                                onSave('#eceff1');
                                toggle();
                            }}
                        >
                            remove Image
                        </Box>
                        {/*{colors.map(color => (*/}
                        {/*    <Box*/}
                        {/*        key={color}*/}
                        {/*        style={{background: color}}*/}
                        {/*        onClick={() => {*/}
                        {/*            onSave(color);*/}
                        {/*            toggle();*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*))}*/}
                        {bgImages.map(bg => (
                            <Box
                                key={bg}
                                style={{background: `url(${bg})`}}
                                onClick={() => {
                                    onSave(bg);
                                    toggle();
                                }}
                            />
                        ))}
                    </Grid>
                </ModalBody>
            </ModalContainer>
        </ModalWrapper>
    ) : null;
};