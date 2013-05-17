//FirstView Component Constructor
var _ = require("/lib/underscore");

function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollView({backgroundColor: '#666'});
	var outputlbl= Ti.UI.createLabel({top:0,left:0,});
	self.add(outputlbl);
	setInterval(function(){outputlbl.text=Titanium.Platform.availableMemory;}, 500);
	
	
	var Pony = require('/UI/common/sprite');
	var sprite = new Pony();
	
	self.add(sprite.createSprite({
		//spriteStartRow:9,
		//spriteStartColumn:0,
		spriteStartFrame:270
	}));
  	sprite.spriteSheet.top=0;
  	sprite.start({
  		//start:270,
  		//end:278,
  		animationArray:[270,271,272,273,274,275],
  		time:3000
  	});
  	
  	
  	
  	/*
  	for(var i=0; i <40;i++)
  	{
	  	var sprite2 = new Pony();
		
		self.add(sprite2.createSprite({
			spriteStartRow:9,
			spriteStartColumn:0,
		}));
	  	sprite2.spriteSheet.top=100*i;
	  	sprite2.start({
	  		start:{row:9,column:0},
	  		end:{row:9,column:9},
	  		time:1000+(i*100),
	  	});
	  	
  }

  	*/
      
	return self;
}

module.exports = FirstView;
