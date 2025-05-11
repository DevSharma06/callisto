import "./App.css";
import AddQuestion, { Question } from "./components/AddQuestion";
import Category from "./components/Category";
import Questions from "./components/Questions";

function App() {
  const handleAddQuestion = (data: Question) => {
    console.log("Received: ", data);
  };

  return (
    <div className="flex flex-col h-screen">
      <Category />

      <div className="flex-grow min-h-0 flex">
        <div className="flex-1 p-4 bg-[#313B4A] rounded-lg shadow-md ml-4 mb-4 mr-2">
          <div className="h-full min-h-0 overflow-auto pr-3">
            <AddQuestion onSubmitData={handleAddQuestion} />
          </div>
        </div>

        <div className="flex-1 p-4 bg-[#313B4A] rounded-lg shadow-md mr-4 mb-4 ml-2">
          <div className="h-full min-h-0 overflow-auto pr-3">
            <Questions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
