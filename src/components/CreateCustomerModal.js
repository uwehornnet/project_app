import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {ModalBody, ModalContainer, ModalHeader, ModalWrapper} from "../container/Modal";
import {Button, Input, Label, TextArea} from "../misc/Form";
import {uid, useOutsideAlerter} from "../helpers";
import {connect} from "react-redux";
import {Labeler} from "./Labeler";

const Columns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    svg{
    
        height: 100px;
        width: auto;
        display: block;
        margin: -60px 40px auto 20px;
    }
    form{
        flex: 1;
    }
`;

const CreateCustomerModal = ({add_customer, open, toggle}) => {
    const elem = useRef();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');

    useOutsideAlerter(elem, open, () => {
        setFirstName('');
        toggle();
    });

    const submitTask = (e) => {
        e.preventDefault();

        if(lastName !== ''){
            add_customer({
                id: uid(),
                firstName: firstName,
                lastName: lastName,
                address: address
            })
        }
        setFirstName('');
        setLastName('');
        setAddress('');
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
                <ModalHeader>
                    <span>adding new Customer ...</span>
                </ModalHeader>
                <ModalBody
                    style={{overflow: 'visible'}}
                >
                    <Columns>
                        <div>
                            <svg viewBox="0 0 128 128"><path d="m107.24 100.21v12.74h-90.32v-12.74a15.921 15.921 0 0 1 12.64-15.34l24.1-5.4h16.84l24.09 5.4a15.93 15.93 0 0 1 12.65 15.34z" fill="#f9502e"/><path d="m111.078 112.947h-33.754v-37.221h25.504l8.25 8.25z" fill="#f1f1fb"/><path d="m36.5 49.956a4.751 4.751 0 0 0 4.751 4.751h3.311l-3.311-9.5a4.751 4.751 0 0 0 -4.751 4.749z" fill="#ffdece"/><path d="m87.82 49.956a4.751 4.751 0 0 0 -4.752-4.756l-4.943 9.5h4.943a4.751 4.751 0 0 0 4.752-4.744z" fill="#ffcdbe"/><path d="m70.495 79.472-8.417 3.504-8.416-3.504 1-10.996h14.833z" fill="#ffcdbe"/><path d="m62.078 82.976-7.25 6.471-7.995-8.356 6.829-1.619z" fill="#f1f1fb"/><path d="m62.078 82.976 7.25 6.471 7.996-8.356-6.829-1.619z" fill="#e1d8fa"/><path d="m37.33 100.61v12.34h-3.5v-12.34a1.75 1.75 0 0 1 3.5 0z" fill="#e90016"/><path d="m62.078 82.976-5.081 4.535 5.081 5.686 5.082-5.686z" fill="#00d6de"/><path d="m67.203 112.947h-10.25l5.125-19.75z" fill="#00d6de"/><path d="m41.251 35.623h41.817a0 0 0 0 1 0 0v15.655a20.909 20.909 0 0 1 -20.908 20.908 20.909 20.909 0 0 1 -20.909-20.908v-15.655a0 0 0 0 1 0 0z" fill="#ffdece"/><path d="m41.088 45.2s16.71-1.363 26.681-9.581c0 0 7.386 8.062 15.3 9.581 0 0 8.888-26.524-11.872-23.876 0 0-9.514-11.84-25.55-2.991-8.942 4.938-8.647 18.808-4.559 26.867z" fill="#ffd92d"/><path d="m111.078 83.976h-8.25v-8.25z" fill="#0f9ccd"/><g fill="#00006e"><path d="m35.579 98.863a1.75 1.75 0 0 0 -1.75 1.75v12.334a1.75 1.75 0 0 0 3.5 0v-12.334a1.751 1.751 0 0 0 -1.75-1.75z"/><path d="m45.647 20.087a1.732 1.732 0 0 0 .842-.217l.47-.254a1.75 1.75 0 1 0 -1.642-3.091l-.517.275a1.75 1.75 0 0 0 .845 3.283z"/><path d="m112.315 82.739-8.25-8.25a1.75 1.75 0 0 0 -1.237-.513h-25.5a1.75 1.75 0 0 0 -1.75 1.75v3.091l-3.451-.774-.56-6.158a22.741 22.741 0 0 0 12.673-15.539 6.493 6.493 0 0 0 1.045-12.494c1.13-4.27 3.176-14.62-1.6-20.435-2.54-3.1-6.508-4.409-11.794-3.926a20.629 20.629 0 0 0 -21.278-5.175 1.75 1.75 0 1 0 1.011 3.351 17.124 17.124 0 0 1 18.2 4.757 1.741 1.741 0 0 0 1.586.64c4.474-.572 7.692.294 9.563 2.57 3.7 4.5 1.922 14.009.678 18.216a1.733 1.733 0 0 0 -.341 1.029v6.4a19.159 19.159 0 1 1 -38.317 0v-4.526c4.442-.572 16.207-2.606 24.613-8.794a41.964 41.964 0 0 0 8.895 6.647 1.75 1.75 0 1 0 1.656-3.083 39.648 39.648 0 0 1 -9.106-7.084 1.754 1.754 0 0 0 -2.4-.167c-7.919 6.528-20.589 8.566-24.511 9.056-2.645-6.1-3.065-15.005.828-20.339a1.75 1.75 0 1 0 -2.827-2.063c-4.632 6.345-4.25 16.087-1.519 23.017a6.494 6.494 0 0 0 1.464 12.429 22.744 22.744 0 0 0 12.514 15.442l-.567 6.229-22.857 5.123a17.6 17.6 0 0 0 -14 17.045v12.736a1.75 1.75 0 0 0 3.5 0v-12.736a14.116 14.116 0 0 1 11.271-13.631l23.553-5.28 5.336 2.222-3.914 3.493-2.689-2.81a1.749 1.749 0 1 0 -2.528 2.419l3.857 4.032a1.75 1.75 0 0 0 2.43.095l.864-.771 3.291 3.683-4.887 18.844a1.75 1.75 0 1 0 3.387.879l3.432-13.221 3.43 13.221a1.75 1.75 0 1 0 3.388-.879l-4.889-18.843 3.292-3.683.864.771a1.75 1.75 0 0 0 2.43-.095l4.981-5.206v27.5a1.75 1.75 0 0 0 3.5 0v-31.757a1.7 1.7 0 0 0 0-.39v-3.328h22v6.5a1.75 1.75 0 0 0 1.75 1.75h6.5v27.221a1.75 1.75 0 0 0 3.5 0v-28.971a1.746 1.746 0 0 0 -.51-1.237zm-27.525-30.331c.018-.375.028-.752.028-1.131v-3.749a2.984 2.984 0 0 1 -.028 4.88zm-46.7-2.452a3 3 0 0 1 1.41-2.538v3.859c0 .415.013.826.035 1.235a2.993 2.993 0 0 1 -1.449-2.556zm17.91 23.122a22.541 22.541 0 0 0 12.159.045l.476 5.227-6.557 2.731-6.557-2.731zm6.079 17.492-2.61-2.919 2.609-2.329 2.61 2.329zm7.153-3.554-.906-.809-3-2.681 5.329-2.226 3.332.746zm35.346-7.065 2.275 2.275h-2.275z"/><path d="m102.883 88.7h-17.363a1.75 1.75 0 1 0 0 3.5h17.363a1.75 1.75 0 0 0 0-3.5z"/><path d="m102.883 95.863h-.8a1.75 1.75 0 0 0 0 3.5h.8a1.75 1.75 0 0 0 0-3.5z"/><path d="m85.52 99.363h10.73a1.75 1.75 0 0 0 0-3.5h-10.73a1.75 1.75 0 1 0 0 3.5z"/><path d="m102.883 103.03h-17.363a1.75 1.75 0 0 0 0 3.5h17.363a1.75 1.75 0 1 0 0-3.5z"/></g></svg>
                        </div>
                        <form>
                            <div>
                                <Label>First Name</Label>
                                <Input
                                    autoFocus
                                    value={firstName}
                                    placeholder={'Max'}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div
                                style={{marginTop: 16}}
                            >
                                <Label>Last Name</Label>
                                <Input
                                    value={lastName}
                                    placeholder={'Mustermann'}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div
                                style={{marginTop: 16}}
                            >
                                <Label>Address</Label>
                                <TextArea
                                    value={address}
                                    placeholder={'Street 7 \n ZIP Code'}
                                    style={{
                                        minHeight: 100
                                    }}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop: 24, textAlign: 'right'}}>
                                <Button secondary onClick={() => {
                                    toggle();
                                }}>cancel</Button>
                                <Button  onClick={submitTask}>add Customer</Button>
                            </div>
                        </form>
                    </Columns>
                </ModalBody>
            </ModalContainer>
        </ModalWrapper>
    ) : null;
};


const mapDispatchToProps = dispatch => ({
    add_customer: customer => dispatch({
        type: 'ADD_CUSTOMER',
        payload: customer
    }),
});

export default connect(null, mapDispatchToProps)(CreateCustomerModal);