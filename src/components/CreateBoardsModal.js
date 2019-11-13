import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {ModalBody, ModalContainer, ModalHeader, ModalWrapper} from "../container/Modal";
import {Button, Input, Label} from "../misc/Form";
import {uid, useOutsideAlerter} from "../helpers";
import {connect} from "react-redux";
import {primary} from "../misc/Theme";

const Columns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    svg{
    
        height: 100px;
        width: auto;
        display: block;
        margin: 0px 40px auto 20px;
    }
    form{
        flex: 1;
    }
`;

const CreateBoardsModal = ({add_board, tasks, id, open, toggle, changeBoard}) => {
    const elem = useRef();
    const [name, setName] = useState('');

    useOutsideAlerter(elem, open, () => {
        setName('');
        toggle();
    });

    const submitBoard = (e) => {
        e.preventDefault();

        if(name !== ''){

            const board = {
                id: uid(),
                name: name,
                project: id,
                columns: [
                    {
                        id: uid(),
                        name: 'inbox',
                        items: [
                            ...tasks.filter(task => task.project === id).map(task => task.id)
                        ]
                    }
                ]
            };
            add_board(board);
            changeBoard(board.name);
        }

        setName('');

        toggle();
    };

    return open ? (
        <ModalWrapper>
            <ModalContainer
                ref={elem}
                animate={{
                    opacity: 1,
                    margin: '10vh auto auto auto'
                }}
            >
                <ModalHeader
                    color={`rgba(${primary})`}
                >
                    <span>creating new View ...</span>
                </ModalHeader>
                <ModalBody
                    style={{overflow: 'visible', minHeight: 100}}
                >
                    <Columns>
                        <div>
                            <svg viewBox="0 0 512 512"><path d="m436.695312 504h48l-25.390624-144h-48zm0 0" fill="#f39237"/><path d="m424 328h-400v-256h464v256h-48" fill="#fce0b0"/><path d="m8 40h496v32h-496zm0 0" fill="#fcb641"/><g fill="#f39237"><path d="m75.304688 504h-48l25.390624-144h48zm0 0"/><path d="m149.175781 40h-48l5.648438-32h48zm0 0"/><path d="m354.824219 40h48l-5.648438-32h-48zm0 0"/></g><path d="m160 328h-96v-23.664062l8-8.335938h80l8 7.664062zm0 0" fill="#e65039"/><path d="m440 328h64v32h-496v-32zm0 0" fill="#fcb641"/><path d="m504 80c4.425781 0 8-3.585938 8-8v-32c0-4.414062-3.574219-8-8-8h-94.472656l-4.472656-25.390625c-.671876-3.816406-3.992188-6.609375-7.878907-6.609375h-48c-2.367187 0-4.609375 1.046875-6.128906 2.855469-1.519531 1.808593-2.167969 4.199219-1.75 6.527343l3.992187 22.617188h-186.578124l3.984374-22.609375c.417969-2.335937-.222656-4.71875-1.75-6.527344-1.511718-1.816406-3.761718-2.863281-6.121093-2.863281h-48c-3.878907 0-7.199219 2.792969-7.871094 6.609375l-4.480469 25.390625h-86.472656c-4.425781 0-8 3.585938-8 8v32c0 4.414062 3.574219 8 8 8h8v240h-8c-4.425781 0-8 3.585938-8 8v32c0 4.414062 3.574219 8 8 8h35.167969l-23.734375 134.609375c-.417969 2.335937.222656 4.71875 1.75 6.527344 1.511718 1.816406 3.753906 2.863281 6.121094 2.863281h48c3.878906 0 7.199218-2.792969 7.871093-6.609375l24.230469-137.390625h297.195312l24.222657 137.390625c.671875 3.816406 3.992187 6.609375 7.871093 6.609375h48c2.367188 0 4.609376-1.046875 6.128907-2.855469 1.519531-1.808593 2.167969-4.199219 1.75-6.527343l-23.742188-134.617188h35.167969c4.425781 0 8-3.585938 8-8v-32c0-4.414062-3.574219-8-8-8h-8v-240zm-145.289062-64h31.761718l2.824219 16h-31.761719zm-245.183594 0h31.761718l-2.824218 16h-31.761719zm-97.527344 32h480v16h-480zm52.59375 448h-31.761719l22.566407-128h31.761718zm406.574219 0h-31.761719l-22.566406-128h31.761718zm4.832031-176h-40v16h56v16h-480v-16h408v-16h-256v-16.335938c0-2.175781-.886719-4.273437-2.472656-5.777343l-8-7.664063c-1.480469-1.421875-3.464844-2.222656-5.527344-2.222656h-80c-2.175781 0-4.265625.886719-5.777344 2.464844l-8 8.335937c-1.421875 1.488281-2.222656 3.472657-2.222656 5.535157v15.664062h-24v-240h448zm-328 0h-80v-12.449219l3.414062-3.550781h73.378907l3.207031 3.078125zm0 0"/></svg>
                        </div>
                        <form onSubmit={submitBoard}>
                            <div>
                                <Label>Name</Label>
                                <Input
                                    autoFocus
                                    value={name}
                                    placeholder={'How do you want to call the view?'}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop: 24, textAlign: 'right'}}>
                                <span
                                    style={{
                                        marginRight: 24,
                                    }}
                                    onClick={() => {
                                        setName('');
                                        toggle();
                                    }}
                                >
                                    cancel
                                </span>
                                <Button type={'submit'}>create View</Button>
                            </div>
                        </form>
                    </Columns>
                </ModalBody>
            </ModalContainer>
        </ModalWrapper>
    ) : null;
};

const mapStateToProps = state => ({
    tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
    add_board: board => dispatch({
        type: 'ADD_BOARD',
        payload: board
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoardsModal);