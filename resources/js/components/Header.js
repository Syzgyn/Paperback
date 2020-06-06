import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <div className="container mt-3">
        <div className="row header">
          <div className="col">
            <nav className="paperback-navbar navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="#">
                <img src="/storage/logo.png" className="logo"/>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="navbar-icon" data-feather="book"></i>
                        Comics
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="navbar-icon" data-feather="plus"></i>
                        Add Comic
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="navbar-icon" data-feather="clock"></i>
                        Activity
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="navbar-icon" data-feather="alert-triangle"></i>
                        Wanted
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="navbar-icon" data-feather="settings"></i>
                        Settings
                    </a>
                  </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <div className="input-group">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-light" type="button">
                                <i className="search-button" data-feather="search"></i>
                            </button>
                        </div>
                    </div>
                </form>
              </div>
            </nav>
          </div>
        </div>
    </div>
)

export default Header
