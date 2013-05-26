//FirstView Component Constructor
var _ = require("/lib/underscore");

function FirstView() {
	var self = Ti.UI.createScrollView({backgroundColor: '#666'});
	
	
	var SpriteCore = require('/sprite/SpriteCore');
	var SpriteConfig = require('/sprite/SpriteConfig');
	
	//Sample implementation 1
	var sprite = new SpriteCore(SpriteConfig.Pony);
	self.add(sprite.createSprite({
		spriteStartFrame:270
	}));
  	sprite.spriteView.top=100;
  	sprite.spriteView.left=0;
  	sprite.start({
  		animationArray:[270,271,272,273,274,275,276,277,278],
  		time:2500
  	});
  	
  	//Sample implementation 2
  	var config = SpriteConfig.Pony;
  	config.spriteScale=1.5;
  	var sprite2 = new SpriteCore(config);
  	config.spriteScale=1;
	self.add(sprite2.createSprite({
		spriteStartFrame:270,
	}));
  	sprite2.spriteView.top=100;
  	sprite2.spriteView.left=100;
  	sprite2.start({
  		start:270,
  		end:278,
  		time:1500
  	});
  	
  	//Sample implementation 3
  	var sprite3 = new SpriteCore(SpriteConfig.Pony);
	self.add(sprite3.createSprite({
		spriteStartCustomFrame:{x:0,y:864,h:96,w:96},
	}));
  	sprite3.spriteView.top=100;
  	sprite3.spriteView.left=200;
  	var arr=[
           {x:0,y:864,h:96,w:96},
           {x:96,y:864,h:96,w:96},
           {x:192,y:864,h:96,w:96},
           {x:288,y:864,h:96,w:96},
           {x:384,y:864,h:96,w:96},
           {x:480,y:864,h:96,w:96},
           {x:576,y:864,h:96,w:96},
           {x:672,y:864,h:96,w:96},
           {x:768,y:864,h:96,w:96}
        ]; 
  	sprite3.start({
  		animationCustomArray:arr,
  		time:2500
  	});
  	
  	//Sample implementation 4
	var sprite4 = new SpriteCore(SpriteConfig.Mega);
	self.add(sprite4.createSprite({
		spriteStartCustomFrame:{x:0,y:225,h:48,w:80},
	}));
  	sprite4.spriteView.top=200;
  	var arr=[
           {x:0,y:416,h:76,w:58},
           {x:58,y:416,h:76,w:66},
           {x:124,y:416,h:76,w:112},
           {x:236,y:416,h:76,w:112},
           {x:348,y:416,h:76,w:116},
           {x:464,y:416,h:76,w:116},
           {x:580,y:416,h:76,w:88},
           {x:668,y:416,h:76,w:72},

        ]; 
  	sprite4.start({
  		animationCustomArray:arr,
  		time:2500
  	}); 	

      
	return self;
}

module.exports = FirstView;
