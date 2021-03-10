import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

const Home = (props: HomeProps) => {


    return (
        <>
            <Nav />
            <h1>Welcome!</h1>
            <h4>How to use:</h4>
            <ol>
                <li>Register Your Account using the Register Button Above</li>
                <li>Add a Bag of Coffee to your Kitchen with the Add Coffee Button</li>
                <ul>
                    <li>You may also add Filters to your Kitchen</li>
                </ul>
            <li>Navigate to the Brew Page and select New Brew</li>
            <li>Choose your desired Brew Method</li>
            <ul>
                <li>Fill in as much or as little info as you'd like!</li>
            </ul>
            <li>Brew, Enjoy and Keep Notes!</li>
            </ol>
            <p>Each Brew Method will remember your settings from your previous brew so that you 
                don't need to fill in all of the info every time. Once you have two or more Brews, 
                you can compare them to see what you may want to change about your tequniques.
            </p>
        </>
    );
};

interface HomeProps { }

export default Home;
