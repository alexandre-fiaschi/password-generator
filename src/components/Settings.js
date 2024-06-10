import Setting from "./Setting";

export default function Settings({ settings, onSettingsChange }) {
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
