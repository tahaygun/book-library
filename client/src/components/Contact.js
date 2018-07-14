import React, { Component } from "react";
import axios from "axios";
export class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      content: "",
      email: "",
      name: "",
      message: null
    };
    this.formHandler = this.formHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    document.title = "İletişim • Pırlanta Ara";
  }

  formHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitHandler(e) {
    e.preventDefault();
    var message =
      "Subject: " +
      this.state.subject +
      "\n Message: " +
      this.state.content +
      "\n Email: " +
      this.state.email +
      "\n Name: " +
      this.state.name;
    axios
      .post(process.env.REACT_APP_SECRET_CODE + "/api/mail", {
        text: message,
        subject: this.state.subject
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            subject: "",
            content: "",
            email: "",
            name: "",
            message:
              "Mesaj başarıyla iletildi, en yakın zamanda size geri dönüş yapılacak."
          });
          setTimeout(() => {
            this.setState({ message: null });
          }, 10000);
        }
      })
      .catch(err => {
        this.setState({
          message:
            "Bir sorun ile karşılaşıldı lütfen daha sonra tekrar deneyin."
        });
      });
  }
  render() {
    return (
      <div
        style={{ marginTop: "70px", marginBottom: "50px" }}
        className="container"
      >
        <h1>Bize ulaşın:</h1>
        <br />
        <p className="text-muted strong">
          Bize iyileştirmeler ile ilgili yardımcı olabilir veya karşılaştığınız
          problemleri iletebilirsiniz.
        </p>
        <p className="text-danger">
          {this.state.message && this.state.message}
        </p>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="subject">Konu*</label> <br />
          <input
            className="form-control"
            required
            value={this.state.subject}
            type="text"
            name="subject"
            onChange={this.formHandler}
            id="subject"
          />
          <hr />
          <label htmlFor="content">Mesaj*</label>
          <br />
          <textarea
            className="form-control"
            required
            id="textarea"
            value={this.state.content}
            style={{ height: 200 }}
            type="text"
            name="content"
            onChange={this.formHandler}
          />{" "}
          <hr />
          <label htmlFor="name">İsim</label> <br />
          <input
            className="form-control"
            value={this.state.name}
            type="text"
            name="name"
            onChange={this.formHandler}
            id="name"
          />
          <hr />
          <label htmlFor="email">Email*</label>
          <br />
          <input
            className="form-control"
            required
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.formHandler}
            id="email"
          />
          <hr />
          <button className="btn btn-primarys" type="submit">
            Gönder
          </button>
          <hr />
        </form>
        <br />
      </div>
    );
  }
}

export default Contact;
