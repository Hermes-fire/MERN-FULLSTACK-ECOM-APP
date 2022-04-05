import React, { Fragment } from 'react';
import {Container, Navbar, Nav,} from 'react-bootstrap/';
import {Link, withRouter} from 'react-router-dom'
import './Menu.css'
import {signout, isAuthenticated} from '../auth'
 
const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color:'#ff9900'}
    }else {
        return {color:'#ffffff'}
    }
}

const Menu = ({history}) => (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
    <Container>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link as={Link} to={'/'} style={isActive(history,'/')}>Home</Nav.Link>
        <Nav.Link as={Link} to={'/shop'} style={isActive(history,'/shop')}>Shop</Nav.Link>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Nav.Link as={Link} to={'/user/dashboard'} style={isActive(history,'/user/dashboard')}>Dashboard</Nav.Link>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Nav.Link as={Link} to={'/admin/dashboard'} style={isActive(history,'/admin/dashboard')}>Dashboard</Nav.Link>
        )}
        {!isAuthenticated() && (
            <Fragment>
                <Nav.Link as={Link} to={'/signin'} style={isActive(history,'/signin')}>Signin</Nav.Link>
                <Nav.Link as={Link} to={'/signup'} style={isActive(history,'/signup')}>Signup</Nav.Link>
            </Fragment>
        )}
        {isAuthenticated() && (
        <Nav.Link as={Link} to={'/'} onClick={() => signout(()=>{return})}>Signout</Nav.Link>
        )}
        </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
)

export default withRouter(Menu)