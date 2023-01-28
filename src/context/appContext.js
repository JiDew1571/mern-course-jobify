import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import {
	CLEAR_ALERT,
	USER_ALERT,
	DISPLAY_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
} from './actions';
import reducer from './reducer';

// fetch from localStorage
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user) : null,
	token: token || null,
	userLocation: userLocation || '',
	jobLocation: userLocation || '',
	showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// axios
	const authFetch = axios.create({
		baseURL: '/api/v1',
		// headers: { Authorization: `Bearer ${state.token}` },
	});

	// request interceptors
	authFetch.interceptors.request.use(
		(config) => {
			config.headers['Authorization'] = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// response interceptors
	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			console.log(error.response);
			if (error.response.status === 401) {
				logoutUser();
			}
			return Promise.reject(error);
		}
	);

	// display alert
	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const userAlert = () => {
		dispatch({ type: USER_ALERT });
		clearAlert();
	};

	// clear alert
	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3000);
	};

	// add to local storage
	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
		localStorage.setItem('location', location);
	};

	// remove from local storage
	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('location');
	};

	//setup user
	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN });
		try {
			const response = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
			const { user, token, location } = response.data;
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: {
					user,
					token,
					location,
					alertText,
				},
			});
			addUserToLocalStorage({ user, token, location });
		} catch (error) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	// logout user
	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	//update user
	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN });
		try {
			// { data } explained
			// const response = await axios.patch(bla,,bla...bla..)
			// const data = response.data -> just destructing the 'response' array

			const { data } = await authFetch.patch('/auth/updateUser/', currentUser);

			const { user, token, location } = data;

			dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token, location } });
			addUserToLocalStorage({ user, token, location });
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				});
			}
		}
		clearAlert();
	};

	// toggle sidebar
	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};
	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				userAlert,
				setupUser,
				logoutUser,
				updateUser,
				toggleSidebar,
			}}>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
