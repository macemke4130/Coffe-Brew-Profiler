import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

const Home = (props: HomeProps) => {
	

	return (
        <>
        <Nav />
		<h1>Home Page</h1>
        </>
	);
};

interface HomeProps {}

export default Home;
