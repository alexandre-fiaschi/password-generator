import Slider from "./components/Slider";
import Result from "./components/Result";
import "./index.scss";
import { useState } from "react";
import Settings from "./components/Settings";
import Button from "./components/Button";
import Title from "./components/Title";

export default function App() {
  const [password, setPassword] = useState("");
  const [sliderValue, setSliderValue] = useState(16);
  const [settings, setSettings] = useState({
    uppercase: true,
    lowercase: true,
    number: true,
    symbol: true,
  });

  function handleSettingsChange(event) {
    const { id, checked } = event.target;

    // Prevent unchecking the last remaining checked box
    if (!checked && Object.values(settings).filter(Boolean).length === 1) {
      return;
    }

    setSettings((prevSettings) => {
      const sett = {
        ...prevSettings,
        [id]: checked,
      };
      return sett;
    });
  }

  function handleSetPassword(password) {
    setPassword(password);
  }

  function handleGeneratePassword() {
    generatePassword(sliderValue, settings);
  }

  // Object of all the function names that we will use to create random letters of password
  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  // Random more secure value
  function secureMathRandom() {
    return (
      window.crypto.getRandomValues(new Uint32Array(1))[0] /
      (Math.pow(2, 32) - 1)
    );
  }
  // Generator Functions
  // All the functions that are responsible to return a random value taht we will use to create password.
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  function getRandomNumber() {
    return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
  }
  function getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+{}":?><;.,';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function generatePassword(length, settings) {
    let generatedPassword = "";

    const typesCount =
      settings.lowercase +
      settings.uppercase +
      settings.number +
      settings.symbol;

    if (typesCount === 0) {
      return ""; // If no settings are selected, return an empty string (for current functionality this is redundant)
    }
    const typesArr = [
      { lower: settings.lowercase },
      { upper: settings.uppercase },
      { number: settings.number },
      { symbol: settings.symbol },
    ].filter((item) => Object.values(item)[0]);

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcType = Object.keys(type)[0];
        generatedPassword += randomFunc[funcType]();
      });
    }
    const password = generatedPassword
      .slice(0, length)
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    handleSetPassword(password);
  }

  return (
    <div className="container">
      <Title />
      <Result password={password} />
      <Slider sliderValue={sliderValue} onSliderChange={setSliderValue} />
      <Settings settings={settings} onSettingsChange={handleSettingsChange} />
      <Button onGeneratePass={handleGeneratePassword} />
    </div>
  );
}
