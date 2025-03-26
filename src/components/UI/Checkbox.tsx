type CheckboxProps = {
  id: string;
  title: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  id,
  title,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <>
      <label htmlFor={id} className="fieldset-label">
        <input
          id={id}
          type="checkbox"
          value={title}
          checked={checked}
          className="checkbox"
          onChange={onChange}
        />
        {title}
      </label>
    </>
  );
}
