//code source:https://github.com/n3wc/TiSprite
//if you end up using it shoot me a note i'd like to see it!
//todo z index
//todo cache imageviews at a higher level for reusabilty and lesson memory footprint & clean up method  
function SpriteCore(constructor) {
	if(constructor && constructor.spriteScale) this.spriteScale=constructor.spriteScale; else this.spriteScale=1;
	//loop or bounce
	if(constructor && constructor.loopType) this.loopType=constructor.loopType; else this.loopType='loop';
	//number of times to loop. use -1 for ininate; if using bounce dould loops if limiting 
	if(constructor && constructor.loops) this.loops=constructor.loops; else this.loops=-1;
	if(constructor && constructor.reverseLoop) this.reverseLoop=constructor.reverseLoop; else this.reverseLoop=false;
	this.spriteWidth=constructor.spriteWidth*this.spriteScale; 
	this.spriteHeight=constructor.spriteHeight*this.spriteScale; 
	this.spritesheetWidth=constructor.spritesheetWidth*this.spriteScale; 
	this.spritesheetHeight=constructor.spritesheetHeight*this.spriteScale;
	this.spritesheetImage=constructor.spritesheetImage;
	
	this.rows=(this.spritesheetHeight/this.spriteHeight).toFixed();
	this.columns=(this.spritesheetWidth/this.spriteWidth).toFixed();
	//this.totalFrames = this.rows * this.columns;
	this.sheet = Ti.UI.createImageView(
	{
		image:this.spritesheetImage,
		width:this.spritesheetWidth,
		height:this.spritesheetHeight,
	});
	this.spriteView = Ti.UI.createView({
		width:this.spriteWidth,
		height:this.spriteHeight,
	});
	OS_IOS && (this.spriteView.clipMode = Ti.UI.iOS.CLIP_MODE_ENABLED);
	this.spriteView.add(this.sheet);
	
	
	this.spriteAnimationPosition=0;
	this.spriteCurrentFrame=0;
	this.startAnimationFrame;
	this.endAnimationFrame;
	this.animationArray;
	this.animationCustomArray;
	this.spriteTimer;
	this.animateFrames=0;		
	this.animationDuration=0;
	
	return this;
};
SpriteCore.prototype.createSprite = function(constructor) {
	if(constructor && constructor.spriteStartCustomFrame)
	{
		this.setCustomFrame(constructor.spriteStartCustomFrame);
	}
	else
	{
		if(constructor && constructor.spriteStart)
			this.spriteCurrentFrame=constructor.spriteStartFrame;
		else
			this.spriteCurrentFrame=0;
		
		this.setFrame();
	}
	return this.spriteView;
};

SpriteCore.prototype.start = function(args) {
	var self = this;
	if ('undefined' !== typeof args.start) 
	{
		this.startAnimationFrame=args.start;
		this.endAnimationFrame=args.end;
		this.animateFrames = args.end-args.start;
		if(this.reverseLoop)
			this.setFrame(args.end);
		else
			this.setFrame(args.start);
	}
	else if(args.animationCustomArray)
	{
		this.animateFrames = args.animationCustomArray.length-1;
		this.animationCustomArray=args.animationCustomArray;
		if(this.reverseLoop)
			this.setCustomFrame(this.animateFrames);
		else
			this.setCustomFrame(this.animationCustomArray[0]);
	}
	else
	{
		this.animateFrames = args.animationArray.length-1;
		this.animationArray=args.animationArray;
		if(this.reverseLoop)
			this.setFrame(this.animateFrames);
		else
			this.setFrame(this.animationArray[0]);
	}
	this.animationDuration=args.time;
    this.spriteTimer = setInterval(function(){self.check_time(self);}, (this.animationDuration/this.animateFrames).toFixed());
    this.spriteView.fireEvent('animationStarted');
	return this;
};

SpriteCore.prototype.check_time =function(thisRef)
{
	self = thisRef;

	if(self.spriteAnimationPosition++ == self.animateFrames)
	{
		if(self.loops!==-1 && --self.loops === 0)
		{
			self.stop();
			this.spriteView.fireEvent('animationComplete');
			return self;
		}
		if(self.loopType=='bounce') self.reverseLoop=!self.reverseLoop;
		
		self.spriteAnimationPosition=0;
		
		if(self.animationCustomArray)
			self.setCustomFrame(self.animationCustomArray[self.reverseLoop?self.animateFrames:0]);
		else if ('undefined' !== typeof self.startAnimationFrame) 
			self.setFrame(self.reverseLoop?self.endAnimationFrame:self.startAnimationFrame);
		else
			self.setFrame(self.animationArray[self.reverseLoop?self.animateFrames:0]);	
	}
	else{
		var nextFrame;
		if(self.startAnimationFrame)
			nextFrame=self.reverseLoop?self.endAnimationFrame-self.spriteAnimationPosition:self.startAnimationFrame+self.spriteAnimationPosition;
		else if(self.reverseLoop)
			nextFrame=self.animateFrames-self.spriteAnimationPosition;
		else
			nextFrame=self.spriteAnimationPosition;		
			
		if(self.animationCustomArray)
			self.setCustomFrame(self.animationCustomArray[nextFrame]);
		else if ('undefined' !== typeof self.startAnimationFrame) 
			self.setFrame(nextFrame);
		else
			self.setFrame(self.animationArray[nextFrame]);
	}
	return self;
};

SpriteCore.prototype.setFrame =function(frame)
{
	if ('undefined' !== typeof frame) this.spriteCurrentFrame=frame;
	this.sheet.left = -1*parseInt(this.spriteCurrentFrame%this.columns)*this.spriteWidth;
	this.sheet.top = -1*parseInt(this.spriteCurrentFrame/this.columns)*this.spriteHeight;
	//Ti.API.info(frame+' - x:'+this.sheet.left+' y:'+this.sheet.top);
	return this;
};

SpriteCore.prototype.setCustomFrame =function(frameParam)
{
	this.sheet.left = -1*parseInt(frameParam.x*this.spriteScale);
	this.sheet.top = -1*parseInt(frameParam.y*this.spriteScale);
	if(frameParam.w)this.spriteView.width = parseInt(frameParam.w*this.spriteScale);
	if(frameParam.h)this.spriteView.height = parseInt(frameParam.h*this.spriteScale);
	return this;
};

SpriteCore.prototype.stop = function() {
	clearInterval(this.spriteTimer);
	this.spriteView.fireEvent('animationStopped');
	return this;
};

SpriteCore.prototype.resume = function() {
	var self = this;
	this.spriteTimer = setInterval(function(){self.check_time(self);}, (this.animationDuration/this.animateFrames).toFixed());
	this.spriteView.fireEvent('animationResumed');
	return this;
};

module.exports = SpriteCore;
