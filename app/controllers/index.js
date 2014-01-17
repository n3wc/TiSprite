//configure sprite sheets
	var SpriteConfig = {
		Mega : {
			spriteScale: 1,//defaults to 1 if not included
		    spriteWidth: 45,//used to create 'masked area' & defined sprite blocks
		    spriteHeight : 48,//used to create 'masked area' & defined sprite blocks
		    spritesheetWidth : 1005,
		    spritesheetHeight : 872,
		    spritesheetImage : '/images/spritesheet.gif',
		    loopType : 'loop',//defaults to 'loop' if not included
		    loops : -1,//defaults to -1 (infinate) if not included
		    reverseLoop : false,//defaults to 'false' if not included
		    spriteStartCustomFrame:{x:8,y:80,h:72,w:52}
		
		},
		Slots : {
		    spriteScale: 1,//defaults to 1 if not included
		    spriteWidth: 86,//used to create 'masked area' & defined sprite blocks
		    spriteHeight : 72,//used to create 'masked area' & defined sprite blocks
		    spritesheetWidth : 86,
		    spritesheetHeight : 432,
		    spritesheetImage : '/images/reel.png',
		    loopType : 'loop',//defaults to 'loop' if not included
		    loops : -1,//defaults to -1 (infinate) if not included
		    reverseLoop : false,//defaults to 'false' if not included
		    spriteStartFrame:0
		
		}
	};
//example 1
//Start mega1
	var TiSprite = Alloy.createWidget("com.n3wc.tisprite",SpriteConfig.Mega);
	TiSprite.spriteView.top=20;
	TiSprite.spriteView.left=0;
	$.win.add(TiSprite.spriteView);
	var arr=[//sprite scaling handled in the functions for you, use 1:1 locations
	       {x:8,y:80,h:72,w:50},
	       {x:58,y:80,h:72,w:50},
	       {x:108,y:80,h:72,w:50},
	       {x:158,y:80,h:72,w:50},
	    ]; 
	TiSprite.sprite.start({
		animationCustomArray:arr,
		time:900
	});
//END mega1

	
//example 2
//Start mega1  2
  	var config = JSON.parse(JSON.stringify(SpriteConfig.Mega));//deep copy obj to prevent changes from interfering with any other references to the object later in code
  	config.spriteStartCustomFrame={x:0,y:225,h:48,w:80};
	var spriteMega = new Alloy.createWidget("com.n3wc.tisprite",config);
	$.win.add(spriteMega.spriteView);
  	spriteMega.spriteView.top=20;
  	spriteMega.spriteView.left=50;
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
  	spriteMega.sprite.start({
  		animationCustomArray:arr,
  		time:1000
  	}); 
//END mega2 	

//example 3
//Start Spinners
	//roller1
	var sprite1 = Alloy.createWidget("com.n3wc.tisprite",SpriteConfig.Slots);
  	sprite1.spriteView.top=200;
  	sprite1.spriteView.left=0;
	//roller 2 spin in reverse
	var config = JSON.parse(JSON.stringify(SpriteConfig.Slots));//deep copy obj to prevent changes from interfering with any other references to the object later in code
  	config.reverseLoop=true;
  	var sprite2 =  Alloy.createWidget("com.n3wc.tisprite",config);
  	sprite2.spriteView.top=200;
  	sprite2.spriteView.left=100;
	//roller 3
  	var sprite3 =  Alloy.createWidget("com.n3wc.tisprite",SpriteConfig.Slots);
  	sprite3.spriteView.top=200;
  	sprite3.spriteView.left=200;
  	
  	$.win.add(sprite1.spriteView);
  	$.win.add(sprite2.spriteView);
  	$.win.add(sprite3.spriteView);
  	
  	var initSpin = true;
  	
  	var spinButton = Titanium.UI.createButton({title: 'Spin',top: 300,width: 100,height: 50});
	$.win.add(spinButton);
	var lblWinner = Ti.UI.createLabel({color: '#F00',font: { fontSize:'20sp' },text: '',top: 350});
	$.win.add(lblWinner);
	
	var timer;
	spinButton.addEventListener('click',function(e)
	{
		spinButton.setEnabled(false);
		lblWinner.text='';
		if(initSpin)
		{
			sprite1.sprite.start({
				start:0,
				end:5,
				time:1000
			});		
			sprite2.sprite.start({
				start:0,
				end:5,
				time:900
			});	   
			sprite3.sprite.start({
				start:0,
				end:5,
				time:800
			});
			initSpin=false;
		}
		else{
			sprite1.sprite.resume();
		    sprite2.sprite.resume();
		    sprite3.sprite.resume();
		}
		var spinFor = Math.random() * 2000+2000;

		timer = setInterval(function(){
			clearInterval(timer);
		    sprite1.sprite.stop();
		    sprite2.sprite.stop();
		    sprite3.sprite.stop();
		    
		    if(sprite1.sprite.spriteCurrentFrame === sprite2.sprite.spriteCurrentFrame && sprite1.sprite.spriteCurrentFrame === sprite3.sprite.spriteCurrentFrame)
		    	lblWinner.text='WINNER!';
		    else 
		    	lblWinner.text='try again';
		    spinButton.setEnabled(true);
		}, spinFor);
	});
//END SPINNERS



      






$.index.open();
