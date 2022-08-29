import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAPI } from "../../../context/contextFetch";
import { randomRgbaGenerator } from "../../../utils/colorGenerator";

ChartJs.register(ArcElement, Tooltip, Legend);

export interface PropsDataStatics {
  name: string;
  number: number;
  id: number;
}

const Chart = () => {
  const { fetchData } = useAPI();
  const number = fetchData.map((v: any) => v.number);
  const name = fetchData.map((v: any) => v.name);
  const length = fetchData.length;
  const backgroundColor = [];
  const borderColor = [];
  for (let i = 0; i < length; i++) {
    backgroundColor.push(randomRgbaGenerator(1));
    borderColor.push(randomRgbaGenerator(0.2));
  }

  const ChartData = {
    labels: name,
    datasets: [
      {
        label: "# of Votes",
        data: number,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  console.log(Doughnut);
  return (
    <div className="w-[520px] mt-10">
      <Doughnut data={ChartData} />
    </div>
  );
};

export default Chart;
