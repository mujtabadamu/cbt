import React from 'react'
import { Link } from 'react-router-dom'
import { Container, LandDiv, Logo } from '../Styled'
import Header from '../Header'
import Image  from '../../Components/illustration 1.png';

function LandingPage() {
  return (
    <Container>
    <Header />
    <LandDiv>
    
      <Logo src={Image} alt='Welcome_Image' />

        <h2>Welcome to <br />SAF CBT Portal</h2>
        <ol>
          <li><Link to='/adminlogin' className='login'>Login</Link></li>
          <li><Link to='/createuser' className='reg'>Sign Up</Link></li>
        </ol>
      </LandDiv>

    </Container>
  )
}

export default LandingPage