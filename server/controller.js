const express = require("express");
const bodyparser = require("body-parser");
const Book = require("./models/Book");
const Section = require("./models/Section");
const Traffic = require('./models/Traffic');
const router = express.Router();
var session = require('express-session');
const Admin = require('./models/Admin');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tahaygun@gmail.com',
        pass: '312'
  }
}));
router.post('/mail', function(req, res) {
  var mailOptions = {
    from: 'pirlanta.tk Support <FROM_EMAIL>',
    to: 'tahaygun@gmail.com',
    subject:req.body.subject,
    text: req.body.text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ 'error': error });
    } else {
      console.log('Message sent: ' + info.response);
      res.send({ 'message': 'Message sent! ' + info.response });
    }
  });
});
//
//
//@auth
//
//
var auth = (req,res,next)=>{
  if (req.session.admin) {
    Admin.findOne({
      email: req.session.admin.email,
      password: req.session.admin.password
    })
      .then(function (admin) {
        if (!admin) {
          return res.status(401).json();
        } else {
          req.session.admin = admin;
          return next();
        }
      })
      .catch(function (error) {
        console.log(error);
  
      })
  }else{
    return res.status(401).send({ errors: 'Not authorized!' })
  }
}
router.post('/auth',auth )



//
//
//@to add book
//
//

router.post("/addbook", auth, (req, res) => {
  var book = new Book(req.body);
  book
    .save()
    .then(book => {
      res.json(book);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});
//
//
//@to section in book

router.post("/addsection", auth, (req, res) => {
  var section = new Section(req.body);
  section
    .save()
    .then(section => {
      res.json(section);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});
router.post("/editsection/:id",auth,(req, res) => {
  Section.findById(req.params.id)
  .then((section) => {
      section.title=req.body.title;
      section.content=req.body.content;
      section.date=req.body.date;
      section.save().then(result=>{
        res.send(result);
      }).catch(err=>res.send(res));
    })
    .catch(err => {
      res.status(404).send(err);
    });
});
//
//@delete section
//
router.delete("/deletesection/:id", auth, (req, res) => {
  Section.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.send(result);
    }).catch(err => res.send(res));

});
//
//
//@to search full word
//
//
router.post("/searchfullword", (req, res) => {
  var xxx = req.body.input.replace(/\s+$/, '');
   xxx= '\"'+xxx+'\"';
  Section.find({ $text: { $search: xxx} })
    .populate("book")
    .then(section => {
      section.map(sec=>{  
        var text = remove_accents(sec.content);
        // console.log(text);
        var inp=req.body.input.toLowerCase();
        inp=remove_accents(inp);
        // console.log(inp); 
        var indx= text.toLowerCase().indexOf(inp);
        var edittedContent=sec.content.slice((indx<50 ?0 :indx-50), indx+120); 
        sec.content= indx<50 ? edittedContent+"..." : "..."+edittedContent+"...";
      })
      res.send(section);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});
//
//
//@to search word with starting point
router.post("/includes", (req, res) => {
  var input = req.body.input.replace(/\s+$/, '');
  Section.find().or([{ title: { $regex: input ,$options:'i'  }}, {content: { $regex: input ,$options:'i'  }}])
    .populate("book")
    .then(section => {
      section.map(sec=>{
        var text = remove_accents(sec.content);  
        var inp=input.toLowerCase();
        inp=remove_accents(inp);
        var indx= text.toLowerCase().indexOf(inp);
        var edittedContent=sec.content.slice((indx<50 ?0 :indx-50), indx+120);
        sec.content= indx<50 ? edittedContent+"..." : "..."+edittedContent+"...";
      })
      res.json(section);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});
//
//
//@to search word with ending point
//
//
router.post("/findbytitle", (req, res) => {
  var input = req.body.input;
  Section.find({title: { $regex: input ,$options:'i' }})
    .populate("book")
    .then(section => {
      section.map(sec=>{
        var inp=req.body.input.split(' ')[0];
        var edittedContent=sec.content.slice(0,120);
        sec.content= edittedContent+"...";
      })
      res.json(section);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});
//
//
//@to search words
//
//
function remove_accents(str){
  var conversions = new Object();
  conversions['a'] = 'à|Â|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
  conversions['u'] = 'û';
  conversions['i'] = 'î';
  // conversions[''] = ',|;|-|!|:|”|“|\'';
  

  for(var i in conversions){
      var re = new RegExp(conversions[i],"g");
      str = str.replace(re,i);
  }
  return str;
}

router.post("/searchAllWords", (req, res) => {
  var input = req.body.input;
  var queryString = '\"' + input.split(' ').join('\" \"') + '\"';
  Section.find({ $text: { $search:queryString } })
  .populate("book")
  .then(section => {
    section.map(sec=>{
        var inp=req.body.input.split(' ')[0];
        var indx= sec.content.indexOf(inp);
        var edittedContent=sec.content.slice((indx<50 ?0 :indx-50), indx+120);
        sec.content= indx<50 ? edittedContent+"..." : "..."+edittedContent+"...";
      })
      res.json(section);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

//
//
//@to take one section
//
//
router.get('/section/:id',(req,res)=>{
  var id = req.params.id;
  Section.findById(id)
  .populate('book')
  .then(section=>{
    res.json(section);
  }).catch(err=>{ 
    res.status(404).send(err);
  })
})


//
//
//@get all books 
//
//
router.get('/allbooks',(req,res)=>{
  Book.find()
  .then(books=>{
    res.json(books)
  })
  .catch(err=>{res.status(404).json(err)})
})

//
//
//@search for book
//
//
router.post('/searchbook',(req,res)=>{
  Book.find({ name: { $regex: req.body.input ,$options:'i' }})
  .then(books=>{res.json(books)})
  .catch(err=>res.status(404).json(err));
})

//
//
//@everything about one book
router.get('/book/:id',(req,res)=>{
  Book.findById(req.params.id)
  .then(book=>{
    Section.find({book:req.params.id})
    .then(sections=>{
      res.json({book:book, sections:sections})
    }).catch(err=>res.status(404).json(err))
  }).catch(err=>res.status(404).json(err))
})

//
//
//
router.get('/view', (req,res)=>{
  Traffic
  .findOne()
  .then(resp=>{
    resp.clicked++;
    resp.save()
    res.send('Auth');
  }).catch(err=>res.send(err));
})
router.get('/getview', (req,res)=>{
  Traffic
  .findOne()
  .then(resp=>{
    res.json(resp);
  }).catch(err=>res.send(err));
})

router.post('/adminlogin', (req,res)=>{
  Admin.findOne({
    email: req.body.email,
    password: req.body.password
  })
    .then(function (admin) {
      if (!admin) {
        return res.status(401).send({ errors: 'Wrong email or password!' })
      } else {
        req.session.admin = admin;
        return res.send({ message: 'You are signed in' });
      }

      res.send(admin);
    })
    .catch(function (error) {
      console.log(error);

    })
})
router.post('/isloggedin', (req,res)=>{
  if (req.session.admin) {
    Admin.findOne({
      email: req.session.admin.email,
      password: req.session.admin.password
    })
      .then(function (admin) {
        if (!admin) {
          return res.status(401).send({ errors: 'Not authorized!' })
        } else {
          req.session.admin = admin;
          return res.send({ message: true });
        }
      })
      .catch(function (error) {
        console.log(error);
  
      })
  }else{
    return res.status(401).send({ errors: 'Not authorized!' })
  }
 
})




module.exports = router;
