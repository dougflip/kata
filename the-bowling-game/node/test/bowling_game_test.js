var assert        = require("assert");
var Game          = require("../src/game");

describe("A Game", function(){

  var g;

  beforeEach(function(){
    g = new Game();
  });

  function rollMany(n, pins){
    for(var i = 0; i < n; i++){
      g.roll(pins);
    }
  }

  function rollSpare(){
    g.roll(5);
    g.roll(5);
  }

  function rollStrike(){
    g.roll(10);
  }

  describe("with all open frames", function(){
    it("should score a gutter game", function(){
      rollMany(20, 0);
      assert.equal(0, g.score())
    });

    it("should score a game of all 1s", function(){
      rollMany(20,1);
      assert.equal(20, g.score())
    });
  });

  describe("with spares", function(){
    it("should score 1 spare", function(){
      rollSpare();
      g.roll(3);
      rollMany(17, 0);
      assert.equal(16, g.score());
    });
  });

  describe("with strikes", function(){
    it("should score 1 strike", function(){
      rollStrike();
      g.roll(3);
      g.roll(4);
      rollMany(16, 0);
      assert.equal(24, g.score());
    });

    it("should score a perfect game", function(){
      rollMany(12, 10);
      assert.equal(300, g.score());
    });
  });

});
