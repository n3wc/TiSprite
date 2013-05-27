//FirstView Component Constructor
var _ = require("/lib/underscore");

function FirstView() {
	var self = Ti.UI.createScrollView({backgroundColor: '#666'});
	
	
	var SpriteCore = require('/sprite/SpriteCore');
	var SpriteConfig = require('/sprite/SpriteConfig');
	
	//roller1
	var sprite = new SpriteCore(SpriteConfig.Slots);
	self.add(sprite.createSprite({
		spriteStartFrame:0
	}));
  	sprite.spriteView.top=0;
  	sprite.spriteView.left=0;
	//roller 2 spin in reverse
	var config = JSON.parse(JSON.stringify(SpriteConfig.Slots));//deep copy obj to prevent changes from interfering with any other references to the object later in code
  	config.reverseLoop=true;
  	var sprite2 = new SpriteCore(config);
	self.add(sprite2.createSprite({
		spriteStartFrame:0
	}));
  	sprite2.spriteView.top=0;
  	sprite2.spriteView.left=100;
	//roller 3
  	var sprite3 = new SpriteCore(SpriteConfig.Slots);
	self.add(sprite3.createSprite({
		spriteStartFrame:0
	}));
  	sprite3.spriteView.top=0;
  	sprite3.spriteView.left=200;
  	
  	var initSpin = true;
  	var spinButton = Titanium.UI.createButton({
	   title: 'Spin',
	   top: 100,
	   width: 100,
	   height: 50
	});
	self.add(spinButton);
	var timer;
	spinButton.addEventListener('click',function(e)
	{
		spinButton.setEnabled(false);
		lblWinner.text='';
		if(initSpin)
		{
			sprite.start({
				start:0,
				end:5,
				time:1000
			});		
			sprite2.start({
				start:0,
				end:5,
				time:900
			});	   
			sprite3.start({
				start:0,
				end:5,
				time:800
			});
			initSpin=false;
		}
		else{
			sprite.resume();
		    sprite2.resume();
		    sprite3.resume();
		}
		var spinFor = Math.random() * 2000+2000;

		timer = setInterval(function(){
			clearInterval(timer);
		    sprite.stop();
		    sprite2.stop();
		    sprite3.stop();
		    spinButton.setEnabled(true);
		    if(sprite.spriteCurrentFrame === sprite2.spriteCurrentFrame && sprite.spriteCurrentFrame === sprite3.spriteCurrentFrame)
		    	lblWinner.text='WINNER!';
		}, spinFor);
	});
	var lblWinner = Ti.UI.createLabel({
		color: '#F00',
		font: { fontSize:'25sp' },
		text: '',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: 200,
		width: Ti.UI.SIZE, height: Ti.UI.SIZE
	});
	self.add(lblWinner);

  	/*
  	//Sample implementation 4
  	var config = JSON.parse(JSON.stringify(SpriteConfig.Mega));//deep copy obj to prevent changes from interfering with any other references to the object later in code
  	config.loops=1;
	var spriteMega = new SpriteCore(config);
	self.add(spriteMega.createSprite({
		spriteStartCustomFrame:{x:0,y:225,h:48,w:80},
	}));
  	spriteMega.spriteView.top=75;
  	spriteMega.spriteView.left=20;
  	var arr=[//sprite scaling handled in the functions for you, use 1:1 locations
           {x:0,y:416,h:76,w:58},
           {x:58,y:416,h:76,w:66},
           {x:124,y:416,h:76,w:112},
           {x:236,y:416,h:76,w:112},
           {x:348,y:416,h:76,w:116},
           {x:464,y:416,h:76,w:116},
           {x:580,y:416,h:76,w:88},
           {x:668,y:416,h:76,w:72},

        ]; 
  	spriteMega.start({
  		animationCustomArray:arr,
  		time:1000
  	}); 	
	
	
	var spriteMega = new SpriteCore(SpriteConfig.Mega);
	self.add(spriteMega.createSprite({
		spriteStartCustomFrame:{x:8,y:80,h:72,w:52},
	}));
  	spriteMega.spriteView.top=175;
  	spriteMega.spriteView.left=20;
  	var arr=[//sprite scaling handled in the functions for you, use 1:1 locations
           {x:8,y:80,h:72,w:50},
           {x:58,y:80,h:72,w:50},
           {x:108,y:80,h:72,w:50},
           {x:158,y:80,h:72,w:50},
        ]; 
  	spriteMega.start({
  		animationCustomArray:arr,
  		time:1000
  	});
  	*/
      
	return self;
}

module.exports = FirstView;
