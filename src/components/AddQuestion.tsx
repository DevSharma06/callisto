function AddQuestion() {
  return (
    <div>
      <p>Add Question</p>
      <div>
        <p>Question</p>
        <textarea />
      </div>
      <div className="flex">
        <input type="radio" />
        <p>A: </p>
        <input type="text" />
      </div>
      <div className="flex">
        <input type="radio" />
        <p>B: </p>
        <input type="text" />
      </div>
      <div className="flex">
        <input type="radio" />
        <p>C: </p>
        <input type="text" />
      </div>
      <div className="flex">
        <input type="radio" />
        <p>D: </p>
        <input type="text" />
      </div>
    </div>
  );
}

export default AddQuestion;
