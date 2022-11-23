import styled from "styled-components";

export const InputContainer = styled.div`
  padding: ${(props) => props?.styling?.padding || "10px"};
  border-radius: ${(props) =>
    props.styling?.shape?.type === "rounded"
      ? "50px"
      : props.styling?.shape?.type === "rounded-square"
      ? "5px"
      : props.styling?.shape?.borderRadius || "0px"};
  border: 2px solid #2b2b2b;
  background-color: transparent;
  margin: 5px;
  position: relative;
`;

export const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 12px;
  width: 100%;
`;

export const ErrorListContainer = styled.div`
  display: ${(props) => (props.failedAttempt ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 120%;
  left: 0;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  font-size: 12px;
  width: max-content;
`;

export const StyledForm = styled.form``;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Error = styled.div`
  margin-left: 10px;
`;

export const Icon = styled.div``;
