import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useEffect,
} from "react";

export interface DataProps {
  id?: number;
  name?: string;
  number?: number;
}
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
    await fetch("https://my-json-server.typicode.com/bogkowit/mockjson/stats")
      .then((res) => res.json())
      .then(setFetchData);
  };

  const deleteItemFromData = async (e: number) => {
    await fetch(`https://my-json-server.typicode.com/bogkowit/mockjson/stats/${e}`, { method: "DELETE" });
  };

  const postItemToData = async (newObject: any) => {
    await fetch("https://my-json-server.typicode.com/bogkowit/mockjson/stats/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObject),
    });
  };

  const setModalById = async (e:number) => {
    await fetch(`https://my-json-server.typicode.com/bogkowit/mockjson/stats/${e}`)
      .then((res) => res.json())
      .then(setActualModal);
  };

  const value: any = {
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
