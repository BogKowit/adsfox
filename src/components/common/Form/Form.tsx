import { ChangeEvent, useState, FormEvent } from "react";
import { useAPI } from "../../../context/contextFetch";
import { idUnique, randomRgbaGenerator } from "../../../utils/functions";
import { defaultFormFields } from "../../../utils/FormFields";
import "./Form.css";

const Form = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, number } = formFields;
  const { postItemToData, getDataFromServer } = useAPI();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const newObject = Object.assign(formFields, {
    id: idUnique(),
    backgroundColor: randomRgbaGenerator(0.8),
    borderColor: randomRgbaGenerator(1),
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postItemToData(newObject);
    await getDataFromServer();
    setFormFields(defaultFormFields);
  };

  return (
    <div className="mt-10 w-80">
      <h1 className="topic">Formularz</h1>
      <form className="form" onSubmit={sendMessage}>
        <div className="wrapInputForm group ">
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={handleChange}
            className="inputForm peer "
            placeholder=" "
          />
          <label className="labelForm">Nazwa kanału</label>
        </div>
        <div className="wrapInputForm group">
          <input
            type="number"
            name="number"
            value={number}
            required
            onChange={handleChange}
            placeholder=" "
            className="inputForm peer "
          />
          <label className="labelForm">{"Liczba (tylko cyfry) "}</label>
        </div>
        <button type="submit" className="buttonForm">
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default Form;
