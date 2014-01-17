function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.n3wc.tisprite/" + s : s.substring(0, index) + "/com.n3wc.tisprite/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("com.n3wc.tisprite");
    this.__widgetId = "com.n3wc.tisprite";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.spriteView = Ti.UI.createView({
        id: "spriteView"
    });
    $.__views.spriteView && $.addTopLevelView($.__views.spriteView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var SpriteConfig = arguments[0] || {};
    var SpriteCore = require(WPATH("SpriteCore"));
    $.sprite = new SpriteCore(SpriteConfig);
    $.spriteView = $.sprite.createSprite(SpriteConfig);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;