import { createContext, useState } from "react";

const initialValues = {
  posts: []
}

export const PostsContext = createContext(initialValues)

export const PostsProvider = ({ children, uid }) => {
  const [posts, setPosts] = useState([])

  const handleSetPosts = (posts) => {
    if (posts) {
      setPosts(posts)
    }
  }

  const value = {
    posts,
    setPosts: handleSetPosts,
    uid
  }


  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}