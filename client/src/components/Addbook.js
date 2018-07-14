import React, { Component } from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';
axios.defaults.withCredentials = true;

export class Addbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      details: "",
      imgUrl: "",
      publishDate: "",
      success: null,
      error:'',
      auth:true
    };
    this.formHandler = this.formHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    axios
    .post(
      process.env.REACT_APP_SECRET_CODE +
        "/api/isloggedin").then(res => {
      this.setState({ auth: true });
    })
    .catch(err => this.setState({ auth: false }));
  }
  formHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitHandler(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SECRET_CODE + "/api/addbook", this.state)
      .then(res => {
        if (res.data.name) {
          this.setState({
            name: "",
            details: "",
            imgUrl: "",
            publishDate: "",
            success: "Kitap Eklendi!"
          });
          setTimeout(()=>{ this.setState({success:null}); }, 3000);

        }
      }).catch(err=>{
        this.setState({error:'Unauthorized'})
      })
  }
  render() {
    return (
      this.state.auth ?
      <div className="container">
      <p> {this.state.error}</p>
        <h1>Kitap ekle</h1>
        <p className='text-danger' >{this.state.success && this.state.success}</p>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="name">Kitap Adı</label> <br />
          <input
            className="form-control"
            type="text"
            required
            value={this.state.name}
            autoComplete="off"
            name="name"
            onChange={this.formHandler}
            id="name"
          />
          <hr />
          <label htmlFor="details">Kitap Detayı</label>
          <br />
          <textarea
            className="form-control"
            type="text"
            required
            value={this.state.details}
            style={{ height: 200 }}
            name="details"
            onChange={this.formHandler}
            id="details"
          />
          <hr />
          <label htmlFor="imgUrl">Fotoğraf linki</label>
          <br />
          <input
            className="form-control"
            type="text"
            required
            value={this.state.imgUrl}
            autoComplete="off"
            name="imgUrl"
            onChange={this.formHandler}
            id="imgUrl"
          />
          <hr />
          <label htmlFor="publishDate">Kitap baskı tarihi(zorunlu değil)</label>
          <br />
          <input
            className="form-control"
            type="text"
            value={this.state.publishDate}
            autoComplete="off"
            name="publishDate"
            onChange={this.formHandler}
            id="publishDate"
          />
          <hr />
          <button className="btn btn-primary" type="submit">
            Ekle
          </button>
          <hr />
        </form>
      </div> :
      <Redirect to='/' />
    );
  }
}

export default Addbook;
