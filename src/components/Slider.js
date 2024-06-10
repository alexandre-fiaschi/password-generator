export default function Slider({ sliderValue, onSliderChange }) {
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
