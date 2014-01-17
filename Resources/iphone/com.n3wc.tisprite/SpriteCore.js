function SpriteCore(constructor) {
    this.spriteScale = constructor && constructor.spriteScale ? constructor.spriteScale : 1;
    this.loopType = constructor && constructor.loopType ? constructor.loopType : "loop";
    this.loops = constructor && constructor.loops ? constructor.loops : -1;
    this.reverseLoop = constructor && constructor.reverseLoop ? constructor.reverseLoop : false;
    this.spriteWidth = constructor.spriteWidth * this.spriteScale;
    this.spriteHeight = constructor.spriteHeight * this.spriteScale;
    this.spritesheetWidth = constructor.spritesheetWidth * this.spriteScale;
    this.spritesheetHeight = constructor.spritesheetHeight * this.spriteScale;
    this.spritesheetImage = constructor.spritesheetImage;
    this.rows = (this.spritesheetHeight / this.spriteHeight).toFixed();
    this.columns = (this.spritesheetWidth / this.spriteWidth).toFixed();
    Ti.API.info(this.spritesheetImage);
    this.sheet = Ti.UI.createImageView({
        image: this.spritesheetImage,
        width: this.spritesheetWidth,
        height: this.spritesheetHeight
    });
    this.spriteView = Ti.UI.createView({
        width: this.spriteWidth,
        height: this.spriteHeight
    });
    this.spriteView.add(this.sheet);
    this.spriteAnimationPosition = 0;
    this.spriteCurrentFrame = 0;
    this.startAnimationFrame;
    this.endAnimationFrame;
    this.animationArray;
    this.animationCustomArray;
    this.spriteTimer;
    this.animateFrames = 0;
    this.animationDuration = 0;
    return this;
}

SpriteCore.prototype.createSprite = function(constructor) {
    if (constructor && constructor.spriteStartCustomFrame) {
        Ti.API.info("spriteStartCustomFrame");
        this.setCustomFrame(constructor.spriteStartCustomFrame);
    } else {
        this.spriteCurrentFrame = constructor && constructor.spriteStart ? constructor.spriteStartFrame : 0;
        this.setFrame();
    }
    return this.spriteView;
};

SpriteCore.prototype.start = function(args) {
    var self = this;
    if ("undefined" != typeof args.start) {
        this.startAnimationFrame = args.start;
        this.endAnimationFrame = args.end;
        this.animateFrames = args.end - args.start;
        this.reverseLoop ? this.setFrame(args.end) : this.setFrame(args.start);
    } else if (args.animationCustomArray) {
        this.animateFrames = args.animationCustomArray.length - 1;
        this.animationCustomArray = args.animationCustomArray;
        this.reverseLoop ? this.setCustomFrame(this.animateFrames) : this.setCustomFrame(this.animationCustomArray[0]);
    } else {
        this.animateFrames = args.animationArray.length - 1;
        this.animationArray = args.animationArray;
        this.reverseLoop ? this.setFrame(this.animateFrames) : this.setFrame(this.animationArray[0]);
    }
    this.animationDuration = args.time;
    this.spriteTimer = setInterval(function() {
        self.check_time(self);
    }, (this.animationDuration / this.animateFrames).toFixed());
    this.spriteView.fireEvent("animationStarted");
    return this;
};

SpriteCore.prototype.check_time = function(thisRef) {
    self = thisRef;
    if (self.spriteAnimationPosition++ == self.animateFrames) {
        if (-1 !== self.loops && 0 === --self.loops) {
            self.stop();
            this.spriteView.fireEvent("animationComplete");
            return self;
        }
        "bounce" == self.loopType && (self.reverseLoop = !self.reverseLoop);
        self.spriteAnimationPosition = 0;
        self.animationCustomArray ? self.setCustomFrame(self.animationCustomArray[self.reverseLoop ? self.animateFrames : 0]) : "undefined" != typeof self.startAnimationFrame ? self.setFrame(self.reverseLoop ? self.endAnimationFrame : self.startAnimationFrame) : self.setFrame(self.animationArray[self.reverseLoop ? self.animateFrames : 0]);
    } else {
        var nextFrame;
        nextFrame = self.startAnimationFrame ? self.reverseLoop ? self.endAnimationFrame - self.spriteAnimationPosition : self.startAnimationFrame + self.spriteAnimationPosition : self.reverseLoop ? self.animateFrames - self.spriteAnimationPosition : self.spriteAnimationPosition;
        self.animationCustomArray ? self.setCustomFrame(self.animationCustomArray[nextFrame]) : "undefined" != typeof self.startAnimationFrame ? self.setFrame(nextFrame) : self.setFrame(self.animationArray[nextFrame]);
    }
    return self;
};

SpriteCore.prototype.setFrame = function(frame) {
    Ti.API.info("setFrame");
    "undefined" != typeof frame && (this.spriteCurrentFrame = frame);
    this.sheet.left = -1 * parseInt(this.spriteCurrentFrame % this.columns) * this.spriteWidth;
    this.sheet.top = -1 * parseInt(this.spriteCurrentFrame / this.columns) * this.spriteHeight;
    return this;
};

SpriteCore.prototype.setCustomFrame = function(frameParam) {
    this.sheet.left = -1 * parseInt(frameParam.x * this.spriteScale);
    this.sheet.top = -1 * parseInt(frameParam.y * this.spriteScale);
    frameParam.w && (this.spriteView.width = parseInt(frameParam.w * this.spriteScale));
    frameParam.h && (this.spriteView.height = parseInt(frameParam.h * this.spriteScale));
    return this;
};

SpriteCore.prototype.stop = function() {
    clearInterval(this.spriteTimer);
    this.spriteView.fireEvent("animationStopped");
    return this;
};

SpriteCore.prototype.resume = function() {
    var self = this;
    this.spriteTimer = setInterval(function() {
        self.check_time(self);
    }, (this.animationDuration / this.animateFrames).toFixed());
    this.spriteView.fireEvent("animationResumed");
    return this;
};

module.exports = SpriteCore;