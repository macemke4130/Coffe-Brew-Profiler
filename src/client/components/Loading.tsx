import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Loading = (props: LoadingProps) => {
	return (
		<h2>Loading...</h2>
	);
};

interface LoadingProps {}

export default Loading;
