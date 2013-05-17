//FirstView Component Constructor
var _ = require("/lib/underscore");

function FirstView() {
	var self = Ti.UI.createScrollView({backgroundColor: '#666'});
	var outputlbl= Ti.UI.createLabel({top:0,left:0,});
	self.add(outputlbl);
	setInterval(function(){outputlbl.text=Titanium.Platform.availableMemory;}, 500);
	
	
	var Pony = require('/UI/common/sprite');
	var sprite = new Pony();
	
	self.add(sprite.createSprite({
		spriteStartFrame:270
	}));
  	sprite.spriteView.top=0;
  	sprite.start({
  		//start:270,
  		//end:278,
  		animationArray:[270,271,272,273,274,275,276,277,278],
  		time:3000
  	});
  	var sprite2 = new Pony();
	
	self.add(sprite2.createSprite({
		spriteStartFrame:270
	}));
  	sprite2.spriteView.top=100;
  	sprite2.start({
  		start:270,
  		end:278,
  		time:1500
  	});
  	
  	

      
	return self;
}

module.exports = FirstView;
