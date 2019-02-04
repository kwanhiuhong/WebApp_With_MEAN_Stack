This program is a web application simulating an online bookstore, it contains functionalities like Login/Logout using sessions, Putting books into Cart, making payments and Books describing etc.




The whole program is too long to introduce, but there are some codes/algorithms that are the same for calculating the total price, as you may see in the myroute.js:
For example,
For line 298-308, 317-327, 341-352, 410-420, 461-472, 478-488, 535-545, they are all of the same algorithms and logic, which to parseInt and ignore the first sign in database, for example, in database, the price is something like “$80”. In the algorithm of calculating totalprice, i will ignore the first first so you can see I start from 1 for count3 in the price[count3]. Then just parseInt and if the price is 3-digits number, say $819, I will first parseInt “8”, and then multiply it by 10^2, and then add parseInt “1” which will be multiply by 10^1 and then add the previous one which gives you 810, for the final number “9”, I will simply multiply it by 10^0, and add 810, which equals to 819.