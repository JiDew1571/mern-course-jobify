const Loading = ({ center, text }) => {
	return (
		<>
			<div className={center ? 'loading loading-center' : 'loading'}></div>
			<h1>{text}</h1>
		</>
	);
};

export default Loading;
