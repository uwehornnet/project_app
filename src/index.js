import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import initialState from "./redux/initialState";

ReactDOM.render(
	<Provider store={initialState}>
		<App/>
	</Provider>
	, document.getElementById('root'));
