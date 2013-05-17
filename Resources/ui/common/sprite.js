

function Sprite() {
	this.spriteWidth=96;
	this.spriteHeight=96;
	this.spritesheetImage='/Images/rarity_sprite_sheet_by_urimas-d3fltl0.gif';
	this.spritesheetWidth=2880;
	this.spritesheetHeight=1152;
	this.spritePosition=0;
	//this.spriteCurrentRow=0;
	//this.spriteCurrentColumn=0;
	this.startAnimationFrame;
	this.endAnimationFrame;
	this.animationArray;
	this.spriteCurrentFrame=0;
	this.top=0;
	this.left=0;
	this.spriteTimer;
	this.animateFrames=0;		
	this.rows=(this.spritesheetHeight/this.spriteHeight).toFixed();
	this.columns=(this.spritesheetWidth/this.spriteWidth).toFixed();
	this.totalFrames = this.rows * this.columns;
	this.sheet = Ti.UI.createImageView(
	{
		image:this.spritesheetImage,
		width:this.spritesheetWidth,
		height:this.spritesheetHeight,
	});
	this.spriteSheet = Ti.UI.createView({
		width:this.spriteWidth,
		height:this.spriteHeight,
	});
	this.spriteSheet.add(this.sheet);
	return this;
};



Sprite.prototype.createSprite = function(constructor) {
	//if(constructor.spriteStartRow)this.spriteCurrentRow=constructor.spriteStartRow;
	//if(constructor.spriteStartColumn)this.spriteCurrentColumn=constructor.spriteStartColumn;
	if(constructor.spriteStart)
	{
		this.spriteCurrentFrame=constructor.spriteStartFrame;
	}else{
		this.spriteCurrentFrame=0;
	}
	this.setFrame();

	return this.spriteSheet;
};

Sprite.prototype.start = function(args) {
	var self = this;
	if(args.start && args.end)
	{
		this.animateFrames = args.end-args.start;
		this.setFrame(args.start);
	}else
	{
		this.animateFrames = args.animationArray.length;
		this.animationArray=args.animationArray;
	}
	//Ti.API.info(JSON.stringify(args));
		
    this.spriteTimer = setInterval(function(){self.check_time(self,args)}, (args.time/this.animateFrames).toFixed());
	return this;
};
Sprite.prototype.check_time =function(thisRef,args)
{
	self = thisRef;
	//var newPosition = -1*(self.spritePosition)*self.spriteWidth;
	//Ti.API.info('newPosition - ' + newPosition);
	//self.sheet.left = newPosition;

	
	
	if(self.spritePosition++ == self.animateFrames)
	{
		self.spritePosition=0;
		if(args.start && args.end)
		{
			this.setFrame(args.start);
		}else{
			this.setFrame(args.animationArray[0]);
		}
	}else
	{
		if(args.start && args.end)
		{
			this.setFrame(args.start+self.spritePosition)
		}else{
			this.setFrame(args.animationArray[0+self.spritePosition]);
		}
		
	}
	
	return this;
};


Sprite.prototype.setFrame =function(frame)
{
	if(frame)this.spriteCurrentFrame=frame;
	var newRow = (this.spriteCurrentFrame/this.columns).toFixed(0);
	var newColumn = (this.spriteCurrentFrame%this.columns).toFixed(0);
	var newLeft = -1*newColumn*this.spriteWidth;
	var newTop = -1*newRow*this.spriteHeight;
	//Ti.API.info('newPosition - ' + newColumn+','+newRow);
	this.sheet.left = newLeft;
	this.sheet.top = newTop;
	
	return this;
};


Sprite.prototype.stop = function() {
	clearInterval(this.spriteTimer);
	return this;
};
module.exports = Sprite;



