import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export default function Logout( props ) {
  const history = useHistory();

  useEffect(() => {
    localStorage.clear();
    history.push('/login');
  }, []);

  return ( <div></div> )
}