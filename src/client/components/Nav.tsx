import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Nav = (props: NavProps) => {
	let isAuth = false;
	const authToken = localStorage.getItem('authToken');
	authToken ? isAuth = true : isAuth = false;

	const history = useHistory();

	const hLogOut = () => {
		localStorage.removeItem("authToken");
		history.push("/login");
	}
	
	return (
		<nav>
			<Link to="/"><button className="btn btn-primary btn-sm m-2">Home</button></Link>
			{isAuth === false && <Link to="/login"><button className="btn btn-primary btn-sm m-2">Login</button></Link>}
			{isAuth === false && <Link to="/register"><button className="btn btn-primary btn-sm m-2">Register</button></Link>}
			{isAuth && <Link to="/brew"><button className="btn btn-primary btn-sm m-2">New Brew</button></Link>}
			{isAuth && <Link to="/coffeebag"><button className="btn btn-primary btn-sm m-2">New Coffee Bag</button></Link>}
			{isAuth && <button onClick={hLogOut} className="btn btn-primary btn-sm m-2">Log Out</button>}
		</nav>
	);
};

interface NavProps {}

export default Nav;
