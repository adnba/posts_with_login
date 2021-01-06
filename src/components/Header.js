import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import decode from "jwt-decode"

function handleLogout() {
  localStorage.removeItem("my_token")
}

function Header(props) {
  let loggedIn = false
  const token = localStorage.getItem("my_token")
  if (token) {
    try {
      const decodedToken = decode(token)
      console.log("decoded token:", decodedToken)
      if (decodedToken.exp > Date.now() / 1000) {
        loggedIn = true
      }
    } catch (ex) {}
  }
  console.log("loggedIn", loggedIn)

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="">
          <Nav.Link>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/posts-table">
              Posts Table
            </Link>
          </Nav.Link>
          {loggedIn ? (
            <Nav.Link>
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </Nav.Link>
          ) : (
            <Nav.Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
