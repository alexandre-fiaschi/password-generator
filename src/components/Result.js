import { useState } from "react";

export default function Result({ password }) {
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
