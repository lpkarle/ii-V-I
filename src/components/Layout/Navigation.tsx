import ThemeToggler from '../UI/ThemeToggler';

export default function Navigation() {
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar content-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ii V I</a>

          <a href="fretboard" className="btn btn-ghost">
            Fretboard
          </a>

          <a href="fretboard-practice" className="btn btn-ghost">
            Fretboard-Practice
          </a>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <ThemeToggler />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
