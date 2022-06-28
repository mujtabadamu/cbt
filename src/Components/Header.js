import React from 'react'
import { Head } from '../Components/Styled'
import Logo  from '../Components/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <Head>
        <div><Link to='/adminlogin'> <img alt='logo' src={Logo} width='55%' /></Link> </div>
        <h3>{props.info}</h3>
    </Head>
  )
}

export default Header