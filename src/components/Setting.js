export default function Setting({ id, checked, onChange, disabled, children }) {
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
