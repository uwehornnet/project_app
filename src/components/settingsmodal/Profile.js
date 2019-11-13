import React, {useState} from 'react';
import styled from "styled-components";
import {Input, InputGroup, Label} from "../../misc/Form";
import {connect} from "react-redux";

const Container = styled.div`
    padding: 16px;
    height: 40vh;
    overflow-x: scroll;
    
    &::-webkit-scrollbar{
        display: none;
    }
`;

const Profile = ({settings, update_username, update_useremail}) => {



    const [name, setName] = useState(settings.userName);
    const [email, setEmail] = useState(settings.userEmail);

    return (
        <Container>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Name</Label>
                <Input style={{background: 'whitesmoke', maxWidth: 300}} value={name} onChange={(e) => setName(e.target.value)} onBlur={() => update_username(name)}/>
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Email</Label>
                <Input style={{background: 'whitesmoke', maxWidth: 300}} value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => update_useremail(email)}/>
            </InputGroup>
        </Container>
    )
};

const mapStateToProps = state => ({
    settings: state.settings
});

const mapDispatchToProps = dispatch => ({
   update_username: userName => dispatch({
       type: 'UPDATE_USERNAME',
       payload: userName
   }),
    update_useremail: userEmail => dispatch({
        type: 'UPDATE_USEREMAIL',
        payload: userEmail
    }),
});

export default connect(mapStateToProps)(Profile);