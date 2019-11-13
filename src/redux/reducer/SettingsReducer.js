const expenses = {
    personalSalary: 0,
    investmentSavings: 0,
    savings: 0,
    officeRent: 0,
    internetCosts: 0,
    mobileCosts: 0,
    accountantCosts: 0,
    legalFees: 0,
    marketingCosts: 0,
    businessInsuranceCosts: 0,
    webHostingCosts: 0,
    accountingCosts: 0,
    managementCosts: 0,
    membershipCosts: 0,
    productivityCosts: 0,
    softwareCosts: 0,
    hardwareCosts: 0,
    officeSupplyCosts: 0,
    taxRate: 0,
    healthInsuranceCosts: 0,
    availableWorkingHours: 2080,
    weeksOfVacation: 0,
    holidays: 0,
    sickDays: 0,
    miscDaysOff: 0,
    nonBillableWork: 0,
    breakEven: 0,
    profit10: 0,
    profit20: 0
};

const schedule = {
    exclude: []
};

const initialState = {
    expenses: expenses,
    schedule: schedule
};

export const SettingsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'UPDATE_EXPENSES':
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    [action.payload.key]: action.payload.value
                }
            };
        case 'TOGGLE_MODE':
            return {
                ...state,
                darkMode: action.payload
            };
        case 'UPDATE_USERNAME':
            return {
                ...state,
                userName: action.payload
            };
        case 'UPDATE_USEREMAIL':
            return {
                ...state,
                userEmail: action.payload
            };
        default:
            return state;
    }
};