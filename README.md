TiSprite
========
UPDATE: 1/17/14
converted project to be an alloy widget - work in progress for the next few days. Check out controllers/index.js for samples. the documentation below needs updated!!




I needed a way to create simple sprite animations across both android & ios for Appcelerator Titanium; this was my solution.

if you end up using it shoot me a note i'd like to see it!

still needs zindex support although it can be done on the returned view and it needs imageview caching at a higher level to reduce the memory footprint when reusing the same sheets

It loads the sprite sheet image in an image view then uses a second view to mask off the viewable area.
The module handles

-scaling

-infinite or limited # of loops

-reverse play of loop(s)

-'bounce' loops (play forward then play reversed)

-play defined frames or custom x,y,width,height animation sequences

working examples are in ui/common/firstview.js slot machine sample

//////////////////////////////////////

    //common js file to handle animations
    var SpriteCore = require('/sprite/SpriteCore');
    //while not needed a nice place to keep all your configurations for your sheets
    var SpriteConfig = require('/sprite/SpriteConfig');
    
    var self = Ti.UI.createScrollView({backgroundColor: '#666'});
    
    var sprite = new SpriteCore(SpriteConfig.Slots);//see SpriteConfig.Slots for all definable options
        //spriteScale: 1,//defaults to 1 if not included
        //spriteWidth: 86,//used to create 'masked area' & defined sprite blocks
        //spriteHeight : 72,//used to create 'masked area' & defined sprite blocks
        //spritesheetWidth : 86,
        //spritesheetHeight : 432,
        //spritesheetImage : '/Images/reel.png',
        //loopType : 'loop',//loop or bounce. defaults to 'loop' if not included
        //loops : -1,//defaults to -1 (infinite) if not included
        //reverseLoop : false,//defaults to 'false' if not included
    
    //this creates a view so you're free to do things like: sprite.spriteView.top=100; to set the location or anything else you want/can do to views

    self.add(sprite.createSprite({
    	spriteStartFrame:0
    }));//makes sprite visable at start frame

    //start animation options
    sprite.start({
      animationArray:[0,1,2,3,4,5],
      time:2500
    });

OR

    sprite.start({
    	start:0,
    	end:5,
    	time:1500
    });

OR

    var arr=[
         {x:0,y:864,h:72,w:86},
         {x:0,y:864,h:144,w:86},
         {x:0,y:864,h:216,w:86},
      ]; 
        
    sprite.start({
    	animationCustomArray:arr,
    	time:500
    });
