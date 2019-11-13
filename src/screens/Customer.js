import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import Menu from "../components/Menu";
import {Input} from "../misc/Form";
import {dark} from "../misc/Theme";
import CustomerImportModal from "../components/CustomerImportModal";

const Container = styled.div`
    flex: 1;
    padding: 24px 16px 16px 86px;
    display: flex;
    flex-direction: column;
`;

const ControlBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0px;
`;

const Wrapper = styled.div`
    display: block;
    flex: 1;
    background: white;
    border-radius: 4px;
`;

const Entry = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
    padding: 16px;
    color: rgba(${dark}, .7);
    
    div{
        width: 33.33%;
        padding: 0px 8px;
        
        &:last-of-type{
            display: flex;
            justify-content: flex-end;
            
            span{
                margin-left: 8px;
            }
        }
        
        
        
        svg{
            height: 14px;
            width: auto;
            display: block;
            fill: rgba(${dark}, .2);
            
            &:hover{
                fill: rgba(${dark}, .7);
            }
        }
    }
`;

const Customer = ({customers}) => {

    const [filter, setFilter] = useState('');
    const [importDialog, showImportDialog] = useState(false);
    const [importData, setImportData] = useState(null);

    const handleImportClick = () => {
        window.ipcRenderer.send('open-dialog');
    };

    useEffect(() => {
        window.ipcRenderer.on('send-file', (event, args) => {
            const fileContent = args.split("\n");
            const keys = fileContent.filter((line, index) => index === 0)[0].split(';');
            const customers = fileContent.filter((line, index) => index > 0).map(line => {
                const customerArray = line.split(';');
                const customer = {};

                customerArray.forEach((value, index) => {
                    customer[keys[index]] = value;
                });

                return customer;
            });

            setImportData({
                keys: keys,
                value: customers
            });
            showImportDialog(!importDialog)
        });
    }, []);

    return (
        <>
            <Container>
                <ControlBar>
                    <Input
                        value={filter}
                        placeholder={'search customer by first or last name ...'}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            maxWidth: 300
                        }}
                    />
                    <Menu
                        position={'bottom-left'}
                        label={(<><svg viewBox="0 0 408 408"><path d="m51 153c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zm306 0c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zm-153 0c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51z"/></svg></>)}
                        items={[
                            {
                                label: (
                                    <>
                                        <svg viewBox="0 0 29.978 29.978"><path d="m25.462 19.105v6.848h-20.947v-6.848h-4.026v8.861c0 1.111.9 2.012 2.016 2.012h24.967c1.115 0 2.016-.9 2.016-2.012v-8.861z"/><path d="m14.62 18.426-5.764-6.965s-.877-.828.074-.828 3.248 0 3.248 0 0-.557 0-1.416c0-2.449 0-6.906 0-8.723 0 0-.129-.494.615-.494h4.572c.536 0 .524.416.524.416v8.742 1.266s1.842 0 2.998 0c1.154 0 .285.867.285.867s-4.904 6.51-5.588 7.193c-.492.495-.964-.058-.964-.058z"/></svg>
                                        Import from csv
                                    </>
                                ),
                                onClick: handleImportClick
                            }
                        ]}
                    />
                </ControlBar>
                <Wrapper>
                    {
                        customers.filter(customer =>
                            customer.firstName.toLowerCase().includes(filter.toLowerCase()) ||
                            customer.lastName.toLowerCase().includes(filter.toLowerCase()) ||
                            customer.address.toLowerCase().includes(filter.toLowerCase())
                        ).map(customer => (
                            <Entry
                                key={customer.id}
                            >
                                <div>
                                    <span>{customer.firstName} </span><span>{customer.lastName}</span>
                                </div>
                                <div>
                                    {customer.address}
                                </div>
                                <div>
                                <span>
                                    <svg viewBox="0 0 45.532 45.532"><path d="m22.766.001c-12.572 0-22.766 10.192-22.766 22.765s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765s-10.192-22.765-22.766-22.765zm0 6.807c4.16 0 7.531 3.372 7.531 7.53 0 4.159-3.371 7.53-7.531 7.53-4.158 0-7.529-3.371-7.529-7.53 0-4.158 3.371-7.53 7.529-7.53zm-.005 32.771c-4.149 0-7.949-1.511-10.88-4.012-.714-.609-1.126-1.502-1.126-2.439 0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592 0 .938-.41 1.829-1.125 2.438-2.93 2.502-6.731 4.013-10.881 4.013z"/></svg>
                                </span>
                                    <span>
                                    <svg viewBox="0 0 438.529 438.529"><path d="m417.689 75.654c-1.711-1.709-3.901-2.568-6.563-2.568h-88.224l-19.985-47.676c-2.854-7.044-7.994-13.04-15.413-17.989-7.426-4.948-14.948-7.421-22.559-7.421h-91.363c-7.611 0-15.131 2.473-22.554 7.421-7.424 4.949-12.563 10.944-15.419 17.989l-19.985 47.676h-88.22c-2.667 0-4.853.859-6.567 2.568-1.709 1.713-2.568 3.903-2.568 6.567v18.274c0 2.664.855 4.854 2.568 6.564 1.714 1.712 3.904 2.568 6.567 2.568h27.406v271.8c0 15.803 4.473 29.266 13.418 40.398 8.947 11.139 19.701 16.703 32.264 16.703h237.542c12.566 0 23.319-5.756 32.265-17.268 8.945-11.52 13.415-25.174 13.415-40.971v-270.662h27.411c2.662 0 4.853-.856 6.563-2.568 1.708-1.709 2.57-3.9 2.57-6.564v-18.274c.002-2.664-.861-4.854-2.569-6.567zm-248.388-35.976c1.331-1.712 2.95-2.762 4.853-3.14h90.504c1.903.381 3.525 1.43 4.854 3.14l13.709 33.404h-127.91zm177.872 340.613c0 4.186-.664 8.042-1.999 11.561-1.334 3.518-2.717 6.088-4.141 7.706-1.431 1.622-2.423 2.427-2.998 2.427h-237.542c-.571 0-1.565-.805-2.996-2.427-1.429-1.618-2.81-4.188-4.143-7.706-1.331-3.519-1.997-7.379-1.997-11.561v-270.664h255.815v270.664z"/><path d="m137.04 347.172h18.271c2.667 0 4.858-.855 6.567-2.567 1.709-1.718 2.568-3.901 2.568-6.57v-164.454c0-2.663-.859-4.853-2.568-6.567-1.714-1.709-3.899-2.565-6.567-2.565h-18.271c-2.667 0-4.854.855-6.567 2.565-1.711 1.714-2.568 3.904-2.568 6.567v164.454c0 2.669.854 4.853 2.568 6.57 1.713 1.711 3.9 2.567 6.567 2.567z"/><path d="m210.129 347.172h18.271c2.666 0 4.856-.855 6.564-2.567 1.718-1.718 2.569-3.901 2.569-6.57v-164.454c0-2.663-.852-4.853-2.569-6.567-1.708-1.709-3.898-2.565-6.564-2.565h-18.271c-2.664 0-4.854.855-6.567 2.565-1.714 1.714-2.568 3.904-2.568 6.567v164.454c0 2.669.854 4.853 2.568 6.57 1.712 1.711 3.903 2.567 6.567 2.567z"/><path d="m283.22 347.172h18.268c2.669 0 4.859-.855 6.57-2.567 1.711-1.718 2.562-3.901 2.562-6.57v-164.454c0-2.663-.852-4.853-2.562-6.567-1.711-1.709-3.901-2.565-6.57-2.565h-18.268c-2.67 0-4.853.855-6.571 2.565-1.711 1.714-2.566 3.904-2.566 6.567v164.454c0 2.669.855 4.853 2.566 6.57 1.718 1.711 3.901 2.567 6.571 2.567z"/></svg>
                                </span>
                                </div>
                            </Entry>
                        ))
                    }
                </Wrapper>
            </Container>
            <CustomerImportModal open={importDialog} toggle={() => showImportDialog(!importDialog)} importData={importData}/>
        </>
    );
};

const mapStateToProps = state => ({
    customers: state.customers
});

export default connect(mapStateToProps)(Customer);