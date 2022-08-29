import "./App.css";
import Chart from "./components/common/Chart/Chart";
import Form from "./components/common/Form/Form";
import Modal from "./components/common/Modal/Modal";
import Results from "./components/common/Results/Results";
import { UseUI } from "./context/context";
import DisabledBody from "./ui/DisabledBody/DisabledBody";

function App() {
  const { isSidebarOpen, closeSidebar } = UseUI();
  
  return (
    <div className="ml-6 ">
      <Form />
      <Results />
      <Chart />
      <DisabledBody isOpen={isSidebarOpen} onClose={closeSidebar}>
        <Modal onClose={closeSidebar} />
      </DisabledBody>
    </div>
  );
}

export default App;
