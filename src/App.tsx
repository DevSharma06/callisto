import { useState } from "react";
import "./App.css";
import AddQuestion, { Question } from "./components/AddQuestion";
import Category from "./components/Category";
import Questions from "./components/Questions";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = (data: Question) => {
    console.log("Received: ", data);
    const newQuestions = [...questions];
    newQuestions.push(data);
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (questionText: string) => {
    setQuestions((prev) => prev.filter((q) => q.questionText !== questionText));
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
            <Questions questions={questions} onDelete={handleDeleteQuestion} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
