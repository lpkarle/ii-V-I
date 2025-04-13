import { useRouting } from '../../hooks/useRouting';
import ThemeToggler from '../UI/ThemeToggler';

export default function Navigation() {
  const { navigate } = useRouting();

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar content-lg">
        <div className="flex-1">
          <a
            onClick={() => navigate('ii-V-I/fretboard')}
            className="btn btn-ghost text-xl"
          >
            ii V I
          </a>

          <a
            onClick={() => navigate('ii-V-I/fretboard')}
            className="btn btn-ghost"
          >
            Fretboard
          </a>

          <a
            onClick={() => navigate('ii-V-I/fretboard-practice')}
            className="btn btn-ghost"
          >
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
