import "./Result.css";
import { IoRemoveCircleOutline, IoPencil } from "react-icons/io5";
import { useAPI } from "../../../context/contextFetch";
import { UseUI } from "../../../context/context";
import { PropsDataStatics } from "../../../utils/types"

const Results = () => {
  const { fetchData, deleteItemFromData, getDataFromServer, setModalById } =
    useAPI();
  const { openSidebar } = UseUI();

  const handlerDeleteItem = async (id: number) => {
    await deleteItemFromData(id);
    await getDataFromServer();
  };

  const handlerOpenModal = (id: number) => {
    openSidebar();
    setModalById(id);
  };

  return (
    <div className="result mt-10">
      <h1 className="topic">Wyniki</h1>
      <ul className="list">
        <li className="listitem">
          <p className="column firstColumn ">Nazwa kanału</p>
          <p className="column middleColumn">Ilość</p>
          <p className="column iconColumn">Zmień</p>
          <p className="column iconColumn lastColumn">Usuń</p>
        </li>
        {fetchData?.map((value: PropsDataStatics) => {
          const { id, name, number } = value;
          return (
            <li key={id} className="listitem ">
              <p
                className=" column firstColumn"
                onClick={() => console.log({ name })}
              >
                {name}
              </p>
              <p className=" column middleColumn">{number}</p>
              <div className="column iconColumn lastColumn ">
                <button
                  onClick={() => {
                    handlerOpenModal(id);
                  }}
                >
                  <IoPencil className="iconChange " />
                </button>
              </div>
              <div className="column iconColumn lastColumn ">
                <button
                  onClick={() => {
                    handlerDeleteItem(id);
                  }}
                >
                  <IoRemoveCircleOutline className="iconDelete" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Results;
