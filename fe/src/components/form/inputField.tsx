import React, { FC, useState } from "react";
import styled from "styled-components";
import Thumb from "@components/thumb";
import Blob from "cross-blob";

interface IInputField {
  type?: "text" | "number" | "email" | "file";
}

const StyledContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InputField: React.FC<IInputField> = ({ type }) => {
  const [file, setFile] = useState<Blob>(new Blob([]));

  const handleReader = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setFile(e.currentTarget.files[0]);
    }
  };
  return (
    <StyledContainer>
      <form onSubmit={() => {}}>
        <input type="file" onChange={(e) => handleReader} />
        <Thumb file={file} />
        <button>submit</button>
      </form>
    </StyledContainer>
  );
};

export default InputField;
