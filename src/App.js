import React from 'react';
import {HashRouter as Router, Link, Route} from "react-router-dom";
import {color} from "./misc/Theme";
import {ThemeProvider, withTheme} from 'styled-components';
import {connect} from "react-redux";
import Dashboard from "./screens/Dashboard";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Project from "./screens/Project";
import Customer from "./screens/Customer";
import Analytics from "./screens/Analytics";
import Schedule from "./screens/Schedule";

const TitleBar = styled.div`
	display: flex;
	width: 100%
	justify-content: center;
	align-items: center;
	height: 24px;
	background: transparent;
	-webkit-app-region: drag;
	position: fixed;
	a{
		display: flex;
		align-items: center;
		text-decoration: none;
		color: rgba(${color}, 1);
		
		svg{
			display: block;
			height: 14px;
			width: auto;
			margin-right: 8px;
			fill: rgba(${color}, 1);
		}
	}
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    height: 100vh;
`;

const App = (props) => {
	const {theme} = props;
	const {settings} = props;

	return (
		<ThemeProvider theme={{
			// mode: theme && theme.darkMode ? 'dark' : 'light'
			mode: settings && settings.darkMode ? 'dark' : 'light'
		}}>
			<Router>
				<TitleBar/>
                <Container>
                    <Sidebar/>

                    <Route exact path={'/'} component={Dashboard}/>
                    <Route exact path={'/project/:id'} component={Project}/>
                    <Route exact path={'/customer'} component={Customer}/>
                    <Route exact path={'/schedule'} component={Schedule}/>
                    <Route exact path={'/analytics'} component={Analytics}/>
                </Container>
			</Router>
		</ThemeProvider>
	);
};

const mapStateToProps = (state) => ({
	theme: state.theme,
	settings: state.settings
});

export default connect(mapStateToProps)(withTheme(App));
