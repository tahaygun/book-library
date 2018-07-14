import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import LinesEllipsis from "react-lines-ellipsis";
import Loading from "./Loading";
import JwPagination from "jw-react-pagination";
import { DebounceInput } from "react-debounce-input";
axios.defaults.withCredentials = true;

class Book extends Component {
  render() {
    var book = this.props.book;
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
        <div className="card h-100">
          <Link to={`/editbook/${book._id}`}>
            <img
              style={{ width: 150 }}
              className="card-img-top"
              src={book.imgUrl}
              alt=""
            />
          </Link>
          <div className="card-body">
            <h4 className="card-title bookNameInBooks">
              <Link to={`/editbook/${book._id}`}>{book.name}</Link>
            </h4>
            <span className="card-text book-details text-justify">
              <hr />
              <LinesEllipsis
                text={book.details}
                maxLine="5"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export class Adminbooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: null,
      pageOfItems: [],
      auth:true
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    document.title="Kitaplar • Pırlanta Ara";
    axios
    .post(
      process.env.REACT_APP_SECRET_CODE +
        "/api/isloggedin").then(res => {
      this.setState({ auth: true });
    })
    .catch(err => this.setState({ auth: false }));

  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_SECRET_CODE + "/api/allbooks")
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
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
        this.state.auth ?
      <div className="container result-container">
        <h1 className="my-4">Kitaplar </h1>
        <div className="card my-4">
          <Link className="btn btn-info" to='/addsection'>Başlık Ekle</Link>
          <br/>
          <Link className="btn btn-primary" to='/addbook' >Kitap Ekle</Link>
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
        {!this.state.books.length && <h3>Sonuç bulunamadı..</h3>}
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
      </div> :<Redirect to='/' />
    ) : (
      <Loading />
    );
  }
}

export default Adminbooks;
