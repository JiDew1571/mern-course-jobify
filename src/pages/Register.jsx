import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import Alert from '../components/Alert';
import { useAppContext } from '../context/appContext';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
};

const Register = () => {
	const [values, setValues] = useState(initialState);
	const navigate = useNavigate();

	const { isLoading, showAlert, displayAlert, userAlert, user, setupUser } =
		useAppContext();

	const handelChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;

		if (!email || !password || (!isMember && !name)) {
			displayAlert();
			return;
		}

		const currentUser = { name, email, password };
		if (isMember) {
			setupUser({
				currentUser,
				endPoint: 'login',
				alertText: 'Logged In!! Redirecting....',
			});
		} else {
			setupUser({
				currentUser,
				endPoint: 'register',
				alertText: 'Registered!! Redirecting....',
			});
		}

		// console.log(values);
	};

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	useEffect(() => {
		if (user) {
			userAlert();
			setTimeout(() => {
				navigate('/');
			}, 2200);
		}
	}, [userAlert, user, navigate]);

	return (
		<Wrapper className='full-page'>
			<form onSubmit={handleSubmit} className='form'>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{showAlert && <Alert />}

				{/* name field */}
				{!values.isMember && (
					<FormRow
						name='name'
						type='text'
						labelText='name'
						value={values.name}
						handleChange={handelChange}
					/>
				)}

				{/* email field */}
				<FormRow
					name='email'
					type='email'
					labelText='email'
					value={values.email}
					handleChange={handelChange}
				/>

				{/* password field */}
				<FormRow
					name='password'
					type='password'
					labelText='password'
					value={values.password}
					handleChange={handelChange}
				/>

				<button type='submit' className='btn btn-block' disabled={isLoading}>
					Submit
				</button>

				{/* toggle button */}
				<p>
					{values.isMember ? 'Not a member yet?' : 'Already a member?'}

					<button type='button' onClick={toggleMember} className='member-btn'>
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
