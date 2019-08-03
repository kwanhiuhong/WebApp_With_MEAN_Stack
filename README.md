# This web application simulates an online bookstore, which was written in MEAN (MongoDB,express.js, AugularJS, Node.js) stack.

### Here is the UI of this page:
<img src="https://github.com/kwanhiuhong/NodeJS_WebApp_Book_Store/blob/master/Book_Shop_UI.png"/>

### It supports the following functionalities:
<ul>
    <li><h4>Login/Logout, the login status will be stored using sessions</h4></li>
    <li><h4>Put books into your shopping cart</h4></li>
    <li><h4>Make payments</h4></li>
    <li><h4>Click the image of each book and you will see its description</h4></li>
</ul>

###### Some special notes:

1. A special "bookId" is used for everybook, instead of the automatically obtained _id. "bookId" is an integer starting from one. If a new book is to be inserted, make sure bookId doesn't contradict to any other books
2. For bookCollection, the "price" field is a string like "$xx" instead of an integer
3. There are two users in the system, "1" with password "1" and "Henry" with password "123456".
4. There are 4 categories of books, when the page is initially loaded, the default category to be displayed is "Assignment". Every page can display at most 2 books
5. The file called "assignment 2" stores the data of mongoDB.

The whole program is too long to introduce, but there are some codes/algorithms that are the same for calculating the total price, as you may see in the myroute.js:
For example,
For line 298-308, 317-327, 341-352, 410-420, 461-472, 478-488, 535-545, they are all of the same algorithms and logic, which to parseInt and ignore the first sign in database, for example, in database, the price is something like “$80”. In the algorithm of calculating totalprice, I will ignore the first letter so you can see I start from 1 for count3 in the price[count3]. Then just parseInt and if the price is 3-digits number, say $819, I will first parseInt “8”, and then multiply it by 10^2, and then add parseInt “1” which will be multiply by 10^1 and then add the previous one which gives you 810, for the final number “9”, I will simply multiply it by 10^0, and add 810, which equals to 819.

### To view the user names and passwords, you can:

1. Move to this directory and type in "npm start"
2. setup mongodb path to this directory
3. Run the mongo and then typed "use FunBooks"
4. type "show collections" you get what collections you have
5. type "db.userCollection.find()" show all details about the user collection.
