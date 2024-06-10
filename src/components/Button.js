export default function Button({ onGeneratePass }) {
  return (
    <button className="btn generate" id="generate" onClick={onGeneratePass}>
      Generate Password
    </button>
  );
}
