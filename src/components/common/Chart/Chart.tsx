import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAPI } from "../../../context/contextFetch";
import { PropsDataStatics } from "../../../utils/types";

ChartJs.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const { fetchData } = useAPI();
  const number = fetchData.map((v: PropsDataStatics) => v.number);
  const name = fetchData.map((v: PropsDataStatics) => v.name);
  const backgroundColor = fetchData.map(
    (v: PropsDataStatics) => v.backgroundColor
  );


  const borderColor = fetchData.map((v: PropsDataStatics) => v.borderColor);
  const toNumbers = fetchData.map((v: PropsDataStatics) => Number(v.number));
  const hardMath = toNumbers.reduce((a: number, b: number) => a + b, 0);
  const hardMathTwo = toNumbers.map(
    (v: number) => (v / hardMath).toFixed(2) + "%"
  );


  const ChartData = {
    labels: name ,
    datasets: [
      {
        label: "# of Votes",
        data: number,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
        cutout: 50,
      },
    ],
  };

  return (
    <div className="mt-10 w-[520px]">
      <Doughnut data={ChartData} />
    </div>
  );
};

export default Chart;
