import StatsItem from './StatsItem';
import { BsFillCalendarCheckFill, BsFillBriefcaseFill } from 'react-icons/bs';
import { HiOutlineBookmarkSlash } from 'react-icons/hi2';
import Wrapper from '../assets/wrappers/StatsContainer';
import { useAppContext } from '../context/appContext';

const StatsContainer = () => {
	const { stats } = useAppContext();

	const defaultStats = [
		{
			title: 'pending applications',
			count: stats.pending || 0,
			icon: <BsFillBriefcaseFill />,
			color: '#e9b949',
			bcg: '#fcefc7',
		},
		{
			title: 'interviews scheduled',
			count: stats.interview || 0,
			icon: <BsFillCalendarCheckFill />,
			color: '#647acb',
			bcg: '#e0e8f9',
		},
		{
			title: 'jobs declined',
			count: stats.declined || 0,
			icon: <HiOutlineBookmarkSlash />,
			color: '#d66a6a',
			bcg: '#ffeeee',
		},
	];

	return (
		<Wrapper>
			{defaultStats.map((item, index) => {
				return <StatsItem key={index} {...item} />;
			})}
		</Wrapper>
	);
};
export default StatsContainer;
