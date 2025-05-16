import { CategoryType } from "../data/enums";

type Props = {
  selectedCategory: CategoryType;
  onCategoryClick: (value: CategoryType) => void;
};

const Category = ({ selectedCategory, onCategoryClick }: Props) => {
  const cardBase =
    "p-3 w-60 rounded-lg shadow-md content-center font-semibold text-lg cursor-pointer";
  const selectedStyle = "bg-[#0284C7] text-black";
  const unselectedStyle = "bg-gray-800  text-white";

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
};

export default Category;
