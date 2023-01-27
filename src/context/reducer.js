import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	USER_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
} from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
	// display alert
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Please provide all values',
		};
	}

	if (action.type === USER_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'success',
			alertText: 'Logged in!! redirecting....',
		};
	}

	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Please provide all values',
		};
	}

	// clear alert
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: '',
			alertText: '',
		};
	}

	// setup user
	if (action.type === SETUP_USER_BEGIN) {
		return { ...state, isLoading: true };
	}

	if (action.type === SETUP_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.location,
			jobLocation: action.payload.location,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: action.payload.alertText,
		};
	}

	if (action.type === SETUP_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		};
	}

	// logout user
	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			user: null,
			token: null,
			userLocation: '',
			jobLocation: '',
		};
	}

	// toggle sidebar
	if (action.type === TOGGLE_SIDEBAR) {
		return { ...state, showSidebar: !state.showSidebar };
	}

	throw new Error(`no such action : ${action.type}`);
};

export default reducer;