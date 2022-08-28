import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import Post from './Post'

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
        setPosts(snapshot.docs)
      }),
    []
  )

  return (
    <div>
      {posts.map((post) => {
        const { username, image, profileImg, caption } = post.data()

        return (
          <Post
            key={post.id}
            id={post.id}
            name={username}
            img={image}
            userImg={profileImg}
            caption={caption}
          />
        )
      })}
    </div>
  )
}

export default Posts
