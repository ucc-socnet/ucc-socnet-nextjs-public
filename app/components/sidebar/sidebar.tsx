import style from './sidebar.module.css'
import Link from 'next/link';

export default function Sidebar() {
	return (

	<aside className={`${style.sidebar} lg:w-50 md:sticky lg:sticky md:h-screen lg:h-screen shrink-0`}>
      <ul className="flex list-none justify-evenly items-center sticky top-100 md:block lg:block">
        <Link href="/">
          <li className="flex my-5">
            <i className="fas mx-3 fa-home text-xl lg:text-2xl md:text-2xl"></i>
            <span className="hidden lg:block">Home</span>
          </li>
        </Link>

        <Link href="/profile">
          <li className="flex my-5">
            <i className="fas mx-3 fa-user text-xl lg:text-2xl md:text-2xl"></i>
            <span className="hidden lg:block">Profile</span>
          </li>
        </Link>
        
        <Link href="/">
          <li className="flex my-5">
            <i className="fas mx-3 fa-user-friends text-xl lg:text-2xl md:text-2xl"></i>
            <span className="hidden lg:block">Friends</span>
          </li>
        </Link>
        
        <Link href="/">
          <li className="flex my-5">
            <i className="fas mx-3 fa-heart text-xl lg:text-2xl md:text-2xl"></i>
            <span className="hidden lg:block">My Likes</span>
          </li>
        </Link>

        <Link href="/">
          <li className="flex my-5">
            <i className="fas mx-3 fa-bookmark text-xl lg:text-2xl md:text-2xl"></i>
            <span className="hidden lg:block">Bookmarks</span>
          </li>
        </Link>

      </ul>
    </aside>
	);
}