import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import FilterTodo from "./components/FilterTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Header />
      <AddTodo />
      <FilterTodo />
      <ListTodo />
    </div>
  );
};

export default App;
