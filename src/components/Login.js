import React, { Component } from "react"
import "./Login.css"

class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log("my form", this.state)
    const body = {
      user: {
        email: this.state.email,
        password: this.state.password,
      },
    }
    console.log("form body", body)
    fetch("https://aqueous-chamber-95142.herokuapp.com/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async response => {
        console.log(response)
        if (response.ok) {
          const token = response.headers.get("authorization")
          console.log("my token", token)
          localStorage.setItem("my_token", token)
        } else {
          throw await response.json()
        }
      })
      .catch(ex => alert(ex.error))
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input className="form-submit" value="SUBMIT" type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default Login
