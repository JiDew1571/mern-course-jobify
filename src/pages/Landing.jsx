import main from '../assets/images/Dev.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				{/* Info */}
				<div className='info'>
					<h1>
						Job <span>Tracking</span> App
					</h1>
					<p>
						A simple job tracking app build by Jitendra Seervi by learning from the
						course of John Smilga from udemy
					</p>
					<Link to='/register' className='btn btn-hero'>
						Login/Register
					</Link>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default Landing;
