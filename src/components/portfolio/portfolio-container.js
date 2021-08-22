import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [],
      tutorialData: [],
      projectData: []
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    if (filter === "CLEAR_FILTERS") {
      this.getPortfolioItems();
    } else {
      this.getPortfolioItems(filter);
    }
  }

  getPortfolioItems(filter = null) {
    axios
      .get("https://robertgraham.devcamp.space/portfolio/portfolio_items")
      .then(response => {
        if (filter) {
          this.setState({
            data: response.data.portfolio_items.filter(item => {
              return item.category === filter;
            })
          });
        } else {
          this.setState({
            data: response.data.portfolio_items,
            tutorialData: response.data.portfolio_items.filter(item => {
              return item.category === "tutorial";
            }),
            projectData: response.data.portfolio_items.filter(item => {
              return item.category === "project";
            })
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }
  
  projects(){
    return this.state.projectData.map(item => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  tutorials(){
    return this.state.tutorialData.map(item => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="homepage-wrapper">
        <div className="filter-links">
          <div className="portfolio-column">
            <button
              className="btn"
              onClick={() => alert("These are tutorial projects that I have completed")}
            >
              TUTORIALS COMPLETED
            </button>
            <div className="portfolio-items-wrapper">{this.tutorials()}</div>
          </div>
          <div className="portfolio-column">
            <button
              className="btn"
              onClick={() => alert("These are projects I have completed either for myself or for clients")}
            >
              PROJECTS
            </button>
            <div className="portfolio-items-wrapper">{this.projects()}</div>
          </div>
          <div className="portfolio-column">
            <NavLink to="/about-me">
              <button
                className="btn"
                type="button"
              >
                ABOUT
              </button>
            </NavLink>
          
          <div className="portfolio-items-wrapper">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quos, veniam et commodi temporibus voluptatibus, deserunt suscipit dolor, nihil voluptatum neque quod quae molestias! Cum optio quia ratione doloribus libero?<br></br></p>
            <p><br></br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores distinctio nesciunt temporibus vel voluptas quae velit laborum placeat, sint commodi.</p>
          </div>
          </div>

        </div>
      </div>
    );
  }
}