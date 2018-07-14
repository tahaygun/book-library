import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      method: "searchfullword",
      searchInput: "",
      error: null
    };
    document.title = "Anasayfa • Pırlanta Ara";
  }

  searchMethodChanger = e => {
    this.setState({ method: e.target.value });
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
  };
  render() {
    return (
      <div>
        <header className="masthead text-white text-center">
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <h1 className="mb-5">Pırlanta ara!</h1>
              </div>
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <p className="text-danger strong">
                  {this.state.error && this.state.error}
                </p>
                <form onSubmit={this.submitHandler}>
                  <div className="form-row">
                    <div className="col-12 col-md-12 mb-2 mb-md-0">
                      <input
                        type="text"
                        onChange={this.searchInputChanger}
                        className="form-control form-control-lg"
                        placeholder="Lütfen en az 3 karakter yazın.."
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-12 col-md-12 mb-2 mb-md-0">
                      <select
                        onChange={this.searchMethodChanger}
                        id="inputState"
                        className="form-control"
                      >
                        <option value="searchfullword">kelimesini</option>
                        <option value="searchAllWords">
                          kelimelerini birlikte (boşluk bırakarak yazınız)
                        </option>
                        <option value="includes">ibaresini</option>
                        <option value="findbytitle">konu başlığı</option>
                      </select>
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
              </div>
            </div>
          </div>
        </header>
        <section className="features-icons bg-light text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-grid m-auto text-primary" />
                  </div>
                  <h3>Kelime Arama</h3>
                  <p className="lead text-justify mb-0">
                    Kelime metodu bir veya birden fazla kelime için geçerli olan
                    normal arama metodudur.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-layers m-auto text-primary" />
                  </div>
                  <h3>Birlikte Arama</h3>
                  <p className="lead text-justify mb-0">
                    Birlikte ara metodu ile birden fazla kelimenin aynı anda
                    birlikte geçtiği bölümlere ulaşabilirsiniz.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-plus m-auto text-primary" />
                  </div>
                  <h3>İbare Arama</h3>
                  <p className="lead text-justify mb-0">
                    {" "}
                    İbare arama metodu ile bir veya birden fazla kelime veya
                    hece yazarak arama yapabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
            <hr style={{ marginTop: "50px", marginBottom: "50px" }} />
            <p>
              Arama methodları hakkında daha fazla bilgi almak için{" "}
              <Link className="text-info" to="/methods">
                tıklayınız
              </Link>.
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
