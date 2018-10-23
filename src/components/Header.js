import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <header className="header">
                <nav>
                    <ul className="nav nav-tabs">
                        <li className="nav-item"><Link className={(this.props.active === "Main") ? "nav-link active" : "nav-link"} to='/'>Иерархия узлов</Link></li>
                        <li className="nav-item"><Link className={(this.props.active === "Table") ? "nav-link active" : "nav-link"} to='/Table'>React-bootstrap-table</Link></li>
                        <li className="nav-item"><Link className={(this.props.active === "Masonry") ? "nav-link active" : "nav-link"} to='/Masonry'>Плитка</Link></li>
                        <li className="nav-item"><Link className={(this.props.active === "MyTable") ? "nav-link active" : "nav-link"} to='/MyTable'>Таблица</Link></li>
                        <li className="nav-item"><Link className={(this.props.active === "Slider") ? "nav-link active" : "nav-link"} to='/Slider'>Ползунок</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;