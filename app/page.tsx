'use client'
import Navbar from "./components/navbar/navbar"
import Sidebar from "./components/sidebar/sidebar"
import CreatePostCard from "./components/create_post_card/create_post_card"

export default function Home() {
  return (

  <>

    <Navbar />
    <div className="flex h-screen bg-stone-200">
      <Sidebar />
      <CreatePostCard />
    </div>

  </>

  );
}
