import Wrapper from '../assets/wrappers/SmallSidebar';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useAppContext } from '../context/appContext';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';
// import Logo from './Logo';

const SmallSidebar = () => {
	return (
		<Wrapper>
			<div className='sidebar-container show-sidebar'>
				<div className='container'>
					<button className='close-btn'>
						<AiFillCloseCircle />
					</button>
					<header>
						<Logo />
					</header>
					<div className='nav-links'>nav links</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default SmallSidebar;
