import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

const Home = (props: HomeProps) => {


    return (
        <>
            <Nav />
            <h1>Welcome!</h1>
            <small>This site is fully functional and still in development. New features and updates will roll out periodically.
                Thank you for your patience and happy brewing! - Lucas</small>
            <h4>How to use:</h4>
            <ol>
                <li>Register Your Account using the Register Button Above</li>
                <li>Add a Bag of Coffee to your Kitchen with the Add Coffee Button</li>
                <ul>
                    <li>You may also add Filters to your Kitchen. Some are already provided for you.</li>
                </ul>
                <li>Select the New Brew button</li>
                <li>Choose your desired Brew Method</li>
                <ul>
                    <li>Fill in as much or as little info as you'd like!</li>
                </ul>
                <li>Brew, Enjoy and Keep Notes!</li>
            </ol>
            <p>Each Brew Method will remember your settings from your previous brew to speed up
                your next brew.</p>
            <p>After submitting the Brew, you may add Brewing or Tasting Notes.</p>
            <p>Once you have two or more Brews, you can compare them to see what you may want to
                change about your tequniques.</p>
                <p><strong>Any feedback, suggestions or bug reports can be sent to </strong>lucasmace4130@gmail.com</p>
        </>
    );
};

interface HomeProps { }

export default Home;
