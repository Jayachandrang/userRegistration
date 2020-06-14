import React from "react";
import { Route, Switch } from "react-router-dom";
import decode from "jwt-decode";
import TopNav from "../components/HeaderNav";
import Home from "../components/Home";
import Signup from "../components/views/Signup";
import Login from "../components/views/Login";
import Dashboard from "../components/views/Dashboard";
import Error from "../components/Error";
import UserRoute from "./UserRoute";
import { userLoggedIn } from "../actions/auth";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";
import store from "../store";

if(localStorage.loggedInJWT){
	const payload = decode(localStorage.loggedInJWT);
	const user = {
		token: localStorage.loggedInJWT,
		email: payload.email,
		firstname: payload.firstname,
	  };
	  setAuthorizationHeader(localStorage.loggedInJWT);
	  store.dispatch(userLoggedIn(user));
}

const Routes = ({ location }) =>{
	return(
		<div>
			<TopNav />
			<Switch>
				<Route location={location} path="/" exact component={Home} />
				<Route location={location} path="/signup" exact component={Signup} />
				<Route location={location} path="/login" exact component={Login} />
				<UserRoute location={location} path="/dashboard" exact component={Dashboard}/>
				<Route component={Error} />
			</Switch>
		</div>
	);
};
export default Routes;