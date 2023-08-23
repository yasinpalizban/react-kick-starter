import React, { Component } from 'react';
import './dashboard.component.scss';
import {Outlet} from "react-router-dom";

class DashboardComponent extends Component {
  render() {
    return (
        <section className="statistic">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <Outlet />
            </div>
          </div>
        </section>

    );
  }
}

export default DashboardComponent;
