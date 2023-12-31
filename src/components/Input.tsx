import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addData } from "../apis/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/types";
import { addTodo } from "../redux/modules/todosSlice";

const Input = () => {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries("todos" as never);
    },
  });

  const dispatch = useDispatch();

  const handleSubmitClick = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newTodo: Todo = {
      id: uuid(),
      title: title,
      contents: contents,
      isDone: false,
    };

    mutation.mutate(newTodo);

    dispatch(addTodo(newTodo));
    setTitle("");
    setContents("");
    // const submitTodo = async () => {
    //   await addData(newTodo);
    // };
    // submitTodo();
  };

  const handleInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  return (
    <StInputContainer>
      <StConfirm onSubmit={handleSubmitClick}>
        <div>
          <label>제목</label>
          <input value={title} onChange={handleInputTitle} />
          <label>내용</label>
          <input
            width="20rem"
            value={contents}
            onChange={handleInputContents}
          />
        </div>
        <button type="submit">추가</button>
      </StConfirm>
    </StInputContainer>
  );
};

export default Input;

const StInputContainer = styled.div`
  background-color: lightgray;
  padding: 20px;
  border-radius: 0.5rem;
`;

type InputTagProps = {
  width?: string;
};

const StConfirm = styled.form<InputTagProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  & label {
    font-weight: 600;
  }
  & input {
    border: none;
    width: ${(props) => (props.width ? props.width : "15rem")};
    height: 30px;
    border-radius: 2rem;
    padding: 1rem;
    &:last-child {
      width: 20rem;
    }
  }
`;
