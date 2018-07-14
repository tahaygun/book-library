import React, { Component } from "react";
import axios from "axios";
import querystring from "../query-string";
import OneResult from "./OneResult";
import JwPagination from "jw-react-pagination";
import Loading from "./Loading";
export class Results extends Component {
  constructor(props) {
    super(props);
    this.params = "";
    this.state = {
      result: null,
      input: null,
      pageOfItems: [],
      method: "",
      searchInput: "",
      error: null
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems }, window.scrollTo(0, 0));
  }

  componentWillMount() {
    this.params = querystring.parse(this.props.location.search);
    this.setState({
      searchInput: this.params.kelime,
      method: this.params.method
    });
    this.searchHandler();
  }
  searchHandler = () => {
    this.words = this.params.kelime.split(" ");
    document.title =
      "'" + this.params.kelime + "' için arama sonucu • Pırlanta Ara";
    this.setState({ input: this.words });
    return axios
      .post(process.env.REACT_APP_SECRET_CODE + "/api/" + this.params.method, {
        input: this.params.kelime
      })
      .then(result => {
        this.setState({ result: result.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  searchInputChanger = e => {
    this.setState({ searchInput: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    if (this.state.searchInput.length < 3) {
      return this.setState({ error: "Lütfen en az 3 harf yazın.." });
    }
    this.setState({ error: null });
    this.props.history.push({
      pathname: "/result",
      search: `?kelime=${this.state.searchInput}&method=${this.state.method}`
    });
    this.params.kelime = this.state.searchInput;
    this.searchHandler();
  };

  render() {
    const customLabels = {
      first: "<<",
      last: ">>",
      previous: "<",
      next: ">"
    };
    return this.state.result ? (
      <div className="container result-container">
        <div className="row">
          {/* <!-- Blog Entries Column --> */}
          <div className="col-md-8 results-div">
            <h3
              className={`my-4 ${
                this.state.result.length ? "" : "text-danger"
              } `}
            >
              <span className="strong"> {this.words.join(" ")} </span> için{" "}
              {this.state.result.length} sonuç bulundu.
            </h3>
            <form onSubmit={this.submitHandler}>
              <p className="text-warning">
                {this.state.error && this.state.error}
              </p>
              <div className="form-row">
                <div className="col-12 col-md-12 mb-2 mb-md-0">
                  <input
                    type="text"
                    onChange={this.searchInputChanger}
                    value={this.state.searchInput}
                    className="form-control form-control-lg"
                    placeholder="Lütfen en az 3 karakter yazın.."
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-12 col-md-12 mb-2 mb-md-0">
                  <button
                    type="submit"
                    className="btn btn-block btn-md btn-primarys"
                  >
                    Ara
                  </button>
                </div>
              </div>
            </form>
            <hr />
            {this.state.result &&
              this.state.pageOfItems.map(content => {
                return (
                  <OneResult
                    input={this.state.input}
                    key={content._id}
                    content={content}
                  />
                );
              })}
            <p className="totalPage">
              Toplam{" "}
              {this.state.result.length < 10
                ? "1"
                : Math.ceil(this.state.result.length / 10)}{" "}
              sayfa.
            </p>
            <div className="pagination justify-content-center mb-4">
              {this.state.result.length && (
                <JwPagination
                  items={this.state.result}
                  onChangePage={this.onChangePage}
                  disableDefaultStyles={true}
                  labels={customLabels}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default Results;
