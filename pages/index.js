import Head from 'next/head'
import Feed from '../components/Feed/Feed'
import Header from '../components/Header/Header'
import Modal from '../components/Modal/Modal'

export default function Home() {
  return (
    <div className="min-h-screen overflow-y-scroll scrollbar-hide bg-gray-100">
      <Head>
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Feed />

      <Modal />
    </div>
  )
}
