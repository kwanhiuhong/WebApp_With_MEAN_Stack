var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET home page. */
//router.get('/loadpage[(?)]category=:category&page=:page', function(req, res, next) {
router.get('/loadpage', function(req, res, next) {
  var db = req.db;
  var list_bookCollection = db.get("bookCollection");
  //var list_bookCollection2 = list_bookCollection.sort({title:1});

  var list_userCollection = db.get("userCollection");

  var id_list = [];
  var title_list = [];
  var authorList_list = [];
  var price_list = [];
  var coverImage_list = [];
  var total_number_of_book_pages = 0;
  var count = 0;
  

  if (req.query.category == "loadcategory"){
    list_bookCollection.distinct("category", function(er, category){
      if(er == null){
        var categoryList = [];
        console.log("x:"+category);
        categoryList = category;
        categoryList = categoryList.sort();
        console.log("--xxx:"+categoryList);
        res.json({"categoryList": categoryList});  
      }
    }); 
  }

  if (req.query.category != "nil" && req.query.category != "loadcategory"){
    list_bookCollection.find({'category':req.query.category},{"sort":"title"},function(error1, books){
      //books.sort({title:1});
      console.log("here is the category"+req.query.category);
      console.log("the problem exists at books.sort()");
      
      if(error1 === null){
        //count how many pages are needed for one category if each page only displays two books
        for(count = 0; count < books.length; count++){
        };
        //console.log("here is the books found:"+books[0].title);
        //console.log("here I show the count == books.length :"+count);
        total_number_of_book_pages = count/2;
        //get all the book records and pack them into an array
        if(total_number_of_book_pages%2 != 0){
          total_number_of_book_pages += 0.5;
        }
       // console.log("222");
        for(var cnt = 1, cnt2=-1; cnt <= total_number_of_book_pages; cnt++, cnt2++){
         // console.log("3333");

          if(parseInt(req.query.page)===cnt){
            //console.log("444");

            var cnt3 = cnt+cnt2;
            var everytime_show_two_books_in_a_page = cnt3+2;
       
            //if it's the lage page that is requested and the total books are an odd number;
            if((total_number_of_book_pages == parseInt(req.query.page))&& (count%2 != 0)){
              everytime_show_two_books_in_a_page -= 1;
              //console.log("here show the ssssssss:"+everytime_show_two_books_in_a_page);
            }

            for(; cnt3 < everytime_show_two_books_in_a_page; cnt3++){
              //console.log("6666:"+(cnt3+2));
              id_list.push({'_id':books[cnt3]._id});
              title_list.push({'title':books[cnt3].title, '_id':books[cnt3]._id});
              authorList_list.push({'authorList':books[cnt3].authorList, '_id':books[cnt3]._id});
              price_list.push({'price':books[cnt3].price, '_id':books[cnt3]._id});
              coverImage_list.push({'coverImage':books[cnt3].coverImage, '_id':books[cnt3]._id});
            }
          }
        }

      //Check if session variable has been created.
        if(req.session.userID){
          list_userCollection.find({'_id':req.session.userID}, {}, function(error2, a_user){
            if(error2 === null){
              res.json({'user_name':a_user[0].name,'totalnum':a_user[0].totalnum,'_id':id_list,'title':title_list,'authorList':authorList_list,'price':price_list,'coverImage':coverImage_list, 'total_number_of_book_pages':total_number_of_book_pages});
            } else{
              res.send(error2+"here is the result2");
            }
          });
        }else{
          res.json({'_id':id_list,'title':title_list,'authorList':authorList_list,'price':price_list,'coverImage':coverImage_list, 'total_number_of_book_pages':total_number_of_book_pages});
        }; 
      } else {
        res.send(error1+"here is the result1");
      }
    });  
  }else if(req.query.category != "loadcategory"){
    console.log("fifth");
    list_bookCollection.distinct("category", function(er, category){
      if(er == null){
        var categoryList = [];
        console.log("x in else:"+category);
        categoryList = category;
        categoryList = categoryList.sort();
        console.log("first book in initial loadpage:"+categoryList[0]);
        list_bookCollection.find({'category':categoryList[0]},{"sort":"title"},function(error1, books){
          //books.sort({title:1});     
          console.log("sixth :"+books[0].title);
          // books = books.sort();
          // console.log("999999"+books.sort());
          if(error1 === null){
            //count how many pages are needed for one category if each page only displays two books
            for(count = 0; count < books.length; count++){
            };

            total_number_of_book_pages = count/2;

            if(total_number_of_book_pages%2 != 0){
              total_number_of_book_pages += 0.5;
            }

            console.log("eight--"+total_number_of_book_pages);

            for(var cnt = 1, cnt2=-1; cnt <= total_number_of_book_pages; cnt++, cnt2++){
              if(parseInt(req.query.page)===cnt){
                var cnt3 = cnt+cnt2;
                var everytime_show_two_books_in_a_page = cnt3+2;

                //if it's the lage page that is requested and the total books are an odd number;
                if((total_number_of_book_pages == parseInt(req.query.page))&& (count%2 != 0)){
                  everytime_show_two_books_in_a_page -= 1;
                  console.log("here show the ssssssss:"+everytime_show_two_books_in_a_page);
                }

                //console.log("5555:"+cnt3);
                for(; cnt3 < everytime_show_two_books_in_a_page; cnt3++){
                  console.log("6666:"+(cnt3+2));
                  id_list.push({'_id':books[cnt3]._id});
                  title_list.push({'title':books[cnt3].title, '_id':books[cnt3]._id});
                  authorList_list.push({'authorList':books[cnt3].authorList, '_id':books[cnt3]._id});
                  price_list.push({'price':books[cnt3].price, '_id':books[cnt3]._id});
                  coverImage_list.push({'coverImage':books[cnt3].coverImage, '_id':books[cnt3]._id});
                }
              }
            }

            //Check if session variable has been created.
            if(req.session.userID){
              console.log("before end 3 == length:"+authorList_list.length);

              list_userCollection.find({'_id':req.session.userID}, {}, function(error2, a_user){
                if(error2 === null){
                  res.json({'user_name':a_user[0].name,'totalnum':a_user[0].totalnum,'_id':id_list,'title':title_list,'authorList':authorList_list,'price':price_list,'coverImage':coverImage_list, 'total_number_of_book_pages':total_number_of_book_pages});
                } else{
                  res.send(error2+"this is error22");
                }
              });
            } else{
              res.json({'_id':id_list,'title':title_list,'authorList':authorList_list,'price':price_list,'coverImage':coverImage_list, 'total_number_of_book_pages':total_number_of_book_pages});
            }; 
          } else {
            res.send(error1+"this is error11");
          }
        });  
      }
    }); 
  }
  console.log("END!!!!");
});

router.get('/loadbook/:bookid', function(req, res, next) {
  var db = req.db;
  var list_bookCollection = db.get("bookCollection");
  list_bookCollection.find({'_id':req.params.bookid},{"sort":"title"},function(error, books){
    if(error === null){
      res.json({'coverImage':books[0].coverImage,'title':books[0].title,'author':books[0].authorList,'price':books[0].price,'publisher':books[0].publisher,'date':books[0].date,'description':books[0].description});
    } else{
      res.send(error+"this is error in loadbook");
    }
  });
});

  router.post('/signin', bodyParser.json(), function(req, res, next){
    var db = req.db;
    var list_userCollection = db.get("userCollection");
    console.log("sign in 1");

    list_userCollection.find({'name':req.body.name},{}, function(error, user){
      
      if(error === null){
        console.log("sign in 1.5");
        if((user.length > 0) && (user[0].name == req.body.name) && (user[0].password == req.body.password)){
          
          req.session.userID = user[0]._id;
          //user[0].status = "online";
          console.log("sign in 2");

          list_userCollection.update({'_id':user[0]._id}, {$set: {"status": "online"}}, function(error2, result){
            if(error2 != null)
              res.send(error2);
          });

          res.send({'username':req.body.name, 'userid':user[0]._id,'totalnum':user[0].totalnum});
        }else{
          res.send("Login failure");
        }
      }else{
        res.send(error);
      }

    });

  });

router.get('/signout', function(req, res, next){
  var db = req.db;
  var list_userCollection = db.get("userCollection");
  list_userCollection.update({'_id':req.session.userID}, {$set:{"status":"offline"}}, function(error, result){
    console.log("Here show the req.session.userID:"+req.session.userID);
    if(error == null){
      req.session.userID = null;
      res.send("");
    }else{
      res.send(error);
    }
  });
});

router.put('/addtocart',bodyParser.json(), function(req, res, next){
  console.log("0");

  var db = req.db;
  var list_userCollection = db.get("userCollection");
  var list_bookCollection = db.get("bookCollection");
  var book_id_to_insert = req.body.bookid;
  var quantity_to_add_to_cart = parseInt(req.body.quantity);
  var totalprice = 0;
  console.log("00");

  list_userCollection.find({'_id':req.session.userID},{},function(error, user){
    console.log("000");

    if(error == null){
      console.log("0000");

      var quantity_of_existing_book_in_database = parseInt(user[0].totalnum);
      var new_quantity_of_totalnum_in_cart = quantity_to_add_to_cart+quantity_of_existing_book_in_database;
      var test_if_books_in_the_database = false;
      var new_book_list_for_that_user = [];

      console.log("00000");

      list_bookCollection.find({},{"sort":"title"}, function(error, book){
        console.log("000001:"+user[0].cart.length);

        if(error==null){
          console.log("000002");
          //handle special case when the cart of the user is actually empty
          if(user[0].cart.length == 0){
            var price_of_that_book = 0;
            for(var count2 = 0; count2 < book.length; count2++){
              if(book[count2]._id == book_id_to_insert){
                for(var count3 = 1, digits_of_price = (book[count2].price.length - 2); count3 < book[count2].price.length; count3++, digits_of_price--){
                  if(book[count2].price.length > 2){                    
                    price_of_that_book = price_of_that_book + (Math.pow(10, digits_of_price) * (parseInt(book[count2].price[count3])));
                  }else if(book[count2].price.length == 2){
                    price_of_that_book = parseInt(book[count2].price[1]);
                  }
                }
              }
            }
            totalprice = totalprice + quantity_to_add_to_cart * price_of_that_book;
            new_book_list_for_that_user.push({'bookId':book_id_to_insert, 'quantity':quantity_to_add_to_cart});
            console.log("the totalprice:"+totalprice);

            list_userCollection.update({'_id':req.session.userID}, {$set:{"cart":new_book_list_for_that_user, "totalnum":quantity_to_add_to_cart}}, function(error, result){
              console.log("inside response function.");
              if(error == null){
                res.send({'totalnum':quantity_to_add_to_cart, 'totalprice':totalprice});
                //console.log('total price4:'+totalprice);
              }else{
                res.send(error);
              }
            });

          }
          //console.log("here is the booklist length: "+book.length);
          for(var count = 0; count < user[0].cart.length; count++){
            console.log("111");
            if(user[0].cart[count].bookId == book_id_to_insert){
              console.log("222");

              test_if_books_in_the_database = true;
              new_book_list_for_that_user.push({'bookId':book_id_to_insert, 'quantity':(quantity_to_add_to_cart+parseInt(user[0].cart[count].quantity))});
              //console.log("Here is the quantity: "+(quantity_to_add_to_cart+parseInt(user[0].cart[count].quantity)));
              var price_of_that_book = 0;
              var quantity_of_the_book = (quantity_to_add_to_cart + parseInt(user[0].cart[count].quantity));
              
              for(var count2 = 0; count2 < book.length; count2++){
                if(book[count2]._id == book_id_to_insert){
                  for(var count3 = 1, digits_of_price = (book[count2].price.length - 2); count3 < book[count2].price.length; count3++, digits_of_price--){
                    if(book[count2].price.length > 2){                    
                      price_of_that_book = price_of_that_book + (Math.pow(10, digits_of_price) * (parseInt(book[count2].price[count3])));
                    }else if(book[count2].price.length == 2){
                      price_of_that_book = parseInt(book[count2].price[1]);
                    }
                  }
                }
              }
              totalprice = totalprice + quantity_of_the_book * price_of_that_book;
             //console.log("here is the totalprice: "+totalprice);
            }else if(user[0].cart[count].bookId){
              console.log("333");

              var price_of_that_book = 0;
              new_book_list_for_that_user.push({'bookId':user[0].cart[count].bookId, 'quantity':parseInt(user[0].cart[count].quantity)});
  
              for(var count2 = 0; count2 < book.length; count2++){
                if(book[count2]._id == user[0].cart[count].bookId){
                  for(var count3 = 1, digits_of_price = (book[count2].price.length - 2); count3 < book[count2].price.length; count3++, digits_of_price--){
                    if(book[count2].price.length > 2){                    
                      price_of_that_book = price_of_that_book + (Math.pow(10, digits_of_price) * (parseInt(book[count2].price[count3])));
                    }else if(book[count2].price.length == 2){
                      price_of_that_book = parseInt(book[count2].price[1]);
                    }
                  }
                }
              }

              totalprice = totalprice + (parseInt(user[0].cart[count].quantity) * price_of_that_book);
              //console.log("previous totalprice:"+totalprice);
            }
            
            if(count == user[0].cart.length-1){
              console.log("444");

              if(test_if_books_in_the_database == false){
                var price_of_that_book = 0;
                new_book_list_for_that_user.push({'bookId':book_id_to_insert, 'quantity':quantity_to_add_to_cart});
                //console.log("If not in db, the id:"+book_id_to_insert);
                
                for(var count2 = 0; count2 < book.length; count2++){
                  if(book[count2]._id == book_id_to_insert){
                    for(var count3 = 1, digits_of_price = (book[count2].price.length - 2); count3 < book[count2].price.length; count3++, digits_of_price--){
                      if(book[count2].price.length > 2){                    
                        price_of_that_book = price_of_that_book + (Math.pow(10, digits_of_price) * (parseInt(book[count2].price[count3])));
                        //console.log("parse:"+parseInt(book[count2].price[count3]));
                      }else if(book[count2].price.length == 2){
                        price_of_that_book = parseInt(book[count2].price[1]);
                      }
                    }
                  }
                }
                //console.log("price of that book in the last two function:"+price_of_that_book);
                totalprice = totalprice + (quantity_to_add_to_cart * price_of_that_book);
              }
              //insert new one; last function
              list_userCollection.update({'_id':req.session.userID}, {$set:{"cart":new_book_list_for_that_user, "totalnum":new_quantity_of_totalnum_in_cart}}, function(error, result){
                console.log("inside response function.");
                if(error == null){
                  res.send({'totalnum':new_quantity_of_totalnum_in_cart, 'totalprice':totalprice});
                  //console.log('total price4:'+totalprice);
                }else{
                  res.send(error);
                }
              });
            }
          }
        }
      });
      
    }   
  });
    
});

router.get('/loadcart', function(req, res, next){
  var db = req.db;
  var list_bookCollection = db.get("bookCollection");
  var list_userCollection = db.get("userCollection");
  var bookid_list = [];
  var quantity_list = [];
  var title_list = [];
  var authorList_list = [];
  var price_list = [];
  var coverImage_list = [];

  list_bookCollection.find({},{},function(error, books){
    list_userCollection.find({'_id':req.session.userID}, {}, function(error, user){
      if(error == null){
        console.log("here shows the loadcard cart length: "+user[0].cart.length);
        for(var count = 0; count < user[0].cart.length; count++){
          bookid_list.push({'bookId':user[0].cart[count].bookId});
          quantity_list.push({'quantity':user[0].cart[count].quantity});
        }

        for(var count2 = 0; count2 < books.length ; count2++){
          for(var count3 = 0; count3 < user[0].cart.length; count3++){
            if(books[count2]._id == user[0].cart[count3].bookId){
              title_list.push({'title':books[count2].title, '_id':books[count2]._id});
              authorList_list.push({'authorList':books[count2].authorList, '_id':books[count2]._id});
              price_list.push({'price':books[count2].price, '_id':books[count2]._id});
              coverImage_list.push({'coverImage':books[count2].coverImage, '_id':books[count2]._id});
            }
          }  
        }
        
        var totalprice = 0;
        for(var count5 = 0; count5 < user[0].cart.length; count5++){
          var price_of_that_book = 0;
          for(var count2 = 0; count2 < books.length; count2++){
            if(books[count2]._id == user[0].cart[count5].bookId){
              for(var count3 = 1, digits_of_price = (books[count2].price.length - 2); count3 < books[count2].price.length; count3++, digits_of_price--){
                if(books[count2].price.length > 2){
                  price_of_that_book = price_of_that_book + (Math.pow(10, digits_of_price) * (parseInt(books[count2].price[count3])));
                }else if(books[count2].price.length == 2){
                  price_of_that_book = parseInt(books[count2].price[1]);
                }
              }
            }
          }
          totalprice = totalprice + (parseInt(user[0].cart[count5].quantity) * price_of_that_book);
        }
        
        res.send({'bookid_list':bookid_list,'quantity_list':quantity_list, 'totalnum':user[0].totalnum, 'title':title_list,'authorList':authorList_list,'price':price_list,'coverImage':coverImage_list, 'totalprice':totalprice});
      }else{
        res.send("");
      }
    });
  });
});

//basically for this updatecart, I use the same algorithm/code as the one in "/addtocart"
router.put('/updatecart', bodyParser.json(), function(req, res, next){
  console.log("111:");
  var db = req.db;
  var list_bookCollection = db.get("bookCollection");
  var list_userCollection = db.get("userCollection");
  var new_quantity = parseInt(req.body.quantity);
  var Book_id = req.body.book_id;
  var totalprice = 0;

  console.log("222:");
  list_userCollection.find({'_id':req.session.userID},{},function(error, user){
    if(error == null){
      var quantity_of_existing_book_in_database = parseInt(user[0].totalnum);
      var new_quantity_of_totalnum_in_cart = 0;
      var new_book_list_for_that_user = [];
      list_bookCollection.find({},{"sort":"title"}, function(error, book){
        console.log("333:");
        if(error==null){
          
          for(var count = 0; count < user[0].cart.length; count++){
            if(user[0].cart[count].bookId == Book_id){
              console.log("here is bookid:"+Book_id);
              new_quantity_of_totalnum_in_cart = quantity_of_existing_book_in_database - parseInt(user[0].cart[count].quantity) + new_quantity;

              new_book_list_for_that_user.push({'bookId':Book_id, 'quantity':new_quantity});
              var price_of_that_book = 0;
              var quantity_of_the_book = new_quantity;
              
              for(var count2 = 0; count2 < book.length; count2++){
                if(book[count2]._id == Book_id){
                  for(var count3 = 1, digits_of_price = (book[count2].price.length - 2); count3 < book[count2].price.length; count3++, digits_of_price--){
                    if(book[count2].price.length > 2){                    
                      price_of_that_book = price_of_that_book + (Math.pow(10, digits_of_price) * (parseInt(book[count2].price[count3])));
                      console.log("price of that book:"+(Math.pow(10, digits_of_price) * (parseInt(book[count2].price[count3]))));
                    }else if(book[count2].price.length == 2){
                      price_of_that_book = parseInt(book[count2].price[1]);
                    }
                  }
                }
              }
              totalprice = totalprice + quantity_of_the_book * price_of_that_book;
            }else{
              var price_of_that_book = 0;
              new_book_list_for_that_user.push({'bookId':user[0].cart[count].bookId, 'quantity':parseInt(user[0].cart[count].quantity)});
  
              for(var count2 = 0; count2 < book.length; count2++){
                if(book[count2]._id == user[0].cart[count].bookId){
                  for(var count3 = 1, digits_of_price = (book[count2].price.length - 2); count3 < book[count2].price.length; count3++, digits_of_price--){
                    if(book[count2].price.length > 2){                    
                      price_of_that_book = price_of_that_book + (Math.pow(10, digits_of_price) * (parseInt(book[count2].price[count3])));
                    }else if(book[count2].price.length == 2){
                      price_of_that_book = parseInt(book[count2].price[1]);
                    }
                  }
                }
              }
              totalprice = totalprice + (parseInt(user[0].cart[count].quantity) * price_of_that_book);
            }
            if(count == user[0].cart.length - 1){
              list_userCollection.update({'_id':req.session.userID}, {$set:{"cart":new_book_list_for_that_user, "totalnum":new_quantity_of_totalnum_in_cart}}, function(error, result){
                console.log("inside response function.");
                if(error == null){
                  res.send({'totalnum':new_quantity_of_totalnum_in_cart, 'totalprice':totalprice});
                }else{
                  res.send(error);
                }
              });
            }
          }
        }
      });
    }
  });
});

router.delete('/deletefromcart/:class_of_this', function(req, res, next){
  var db = req.db;
  var list_bookCollection = db.get("bookCollection");
  var list_userCollection = db.get("userCollection");
  var id_to_be_deleted = req.params.class_of_this;
  console.log("1111");

  list_userCollection.find({'_id':req.session.userID},{},function(error, user){
    if(error == null){
      console.log("2222:"+parseInt(user[0].totalnum));
      var quantity_of_existing_book_in_database = parseInt(user[0].totalnum);
      var new_quantity_of_totalnum_in_cart = 0;
      var new_book_list_for_that_user = [];
      var totalprice = 0;
      console.log("3333");

      list_bookCollection.find({},{"sort":"title"}, function(error, book){
        console.log("4444:");
        if(error==null){
          for(var count = 0; count < user[0].cart.length; count++){
            if(user[0].cart[count].bookId == id_to_be_deleted){
              new_quantity_of_totalnum_in_cart = quantity_of_existing_book_in_database - parseInt(user[0].cart[count].quantity);
              //actually just do nothing because I don't want the book which is about to be deleted to be pushed into the newlist.
            }else{
              var price_of_that_book = 0;
              new_book_list_for_that_user.push({'bookId':user[0].cart[count].bookId, 'quantity':parseInt(user[0].cart[count].quantity)});

              for(var count2 = 0; count2 < book.length; count2++){
                if(book[count2]._id == user[0].cart[count].bookId){
                  for(var count3 = 1, digits_of_price = (book[count2].price.length - 2); count3 < book[count2].price.length; count3++, digits_of_price--){
                    if(book[count2].price.length > 2){                    
                      price_of_that_book = price_of_that_book + (Math.pow(10, digits_of_price) * (parseInt(book[count2].price[count3])));
                    }else if(book[count2].price.length == 2){
                      price_of_that_book = parseInt(book[count2].price[1]);
                    }
                  }
                }
              }
              totalprice = totalprice + (parseInt(user[0].cart[count].quantity) * price_of_that_book);
            }
            if(count == user[0].cart.length - 1){
              list_userCollection.update({'_id':req.session.userID}, {$set:{"cart":new_book_list_for_that_user, "totalnum":new_quantity_of_totalnum_in_cart}}, function(error, result){
                console.log("inside response function.");
                if(error == null){
                  res.send({'totalnum':new_quantity_of_totalnum_in_cart, 'totalprice':totalprice});
                }else{
                  res.send(error);
                }
              });
            }
          }
        }
      });
    }
  });
});
router.get('/checkout', function(req, res) {
  var db = req.db;
  var list_userCollection = db.get("userCollection");
  list_userCollection.update({'_id':req.session.userID}, {$set:{"cart":[], "totalnum":0}}, function(error){
    if(error){
      res.send(error);
    }
  });
});
module.exports = router;