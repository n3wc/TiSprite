//FirstView Component Constructor
var _ = require("/lib/underscore");

function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({backgroundColor: '#666'});
	var outputlbl= Ti.UI.createLabel({
		top:0,
		left:0,
	});
	self.add(outputlbl);
	setInterval(function(){outputlbl.text=Titanium.Platform.availableMemory;}, 500);
	
	
	var Sprite = require('/UI/common/sprite');
	var sprite = new Sprite();
	
	self.add(sprite.createSprite({
		spriteWidth:96,
		spriteHieght:96,
		spritesheetImage:'/Images/rarity_sprite_sheet_by_urimas-d3fltl0.gif',
		spritesheetWidth:2880,
		spritesheetHeight:1152,
		spriteStartRow:9,
		spriteStartColumn:0,
	}));
  	sprite.spriteSheet.top=0;
  	sprite.start({
  		start:{row:9,column:0},
  		end:{row:9,column:9},
  		time:1000
  	});
  	
  	
  	
  	for(var i=0; i <40;i++)
  	{
	  	var sprite2 = new Sprite();
		
		self.add(sprite2.createSprite({
			spriteWidth:96,
			spriteHieght:96,
			spritesheetImage:'/Images/rarity_sprite_sheet_by_urimas-d3fltl0.gif',
			spritesheetWidth:2880,
			spritesheetHeight:1152,
			spriteStartRow:9,
			spriteStartColumn:0,
		}));
	  	sprite2.spriteSheet.top=100*i;
	  	sprite2.start({
	  		start:{row:9,column:0},
	  		end:{row:9,column:9},
	  		time:1500
	  	});
  }

  	
      
	return self;
}

module.exports = FirstView;
