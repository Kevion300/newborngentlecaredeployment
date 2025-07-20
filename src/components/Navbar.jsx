import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const links = ['', 'services', 'about', 'testimonials', 'contact'];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                {/* Logo in place of text brand */}
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/logo.png"
                        alt="Gentle Care Logo"
                        height="40"
                        className="d-inline-block align-top me-2"
                    />
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMenu"
                    aria-controls="navMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav ms-auto">
                        {links.map((path, i) => (
                            <li key={i} className="nav-item">
                                <NavLink
                                    to={path === '' ? '/' : `/${path}`}
                                    className="nav-link"
                                    end
                                >
                                    {path === ''
                                        ? 'Home'
                                        : path.charAt(0).toUpperCase() + path.slice(1)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
