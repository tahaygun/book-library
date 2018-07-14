import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import Notfound from "./Notfound";
export class Bookpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookinfo: null,
      error: null
    };
    axios
      .get(
        process.env.REACT_APP_SECRET_CODE +
          "/api/book/" +
          this.props.match.params.id
      )
      .then(res => this.setState({ bookinfo: res.data }))
      .catch(err => this.setState({ error: true }));
  }
  slugify(Text) {
    return Text.toLowerCase()
      .replace(/ı+/g, "i")
      .replace(/ü+/g, "u")
      .replace(/ö+/g, "o")
      .replace(/'İ'+/g, "i")
      .replace(/ğ+/g, "g")
      .replace(/ç+/g, "c")
      .replace(/â+/g, "a")
      .replace(/ş+/g, "s")
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  componentDidUpdate() {
    if (this.state.bookinfo) {
      document.title = this.state.bookinfo.book.name + " • Pırlanta Ara";
    }
  }

  render() {
    var info = this.state.bookinfo;
    return this.state.bookinfo ? (
      <div className="container result-container">
        {/* <!-- Portfolio Item Heading --> */}
        <h1 className="my-4">{info.book.name}</h1>
        {/* <!-- Portfolio Item Row --> */}
        <div className="row">
          <div className="col-md-12 my-4 col-lg-6">
            <img
              width="300"
              className="img-fluid"
              src={info.book.imgUrl}
              alt=""
            />
          </div>

          <div className="col-md-12 col-lg-6">
            <h3 className="my-3">Kitap hakkında</h3>
            <p className="text-justify">{info.book.details}</p>
          </div>
        </div>
        <hr />
        <h4 className="text-left">Bölümler:</h4> <hr />
        <div className="row">
          <ul>
            {info.sections.map(section => {
              return (
                <li key={section._id} className="listfrombookpage text-left">
                  <Link
                    className="sectionsFromBookPage"
                    to={
                      "/section/" +
                      section._id +
                      "/" +
                      this.slugify(section.title)
                    }
                  >
                    {section.title}
                  </Link>
                  <hr id="sectionHr" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    ) : this.state.error ? (
      <Notfound meta="kitap" />
    ) : (
      <Loading />
    );
  }
}

export default Bookpage;
