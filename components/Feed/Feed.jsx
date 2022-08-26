import React from 'react'
import MiniProfile from '../Sidebar/MiniProfile'
import Suggestions from '../Sidebar/Suggestions'
import Posts from './Posts'
import Stories from './Stories'

function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-3xl xl:max-w-6xl mx-auto">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      <section>
        <div className="sticky top-20">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  )
}

export default Feed
