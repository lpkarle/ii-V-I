type CheckboxProps = {
  id: string;
  title: string;
  checked?: boolean;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  id,
  title,
  checked,
  className,
  onChange,
}: CheckboxProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="fieldset-label text-nowrap">
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
    </div>
  );
}
