import styles from './navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
	return (
		<div className={`flex lg:justify-center items-center md:sticky lg:sticky ${styles.navbar}`}>

			<div className={`hidden md:visible md:inline lg:visible mx-10 ${styles.logo}`}>USN</div>

			<div className={`flex center ${styles.search_bar}`}>
				<input className="hidden md:inline lg:inline w-[100%]" type="text" placeholder="Search" />
				<button className="rounded-full"><i className="fas fa-search"></i></button>
			</div>

			<div className={`${styles.nav} flex w-auto justify-evenly`}>
				<Link href="/"><i className="fa-solid fa-house"></i></Link>
				<a href="#"><i className="fa-solid fa-user-group"></i></a>
				<a href="#"><i className="fa-solid fa-people-group"></i></a>
				<i className="fas fa-bell"></i>
				<i className="fas fa-cog"></i>
			</div>
		</div>
	);
}
