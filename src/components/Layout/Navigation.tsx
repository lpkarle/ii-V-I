import ThemeToggler from '../UI/ThemeToggler';

export default function Navigation() {
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar content-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">I IV V</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <ThemeToggler />
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Link 2</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
