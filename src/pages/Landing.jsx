import main from '../assets/images/Dev.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

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
					<button className='btn btn-hero'>
						<a target='_parent' href='/register'>
							Login/Register
						</a>
					</button>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default Landing;
