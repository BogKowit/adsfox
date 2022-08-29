import { IoCloseSharp } from "react-icons/io5";
import { ChangeEvent, useState, FormEvent, FC } from "react";
import "./Modal.css";
import { useAPI } from "../../../context/contextFetch";

interface Props {
  onClose: () => void;
}

const defaultFormFields = {
  name: "",
  number: "",
};

const Modal: FC<Props> = ({ onClose }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, number } = formFields;

  const { actualModal, postItemToData, getDataFromServer, deleteItemFromData } =
    useAPI();
  console.log(actualModal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const dateChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteItemFromData(actualModal.id);
    await postItemToData(formFields, { id: actualModal.id });
    await getDataFromServer();
    onClose();
  };

  return (
    <div className="modalWrapper">
      <button className="absolute right-2 top-2" onClick={onClose}>
        <IoCloseSharp className="text-3xl" />
      </button>
      <h1 className="mt-5 ml-5 text-2xl font-bold">Formularz zmian</h1>
      <form className="flex flex-col" onSubmit={dateChange}>
        <div className="modalInputWrapper">
          <p className="modalText">Aktualna nazwa kanału</p>
          <p className="modalText">
            {" "}
            {actualModal ? actualModal.name : "Brak danych"}
          </p>
          <label className="">Nowa nazwa kanału</label>
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={handleChange}
            className="modalInput"
            placeholder=" "
          />
        </div>
        <div className="modalInputWrapper">
          <p className="modalText">Aktualna nazwa kanału</p>
          <p className="modalText">
            {" "}
            {actualModal ? actualModal.number : "Brak danych"}
          </p>
          <label className="modalLabel">{"Liczba (tylko cyfry) "}</label>
          <input
            type="number"
            name="number"
            value={number}
            required
            onChange={handleChange}
            placeholder=" "
            className="modalInput"
          />
        </div>
        <button
          type="submit"
          className="buttonForm absolute bottom-5 mx-5 w-20"
        >
          Zmień
        </button>
      </form>
    </div>
  );
};

export default Modal;
