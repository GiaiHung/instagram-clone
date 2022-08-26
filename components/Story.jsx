/* eslint-disable @next/next/no-img-element */
import React from 'react'

function Story({ name, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <p>{name}</p>
    </div>
  )
}

export default Story
