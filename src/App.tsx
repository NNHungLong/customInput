import { useState, useRef } from "react";
import "./App.css";

interface CustomInputType {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: (e: string) => void;
}

function CustomInput(props: CustomInputType) {
  const { value, onChange, setValue } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const currentKeyDown = useRef("");
  const formatValue = (value: string): string => {
    const parts = value.split(".");
    const part0Formatted = new Intl.NumberFormat("fr-FR").format(
      BigInt(parts[0])
    );
    return parts.length === 2
      ? `${part0Formatted}.${parts[1]}`
      : part0Formatted;
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (e.target.selectionStart !== inputRef?.current?.value?.length) {
      setValue(
        currentKeyDown.current.match(/[0-9.]/) ? currentKeyDown.current : ""
      );
      return;
    }
    const actualValue = e.target.value.replace(/\s/g, "");
    const formattedValue = formatValue(actualValue);
    setValue(formattedValue);
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    currentKeyDown.current = e.key;
  };
  // const handleOnClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
  //   const inputElement = e.target as HTMLInputElement;
  //   if (inputElement.selectionStart !== inputRef?.current?.value?.length) {
  //     setValue("");
  //   }
  // };
  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      // onClick={handleOnClick}
    />
  );
}

function App() {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <h1>Hello World!</h1>
      <CustomInput value={value} onChange={onChange} setValue={setValue} />
    </>
  );
}

export default App;
