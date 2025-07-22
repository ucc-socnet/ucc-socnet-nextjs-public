import style from './sidebar.module.css'

export default function Sidebar() {
	return (

	<aside className={style.sidebar}>
      <ul className={style.navside_controls}>
        <li><i className="fas fa-home"></i> Home</li>
        <a href="/login"><li><i className="fas fa-user"></i> Profile</li></a>
        <li><i className="fas fa-user-friends"></i> Friends</li>
        <li><i className="fas fa-heart"></i> My Likes</li>
        <li><i className="fas fa-bookmark"></i> Bookmarks</li>
      </ul>
    </aside>

	);
}