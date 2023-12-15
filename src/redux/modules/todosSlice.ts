import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "types/types";
import { v4 as uuid } from "uuid";

const initialState: Todo[] = [
  {
    id: uuid(),
    title: "제목1",
    contents: "내용1",
    isDone: false,
  },
  {
    id: uuid(),
    title: "제목2",
    contents: "내용2",
    isDone: false,
  },
  {
    id: uuid(),
    title: "제목3",
    contents: "내용3",
    isDone: true,
  },
  {
    id: uuid(),
    title: "제목4",
    contents: "내용4",
    isDone: false,
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo = action.payload;
      return [newTodo, ...state];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      );
    },
  },
});

export const { addTodo, deleteTodo, completeTodo } = todosSlice.actions;
export default todosSlice.reducer;
