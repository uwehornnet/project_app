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

const Salary = ({settings, update_expenses}) => {
    const {expenses} = settings;
    const [personalSalary, setPersonalSalary] = useState(expenses.personalSalary);
    const [investmentSavings, setInvestmentSavings] = useState(expenses.investmentSavings);
    const [savings, setSavings] = useState(expenses.savings);

    return (
        <Container>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Personal Salary</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={personalSalary}
                    onChange={(e) => setPersonalSalary(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'personalSalary',
                        value: parseFloat(personalSalary)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Investment Savings</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={investmentSavings}
                    onChange={(e) => setInvestmentSavings(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'investmentSavings',
                        value: parseFloat(investmentSavings)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Savings</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={savings}
                    onChange={(e) => setSavings(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'savings',
                        value: parseFloat(savings)
                    })}
                />
            </InputGroup>
        </Container>
    )
};

const mapStateToProps = state => ({
    settings: state.settings
});

const mapDispatchToProps = dispatch => ({
    update_expenses: expenses => dispatch({
        type: 'UPDATE_EXPENSES',
        payload: expenses
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Salary);