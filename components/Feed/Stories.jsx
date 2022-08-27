import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import Story from './Story'
import { useSession } from 'next-auth/react'

function Stories() {
  const [suggestions, setSuggestions] = useState([])
  const { data: session } = useSession()

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
      {session && <Story name={session.user.username} avatar={session.user.image} />}

      {suggestions.map(({ id, name, avatar }) => (
        <Story key={id} name={name} avatar={avatar} />
      ))}
    </div>
  )
}

export default Stories
