import styles from './navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
	return (
		<div className={styles.navbar}>
			<div className={styles.logo}>USN</div>

			<div className={styles.search_bar}>
				<input type="text" placeholder="Search" />
				<button><i className="fas fa-search"></i></button>
			</div>

			<div className={styles.nav}>
				<Link href="/"><i className="fa-solid fa-house"></i></Link>
				<a href="#"><i className="fa-solid fa-user-group"></i></a>
				<a href="#"><i className="fa-solid fa-people-group"></i></a>
				<i className="fas fa-bell"></i>
				<i className="fas fa-cog"></i>
			</div>
		</div>
	);
}
