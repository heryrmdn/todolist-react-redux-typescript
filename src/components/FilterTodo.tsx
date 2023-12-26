import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { getActiveTodo, getAllTodo, getCompleteTodo } from "../store/features/todoSlice";

interface Status {
  statusAll: boolean;
  statusActive: boolean;
  statusComplete: boolean;
}

const FilterTodo = () => {
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<Status>({
    statusAll: true,
    statusActive: false,
    statusComplete: false,
  });

  const handleStatusChange = (newStatus: Partial<Status>) => {
    setStatus({
      statusAll: false,
      statusActive: false,
      statusComplete: false,
      ...newStatus,
    });
  };

  const handleAll = () => {
    handleStatusChange({ statusAll: true });
    dispatch(getAllTodo());
  };

  const handleActive = () => {
    handleStatusChange({ statusActive: true });
    dispatch(getActiveTodo());
  };

  const handleComplete = () => {
    handleStatusChange({ statusComplete: true });
    dispatch(getCompleteTodo());
  };

  return (
    <div className="my-5 flex gap-x-4">
      <div onClick={handleAll} className={`badge ${status.statusAll ? "badge-accent" : "badge-ghost"} cursor-pointer`}>
        All
      </div>
      <div onClick={handleActive} className={`badge ${status.statusActive ? "badge-accent" : "badge-ghost"} cursor-pointer`}>
        Active
      </div>
      <div onClick={handleComplete} className={`badge ${status.statusComplete ? "badge-accent" : "badge-ghost"} cursor-pointer`}>
        Completed
      </div>
    </div>
  );
};

export default FilterTodo;
