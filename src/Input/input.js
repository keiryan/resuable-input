import { useState } from "react";
import {
  InputContainer,
  StyledInput,
  StyledForm,
  ErrorListContainer,
  ErrorContainer,
  Error,
  Icon,
} from "./styles.input";

export default function Input(props) {
  const [input, setInput] = useState("");
  const [failedAttempt, setFailedAttempt] = useState({
    submitAttemptFailed: false,
    errors: [],
  });

  const errorChecks = {
    email: {
      specificDomain: (passedInput) => {
        return (
          passedInput.split("@")[1] === props.config.settings.specificDomain
        );
      },
    },
    password: {
      minLength: (passedInput) => {
        return passedInput.length >= props.config.settings.minLength;
      },

      maxLength: (passedInput) => {
        return passedInput.length <= props.config.settings.maxLength;
      },

      amountOfUpperCase: (passedInput) => {
        let amountOfUpperCase = 0;
        [...passedInput].forEach((letter) => {
          if (letter === letter.toUpperCase()) {
            amountOfUpperCase++;
          }
        });
        return amountOfUpperCase >= props.config.settings.amountOfUpperCase;
      },

      amountOfLowerCase: (passedInput) => {
        let amountOfLowerCase = 0;
        [...passedInput].forEach((letter) => {
          if (letter === letter.toLowerCase()) {
            amountOfLowerCase++;
          }
        });
        return amountOfLowerCase >= props.config.settings.amountOfLowerCase;
      },

      amountOfNumbers: (passedInput) => {
        let amountOfNumbers = 0;
        [...passedInput].forEach((letter) => {
          if (!isNaN(letter)) {
            amountOfNumbers++;
          }
        });
        return amountOfNumbers >= props.config.settings.amountOfNumbers;
      },
    },
    text: {
      maxLength: (passedInput) => {
        return passedInput.length <= props.config.settings.maxLength;
      },
    },
  };

  const errorLegend = {
    email: {
      specificDomain: `Please enter a valid '${props.config.settings.specificDomain}' email address.`,
    },

    password: {
      minLength: `Please enter a password with at least ${props.config.settings.minLength} characters.`,
      maxLength: `Please enter a password with no more than ${props.config.settings.maxLength} characters.`,
      amountOfUpperCase: `Your password must contain at least ${props.config.settings.amountOfUpperCase} uppercase letter(s).`,
      amountOfLowerCase: `Your password must contain at least ${props.config.settings.amountOfLowerCase} lowercase letter(s).`,
      amountOfNumbers: `Your password must contain at least ${props.config.settings.amountOfNumbers} number(s).`,
    },

    text: {
      maxLength: `Your text cannot exceed ${props.config.settings.maxLength} characters.`,
    },
  };

  const checkForErrors = (passedInput) => {
    const errorArray = [];

    Object.entries(props.config.settings).map((arr) => {
      if (errorChecks[props.config.type][arr[0]](passedInput)) {
        return errorChecks[props.config.type][arr[0]](passedInput);
      } else {
        errorArray.push(errorLegend[props.config.type][arr[0]]);
      }
    });

    if (errorArray.length === 0) {
      setInput("");
      setFailedAttempt({ submitAttemptFailed: false, errors: [] });
    } else {
      setFailedAttempt({ submitAttemptFailed: true, errors: [...errorArray] });
    }
  };

  const handleChange = (e) => {
    // If statment instead of object.entires to prevent errors appering before text has been submitted
    if (props.config.settings.maxLength) {
      if (props.config.settings.maxLength >= e.target.value.length) {
        setInput(e.target.value);
        setFailedAttempt({ submitAttemptFailed: false, errors: [] });
      } else {
        setFailedAttempt({
          submitAttemptFailed: true,
          errors: [errorLegend[props.config.type].maxLength],
        });
      }
    } else {
      setInput(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkForErrors(input);
  };

  const handleBlur = () => {
    if (props.config.capitalizeOnBlur) {
      if (input.length > 0) {
        const capitalizeTrasformedInput = input.split(" ").map((word) => {
          return word[0].toUpperCase() + word.slice(1);
        });
        setInput(capitalizeTrasformedInput.join(" "));
      }
    }
    setFailedAttempt({ ...failedAttempt, submitAttemptFailed: false });
  };

  const handleFocus = () => {
    if (props.config.lowercaseOnFocus) {
      setInput(input.toLowerCase());
    }
  };

  return (
    <InputContainer
      styling={props.config.styling}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <StyledForm onSubmit={props.submit !== "disabled" && handleSubmit}>
        <StyledInput
          placeholder={props.config.placeholder || "Enter input"}
          onChange={handleChange}
          value={input}
          type={props.config.type}
        />
      </StyledForm>
      <ErrorListContainer failedAttempt={failedAttempt.submitAttemptFailed}>
        {failedAttempt.errors.map((error) => {
          return (
            <ErrorContainer key={error}>
              <Icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="red"
                >
                  <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                </svg>
              </Icon>
              <Error>{error}</Error>
            </ErrorContainer>
          );
        })}
      </ErrorListContainer>
    </InputContainer>
  );
}
