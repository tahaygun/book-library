import React, { Component } from "react";

export class Searchmethods extends Component {
  render() {
    return (
      <div>
        <header className="bg-infos2 text-white">
          <div className="container text-center">
            <h1>Arama teknikleri</h1>
            <p className="lead" />
          </div>
        </header>

        <section id="wordMethod" className="bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h2>Kelime Arama</h2>
                <p className="lead text-justify">
                  Kelime metodu sadece bir kelime veya birden fazla kelime için
                  geçerli olan genel arama metoddur.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="together">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h2>Birlikte Arama</h2>
                <p className="lead text-justify">
                  Birlikte ara metodu ile birden fazla kelimenin aynı anda
                  geçtiği bölümlere ulaşabilirsiniz. Örneğin; "felsefe mesele
                  kelam" kelimeleriyle yapılacak bir aramanın sonucunda sadece
                  bu üç kelimeyi aynı anda içeren başlıklar görülecektir. Bu
                  kelimelerin dizilişi önemli değildir. Boşluk bırakarak
                  yazdığınız her kelime listeye dahil edilecektir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="includes" className="bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h2>İbare Arama</h2>
                <p className="lead text-justify">
                  İbare arama metodu ile bir veya birden fazla kelime veya hece
                  yazarak arama yapabilirsiniz. Kısacası yazdığınız ibarenin
                  kelime olup olmamasına bakmadan herhangi bir yerde geçiyorsa
                  size gösterecektir. Örneğin; "<b>tek</b>" yazarak arama
                  yapıldığında sonuçlar içerisinde "des<b>tek</b>, <b>tek</b>vin,{" "}
                  <b>tek</b>amül, ..." kelimelerini içeren başlıkları da
                  göreceksiniz.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Searchmethods;
