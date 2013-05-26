function SpriteCore(constructor) {
	if(constructor && constructor.spriteScale) this.spriteScale=constructor.spriteScale; else this.spriteScale=1;
	this.spriteWidth=constructor.spriteWidth*this.spriteScale; 
	this.spriteHeight=constructor.spriteHeight*this.spriteScale; 
	this.spritesheetWidth=constructor.spritesheetWidth*this.spriteScale; 
	this.spritesheetHeight=constructor.spritesheetHeight*this.spriteScale;
	this.spritesheetImage=constructor.spritesheetImage;
	this.rows=(this.spritesheetHeight/this.spriteHeight).toFixed();
	this.columns=(this.spritesheetWidth/this.spriteWidth).toFixed();
	this.totalFrames = this.rows * this.columns;
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
	if(args.start)
	{
		this.startAnimationFrame=args.start;
		this.endAnimationFrame=args.end;
		this.animateFrames = args.end-args.start;
		this.setFrame(args.start);
	}
	else if(args.animationCustomArray)
	{
		this.animateFrames = args.animationCustomArray.length-1;
		this.animationCustomArray=args.animationCustomArray;
		this.setCustomFrame(this.animationCustomArray[0]);
	}
	else
	{
		this.animateFrames = args.animationArray.length-1;
		this.animationArray=args.animationArray;
		this.setFrame(this.animationArray[0]);
	}
	this.animationDuration=args.time;
    this.spriteTimer = setInterval(function(){self.check_time(self)}, (this.animationDuration/this.animateFrames).toFixed());
	return this;
};

SpriteCore.prototype.check_time =function(thisRef)
{
	self = thisRef;

	if(self.spriteAnimationPosition++ == self.animateFrames)
	{
		self.spriteAnimationPosition=0;
		if(self.animationCustomArray)
			self.setCustomFrame(self.animationCustomArray[0]);
		else if(self.startAnimationFrame)
			self.setFrame(self.startAnimationFrame);
		else
			self.setFrame(self.animationArray[0]);
	}
	else{
		if(self.animationCustomArray)
			self.setCustomFrame(self.animationCustomArray[self.spriteAnimationPosition]);
		else if(self.startAnimationFrame)
			self.setFrame(self.startAnimationFrame+self.spriteAnimationPosition)
		else
			self.setFrame(self.animationArray[self.spriteAnimationPosition]);
	}
	return self;
};


SpriteCore.prototype.setFrame =function(frame)
{
	if(frame)this.spriteCurrentFrame=frame;
	this.sheet.left = -1*(this.spriteCurrentFrame%this.columns).toFixed()*this.spriteWidth;
	this.sheet.top = -1*(this.spriteCurrentFrame/this.columns).toFixed()*this.spriteHeight;
	//Ti.API.info('x:'+this.sheet.left+' y:'+this.sheet.top);
	return this;
};
SpriteCore.prototype.setCustomFrame =function(frameParam)
{
	//Ti.API.info(JSON.stringify(frameParam));
	this.sheet.left = -1*(frameParam.x);
	this.sheet.top = -1*(frameParam.y);
	if(frameParam.w)this.spriteView.width = frameParam.w;
	if(frameParam.h)this.spriteView.height = frameParam.h;
	return this;
};

SpriteCore.prototype.stop = function() {
	clearInterval(this.spriteTimer);
	return this;
};

SpriteCore.prototype.resume = function() {
	this.spriteTimer = setInterval(function(){self.check_time(self)}, (this.animationDuration/this.animateFrames).toFixed());
	return this;
};

module.exports = SpriteCore;