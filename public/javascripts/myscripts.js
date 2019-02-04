var FunBooks_app = angular.module("FunBooks",[]);
FunBooks_app.controller('FunbooksController', function($scope, $http, $interval){
    
    $scope.show_booksInitial = true;
    $scope.showBookDetails = false; 
    $scope.showCategory = true;
    $scope.show_signin = true;
    $scope.show_books = true;
    $scope.show_loginpage = false;
    $scope.show_user_if_login = false;
    $scope.show_cart = false;
    $scope.show_big_title = true;
    $scope.show_page_select = true;
    // $scope.xComputer = "Computer";
    // $scope.xHistory = "History";
    // $scope.xLiterature = "Literature";
    $scope.xPrevious = "Previous";
    $scope.xNext = "Next";
    $scope.show_logoutpage = false;
    $scope.xCancel = "Cancel";
    $scope.xConfirm = "Confirm";
    $scope.show_login_failure = false;

    $scope.showBookdetail2_bookdetails = true;
    $scope.showBookdetail3_selectList = true;
    $scope.showBookdetail4_Goback = true;
    $scope.show_added_to_cart = false;
    $scope.show_continue_browsing = false;

    $scope.show_loaded_cart = false;
    $scope.show_proceed_to_check_out = false;

    $scope.xContinue_browse = "Continue_browse";


    $scope.loadpage = function(categories){
        var category_list = [];
        var category_name = categories;
        $http.get("/loadpage?category=loadcategory&page=0").then(function(rsp){
            $scope.categoryList = rsp.data.categoryList;
            category_list = rsp.data.categoryList;
            // for(var cnt = 0; cnt < rsp.data.categoryList.length; cnt++){
            //     category_list.push(rsp.data.categoryList[cnt]);
            // }
            //var category_name = categories;
            if(category_name == "" || category_name == null){
                $scope.categories_at_bar = category_list[0];
                $scope.select_value = "1";
                $http.get("/loadpage?category=nil&page=1").then(function(response){
                    if(response.data === ""){
                        alert("Error for getting books.");
                    }else{
                        $scope.pageNumber = [];
                        for(var count = 1; count <= response.data.total_number_of_book_pages; count++){
                            $scope.pageNumber.push({'page':count});
                        }

                        $scope.BookCollections = [];
                        for(var count = 0; count < response.data._id.length;count++){
                            if($scope.BookCollections.length == 0){
                                //var happy = 0;
                                $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                            }
                            else{
                                $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                            }
                        }
                    }
                });
            }else{
                // if(category_name === "Computer"){
                //     $scope.categories_at_bar = "Computer";
                // }else if(category_name == "History"){
                //     $scope.categories_at_bar = "History";
                // }else if(category_name == "Literature"){
                //     $scope.categories_at_bar = "Literature";
                // };
                for(var cnt2 = 0; cnt2 < category_list.length; cnt2++){
                    if(category_name == category_list[cnt2]){
                        $scope.categories_at_bar = category_name;
                    }
                }
                
                if(($scope.select_value == null || $scope.select_value == "1" || $scope.select_value == "0") && (category_name != "Previous" && category_name!="Next")){
                    $http.get("/loadpage?category="+category_name+"&page=1").then(function(response){
                        if(response.data === ""){
                            alert("Error for getting books.");
                        }else{
                            $scope.pageNumber = [];
                            for(var count = 1; count <= response.data.total_number_of_book_pages; count++){
                                $scope.pageNumber.push({'page':count});
                            }

                            $scope.BookCollections = [];
                            for(var count = 0; count < response.data._id.length;count++){
                                if($scope.BookCollections.length == 0){
                                    //var happy = 0;
                                    $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                }
                                else{
                                    $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                }
                            }
                        }
                    });
                }else if((category_name != "Previous" && category_name!="Next")){

                    $http.get("/loadpage?category="+category_name+"&page="+$scope.select_value).then(function(response){
                        if(response.data === ""){
                            alert("Error for getting books.");
                        }else{
                            $scope.pageNumber = [];
                            for(var count = 1; count <= response.data.total_number_of_book_pages; count++){
                                $scope.pageNumber.push({'page':count});
                            }
                            $scope.BookCollections = [];
                            for(var count = 0; count < response.data._id.length;count++){
                                if($scope.BookCollections.length == 0){
                                    //var happy = 0;
                                    $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                }
                                else{
                                    $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                }
                            }
                        }
                    });
                }
                if(category_name == "Previous"){
                    if($scope.select_value != "1" && $scope.select_value != null){
                        $scope.select_value = (parseInt($scope.select_value) - 1) + "";
                        $http.get("/loadpage?category="+$scope.categories_at_bar+"&page="+$scope.select_value).then(function(response){
                            if(response.data === ""){
                                alert("Error for getting books.");
                            }else{
                                $scope.pageNumber = [];
                                for(var count = 1; count <= response.data.total_number_of_book_pages; count++){
                                    $scope.pageNumber.push({'page':count});
                                }

                                $scope.BookCollections = [];
                                for(var count = 0; count < response.data._id.length;count++){
                                    if($scope.BookCollections.length == 0){
                                        //var happy = 0;
                                        $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                    }
                                    else{
                                        $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                    }
                                }
                            }
                        });
                    }
                }else if(category_name == "Next"){
                    if((parseInt($scope.select_value) > 0 && parseInt($scope.select_value) < $scope.pageNumber.length) || $scope.select_value == null){
                        if($scope.select_value == null){
                            $scope.select_value = "2";
                        }else{
                            $scope.select_value = (parseInt($scope.select_value)+1) + "";
                        }
                    
                        $http.get("/loadpage?category="+$scope.categories_at_bar+"&page="+$scope.select_value).then(function(response){
                            if(response.data === ""){
                                alert("Error for getting books.");
                            }else{
                                $scope.pageNumber = [];
                                for(var count = 1; count <= response.data.total_number_of_book_pages; count++){
                                    $scope.pageNumber.push({'page':count});
                                }

                                $scope.BookCollections = [];
                                for(var count = 0; count < response.data._id.length;count++){
                                    if($scope.BookCollections.length == 0){
                                        //var happy = 0;
                                        $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                    }
                                    else{
                                        $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                    }
                                }
                            }
                        });
                    }
                }
                if(category_name == "Continue_browse"){
                    $scope.show_booksInitial = true;
                    $scope.showBookDetails = false; 
                    $scope.showCategory = true;
                    $scope.show_books = true;
                    $scope.show_big_title = true;
                    $scope.show_page_select = true;

                    $scope.showBookdetail2_bookdetails = true;
                    $scope.showBookdetail4_Goback = true;
                    $scope.show_added_to_cart = false;
                    $scope.show_continue_browsing = false;

                    $scope.show_loaded_cart = false;
                    $scope.show_proceed_to_check_out = false;
                    $scope.the_span_in_Classname_proceed_to_check_out = true;

                    $scope.categories_at_bar = category_list[0];
                    $scope.select_value = "1";
                    $http.get("/loadpage?category=nil&page=1").then(function(response){
                        if(response.data === ""){
                            alert("Error for getting books.");
                        }else{
                            $scope.pageNumber = [];
                            for(var count = 1; count <= response.data.total_number_of_book_pages; count++){
                                $scope.pageNumber.push({'page':count});
                            }
                            $scope.BookCollections = [];
                            for(var count = 0; count < response.data._id.length;count++){
                                if($scope.BookCollections.length == 0){
                                    $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                }
                                else{
                                    $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                }
                            }
                        }
                    });
                }
            }
    });
        //}).catch(angular.noop);
    }
    
    $scope.loadbook = function(bookid){
        $http.get("/loadbook/"+bookid).then(function(response){
            if(response.data === ""){
                alert("Error for getting books description.");
            }else{
                //$scope.DetailsOfBooks = [];
                $scope.show_booksInitial = false;
                $scope.showBookDetails = true;
                $scope.showCategory = false;
                $scope.showBookdetail2_bookdetails = true;
                $scope.booksInLoadedCard = false;
                $scope.the_span_in_Classname_proceed_to_check_out = false;
                $scope.showBookdetails_2 = true;
                $scope.showBookdetail3_selectList = true;

                $scope.specific_bookid = bookid;
                $scope.DetailsOfBooks_image = response.data.coverImage;
                $scope.DetailsOfBooks_title = response.data.title;
                $scope.DetailsOfBooks_author = response.data.author;
                $scope.DetailsOfBooks_price = response.data.price;
                $scope.DetailsOfBooks_publisher = response.data.publisher;
                $scope.DetailsOfBooks_date = response.data.date;
                $scope.DetailsOfBooks_description = response.data.description;


                $scope.show_page_select = false;
                //$scope.DetailsOfBooks.push({'image':response.data.coverImage,'title':response.data.title,'author':response.data.author,'price': response.data.price,'publisher':response.data.publisher,'date':response.data.date,'description':response.data.description});
            }
        });
    };

    $scope.signin = function(){
            
            $scope.showCategory = false;
            $scope.show_signin = false;
            $scope.show_books = false;
            $scope.show_loginpage = true; 
            
            $scope.show_page_select = false;
    };

    $scope.address_login = function(){
        if(($scope.user_name == "") || ($scope.user_password == "") || ($scope.user_name == null) || ($scope.user_password == null)){
            alert("You must enter username and password");
        }else{
            $http.post("/signin", {'name':$scope.user_name, 'password':$scope.user_password}).then(function(response){
                if(response.data === "Login failure"){
                    alert("Incorrect password or username!");
                    $scope.show_login_failure = true;
                }else{
                    if($scope.showBookDetails == false){
                        $scope.show_user_if_login = true;
                        $scope.show_loginpage = false;  
                        $scope.show_booksInitial = true;   
                        $scope.show_books = true;
                        $scope.showCategory = true;
                        $scope.show_signin = false;
                        $scope.show_cart = true;
                        $scope.show_big_title = true;

                        $scope.userid = response.data.userid;
                        $scope.username = response.data.username;
                        $scope.totalnum_in_cart = response.data.totalnum;

                        $scope.show_page_select = true;
                    }else{
                        $scope.show_user_if_login = true;
                        $scope.show_big_title = true;
                        $scope.show_cart = true;

                        $scope.show_loginpage = false; 
                        $scope.show_books = true;
                        $scope.show_booksInitial = false;
                        $scope.showBookDetails = true;
                        $scope.showCategory = false;

                        $scope.userid = response.data.userid;
                        $scope.username = response.data.username;
                        $scope.totalnum_in_cart = response.data.totalnum;

                        $scope.show_page_select = false;
                    }
                }
            });
        
        }

    };
    


    $scope.goBack = function(){
        if($scope.show_signin == false){
            $scope.show_user_if_login = true;
            $scope.show_big_title = true;
            $scope.show_cart = true;

            $scope.show_booksInitial = true;
            $scope.showBookDetails = false; 
            $scope.showCategory = true;
            $scope.show_books = true;
            $scope.show_loginpage = false;

            $scope.show_page_select = true;

        }else{
            $scope.show_booksInitial = true;
            $scope.showBookDetails = false; 
            $scope.showCategory = true;
            $scope.show_signin = true;
            $scope.show_books = true;
            $scope.show_loginpage = false;

            $scope.show_user_if_login = false;
            $scope.show_cart = false;
            $scope.show_big_title = true;

            $scope.show_page_select = true;
        }   
    }

    $scope.signout = function(command){
        if(command == null || command == ""){
            $scope.showCategory = false;
            $scope.show_signin = false;
            $scope.show_books = false;
            $scope.show_loginpage = false; 
            $scope.show_logoutpage = true;
    
            $scope.show_user_if_login = true;
            $scope.show_cart = true;
            $scope.show_big_title = true;

            $scope.show_loaded_cart = false;
            $scope.show_proceed_to_check_out = false;
        }
        if(command == "Cancel"){
            if($scope.show_booksInitial == true){
                $scope.show_books = true;
                $scope.showCategory = true;
                $scope.showBookDetails = false;
                $scope.show_page_select = true;

                $scope.show_signin = false;
                $scope.show_loginpage = false;

                $scope.show_user_if_login = true;
                $scope.show_cart = true;
                $scope.show_big_title = true;
                $scope.show_logoutpage = false;

                $scope.show_loaded_cart = false;
                $scope.show_proceed_to_check_out = false;
            }else if($scope.booksInLoadedCard == true){
                $scope.show_loaded_cart = true;
                $scope.show_logoutpage = false;

            }else if($scope.the_span_in_Classname_proceed_to_check_out == true){
                $scope.show_proceed_to_check_out = true;
                $scope.show_logoutpage = false;
            }else if($scope.showBookdetail2_bookdetails == true){
                $scope.show_books = true;
                $scope.showCategory = false;
                $scope.showBookDetails = true;
                $scope.show_page_select = false;

                $scope.show_signin = false;
                $scope.show_loginpage = false; 
        
                $scope.show_user_if_login = true;
                $scope.show_cart = true;
                $scope.show_big_title = true;
                $scope.show_logoutpage = false;

                $scope.show_loaded_cart = false;
                $scope.show_proceed_to_check_out = false;
            }
           
        }else if(command == "Confirm"){
            $http.get("/signout").then(function(response){
                if(response.data === ""){
                    if($scope.show_booksInitial == true){
                        $scope.show_books = true;
                        $scope.showCategory = true;
                        $scope.showBookDetails = false;
                        $scope.show_page_select = true;
        
                        $scope.show_signin = true;
                        $scope.show_loginpage = false;
        
                        $scope.show_user_if_login = false;
                        $scope.show_cart = false;
                        $scope.show_big_title = true;
                        $scope.show_logoutpage = false;
                        $scope.show_loaded_cart = false;
                        $scope.show_proceed_to_check_out = false;
                    }else if($scope.booksInLoadedCard == true || $scope.the_span_in_Classname_proceed_to_check_out == true){
                        $scope.show_books = true;
                        $scope.showCategory = true;
                        $scope.showBookDetails = false;
                        $scope.show_page_select = true;
        
                        $scope.show_signin = true;
                        $scope.show_loginpage = false;
        
                        $scope.show_user_if_login = false;
                        $scope.show_cart = false;
                        $scope.show_big_title = true;
                        $scope.show_logoutpage = false;

                        $scope.show_loaded_cart = false;
                        $scope.show_proceed_to_check_out = false;
                        $scope.show_booksInitial = true;

                        // $scope.showBookdetail2_bookdetails = true;
                        // $scope.showBookdetail4_Goback = true;
                        // $scope.show_added_to_cart = false;
                       // $scope.the_span_in_Classname_proceed_to_check_out = true;
                        $http.get("/loadpage?category=loadcategory&page=0").then(function(rsp){
                            $scope.categoryList = rsp.data.categoryList;
                            category_list = rsp.data.categoryList;
                            $scope.categories_at_bar = category_list[0];
                            $scope.select_value = "1";
                            $http.get("/loadpage?category=nil&page=1").then(function(response){
                                if(response.data === ""){
                                    alert("Error for getting books.");
                                }else{
                                    $scope.pageNumber = [];
                                    for(var count = 1; count <= response.data.total_number_of_book_pages; count++){
                                        $scope.pageNumber.push({'page':count});
                                    }
                                    $scope.BookCollections = [];
                                    for(var count = 0; count < response.data._id.length;count++){
                                        if($scope.BookCollections.length == 0){
                                            $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                        }
                                        else{
                                            $scope.BookCollections.push({'_id':response.data._id[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});
                                        }
                                    }
                                }
                            });
                        });
                        //xxxx
                    }else if($scope.showBookdetail2_bookdetails == true){
                        $scope.show_books = true;
                        $scope.showCategory = false;
                        $scope.showBookDetails = true;
                        $scope.show_page_select = false;
                        
                        $scope.show_added_to_cart = false;

                        $scope.show_signin = true;
                        $scope.show_loginpage = false; 
                
                        $scope.show_user_if_login = false;
                        $scope.show_cart = false;
                        $scope.show_big_title = true;
                        $scope.show_logoutpage = false;

                        $scope.show_loaded_cart = false;
                        $scope.show_proceed_to_check_out = false;
                    }
                }else{
                    alert("Logout unsucessfully for:"+response.data)
                }
            });
        }
    }

    $scope.handle_add_cart = function(){
            if($scope.show_signin == true){
                $scope.showCategory = false;
                $scope.show_signin = false;
                $scope.show_books = false;
                $scope.show_loginpage = true; 
                
                $scope.show_page_select = false;
            }else{
                
                if($scope.select_add_cart_value != null){
                    $http.put('/addtocart', {"bookid":$scope.specific_bookid, "quantity":$scope.select_add_cart_value}).then(function(response){
                        if(response.data){
                            $scope.showBookdetail2_bookdetails = true;
                            $scope.showBookdetails_2 = false;
                            $scope.showBookdetail4_Goback = false;
                            $scope.show_added_to_cart = true;
                            $scope.show_continue_browsing = true;
                            $scope.showBookdetail3_selectList = false;

                            $scope.totalnum_in_cart = response.data.totalnum;
                            $scope.total_money_in_cart = response.data.totalprice;
                        }else{
                            alert("Error in adding to cart:"+response.data)
                        }
                
                    });
                }
            }
    }

    $scope.loadcart = function(){
        if(parseInt($scope.totalnum_in_cart) > 0){
            $scope.showCategory = false;
            $scope.show_signin = false;
            $scope.show_books = false;
            $scope.show_loginpage = false; 
            $scope.show_page_select = false;
            $scope.show_booksInitial = false;
            $scope.show_loaded_cart = true;
            $scope.booksInLoadedCard = true;
            $scope.totalnum_in_cart_in_loadedcart = $scope.totalnum_in_cart;

            $http.get('/loadcart').then(function(response){
                if(response){
                    $scope.carts_details = [];
                    $scope.cart_quant = [];
                    for(var count2 = 0; count2 <= 20; count2++){
                        $scope.cart_quant.push({'quantity':count2});
                    }
                    for(var count = 0; count < response.data.bookid_list.length; count++){
                            $scope.carts_details.push({'_id':response.data.title[count]._id, 'image':response.data.coverImage[count].coverImage,'title':response.data.title[count].title,'author':response.data.authorList[count].authorList,'price': response.data.price[count].price});               
                    }
                    $scope.total_money_in_cart_in_loadedcart = response.data.totalprice;
                }else{
                    alert("Error in loading cart");
                }
            });
        }else{
            alert("You don't have anything in cart!");
        }
        

    }
    
    $scope.loadquantity = function(elem){
        $http.get('/loadcart').then(function(response){
            if(response){
                var class_of_this = elem.books_in_cart._id;

                //var class_of_this = elem.getAttribute("class");
                for(var count3 = 0; count3 < response.data.bookid_list.length; count3++){
                    if(class_of_this == response.data.bookid_list[count3].bookId){
                        var quantity = response.data.quantity_list[count3].quantity + "";
                        var class_name = document.getElementsByClassName(response.data.bookid_list[count3].bookId);
                        class_name[0].value = quantity;
                    }
                }
            }else{
                alert("Error in loading quantity");
            }
        });
    }

    $scope.Proceed_to_check_out = function(){
        if(parseInt($scope.total_money_in_cart_in_loadedcart) > 0){
            $scope.show_proceed_to_check_out = true;
            $scope.the_span_in_Classname_proceed_to_check_out = true;
            $scope.show_loaded_cart = false;
            $scope.show_booksInitial = false;
            $scope.booksInLoadedCard = false;
            $scope.totalnum_in_cart = "0";
            $http.get('/checkout', function(response){
                if(response){
                    alert("error in checking out: "+response+"!");
                }
            });
        }
    }

    $scope.UpdateCart = function(elem){
        var class_of_this = elem.books_in_cart._id;
        var new_quantity = document.getElementsByClassName(class_of_this)[0].value;
        if(new_quantity != "0"){
            $http.put('/updatecart',{"quantity":new_quantity, "book_id":class_of_this}).then(function(response){
            if(response){
                $scope.total_money_in_cart_in_loadedcart = response.data.totalprice+"";
                $scope.totalnum_in_cart_in_loadedcart = response.data.totalnum+"";
                $scope.totalnum_in_cart = response.data.totalnum+"";
            }else{
                alert("Fail to update cart!");
            }

            });
        }else{
            $http.delete('/deletefromcart/'+class_of_this).then(function(response){
                if(response){
                    $scope.total_money_in_cart_in_loadedcart = response.data.totalprice+"";
                    $scope.totalnum_in_cart_in_loadedcart = response.data.totalnum+"";
                    $scope.totalnum_in_cart = response.data.totalnum+"";
                    $scope.loadcart();
                }else{
                    alert("error in deleting");
                }
            });
        }
    }

});