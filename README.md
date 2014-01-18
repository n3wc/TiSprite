TiSprite
========
UPDATE: 1/17/14
converted project to be an alloy widget - work in progress for the next few days. Check out controllers/index.js for samples. the documentation below needs updated!!




I needed a way to create simple sprite animations across both android & ios for Appcelerator Titanium; this was my solution.

if you end up using it shoot me a note i'd like to see it!

-scaling

-infinite or limited # of loops

-reverse play of loop(s)

-'bounce' loops (play forward then play reversed)

-play defined frames or custom x,y,width,height animation sequences

working examples are in ontrollers/index.js

youtube sample:
[![ScreenShot](http://i.imgur.com/t3Tu1oll.png)](http://www.youtube.com/watch?v=P2F-RJfHNgc)

some sample code
```
//configure some sprite sheets
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
		
		}
	};
//example 1
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
//END
```
