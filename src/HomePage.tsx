import { useEffect, useState } from "react";
import "./App.css";
import AddQuestion from "./components/AddQuestion";
import Category from "./components/Category";
import Questions from "./components/Questions";
import { CategoryType } from "./data/enums";
import { QuestionService } from "./services/QuestionService";
import { Question, QuestionCategory } from "./data/objects";

function HomePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<QuestionCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    CategoryType.english
  );
  const onCategoryClick = (categoryType: CategoryType) => {
    setSelectedCategory(categoryType);
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await QuestionService.getQuestions(
          `/${selectedCategory}`
        );
        console.log("Questions response:", await response.data);
        const extractedQuestions: Question[] = response.data ?? [];
        setQuestions(extractedQuestions);
      } catch (err) {
        console.error("Failed to load questions:", err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    const fetchCategories = async () => {
      try {
        const response = await QuestionService.getCategories(
          `/${selectedCategory}`
        );
        const categories: QuestionCategory[] = await response.data;
        setCategories(categories);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [selectedCategory]);

  const handleAddQuestion = async (data: Question) => {
    console.log("Received: ", data);
    const newQuestions = [...questions];
    newQuestions.push(data);
    setQuestions(newQuestions);
    try {
      await QuestionService.addQuestion(`/${selectedCategory}`, data);
    } catch (err) {
      console.log("Failed to add question", err);
      setError("Failed to add question");
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    try {
      await QuestionService.deleteQuestion(`/${selectedCategory}`, id);
    } catch (err) {
      console.log("Failed to delete", err);
      setError("Failed to delete");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Category
        selectedCategory={selectedCategory}
        onCategoryClick={onCategoryClick}
      />

      <div className="flex-grow min-h-0 flex">
        <div className="flex-1 p-4 bg-[#313B4A] rounded-lg shadow-md ml-4 mb-4 mr-2">
          <div className="h-full min-h-0 overflow-auto pr-3">
            <AddQuestion
              onSubmitData={handleAddQuestion}
              categories={categories}
            />
          </div>
        </div>

        <div className="flex-1 p-4 bg-[#313B4A] rounded-lg shadow-md mr-4 mb-4 ml-2">
          <div className="h-full min-h-0 overflow-auto pr-3">
            <Questions
              questions={questions}
              onDelete={handleDeleteQuestion}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
