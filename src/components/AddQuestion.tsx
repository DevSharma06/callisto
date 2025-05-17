import { useState } from "react";
import { Question, QuestionCategory } from "../data/objects";
import { Option } from "../data/objects";
import Toast from "./Toast";

type AddQuestionProps = {
  onSubmitData: (data: Question) => void;
  categories: QuestionCategory[];
};

const AddQuestion: React.FC<AddQuestionProps> = ({
  onSubmitData,
  categories,
}) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<QuestionCategory>();
  const [options, setOptions] = useState<Option[]>([
    { optionText: "", correct: false },
    { optionText: "", correct: false },
    { optionText: "", correct: false },
    { optionText: "", correct: false },
  ]);

  const addQuestion = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const errors: string[] = [];
    if (!question.trim()) errors.push("Question is required");

    if (!category) errors.push("Category is required");

    const trimmedOptions = options.map((opt) =>
      opt.optionText.trim().toLowerCase()
    );

    if (trimmedOptions.some((text) => !text)) {
      errors.push("All option texts must be filled");
    }

    const uniqueTexts = new Set(trimmedOptions);
    if (uniqueTexts.size !== trimmedOptions.length) {
      errors.push("Option texts must be unique");
    }

    if (!options.some((opt) => opt.correct)) {
      errors.push("You must select a correct answer");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const formOptions = options.map(({ optionText, correct }) => ({
      optionText,
      correct,
    }));

    const formData: Question = {
      questionText: question,
      categoryID: category?.id ?? 0,
      options: formOptions,
    };

    console.log("Question Data", formData);

    onSubmitData(formData);

    showToast();

    clearFormFields();
  };

  const clearFormFields = () => {
    setQuestion("");
    setCategory({
      id: 0,
      categoryName: "",
      questionCount: 0,
    });
    setOptions([
      { optionText: "", correct: false },
      { optionText: "", correct: false },
      { optionText: "", correct: false },
      { optionText: "", correct: false },
    ]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].optionText = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (index: number) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      correct: i === index,
    }));
    setOptions(newOptions);
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = () => {
    setToastMessage("Question Added");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div>
      <form onSubmit={addQuestion}>
        <p className="font-semibold text-xl text-left">Add Question</p>
        <div className="text-left mt-3">
          <p className="mb-2">Question:</p>
          <textarea
            className="w-full h-40 bg-gray-900 border border-gray-700 rounded-md p-3"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            maxLength={1000}
          />
        </div>
        <div className="flex mb-2 mt-2 items-center">
          <label className="mr-2" htmlFor="category">
            Select Category
          </label>
          <select
            className="flex-1 bg-gray-900  rounded-md p-2"
            id="category"
            value={category?.id}
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              console.log("Selected category: ", e.target.value);
              const selectedCategory = categories.find(
                (cat) => cat.id === selectedId
              );
              setCategory(selectedCategory);
            }}
          >
            <option value="">Select</option>
            {categories.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.categoryName}
              </option>
            ))}
          </select>
        </div>
        <p className="text-left mb-2">Select the correct option</p>
        <div className="mb-3">
          {options.map((opt, index) => (
            <div className="flex items-center mb-2" key={index}>
              <input
                className="mr-1 flex-1 scale-120 mt-1"
                type="radio"
                name="quiz-option"
                value="{opt}"
                id={index.toString()}
                onChange={() => handleCorrectOptionChange(index)}
                checked={opt.correct}
                maxLength={500}
              />
              <label
                htmlFor={index.toString()}
                className="mr-2 flex-2 cursor-pointer"
              >
                Option {index + 1}
              </label>
              <input
                type="text"
                className="flex-14 bg-gray-900 border border-gray-700 rounded-md p-2"
                onChange={(e) => handleOptionChange(index, e.target.value)}
                value={opt.optionText}
              />
            </div>
          ))}
        </div>

        <button>Add Question</button>
      </form>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};

export default AddQuestion;
