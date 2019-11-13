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

const BusinessCosts = ({settings, update_expenses}) => {

    const {expenses} = settings;
    const [officeRent, setOfficeRent] = useState(expenses.officeRent);
    const [internetCosts, setInternetCosts] = useState(expenses.internetCosts);
    const [mobileCosts, setMobileCosts] = useState(expenses.mobileCosts);
    const [accountantCosts, setAccountantCosts] = useState(expenses.accountantCosts);
    const [legalFees, setLegalFees] = useState(expenses.legalFees);
    const [marketingCosts, setMarketingCosts] = useState(expenses.marketingCosts);
    const [businessInsuranceCosts, setBusinessInsuranceCosts] = useState(expenses.businessInsuranceCosts);
    const [webHostingCosts, setWebhostingCosts] = useState(expenses.webHostingCosts);
    const [managementCosts, setManagementCosts] = useState(expenses.managementCosts);
    const [membershipCosts, setMembershipCosts] = useState(expenses.membershipCosts);
    const [productivityCosts, setProductivityCosts] = useState(expenses.productivityCosts);
    const [softwareCosts, setSoftwareCosts] = useState(expenses.softwareCosts);
    const [hardwareCosts, setHardwareCosts] = useState(expenses.hardwareCosts);
    const [officeSupplyCosts, setOfficeSupplyCosts] = useState(expenses.officeSupplyCosts);
    const [taxRate, setTaxRate] = useState(expenses.taxRate);
    const [healthInsuranceCosts, setHaelthInsuranceCosts] = useState(expenses.healthInsuranceCosts);

    return (
        <Container>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Office Rent</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={officeRent}
                    onChange={(e) => setOfficeRent(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'officeRent',
                        value: parseFloat(officeRent)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Internet</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={internetCosts}
                    onChange={(e) => setInternetCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'internetCosts',
                        value: parseFloat(internetCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Mobile Phone and Data</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={mobileCosts}
                    onChange={(e) => setMobileCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'mobileCosts',
                        value: parseFloat(mobileCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Accountant</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={accountantCosts}
                    onChange={(e) => setAccountantCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'accountantCosts',
                        value: parseFloat(accountantCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Legal fees</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={legalFees}
                    onChange={(e) => setLegalFees(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'legalFees',
                        value: parseFloat(legalFees)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Marketing</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={marketingCosts}
                    onChange={(e) => setMarketingCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'marketingCosts',
                        value: parseFloat(marketingCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Business Insurance</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={businessInsuranceCosts}
                    onChange={(e) => setBusinessInsuranceCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'businessInsuranceCosts',
                        value: parseFloat(businessInsuranceCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Webhosting</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={webHostingCosts}
                    onChange={(e) => setWebhostingCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'webHostingCosts',
                        value: parseFloat(webHostingCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Management / Projectmanagement</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={managementCosts}
                    onChange={(e) => setManagementCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'managementCosts',
                        value: parseFloat(managementCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Memeberships</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={membershipCosts}
                    onChange={(e) => setMembershipCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'membershipCosts',
                        value: parseFloat(membershipCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Productivity</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={productivityCosts}
                    onChange={(e) => setProductivityCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'productivityCosts',
                        value: parseFloat(productivityCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Software</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={softwareCosts}
                    onChange={(e) => setSoftwareCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'softwareCosts',
                        value: parseFloat(softwareCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Hardware</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={hardwareCosts}
                    onChange={(e) => setHardwareCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'hardwareCosts',
                        value: parseFloat(hardwareCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Office Supplies</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={officeSupplyCosts}
                    onChange={(e) => setOfficeSupplyCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'officeSupplyCosts',
                        value: parseFloat(officeSupplyCosts)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Tax Rate in %</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'taxRate',
                        value: parseFloat(taxRate)
                    })}
                />
            </InputGroup>
            <InputGroup style={{justifyContent: 'space-between'}}>
                <Label style={{fontWeight: 'bold', fontSize: '1rem'}}>Health Insurance</Label>
                <Input
                    type={'number'}
                    style={{background: 'whitesmoke', maxWidth: 300}}
                    value={healthInsuranceCosts}
                    onChange={(e) => setHaelthInsuranceCosts(e.target.value)}
                    onBlur={() => update_expenses({
                        key: 'healthInsuranceCosts',
                        value: parseFloat(healthInsuranceCosts)
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessCosts);