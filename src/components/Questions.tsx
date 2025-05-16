import { useState } from "react";
import { Question, QuestionCategory } from "../data/objects";

type QuestionCardProps = {
  questions: Question[];
  onDelete: (id: number) => void;
  categories: QuestionCategory[];
};

const Questions: React.FC<QuestionCardProps> = ({
  questions,
  onDelete,
  categories,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(0);
  const handleDelete = (id: number) => {
    setShowDialog(true);
    setQuestionToDelete(id);
  };

  const confirmDelete = () => {
    setShowDialog(false);
    if (questionToDelete) onDelete(questionToDelete);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div
          key={index}
          className="relative text-white bg-gray-800 p-3 rounded-lg mb-2"
        >
          <button
            onClick={() => handleDelete(question?.id ?? 0)} // Add your delete function here
            className="absolute top-2 right-2 text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
            title="Delete question"
          >
            🗑️
          </button>
          <h2 className="whitespace-pre-line text-xl text-left font-semibold mb-2 mr-7">
            {index + 1}. {question.questionText}
          </h2>
          <p className="text-left font-semibold text-base text-gray-400 mb-4 ">
            Category:{" "}
            {
              categories.find((cat) => cat.id == question.categoryID)
                ?.categoryName
            }
          </p>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((opt, idx) => (
              <div key={idx} className="p-2 rounded bg-gray-700 text-white">
                <span className="font-medium">{opt.optionText}</span>
                {opt.correct && (
                  <span className="ml-2 text-green-400">(Correct)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Confirmation Modal */}
      {showDialog && (
        <div
          className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setShowDialog(false)}
        >
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this question?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
