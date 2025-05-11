import { useState } from "react";

type AddQuestionProps = {
  onSubmitData: (data: Question) => void;
};

const AddQuestion: React.FC<AddQuestionProps> = ({ onSubmitData }) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState<Option[]>([
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
  ]);

  const categories = [
    { id: "1", label: "Voice" },
    { id: "2", label: "Spelling" },
    { id: "3", label: "Verbs" },
  ];

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

    if (!options.some((opt) => opt.isCorrect)) {
      errors.push("You must select a correct answer");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const formOptions = options.map(({ optionText, isCorrect }) => ({
      optionText,
      isCorrect,
    }));

    const formData: Question = {
      questionText: question,
      category,
      options: formOptions,
    };

    console.log("Question Data", formData);

    onSubmitData(formData);

    clearFormFields();
  };

  const clearFormFields = () => {
    setQuestion("");
    setCategory("");
    setOptions([
      { optionText: "", isCorrect: false },
      { optionText: "", isCorrect: false },
      { optionText: "", isCorrect: false },
      { optionText: "", isCorrect: false },
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
      isCorrect: i === index,
    }));
    setOptions(newOptions);
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
          />
        </div>
        <div className="flex mb-2 mt-2 items-center">
          <label className="mr-2" htmlFor="category">
            Select Category
          </label>
          <select
            className="flex-1 bg-gray-900  rounded-md p-2"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            {categories.map((opt) => (
              <option key={opt.id} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-left mb-2">Select the correct option</p>
        <div className="mb-3">
          {options.map((opt, index) => (
            <div className="flex items-center mb-2">
              <input
                className="mr-1 flex-1 scale-120 mt-1"
                type="radio"
                name="quiz-option"
                value="{opt}"
                id={index.toString()}
                onChange={() => handleCorrectOptionChange(index)}
                checked={opt.isCorrect}
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
    </div>
  );
};

export type Option = {
  optionText: string;
  isCorrect: boolean;
};

export type Question = {
  questionText: string;
  category: string;
  options: Option[];
};

export default AddQuestion;
