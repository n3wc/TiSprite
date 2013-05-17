

function Sprite() {
	this.spriteWidth=96;
	this.spriteHeight=96;
	this.spritesheetImage='/Images/rarity_sprite_sheet_by_urimas-d3fltl0.gif';
	this.spritesheetWidth=0;//2880;
	this.spritesheetHeight=0;//1152;
	this.spritePosition=0;
	this.spriteCurrentRow=0;
	this.spriteCurrentColumn=0;
	this.top=0;
	this.left=0;
	this.frames;
	this.spriteSheet;
	this.sheet;
	this.rows;
	this.columns;
	this.spriteTimer;
	this.animateFrames;		
	
	return this;
};



Sprite.prototype.createSprite = function(constructor) {

	if(constructor.spriteWidth)this.spriteWidth=constructor.spriteWidth;
	if(constructor.spriteHeight)this.spriteHeight=constructor.spriteHeight;
	if(constructor.spritesheetImage)this.spritesheetImage=constructor.spritesheetImage;
	if(constructor.spritesheetWidth)this.spritesheetWidth=constructor.spritesheetWidth;
	if(constructor.spritesheetHeight)this.spritesheetHeight=constructor.spritesheetHeight;
	if(constructor.spriteStartRow)this.spriteCurrentRow=constructor.spriteStartRow;
	if(constructor.spriteStartColumn)this.spriteCurrentColumn=constructor.spriteStartColumn;

	this.rows=(this.spritesheetHeight/this.spriteHeight).toFixed();
	this.columns=(this.spritesheetWidth/this.spriteWidth).toFixed();
	this.sheet = Ti.UI.createImageView(
	{
		image:this.spritesheetImage,
		width:this.spritesheetWidth,
		height:this.spritesheetHeight,
	});
	
	this.setFrame(this.spriteCurrentRow,this.spriteCurrentColumn);
	
	this.spriteSheet = Ti.UI.createView({
		width:this.spriteWidth,
		height:this.spriteHeight,
	});
	this.spriteSheet.add(this.sheet);
	return this.spriteSheet;
};
Sprite.prototype.start = function(args) {
	var self = this;
	this.animateFrames = args.end.row-args.start.row+args.end.column-args.start.column;
	Ti.API.info(JSON.stringify(args));
	this.setFrame(args.start.row,args.start.column);
    this.spriteTimer = setInterval(function(){self.check_time(self,args)}, (args.time/this.animateFrames).toFixed());
	return this;
};
Sprite.prototype.check_time =function(thisRef,args)
{
	self = thisRef;
	//var newPosition = -1*(self.spritePosition)*self.spriteWidth;
	//Ti.API.info('newPosition - ' + newPosition);
	//self.sheet.left = newPosition;

	this.setFrame(args.start.row,args.start.column+self.spritePosition)
	
	if(self.spritePosition++ == self.animateFrames)
	{
		self.spritePosition=0;
		this.setFrame(args.start.row,args.start.column);
	}
	
	return this;
};


Sprite.prototype.setFrame =function(newRow,newColumn)
{
	var newLeft = -1*newColumn*this.spriteWidth;
	var newTop = -1*newRow*this.spriteHeight;
	//Ti.API.info('newPosition - ' + newLeft+','+newTop);
	this.sheet.left = newLeft;
	this.sheet.top = newTop;
	
	return this;
};


Sprite.prototype.stop = function() {
	clearInterval(this.spriteTimer);
	return this;
};
module.exports = Sprite;



