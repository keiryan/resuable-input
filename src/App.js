import "./App.css";
import { Container } from "./styles.app";
import Input from "./Input/input";
function App() {
  return (
    <Container>
      <Input
        config={{
          type: "email",
          placeholder: "Enter Email",
          styling: {
            shape: {
              type: "rounded",
              borderRadius: "10px",
            },
            padding: "10px 20px",
          },
          settings: {
            specificDomain: "gmail.com",
          },
        }}
      />

      <Input
        config={{
          type: "text",
          placeholder: "First Name",
          capitalizeOnBlur: true,
          lowercaseOnFocus: true,
          submit: "disbaled",
          styling: {
            shape: {
              borderRadius: "10px",
            },
          },
          settings: {},
        }}
      />

      <Input
        config={{
          type: "text",
          placeholder: "Enter text here",
          styling: {
            shape: {
              type: "rounded-square",
              borderRadius: "10px",
            },
          },
          settings: {
            maxLength: 10,
          },
        }}
      />

      <Input
        config={{
          type: "password",
          placeholder: "Enter Password",
          settings: {
            minLength: 5,
            maxLength: 10,
            amountOfUpperCase: 3,
            amountOfLowerCase: 3,
            amountOfNumbers: 2,
          },
        }}
      />

      <Input
        config={{
          type: "text",
          placeholder: "Last Name",
          capitalizeOnBlur: true,
          lowercaseOnFocus: true,
          submit: "disbaled",
          forbiddenCharacters: "",
          styling: {
            shape: {
              // Default styling is square
              // type: "rounded-square",
              // type: "square",
              // borderRadius: "10px",
            },
          },
          settings: {},
        }}
      />
    </Container>
  );
}

export default App;
