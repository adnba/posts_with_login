import React, { Component } from "react"
import { Card, Button, Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

class Post extends Component {
  render() {
    console.log("post from post:", this.props.post)
    return (
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }} className="mb-5 m-auto">
              <Card.Img variant="top" src={this.props.post.post.image} />
              <Card.Body>
                <Card.Title>{this.props.post.post.title}</Card.Title>
                <Card.Text>{this.props.post.post.body}</Card.Text>
                <Link to="/posts-table" className="btn btn-secondary">
                  Go back to the Posts Table
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default Post
