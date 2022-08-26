import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide bg-gray-100">
      <Head>
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Feed />
    </div>
  )
}
