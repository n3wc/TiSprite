

function Sprite() {
	this.spriteWidth=96;
	this.spriteHeight=96;
	this.spritesheetImage='/Images/rarity_sprite_sheet_by_urimas-d3fltl0.gif';
	this.spritesheetWidth=2880;
	this.spritesheetHeight=1152;
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
	
	this.spritePosition=0;
	this.spriteCurrentFrame=0;
	this.startAnimationFrame;
	this.endAnimationFrame;
	this.animationArray;
	
	
	this.spriteTimer;
	this.animateFrames=0;		
	this.animationDuration=0;
	
	return this;
};



Sprite.prototype.createSprite = function(constructor) {
	if(constructor.spriteStart)
		this.spriteCurrentFrame=constructor.spriteStartFrame;
	else
		this.spriteCurrentFrame=0;
		
	this.setFrame();
	return this.spriteView;
};

Sprite.prototype.start = function(args) {
	var self = this;
	if(args.start)
	{
		this.startAnimationFrame=args.start;
		this.endAnimationFrame=args.end;
		this.animateFrames = args.end-args.start;
		this.setFrame(args.start);
	}else
	{
		this.animateFrames = args.animationArray.length;
		this.animationArray=args.animationArray;
		this.setFrame(this.animationArray[0]);
	}
	this.animationDuration=args.time;
    this.spriteTimer = setInterval(function(){self.check_time(self)}, (this.animationDuration/this.animateFrames).toFixed());
	return this;
};
Sprite.prototype.check_time =function(thisRef)
{
	self = thisRef;

	if(self.spritePosition++ == self.animateFrames)
	{
		self.spritePosition=0;
		if(self.startAnimationFrame)
			self.setFrame(self.startAnimationFrame);
		else
			self.setFrame(self.animationArray[0]);
	}
	else{
		if(self.startAnimationFrame)
			self.setFrame(self.startAnimationFrame+self.spritePosition)
		else
			self.setFrame(self.animationArray[0+self.spritePosition]);
	}
	return self;
};


Sprite.prototype.setFrame =function(frame)
{
	if(frame)this.spriteCurrentFrame=frame;
	this.sheet.left = -1*(this.spriteCurrentFrame%this.columns).toFixed()*this.spriteWidth;
	this.sheet.top = -1*(this.spriteCurrentFrame/this.columns).toFixed()*this.spriteHeight;
	return this;
};


Sprite.prototype.stop = function() {
	clearInterval(this.spriteTimer);
	return this;
};

Sprite.prototype.resume = function() {
	this.spriteTimer = setInterval(function(){self.check_time(self)}, (this.animationDuration/this.animateFrames).toFixed());
	return this;
};

module.exports = Sprite;



