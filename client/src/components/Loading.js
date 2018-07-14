import React, { Component } from "react";
import ReactLoading from "react-loading";

export class Loading extends Component {
  render() {
    return (
      <div className="container loading-container result-container">
        <div className='loading' >
          <ReactLoading type="spinningBubbles" color={"gray"} width={120} />
        </div>
      </div>
    );
  }
}

export default Loading;
