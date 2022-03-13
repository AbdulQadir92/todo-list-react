import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Todo List</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-supported-content" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-supported-content">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2 py-0 search-btn-inp" type="search" placeholder="search" aria-label="Search" />
                        <button className="btn btn-sm btn-primary py-0 search-btn-inp" type="button">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;