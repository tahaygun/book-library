import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import JwPagination from "jw-react-pagination";
import { DebounceInput } from "react-debounce-input";

class Book extends Component {
  slugify(Text) {
    return Text.toLowerCase()
      .replace(/ı+/g, "i")
      .replace(/'İ'+/g, "i")
      .replace(/ü+/g, "u")
      .replace(/ö+/g, "o")
      .replace(/ğ+/g, "g")
      .replace(/ç+/g, "c")
      .replace(/ş+/g, "s")
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  render() {
    var book = this.props.book;
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 mb-3 portfolio-item">
        <div className="card h-100">
          <Link to={`/books/${book._id}/${this.slugify(book.name)}`}>
            <img
              style={{ width: 150 }}
              className="card-img-top"
              src={book.imgUrl}
              alt=""
            />
          </Link>
          <div className="card-body">
            <h4 className="card-title bookNameInBooks">
              <Link to={`/books/${book._id}/${this.slugify(book.name)}`}>
                {book.name}
              </Link>
            </h4>
            {/* <span className="card-text book-details text-justify">
              <hr />
              <LinesEllipsis
                text={book.details}
                maxLine="5"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </span> */}
          </div>
        </div>
      </div>
    );
  }
}

export class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: null,
      pageOfItems: []
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    document.title = "Kitaplar • Pırlanta Ara";
  }
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems }, window.scrollTo(0, 0));
  }
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/allbooks")
      .then(res => {
        this.setState({ books: res.data });
        localStorage.setItem("books", JSON.stringify(res.data));
      })
      .catch(err => console.log(err));
    if (!this.state.books) {
      let books = localStorage.getItem("books");
      this.setState({ books: JSON.parse(books) });
    }
  }
  searchHandler(e) {
    axios
      .post(process.env.REACT_APP_SECRET_CODE + "/api/searchbook", {
        input: e
      })
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const customLabels = {
      first: "<<",
      last: ">>",
      previous: "<",
      next: ">"
    };

    return this.state.books ? (
      <div style={{paddingTop:'30px'}} className="container result-container">
        <h1 className="my-4">Kitaplar </h1>
        <div className="card my-4">
          <h5 className="card-header">Kitap ara</h5>
          <div className="card-body">
            <div className="input-group">
              <DebounceInput
                minLength={3}
                debounceTimeout={700}
                className="form-control"
                placeholder="Lütfen en az 3 karakter giriniz.."
                onChange={event => this.searchHandler(event.target.value)}
              />
              <span className="input-group-btn" />
            </div>
          </div>
        </div>
        {!this.state.books.length && (
          <h3 className="text-danger">Sonuç bulunamadı..</h3>
        )}
        <div className="row">
          {this.state.books &&
            this.state.pageOfItems.map(book => {
              return <Book key={book._id} book={book} />;
            })}
        </div>

        <div className="pagination justify-content-center mb-4">
          {this.state.books.length && (
            <JwPagination
              items={this.state.books}
              onChangePage={this.onChangePage}
              disableDefaultStyles={true}
              labels={customLabels}
              pageSize={8}
            />
          )}
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default Books;
