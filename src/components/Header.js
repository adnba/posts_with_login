import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header(props) {
    return (<Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
                <Nav.Link><Link className="nav-link" to="/">Home</Link></Nav.Link>
                <Nav.Link><Link className="nav-link" to="/posts-table">Posts Table</Link></Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>)
}

export default Header