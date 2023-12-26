import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Todo {
    id: number,
    value: string,
    completed: boolean,
    isEdit: boolean
}

interface TodoState {
    todos: Todo[];
    todosView: Todo[];
}

const initialState: TodoState = {
    todos: [
        { id: 1, value: "Buy Milk", completed: false, isEdit: false },
        { id: 2, value: "Buy Egg", completed: false, isEdit: false },
        { id: 3, value: "Buy T-Shirt", completed: false, isEdit: false },
    ],
    todosView: [],
};

export const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo: Todo = {
                id: Date.now(),
                value: action.payload,
                completed: false,
                isEdit: false
            }

            const cloneTodo: Todo[] = [...state.todos, newTodo];

            return {
                ...state,
                todos: cloneTodo
            }
        },
        deleteTodo: (state, action) => {
            const filterTodo: Todo[] = state.todos.filter((item) => item.id != action.payload)

            return {
                ...state,
                todos: filterTodo
            }
        },
        editTodo: (state, action) => {
            const editTodoId = action.payload;
            const updatedTodos: Todo[] = state.todos.map((todo) => {
                if (todo.id === editTodoId) {
                    return {
                        ...todo,
                        isEdit: !todo.isEdit
                    }
                } else {
                    return todo
                }
            })

            return {
                ...state,
                todos: updatedTodos
            }
        },
        editBodyTodo: (state, action: PayloadAction<{ value: string, id: number, isEdit: boolean }>) => {
            const { value, id, isEdit } = action.payload;
            const editTodo: Todo[] = state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        value,
                        isEdit
                    }
                } else {
                    return todo
                }
            })

            return {
                ...state,
                todos: editTodo
            }
        },
        editStatusTodo: (state, action) => {
            const todoId = action.payload;
            const editTodoStatus: Todo[] = state.todos.map((todo) => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                } else {
                    return todo;
                }
            })

            return {
                ...state,
                todos: editTodoStatus
            }
        },
        setTodosView: (state, action) => {
            state.todosView = action.payload;
        },
        getAllTodo: (state) => {
            return {
                ...state,
                todosView: state.todos
            }
        },
        getActiveTodo: (state) => {
            const activeTodo: Todo[] = state.todos.filter((todo) => !todo.completed);

            return {
                ...state,
                todosView: activeTodo
            }
        },
        getCompleteTodo: (state) => {
            const completedTodo: Todo[] = state.todos.filter((todo) => todo.completed);

            return {
                ...state,
                todosView: completedTodo
            }
        },
    }
})

export default TodoSlice.reducer;
export const {
    addTodo,
    deleteTodo,
    editTodo,
    editBodyTodo,
    editStatusTodo,
    setTodosView,
    getAllTodo,
    getActiveTodo,
    getCompleteTodo
} = TodoSlice.actions;