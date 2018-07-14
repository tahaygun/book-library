import React, { Component } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import latinize from "latinize";
export class OneResult extends Component {
  slugify(Text) {
    return Text.toLowerCase()
      .replace(/ı+/g, "i")
      .replace(/'İ'+/g, "i")
      .replace(/ü+/g, "u")
      .replace(/ö+/g, "o")
      .replace(/ğ+/g, "g")
      .replace(/ç+/g, "c")
      .replace(/â+/g, "a")
      .replace(/ş+/g, "s")
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  render() {
    var con = this.props.content;
    return (
      <div className="card mb-4">
        <div className="card-body">
          {con.title.length > 120 ? (
            <h3 style={{fontSize:'18px'}} className="card-title">{con.title}</h3>
          ) : (
            <h3 className="card-title ">{con.title}</h3>
          )}
          <p className="card-text">
            <Highlighter
              highlightClassName="strong"
              searchWords={this.props.input}
              autoEscape={true}
              textToHighlight={con.content}
              sanitize={latinize}
            />{" "}
          </p>
          <Link
            to={
              "/section/" +
              con._id +
              "/" +
              this.slugify(con.title) +
              "/" +
              this.props.input
            }
            className="btn btn-sm btn-primarys"
          >
            Başlığa git &rarr;
          </Link>
        </div>
        <div className="card-footer text-muted">
          Kitap:
          <Link to={`/books/${con.book._id}/${this.slugify(con.book.name)}`}>
            {" "}
            {con.book.name}
          </Link>
        </div>
      </div>
    );
  }
}

export default OneResult;
