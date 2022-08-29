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

  // const borderColor = fetchData.map((v: PropsDataStatics) => v.borderColor);
  // const toNumbers = fetchData.map((v: PropsDataStatics) => Number(v.number));
  // const hardMath = toNumbers.reduce((a: number, b: number) => a + b, 0);
  // const hardMathTwo = toNumbers.map(
  //   (v: number) => (v / hardMath).toFixed(2) + "%"
  // );

  const ChartData = {
    labels: name,
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

  console.log(fetchData.length);
  
  return (
    <div className="mt-10 w-[520px]">
      <h1 className="topic">Wykres</h1>
      { fetchData.length ? <Doughnut data={ChartData} /> : <h1>Brak Danych, <br/> Wprowadź dane</h1>}
    </div>
  );
};

export default Chart;
