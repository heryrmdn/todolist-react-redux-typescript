import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { addTodo } from "../store/features/todoSlice";

const AddTodo = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    if (input === "") {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } else {
      setError(false);
      dispatch(addTodo(input));
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex my-5 gap-x-4">
        <input
          id="todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="What to do"
          className="input input-bordered input-primary w-full"
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
      {error && <div className="text-red-500 font-semibold">Error! Todo is empty.</div>}
    </form>
  );
};

export default AddTodo;
