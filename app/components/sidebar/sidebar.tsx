import style from './sidebar.module.css'
import Link from 'next/link';

export default function Sidebar() {
	return (

	<aside className={`${style.sidebar} w-20 lg:w-50`}>
      <ul className={style.navside_controls}>
        <Link href="/"><li><i className="fas fa-home text-2xl"></i> <span className="invisible lg:visible">Home</span></li></Link>
        <a href="/profile"><li><i className="fas fa-user text-2xl"></i> <span className="invisible lg:visible">Profile</span></li></a>
        <li><i className="fas fa-user-friends text-2xl"></i><span className="invisible lg:visible">Friends</span></li>
        <li><i className="fas fa-heart text-2xl"></i><span className="invisible lg:visible">My Likes</span></li>
        <li><i className="fas fa-bookmark text-2xl"></i><span className="invisible lg:visible">Bookmarks</span></li>
      </ul>
    </aside>
	);
}