import React from "react"
import Chart, { CategoryScale } from "chart.js/auto"
Chart.register(CategoryScale)
import { Line, Bubble } from "react-chartjs-2"


// Setting up the labels for the x-axis of the chart
const labels = ["January", "February", "March", "April", "May", "June"];

// Setting up the data for the chart, including the labels and datasets
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset", // Setting up the label for the dataset
      backgroundColor: "rgb(255, 99, 132)", // Setting up the background color for the dataset
      borderColor: "rgb(255, 99, 132)", // Setting up the border color for the dataset
      data: [0, 10, 5, 2, 20, 30, 45], // Setting up the data for the dataset
      xAxisID: 'x-axis-1',
    },
  ],
};

const ChartDemo = () =>{
    return (
        <div>
            <Line data={data} />
        </div>
    )
}

export default ChartDemo