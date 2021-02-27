import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nav = (props: NavProps) => {
	
	return (
		<nav>
			<Link to="/"><button className="btn btn-primary btn-sm m-2">Home</button></Link>
			<Link to="/login"><button className="btn btn-primary btn-sm m-2">Login</button></Link>
			<Link to="/register"><button className="btn btn-primary btn-sm m-2">Register</button></Link>
			<Link to="/brew"><button className="btn btn-primary btn-sm m-2">Brew</button></Link>
			<Link to="/"><button className="btn btn-primary btn-sm m-2">Test</button></Link>
		</nav>
	);
};

interface NavProps {}

export default Nav;
