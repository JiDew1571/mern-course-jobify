import { useState } from 'react';
import { useAppContext } from '../context/appContext';

import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';
import { AiOutlineAlignLeft, AiOutlineUser, AiFillCaretDown } from 'react-icons/ai';

const Navbar = () => {
	const { user, logoutUser, toggleSidebar } = useAppContext();
	const [showLogout, setShowLogout] = useState(false);
	return (
		<Wrapper>
			<div className='nav-center'>
				<button type='button' className='toggle-btn' onClick={toggleSidebar}>
					<AiOutlineAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className='logo-text'>Dashboard</h3>
				</div>
				<div className='btn-container'>
					<button
						type='button'
						className='btn'
						onClick={() => setShowLogout(!showLogout)}>
						<AiOutlineUser />
						{user.name.split(' ')[0]}
						<AiFillCaretDown />
					</button>
					<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
						<button className='dropdown-btn' type='button' onClick={logoutUser}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default Navbar;
