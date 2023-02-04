import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart
				data={data}
				margin={{
					top: 50,
				}}>
				<CartesianGrid strokeDasharray='2 2' />
				<XAxis dataKey='date' />
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Bar dataKey='count' fill='#2cb1bc' barSize={70} />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default BarChartComponent;
