import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useEffect,
} from "react";


interface Props {
  children: ReactNode;
}

const APIContext = createContext<any>({});

const ApiProvider: FC<Props> = ({ children }) => {
  const [fetchData, setFetchData] = useState([]);
  const [actualModal, setActualModal] = useState();

  useEffect(() => {
    getDataFromServer();
  }, []);

  const getDataFromServer = async () => {
    await fetch("https://apireg.herokuapp.com/items")
      .then((res) => res.json())
      // .then(res => console.log(res))
      .then(setFetchData);
  };

  const deleteItemFromData = async (e: number) => {
    await fetch(`https://apireg.herokuapp.com/items/${e}`, { method: "DELETE" });
  };

  const postItemToData = async (newObject:{}) => {
    await fetch("https://apireg.herokuapp.com/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObject),
    });
  };

  const setModalById = async (e:number) => {
    await fetch(`https://apireg.herokuapp.com/items/${e}`)
      .then((res) => res.json())
      .then(setActualModal);
  };

  const value = {
    fetchData,
    getDataFromServer,
    deleteItemFromData,
    postItemToData,
    actualModal,
    setModalById
  };

  return <APIContext.Provider value={value}> {children} </APIContext.Provider>;
};

export const useAPI = () => {
  const context = useContext(APIContext);
  return context;
};

export default ApiProvider;
