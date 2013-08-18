function Game(){
  this._rolls = [];
  this._currentRoll = 0;
}

Game.prototype.roll = function(pins){
  this._rolls[this._currentRoll++] = pins;
};

Game.prototype.score = function(){
  var score = 0;
  var frameIndex = 0;
  for(var frame = 0; frame < 10; frame++){
    if(this.isStrike(frameIndex)){
      score += 10 + this.strikeBonus(frameIndex);
      frameIndex++;
    } else if(this.isSpare(frameIndex)){
      score += 10 + this.spareBonus(frameIndex);
      frameIndex += 2;
    } else {
      score += this.sumOfBallsInFrame(frameIndex);
      frameIndex += 2
    }
  }
  return score;
};

Game.prototype.sumOfBallsInFrame = function(frameIndex){
  return this._rolls[frameIndex] + this._rolls[frameIndex+1];
};

Game.prototype.spareBonus = function(frameIndex){
  return this._rolls[frameIndex+2];
};

Game.prototype.strikeBonus = function(frameIndex){
  return this._rolls[frameIndex + 1] + this._rolls[frameIndex + 2];
};

Game.prototype.isStrike = function(frameIndex){
  return this._rolls[frameIndex] == 10;
};

Game.prototype.isSpare = function(frameIndex){
  return this._rolls[frameIndex] + this._rolls[frameIndex + 1] == 10;
};

module.exports = Game;
