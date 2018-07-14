import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import axios from "axios";
export class Editsection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: {title:'',content:'',date:''},
      message: null,
      error: "",
      auth:true
    };
    this.formHandler = this.formHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this)
}
  componentDidMount() {
    axios
    .post(
      process.env.REACT_APP_SECRET_CODE +
        "/api/isloggedin").then(res => {
      this.setState({ auth: true });
    })
    .catch(err => this.setState({ auth: false }));
  //
    axios
      .get(
        process.env.REACT_APP_SECRET_CODE +
          "/api/section/" +
          this.props.match.params.id
      )
      .then(res => {
        this.setState({ section: res.data });
      })
      .catch(err => this.setState({ error: true }));
  }
  deleteHandler(e){
    e.preventDefault();
    axios
    .delete(
      process.env.REACT_APP_SECRET_CODE +
        "/api/deletesection/" +
        this.props.match.params.id
    )
    .then(res => {
      this.props.history.push('/adminbooks');
    })
    .catch(err => this.setState({ error: true }));
  }
  formHandler(element) {
    var formData = this.state.section;
    formData[element.target.name]=element.target.value;
    this.setState({
        section: formData
    })
  }
  submitHandler(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SECRET_CODE + "/api/editsection/"+this.props.match.params.id, this.state.section)
      .then(res => {
        if (res.data.book) {
         this.props.history.goBack();
        }
      })
      .catch(err => {
        this.setState({ error: "Unauthorized" });
      });
  }
  render() {
    return (
        this.state.auth ?
      <div className="container">
        <h1>Bölüm ekle</h1>
        <br />
        <p> {this.state.error}</p>
        <p className="text-danger">
          {this.state.message && this.state.message}
        </p>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="title">Başlık</label> <br />
          <input
            className="form-control"
            required
            value={this.state.section.title}
            autoComplete="off"
            type="text"
            name="title"
            onChange={this.formHandler}
            id="title"
          />
          <hr />
          <label htmlFor="content">İçerik</label>
          <br />
          <textarea
            className="form-control"
            required
            id="textarea"
            value={this.state.section.content}
            style={{ height: 200 }}
            type="text"
            name="content"
            onChange={this.formHandler}
          />
          <hr />
          <label htmlFor="date">Extra Bilgi</label>
          <br />
          <input
            className="form-control"
            type="text"
            value={this.state.section.date}
            autoComplete="off"
            name="date"
            onChange={this.formHandler}
            id="date"
          />
          <hr />
          <button className="btn btn-primary" type="submit">
            Update 
          </button> <br/><br/>
          <button className="btn btn-warning" onClick={this.deleteHandler}>
            Delete
          </button>
          
          <hr />
        </form>
      </div> :
      <Redirect to='/' />
    );
  }
}

export default Editsection;
