import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Nav = (props: NavProps) => {
	let v = false;
	const authToken = localStorage.getItem('token');
	authToken ? v = true : v = false;

	const history = useHistory();

	const hLogOut = () => {
		localStorage.removeItem("token");
		history.push("/login");
	}

	return (
		<div className="row d-flex justify-content-center">
			<div className="d-flex justify-content-center">
				<nav className="d-flex flex-wrap justify-content-center">
					<Link to="/"><button className="btn btn-primary btn-sm m-2">Home</button></Link>
					{v === false && <Link to="/login"><button className="btn btn-primary btn-sm m-2">Login</button></Link>}
					{v === false && <Link to="/register"><button className="btn btn-primary btn-sm m-2">Register</button></Link>}
					{v && <Link to="/brews/new"><button className="btn btn-primary btn-sm m-2">New Brew</button></Link>}
					{v && <Link to="/brews/all"><button className="btn btn-primary btn-sm m-2">All Brews</button></Link>}
					{v && <Link to="/coffeebags/all"><button className="btn btn-primary btn-sm m-2">All Coffees</button></Link>}
					{v && <Link to="/filters/all"><button className="btn btn-primary btn-sm m-2">All Filters</button></Link>}
					{v && <button onClick={hLogOut} className="btn btn-primary btn-sm m-2">Log Out</button>}
				</nav>
			</div>
		</div>
	);
};

interface NavProps { }

export default Nav;
