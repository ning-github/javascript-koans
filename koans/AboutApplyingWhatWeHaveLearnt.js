var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
     productsICanEat = products.filter(function(eachObj){
        return ((!eachObj.containsNuts) && _(eachObj.ingredients).all(function(eachIng){
          return eachIng !== "mushrooms";
        }));
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.chain(_.range(1000))
      .reduce(function(a,b){
        if(b%3==0 || b%5==0){
          return a+b;
        }
        return a;
      })
      .value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    var mushCount = _.chain(products)
      .map(function(eachProduct){
        return eachProduct.ingredients;
      })
      .flatten()
      .reduce(function(numOfMush, ingr){
        //to populate the ingredientCount object
        //  - this also could have been done in the map function
        if (ingr in ingredientCount){
          ingredientCount[ingr]++;
        }
        else{
          ingredientCount[ingr]=1;
        }
        //to obtain the single value for how many mushrooms are counted
        if (ingr=="mushrooms"){
          numOfMush++;
        }
        return numOfMush;
      },0)
      .value();

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(mushCount);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    //function that returns an array of all prime numbers lesser than the argument
    var primeCandidates = function(number){
      var primesUnderIt = [];
      var numsUnder = _.range(2,number);
      for (var i = 0; i < numsUnder.length; i++) {
        var primeCheck = true;
        for(var j=0; j< numsUnder.length;j++){
          if (numsUnder[i]%numsUnder[j]==0 && numsUnder[i]!==numsUnder[j]){
            primeCheck=false;
          }
        }
        if (primeCheck){
          primesUnderIt.push(numsUnder[i]);
        }
      };
      return primesUnderIt;
    }

    var composite=46; //arbitrary composite number

    var highestPrimeFactor = primeCandidates(composite).reduce(function(high, current){
      if (composite%current==0){
        high=current;
      }
      return high;
    }, 2);

    expect(highestPrimeFactor).toBe(23);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var threeDig = _.range(100,1000);
    //find all possible products
    var products=[];
    threeDig.forEach(function(num){
      for (var i = 0; i < threeDig.length; i++) {
        products.push(num*threeDig[i]);
      };
    }); 
    //find all palindromes within those products
    var palindromes=[];
    products.forEach(function(each){
      var strung = String(each);
      var palCheck=true;
      for (var i = 0; i < strung.length/2; i++) {
        if (strung[i]!==strung[strung.length-i-1]){
          palCheck=false;
        }
      };
      if (palCheck){
        palindromes.push(each);
      }
    }); 
    
    var maxPal = (Math.max.apply(null, palindromes));      

    expect(maxPal).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var divisors = _.range(1,21);
    var number = Math.max.apply(null, divisors);

    for (; ;) {
      var dividedAll=true;
      for (var i = 0; i < divisors.length; i++) {
        if (number % divisors[i] !== 0){
          dividedAll=false;
          number+=(number % divisors[i]);
          break;
        }
      };
      if (dividedAll){
        break;
      }
    };
      
    expect(number).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var array = [1,2,3];

    var sumOfSquares = _.chain(array)
      .map(function(num){
        return (num*num);
      })
      .reduce(function(a,b){
        return a+b;
      })
      .value();

    var squareOfSums = Math.pow(_.chain(array)
      .reduce(function(a,b){
        return a+b;
      })
      .value(),2);
    
    expect(Math.abs(sumOfSquares-squareOfSums)).toBe(22);
  });

  it("should find the 10001st prime", function () {
    var num =2; //2 is the first prime number
    var primes=[];

    //function to check if a single number is prime
    var primeCheck = function(number){
      if (number==2){
        primes.push(number);
        return true;
      }
      for (var i = 2; i < number; i++) {
        if (number%i==0){
          return false;
        }
      };
      primes.push(number);
      return true;
    } 

    //loop to obtain 10001 prime numbers
    for (; primes.length<10001; num++) {
      primeCheck(num);
    };

    expect(primes[primes.length-1]).toBe(104743);
  });
  
});
