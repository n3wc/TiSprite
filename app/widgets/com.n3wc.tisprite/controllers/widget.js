var SpriteConfig = arguments[0] || {};
var SpriteCore = require(WPATH('SpriteCore'));
$.sprite = new SpriteCore(SpriteConfig);
$.spriteView=($.sprite.createSprite(SpriteConfig));

