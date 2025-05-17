import { useEffect, useState } from "react";
import "./App.css";
import AddQuestion from "./components/AddQuestion";
import Category from "./components/Category";
import Questions from "./components/Questions";
import { CategoryType } from "./data/enums";
import { QuestionService } from "./services/QuestionService";
import { Question, QuestionCategory } from "./data/objects";
import Toast from "./components/Toast";

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

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await QuestionService.getQuestions(
          `/${selectedCategory}`
        );
        console.log("Questions response:", await response.data);
        const extractedQuestions: Question[] = response.data ?? [];
        setQuestions(extractedQuestions);
      } catch (err) {
        console.error("Failed to load questions:", err);
        showToast("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await QuestionService.getCategories(
          `/${selectedCategory}`
        );
        const categories: QuestionCategory[] = await response.data;
        setCategories(categories);
      } catch (err) {
        console.error("Failed to load categories:", err);
        showToast("Failed to load categories.");
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
      showToast("Failed to add question");
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    try {
      await QuestionService.deleteQuestion(`/${selectedCategory}`, id);
    } catch (err) {
      console.log("Failed to delete", err);
      showToast("Failed to delete");
    }
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
            {loading && (
              <div className="fixed inset-0 z-50 pointer-events-none">
                <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                    <span className="text-white text-lg font-semibold animate-pulse">
                      Loading...
                    </span>
                  </div>
                </div>
              </div>
            )}
            {!loading && questions.length == 0 ? (
              <div className="fixed inset-0 z-50 pointer-events-none">
                <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center text-white text-lg font-semibold">
                    No Questions added
                  </div>
                </div>
              </div>
            ) : (
              <Questions
                questions={questions}
                onDelete={handleDeleteQuestion}
                categories={categories}
              />
            )}
          </div>
        </div>
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

export default HomePage;
