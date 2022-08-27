import React from 'react'
import Post from './Post'

const posts = [
  {
    id: 1,
    name: 'Johnny',
    img: 'https://links.papareact.com/3ke',
    userImg: 'https://links.papareact.com/3ke',
    caption: 'This is a test!! This is a test!! This is a test!! This is a test!! This is a test!! This is a test!! This is a test!! This is a test!! This is a test!! This is a test!!',
  },
  {
    id: 2,
    name: 'Johnny',
    img: 'https://links.papareact.com/3ke',
    userImg: 'https://links.papareact.com/3ke',
    caption: 'This is a test!!',
  },
  {
    id: 3,
    name: 'Johnny',
    img: 'https://links.papareact.com/3ke',
    userImg: 'https://links.papareact.com/3ke',
    caption: 'This is a test 2',
  },
]

function Posts() {
  return (
    <div>
      {posts.map(({ id, name, img, userImg, caption }) => (
        <Post key={id} id={id} name={name} img={img} userImg={userImg} caption={caption} />
      ))}
    </div>
  )
}

export default Posts
