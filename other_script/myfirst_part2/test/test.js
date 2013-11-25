var assert = require("assert")
var isEven = require("../isEven")
var greet = require("../greet")
var document = require('global/document');

describe('greet', function(){
  describe('#greet()', function(){
    it('Should return true of 2', function(){
		//console.log("document "+ document.getElementById("hello").innerHTML);
		greet("per");
		console.log("document "+ document.getElementById("hello").innerHTML);
		assert.equal("heloo per", document.getElementById("hello").innerHTML );
      
    })
  })
})



describe('isEven', function(){
  describe('#isEven()', function(){
    it('Should return true of 2', function(){
      assert.equal(true, isEven(2));
      
    })
  })
})

describe('isEven', function(){
  describe('#isEven()', function(){
    it('Should return true of 4', function(){
      assert.equal(true, isEven(4));
      
    })
  })
})

describe('isEven', function(){
  describe('#isEven()', function(){
    it('Should return true of 6', function(){
      assert.equal(true, isEven(6));
      
    })
  })
})


describe('isEven', function(){
  describe('#isEven()', function(){
    it('Should return false of 5', function(){
      assert.equal(false, isEven(5));
      
    })
  })
})

describe('isEven', function(){
  describe('#isEven()', function(){
    it('Should return false of 3', function(){
      assert.equal(false, isEven(3));
      
    })
  })
})
