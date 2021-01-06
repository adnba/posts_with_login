import React, { Component } from "react"
import { Form, Button, Container } from "react-bootstrap"

class UpdatePost extends Component {
  state = {
    title: this.props.post.post.title,
    body: this.props.post.post.body,
    image: this.props.post.post.image,
  }

  handleChange = e => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  validate = e => {
    e.preventDefault()
    const { title, body } = this.state
    if (title.length > 2 && body.length > 2) {
      this.props.handleUpdate(
        this.state,
        this.props.post.post.id,
        this.props.history
      )
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.validate} className="mt-5">
          <Form.Group controlId="formBasicPostTitle">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              onChange={this.handleChange}
              value={this.state.title}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPostBody">
            <Form.Label>Post Body</Form.Label>
            <Form.Control
              name="body"
              as="textarea"
              rows={3}
              onChange={this.handleChange}
              value={this.state.body}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPostImage">
            <Form.Label>Post Image</Form.Label>
            <Form.Control
              name="image"
              type="url"
              onChange={this.handleChange}
              value={this.state.image}
              required
            />
            <Form.Text className="text-muted">
              Example: https://images.com/abcd.png
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}
export default UpdatePost
