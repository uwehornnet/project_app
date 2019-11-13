import CombinedReducer from "./reducer/CombinedReducer";
import {createStore} from "redux";

const Store = window.store;
const store = new Store();

const saveToLocalStorage = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		window.localStorage.setItem('state', serializedState);
		store.set('state', serializedState);
	} catch (e) {
		console.log(e)
	}
};


const fetchLocalStorage = () => {
	try {
		const serializedState = window.localStorage.getItem('state');
		// const serializedState = store.get('state');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState)
	} catch (e) {
		console.log(e);
		return undefined;
	}
};
const persistedState = fetchLocalStorage();

const initialState = createStore(
	CombinedReducer,
	persistedState,
);

initialState.subscribe(() => {
	saveToLocalStorage(initialState.getState());
});

export default initialState;