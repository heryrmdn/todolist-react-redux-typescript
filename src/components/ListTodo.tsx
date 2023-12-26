import { IconPencil, IconTrashXFilled } from "@tabler/icons-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { deleteTodo, editBodyTodo, editStatusTodo, editTodo, setTodosView } from "../store/features/todoSlice";

const ListTodo = () => {
  const { todos, todosView } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const handleStatus = (id: number): void => {
    dispatch(editStatusTodo(id));
  };

  const handleEdit = (id: number): void => {
    dispatch(editTodo(id));
  };

  const handleEditBody = (value: string, id: number, isEdit: boolean): void => {
    dispatch(editBodyTodo({ value, id, isEdit }));
  };

  const handleDelete = (id: number): void => {
    dispatch(deleteTodo(id));
  };

  useEffect(() => {
    dispatch(setTodosView(todos));
  }, [dispatch, todos]);

  return (
    <div className="flex flex-col">
      {Array.isArray(todosView) &&
        todosView.map((todo) => (
          <div key={todo.id} className="form-control flex flex-col justify-between items-center border p-2">
            {!todo.isEdit ? (
              <div className="flex w-full justify-between">
                <label className="label cursor-pointer flex px-2 gap-x-4 flex-1 justify-start">
                  <input
                    id={`checkbox-${todo.id}`}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    onChange={() => handleStatus(todo.id)}
                    checked={todo.completed}
                  />
                  <span className={`label-text break-all ${todo.completed && "line-through"}`}>{todo.value}</span>
                </label>
                <div className="flex items-center px-2 gap-x-4">
                  <IconPencil onClick={() => handleEdit(todo.id)} className="cursor-pointer" />
                  <IconTrashXFilled onClick={() => handleDelete(todo.id)} className="cursor-pointer" />
                </div>
              </div>
            ) : (
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full focus:outline-none"
                  value={todo.value}
                  onChange={(e) => {
                    handleEditBody(e.target.value, todo.id, true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEditBody((e.target as HTMLInputElement).value, todo.id, false);
                    }
                  }}
                  autoFocus
                />
                <button onClick={() => handleEdit(todo.id)} className="btn">
                  Update
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ListTodo;
