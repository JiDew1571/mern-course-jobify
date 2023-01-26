import { Landing, Error, Register, ProtectedRoute } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddJob, AllJobs, Profile, SharedLayout, Stats } from './pages/Dashboard';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* dashboard routes */}
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}>
					<Route path='add-job' element={<AddJob />}></Route>
					<Route path='all-jobs' element={<AllJobs />}></Route>
					<Route path='profile' element={<Profile />}></Route>
					<Route index element={<Stats />} />
				</Route>

				{/* other routes */}
				<Route path='/register' element={<Register />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
