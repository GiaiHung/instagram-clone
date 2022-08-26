import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import Story from './Story'

function Stories() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, index) => {
      const name = faker.internet.userName()
      const email = faker.internet.email()
      const avatar = faker.image.avatar()

      return {
        id: index,
        name,
        email,
        avatar,
      }
    })

    setSuggestions(suggestions)
  }, [])

  return (
    <div className="flex gap-x-4 mt-8 p-6 border border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-rounded">
      {suggestions.map(({ id, name, avatar }) => (
        <Story key={id} name={name} avatar={avatar} />
      ))}
    </div>
  )
}

export default Stories
