import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout( props ) {
  const history = useHistory();

  localStorage.clear();
  history.push('/login');

  return ( <div></div> )
}