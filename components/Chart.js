import React, { useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	TimeScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

ChartJS.register(
	CategoryScale,
	LinearScale,
	TimeScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineChart = ({ chartData }) => {
	return (
		<Line
			height={300}
			data={chartData}
			options={{
				responsive: true,
				plugins: {
					legend: {
						position: "top",
					},
					title: {
						display: true,
						// text: "Chart.js Line Chart",
					},
				},
			}}
		/>
	);
};

export default LineChart;
