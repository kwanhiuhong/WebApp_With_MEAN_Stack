for(var count = 0; count < user[0].cart.length; count++){
    if(user[0].cart[count].bookId == book_id_to_insert){
      new_book_list_for_that_user.push({'bookId':book_id_to_insert, 'quantity':(quantity_to_add_to_cart+parseInt(user[0].cart[count].quantity))});
      console.log("Here is the quantity: "+(quantity_to_add_to_cart+parseInt(user[0].cart[count].quantity)));
      var quantity_of_the_book = (quantity_to_add_to_cart+parseInt(user[0].cart[count].quantity));
      console.log("quantity_of_the_book :"+quantity_of_the_book);
      test_if_books_in_the_database = true;
      
      list_bookCollection.find({'_id':book_id_to_insert},{"sort":"title"}, function(error, book){
        if(error==null){
          // console.log("book price:"+book[0].price);
          // console.log("testing:"+book[0].price[1]);
          // console.log("testing2: "+book[0].price.length);
          // console.log("book.price: "+parseInt(book[0].price));
          var price_of_that_book = 0;

          for(var count2 = 1, digits_of_price = (book[0].price.length - 2); count2 < book[0].price.length; count2++, digits_of_price--){
            if(book[0].price.length > 2){                    
              price_of_that_book = price_of_that_book + (Math.pow(10, digits_of_price) * (parseInt(book[0].price[count2])));
            }else if(book[0].price.length == 2){
              price_of_that_book = parseInt(book[0].price[1]);
            }
          }
          // console.log("price of that book2:"+price_of_that_book);
          // console.log("quantity_of_the_book2222 :"+quantity_of_the_book);
          totalprice = quantity_of_the_book * price_of_that_book;
          
          console.log("here shows the final price:"+totalprice);
        }
      });
    }else{
      new_book_list_for_that_user.push({'bookId':user[0].cart[count].bookId, 'quantity':parseInt(user[0].cart[count].quantity)});
      
      console.log("show the book_id:"+(user[0].cart[count].bookId));

      list_bookCollection.find({'_id':user[0].cart[count].bookId},{"sort":"title"}, function(error, book){
        console.log("yyyy");
        if(error==null){
          console.log("xxxxxx:"+parseInt(book[0].price));
          totalprice = totalprice + (parseInt(user[0].cart[count].quantity)) * parseInt(book[0].price);
          console.log("here is the price of ook:"+parseInt(book[0].price));
        }
      });

    }
  }
  console.log('total price2:'+totalprice);

  if(test_if_books_in_the_database == false){
    new_book_list_for_that_user.push({'bookId':book_id_to_insert, 'quantity':quantity_to_add_to_cart});
    console.log("If not in db, the id:"+book_id_to_insert+" and the price: "+parseInt(book[0].price));
    console.log("the second book:"+new_book_list_for_that_user[1].bookId);
    list_bookCollection.find({'_id':book_id_to_insert},{"sort":"title"}, function(error, book){
      if(error==null){
        totalprice = totalprice + (quantity_to_add_to_cart) * parseInt(book[0].price);
        console.log("here is the price of that book:"+parseInt(book[0].price));
      }
    });
  }
  // console.log("quantity:"+new_book_list_for_that_user[0].quantity+"  quantity2:"+new_book_list_for_that_user[1].quantity+" quantity3:"+quantity_to_add_to_cart);
  // console.log("Here is the final result of the new book list: "+new_book_list_for_that_user)
  console.log('total price3:'+totalprice);

  list_userCollection.update({'_id':req.session.userID}, {$set:{"cart":new_book_list_for_that_user, "totalnum":new_quantity_of_totalnum_in_cart}}, function(error, result){
    console.log("inside response function.");
    if(error == null){
      res.send({'totalnum':new_quantity_of_totalnum_in_cart, 'totalprice':totalprice});
      console.log('total price4:'+totalprice);
      // console.log("final final price:"+finalprice[0]);
    }else{
      res.send(error);
    }
  });
}