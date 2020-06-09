import React from 'react'
import { Link } from 'react-router-dom'
import { Book, Plus, Clock, AlertTriangle, Settings, Search } from 'react-feather'

const Header = () => (
    <div className="container mt-3">
        <div className="row header">
          <div className="col">
            <nav className="paperback-navbar navbar navbar-expand-lg navbar-dark bg-dark">
              <Link to="/" className="navbar-brand">
                <img src="/storage/logo.png" className="logo"/>
              </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <Book className="navbar-icon" />
                        Comics
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/addcomic" className="nav-link">
                        <Plus className="navbar-icon" />
                        Add Comic
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/activity" className="nav-link">
                        <Clock className="navbar-icon" />
                        Activity
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/wanted" className="nav-link">
                        <AlertTriangle className="navbar-icon" />
                        Wanted
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                        <Settings className="navbar-icon" />
                        Settings
                    </Link>
                  </li>
                </ul>
                {/*
                <form className="form-inline my-2 my-lg-0">
                    <div className="input-group">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-light" type="button">
                                <Search className="search-button" />
                            </button>
                        </div>
                    </div>
                </form>
                */}
              </div>
            </nav>
          </div>
        </div>
    </div>
)

export default Header
