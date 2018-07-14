import React, { Component } from 'react'


export class Notfound extends Component {
  componentWillMount(){
    document.title= "Sayfa Bulunamadı • Pırlanta Ara"    
  }
  render() {
    return (
      <div className='container result-container' >
        <h3 className='notfound display-4' >Bir şeyler ters gitti. <br/><br/> Böyle bir {this.props.meta} yok... </h3>
      </div>
    )
  }
  static defaultProps={
    meta:"sayfa"
  }
}
export default Notfound
