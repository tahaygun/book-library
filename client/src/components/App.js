import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./landing-page.min.css";
import "../vendor/font-awesome/css/font-awesome.min.css";
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../vendor/simple-line-icons/css/simple-line-icons.css";
import Home from "./Home";
import Results from "./Results";
import Nav from "./Nav";
import Section from "./Section";
import Footer from "./Footer";
import Addbook from "./Addbook";
import Addsection from "./Addsection";
import Bookpage from "./Bookpage";
import Books from "./Books";
import Adminbooks from "./Adminbooks";
import Contact from "./Contact";
import Methods from "./SearchMethods";
import Notfound from "./Notfound";
import Login from "./Adminlogin";
import Editbook from "./Editbook";
import Editsection from "./Editsection";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-121173924-1'); 

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  ReactGA.pageview(window.location.pathname + window.location.search);
  return null;
};

class App extends Component {
  componentDidMount() {
    axios.get(process.env.REACT_APP_SECRET_CODE + "/api/view/");
  }

  render() {
    return (
      <div className="App">
        <Router  >
          <div>
            <Nav />
            <Route component={ScrollToTop} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/result" component={Results} />
              <Route path="/contact" component={Contact} />
              <Route path="/section/:id/:name/:word" component={Section} />
              <Route path="/section/:id/:name" component={Section} />
              <Route path="/editsection/:id" component={Editsection} />
              <Route exact path="/books/:id" component={Bookpage} />
              <Route exact path="/books/:id/:name" component={Bookpage} />
              <Route path="/editbook/:id" component={Editbook} />
              <Route path="/books" component={Books} />
              <Route path="/adminbooks" component={Adminbooks} />
              <Route path="/methods" component={Methods} />
              <Route path="/addbook" component={Addbook} />
              <Route path="/addsection" component={Addsection} />
              <Route path="/adminslog" component={Login} />
              <Route component={Notfound} />
            </Switch>
            <button className="goUpButton" onClick={ScrollToTop}>
              Yukarı
            </button>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
