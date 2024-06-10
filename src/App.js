import "./index.scss";
import { useState } from "react";

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
      // for (let i = 0; i < length; i++) {
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

function Title() {
  return <h2 className="title">Password Generator</h2>;
}

function Result({ password }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCopy = () => {
    const resultViewbox = document.getElementById("result").innerText;
    navigator.clipboard.writeText(resultViewbox).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 10000); // Reset copied state after 10 seconds
    });
  };

  return (
    <div className="result">
      <div className="result__title field-title">Generated Password</div>
      {password.length !== 0 && (
        <>
          <div
            className="result__info right"
            style={{
              opacity: copied ? 0 : 1,
              transform: copied ? "translateY(200%)" : "translateY(0)",
            }}
          >
            click to copy
          </div>
          <div
            className="result__info left"
            style={{
              opacity: copied ? 1 : 0,
              transform: copied ? "translateY(0)" : "translateY(200%)",
            }}
          >
            copied!
          </div>
        </>
      )}
      <div
        className="result__viewbox"
        id="result"
        onMouseMove={handleMouseMove}
      >
        {password.length === 0 ? "CLICK GENERATE PASSWORD" : password}
      </div>
      {password.length !== 0 && (
        <button
          id="copy-btn"
          onClick={handleCopy}
          style={{
            "--x": `${Math.trunc(mousePos.x)}px`,
            "--y": `${Math.trunc(mousePos.y)}px`,
          }}
        >
          <i className="far fa-copy"></i>
        </button>
      )}
    </div>
  );
}

function Slider({ sliderValue, onSliderChange }) {
  const sliderProps = {
    fill: "#0B1EDF",
    background: "rgba(255, 255, 255, 0.214)",
  };
  const percentage = Math.abs((100 * (sliderValue - 4)) / (4 - 32));
  const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${
    sliderProps.background
  } ${percentage + 0.1}%)`;

  return (
    <div className="length range__slider" data-min="4" data-max="32">
      <div className="length__title field-title" data-length={sliderValue}>
        length:
      </div>
      <input
        id="slider"
        type="range"
        min="4"
        max="32"
        value={sliderValue}
        onChange={(event) => onSliderChange(Number(event.target.value))}
        style={{ background: bg }}
      />
    </div>
  );
}

function Settings({ settings, onSettingsChange }) {
  // Determine if a checkbox should be disabled
  function shouldDisable(id) {
    return settings[id] && Object.values(settings).filter(Boolean).length === 1;
  }

  return (
    <div className="settings">
      <span className="settings__title field-title">settings</span>
      <Setting
        id={"uppercase"}
        checked={settings.uppercase}
        onChange={onSettingsChange}
        disabled={shouldDisable("uppercase")}
      >
        Include Uppercase
      </Setting>
      <Setting
        id={"lowercase"}
        checked={settings.lowercase}
        onChange={onSettingsChange}
        disabled={shouldDisable("lowercase")}
      >
        Include Lowercase
      </Setting>
      <Setting
        id={"number"}
        checked={settings.number}
        onChange={onSettingsChange}
        disabled={shouldDisable("number")}
      >
        Include Numbers
      </Setting>
      <Setting
        id={"symbol"}
        checked={settings.symbol}
        onChange={onSettingsChange}
        disabled={shouldDisable("symbol")}
      >
        Include Symbols
      </Setting>
    </div>
  );
}

function Setting({ id, checked, onChange, disabled, children }) {
  return (
    <div className="setting">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

function Button({ onGeneratePass }) {
  return (
    <button className="btn generate" id="generate" onClick={onGeneratePass}>
      Generate Password
    </button>
  );
}
