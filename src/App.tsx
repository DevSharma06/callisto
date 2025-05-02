import "./App.css";
import AddQuestion from "./components/AddQuestion";
import Category from "./components/Category";
import Questions from "./components/Questions";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Category />

      <div className="flex-grow min-h-0 flex">
        <div className="flex-1 p-4 bg-[#313B4A] rounded-lg shadow-md ml-4 mb-4 mr-2">
          <AddQuestion />
        </div>

        <div className="flex-1 p-4 bg-[#313B4A] rounded-lg shadow-md mr-4 mb-4 ml-2">
          <Questions />
        </div>
      </div>
    </div>
  );
}

export default App;
