import { useState } from "react";

function Category() {
  const cardBase =
    "p-4 w-50 rounded-lg shadow-md content-center font-semibold cursor-pointer";
  const selectedStyle = "bg-[#0284C7] text-black";
  const unselectedStyle = "bg-gray-800  text-white";
  const [selectedCategory, setSelectedCategory] = useState(
    CategoryType.english
  );

  const onCategoryClick = (categoryType: CategoryType) => {
    setSelectedCategory(categoryType);
  };

  return (
    <div className="flex space-x-4 justify-center m-4">
      <div
        className={`${cardBase} ${
          selectedCategory === CategoryType.english
            ? selectedStyle
            : unselectedStyle
        }`}
        onClick={() => onCategoryClick(CategoryType.english)}
      >
        <p>English</p>
      </div>
      <div
        className={`${cardBase} ${
          selectedCategory === CategoryType.ga ? selectedStyle : unselectedStyle
        }`}
        onClick={() => onCategoryClick(CategoryType.ga)}
      >
        <p>General Awareness</p>
      </div>
      <div
        className={`${cardBase} ${
          selectedCategory === CategoryType.qa ? selectedStyle : unselectedStyle
        }`}
        onClick={() => onCategoryClick(CategoryType.qa)}
      >
        <p>Quantitative Aptitude</p>
      </div>
      <div
        className={`${cardBase} ${
          selectedCategory === CategoryType.reasoning
            ? selectedStyle
            : unselectedStyle
        }`}
        onClick={() => onCategoryClick(CategoryType.reasoning)}
      >
        <p>Reasoning</p>
      </div>
    </div>
  );
}

export default Category;

enum CategoryType {
  english,
  ga,
  qa,
  reasoning,
}
