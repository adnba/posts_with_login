import React, { Component } from "react"
import Posts from "./components/Posts"
import Header from "./components/Header"
import { Redirect, Route, Switch } from "react-router-dom"
import Home from "./components/Home"
import Post from "./components/Post"
import Spinner from "./components/Spinner"
import UpdatePost from "./components/UpdatePost"
import PostsContext from "./utils/PostsContext"

class App extends Component {
  state = {
    posts: null,
    numberPages: null,
    currentPage: null,
  }

  componentDidMount() {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
          console.log("data:", data)
          this.setState({
            posts: data,
            numberPages: data.number_of_pages,
            currentPage: data.current_page,
          })
        })
        .catch(err => console.log(err))
    }, 2000)
  }

  handleChangePage = pageNumber => {
    console.log("pageNumber", pageNumber)
    fetch("https://jsonplaceholder.typicode.com/posts?page=" + pageNumber)
      .then(res => res.json())
      .then(data => {
        console.log("data:", data)
        this.setState({
          posts: data.posts,
          numberPages: data.number_of_pages,
          currentPage: data.current_page,
        })
      })
      .catch(err => console.log(err))
  }

  handleUpdate = (updatedPost, postId, history) => {
    console.log("you will update this: ", updatedPost)
    fetch("https://jsonplaceholder.typicode.com/posts/" + postId, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(data => {
        console.log("data!!:", data)

        this.setState(
          prevState => {
            const newPosts = prevState.posts.filter(post => post.id !== data.id)
            console.log("new posts", newPosts)
            const newPost = {
              id: data.id,
              title: data.title,
              body: data.body,
              // image: data.image,
            }
            newPosts.push(newPost)
            return { posts: newPosts.sort((a, b) => b.id - a.id) }
          },
          () => {
            history.push("/posts-table")
          }
        )
      })
  }

  handleConfirmDelete = (postId, handleClose) => {
    console.log("deleting post:", postId)
    fetch("https://jsonplaceholder.typicode.com/posts/" + postId, {
      method: "DELETE",
    }).then(res => {
      if (res.ok) {
        this.setState(
          prevState => {
            const newPosts = prevState.posts.filter(post => post.id !== postId)
            console.log("new posts", newPosts)

            return { posts: newPosts }
          },
          () => {
            handleClose()
          }
        )
      }
    })
  }

  render() {
    console.log("state posts:", this.state.posts)

    return (
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/posts-table"
            render={props => {
              const value = {
                ...props,
                posts: this.state.posts,
                handleConfirmDelete: this.handleConfirmDelete,
                handleChangePage: this.handleChangePage,
                numberPages: this.state.numberPages,
                currentPage: this.state.currentPage,
              }
              return (
                <PostsContext.Provider value={value}>
                  <Posts />
                </PostsContext.Provider>
              )
            }}
          />
          <Route
            path="/posts/:id"
            exact
            render={props => {
              if (this.state.posts) {
                const { match } = props
                const postId = match.params.id
                const post = this.state.posts.find(post => post.id == postId)

                return <Post post={post} />
              } else {
                return <Spinner />
              }
            }}
          />
          <Route
            path="/posts/:id/update"
            render={props => {
              if (this.state.posts) {
                const { match } = props
                const postId = match.params.id
                const post = this.state.posts.find(post => post.id == postId)

                return (
                  <UpdatePost
                    {...props}
                    handleUpdate={this.handleUpdate}
                    post={post}
                  />
                )
              } else {
                return <Spinner />
              }
            }}
          />
          {/* <Route path="/not-found" component={() => <h1>Not found!</h1>} />
        <Redirect path="*" to="/not-found" /> */}
        </Switch>
      </>
    )
  }
}

export default App
