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

const WorkinHours = ({settings, update_expenses}) => {
    const {expenses} = settings;
    const [weeksOfVacation, setWeeksOfVacation] = useState(expenses.weeksOfVacation);
    const [sickDays, setSickDays] = useState(expenses.sickDays);
    const [miscDaysOff, setMiscDaysOff] = useState(expenses.miscDaysOff);
    const [nonBillableWork, setNonBillableWork] = useState(expenses.nonBillableWork);

    return (
        <Container>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Weeks of Vacation</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={weeksOfVacation}
                    onChange={(e) => setWeeksOfVacation(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'weeksOfVacation',
                        value: parseFloat(weeksOfVacation)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Sick days</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={sickDays}
                    onChange={(e) => setSickDays(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'sickDays',
                        value: parseFloat(sickDays)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Misc days off</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={miscDaysOff}
                    onChange={(e) => setMiscDaysOff(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'miscDaysOff',
                        value: parseFloat(miscDaysOff)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Non billable work in %</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={nonBillableWork}
                    onChange={(e) => setNonBillableWork(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'nonBillableWork',
                        value: parseFloat(nonBillableWork)
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkinHours);