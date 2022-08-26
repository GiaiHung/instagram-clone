/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

function Suggestions() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, index) => {
      const name = faker.internet.userName()
      const email = faker.internet.email()
      const avatar = faker.image.avatar()
      const company = faker.company.bs()

      return {
        id: index,
        name,
        email,
        avatar,
        company,
      }
    })

    setSuggestions(suggestions)
  }, [])

  return (
    <div className="hidden md:block mt-4 ml-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Suggestions for you</h3>
        <button className="text-gray-500 cursor-pointer">See all</button>
      </div>

      {suggestions.map(({ id, name, email, avatar, company }) => (
        <div className="flex items-center gap-x-3 mb-3" key={id}>
          <img
            className="w-14 h-14 object-cover rounded-full p-[2px] border border-blue-500"
            src={avatar}
            alt=""
          />
          <div className="flex flex-col flex-1">
            <h3 className="text-md text-bold">{name}</h3>
            <p className="text-gray-500 text-sm">Currently work as {company}</p>
          </div>

          <button className="text-md text-purple-500 font-semibold">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
