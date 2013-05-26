TiSprite
========
I needed a way to create simple sprite animations across both android & ios; this was my solution.

It loads the sprite sheet image in an image view then uses a second view to mask off the viewable area.
The module handles

-scaling

-limiting # of loops

-reverse play of loops

-'bounce' loops (play forward then play reversed)

-play defined frames or custom x,y,width,height animation sequences

working examples are in ui/common/firstview.js

//////////////////////////////////////

    //common js file to handle animations
    var SpriteCore = require('/sprite/SpriteCore');
    //while not needed a nice place to keep all your configurations for a sheet
    var SpriteConfig = require('/sprite/SpriteConfig');
    
    var self = Ti.UI.createScrollView({backgroundColor: '#666'});
    
    var sprite = new SpriteCore(SpriteConfig.Pony);//see SpriteConfig.Pony for all definable options
    
    //creates a view so you're free to do things like: sprite.spriteView.top=100; to set the location.

    self.add(sprite.createSprite({
    	spriteStartFrame:270
    }));

    sprite.start({
      animationArray:[270,271,272,273,274,275,276,277,278],
      time:2500
    });

OR

    sprite.start({
    	start:270,
    	end:278,
    	time:1500
    });

OR

    var arr=[
         {x:0,y:864,h:96,w:96},
         {x:96,y:864,h:96,w:96},
         {x:192,y:864,h:96,w:96},
      ]; 
        
    sprite.start({
    	animationCustomArray:arr,
    	time:500
    });
