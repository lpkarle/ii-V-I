
export default function Select() {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Browsers</legend>
      <select defaultValue="Pick a browser" className="select">
        <option disabled={true}>Pick a browser</option>
        <option>Chrome</option>
        <option>FireFox</option>
        <option>Safari</option>
      </select>
      <span className="fieldset-label">Optional</span>
    </fieldset>
  );
}
