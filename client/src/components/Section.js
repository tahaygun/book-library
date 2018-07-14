import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Highlighter from "react-highlight-words";
import Loading from "./Loading";
import Notfound from "./Notfound";
import latinize from "latinize";
import {
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterIcon,
  TelegramIcon,
  EmailIcon,
  WhatsappIcon
} from "react-share";
import MetaTags from "react-meta-tags";
export class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: null,
      word: "",
      error: null
    };
    this.inlineSearch = this.inlineSearch.bind(this);
  }
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
  inlineSearch(e) {
    this.setState({ word: e.target.value });
  }
  componentWillMount() {
    if (this.props.match.params.word) {
      this.setState({ word: this.props.match.params.word });
    }
    axios
      .get(
        process.env.REACT_APP_SECRET_CODE +
          "/api/section/" +
          this.props.match.params.id
      )
      .then(res => {
        this.setState({ section: res.data });
        // document.title = this.state.section.title + " • Pırlanta Ara";
      })
      .catch(err => this.setState({ error: true }));
  }
  componentDidMount() {}
  render() {
    return this.state.section ? (
      <div className="container">
        <MetaTags>
          <title>{this.state.section.title + " • Pırlanta Ara"}</title>
          <meta
            name="description"
            id="normal-desc"
            content={this.state.section.content.slice(0, 300) + "..."}
          />
          <meta
            property="og:title"
            id="og-title"
            content={this.state.section.title}
          />
          <meta
            property="og:description"
            id="og-desc"
            content={this.state.section.content.slice(0, 300) + "..."}
          />
          <meta
            id="twitter-title"
            name="twitter:title"
            content={this.state.section.title}
          />
          <meta
            property="og:image"
            id="og-image"
            content={this.state.section.book.imgUrl}
          />
          <meta name="twitter:card" content="summary_large_image" />
        </MetaTags>
        <div className="row my-5">
          {/* <!-- Post Content Column --> */}
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            {/* <!-- Title --> */}
            <h1 className="mt-4">{this.state.section.title}</h1>

            {/* <!-- Author --> */}
            <p className="lead">
              Kitap:
              <Link
                to={`/books/${this.state.section.book._id}/${this.slugify(
                  this.state.section.book.name
                )}`}
              >
                {" "}
                {this.state.section.book.name}
              </Link>
            </p>

            <hr />

            {/* <!-- Preview Image --> */}
            <img
              className="img-fluid rounded"
              src={this.state.section.book.imgUrl}
              alt=""
            />

            <hr />
            <div className="icons my-3">
              <EmailShareButton
                url={this.state.section.title + "\n" + window.location.href}
              >
                <EmailIcon size={50} round={true} />{" "}
              </EmailShareButton>
              <TwitterShareButton
                url={this.state.section.title + "\n" + window.location.href}
              >
                <TwitterIcon size={50} round={true} />{" "}
              </TwitterShareButton>
              <TelegramShareButton
                url={this.state.section.title + "\n" + window.location.href}
              >
                <TelegramIcon size={50} round={true} />{" "}
              </TelegramShareButton>
              <WhatsappShareButton
                url={this.state.section.title + "\n" + window.location.href}
              >
                <WhatsappIcon size={50} round={true} />{" "}
              </WhatsappShareButton>
            </div>

            <p className="text-justify section-text">
              {this.state.section.content.split("\n").map((item, key) => {
                return (
                  <span key={key}>
                    <Highlighter
                      highlightClassName="strong"
                      searchWords={this.state.word.split(",")}
                      autoEscape={true}
                      textToHighlight={item}
                      sanitize={latinize}
                    />{" "}
                    <br />
                  </span>
                );
              })}
            </p>

            <hr />
            <blockquote className="blockquote">
              <footer className="blockquote-footer">
                <span>{this.state.section.date}</span>
              </footer>
            </blockquote>

            <div className="card my-5">
              <h5 className="card-header">Bölüm içi arama</h5>
              <div className="card-body">
                <div className="input-group">
                  <input
                    type="text"
                    onChange={this.inlineSearch}
                    defaultValue={this.state.word}
                    className="form-control"
                    placeholder="Bu bölümde ara..."
                  />
                </div>
              </div>
              <p className="blockquote-footer">
                Arayacağınız kelimeleri virgül ile boşluk bırakmadan
                arayabilirsiniz.
              </p>
            </div>
          </div>
        </div>
        <h6>Bu bölümü dostlarınla paylaş.</h6>
        <div className="icons my-3">
          <EmailShareButton
            url={this.state.section.title + "\n" + window.location.href}
          >
            <EmailIcon size={50} round={true} />{" "}
          </EmailShareButton>
          <TwitterShareButton
            url={this.state.section.title + "\n" + window.location.href}
          >
            <TwitterIcon size={50} round={true} />{" "}
          </TwitterShareButton>
          <TelegramShareButton
            url={this.state.section.title + "\n" + window.location.href}
          >
            <TelegramIcon size={50} round={true} />{" "}
          </TelegramShareButton>
          <WhatsappShareButton
            url={this.state.section.title + "\n" + window.location.href}
          >
            <WhatsappIcon size={50} round={true} />{" "}
          </WhatsappShareButton>
        </div>
      </div>
    ) : this.state.error ? (
      <Notfound meta="bölüm" />
    ) : (
      <Loading />
    );
  }
}

export default Section;
