import React, { Component } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
export class Adminlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.formHandler = this.formHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  formHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitHandler(e){
    e.preventDefault();
    axios
    .post(process.env.REACT_APP_SECRET_CODE + "/api/adminlogin",this.state)
    .then(res=>{
      if (res.data.message) {
         this.props.history.push('/adminbooks')
      }
    })
    .catch(err=>{
        console.log(err);
        this.setState({error:err});
    });
}
  render() {
    return (
      <div className='container result-container' >
          {this.state.error &&<p>Wrong information!</p> }
        <form onSubmit={this.submitHandler}>
          <label htmlFor="email">Başlık</label> <br />
          <input
            className="form-control"
            required
            value={this.state.email}
            type="email"
            name="email"
            onChange={this.formHandler}
            id="email"
          />
          <hr />
          <label htmlFor="password">İçerik</label>
          <br />
          <input
            className="form-control"
            required
            id="password"
            value={this.state.password}
            type="password"
            name="password"
            onChange={this.formHandler}
          />
          <hr />
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Adminlogin;
