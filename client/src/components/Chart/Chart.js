import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataChart } from "./../../JS/actions/admin";

let options = {
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        let datasets = ctx.chart.data.datasets;

        if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
          let sum = datasets[0].data.reduce((a, b) => a + b, 0);
          let percentage = Math.round((value / sum) * 100) + "%";
          return percentage;
        }
      },
      color: "red",
    },
  },
};

const styles = {
  pieContainer: {
    marginTop: "5%",
    maxWidth: "350px",
    maxHeight: "300px",
    top: "45%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  relative: {
    position: "relative",
  },
};

const Chart = () => {
  const dataChart = useSelector((state) => state.adminReducer.dataChart);
  const loadData = useSelector((state) => state.adminReducer.isLoad);
  const errorData = useSelector((state) => state.adminReducer.isError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataChart());
  }, [dispatch]);
  const data = {
    labels: ["Not resolved posts", "Resolved posts"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          dataChart && dataChart.notResolvedPosts,
          dataChart && dataChart.resolvedPosts,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="chart">
      {loadData ? (
        <div className="loading">
          <CircularProgress color="primary" size={100} />
        </div>
      ) : errorData ? (
        <div className="error-data">
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/data_error.png"
            alt="error"
          />
        </div>
      ) : (
        <Pie data={data} options={options} style={styles.pieContainer} />
      )}
    </div>
  );
};

export default Chart;
