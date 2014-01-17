function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.win = Ti.UI.createView({
        id: "win",
        layout: "absolute",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    });
    $.__views.index.add($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var SpriteConfig = {
        Mega: {
            spriteScale: 1,
            spriteWidth: 45,
            spriteHeight: 48,
            spritesheetWidth: 1005,
            spritesheetHeight: 872,
            spritesheetImage: "/images/spritesheet.gif",
            loopType: "loop",
            loops: -1,
            reverseLoop: false,
            spriteStartCustomFrame: {
                x: 8,
                y: 80,
                h: 72,
                w: 52
            }
        },
        Slots: {
            spriteScale: 1,
            spriteWidth: 86,
            spriteHeight: 72,
            spritesheetWidth: 86,
            spritesheetHeight: 432,
            spritesheetImage: "/images/reel.png",
            loopType: "loop",
            loops: -1,
            reverseLoop: false,
            spriteStartFrame: 0
        }
    };
    var TiSprite = Alloy.createWidget("com.n3wc.tisprite", SpriteConfig.Mega);
    TiSprite.spriteView.top = 20;
    TiSprite.spriteView.left = 0;
    $.win.add(TiSprite.spriteView);
    var arr = [ {
        x: 8,
        y: 80,
        h: 72,
        w: 50
    }, {
        x: 58,
        y: 80,
        h: 72,
        w: 50
    }, {
        x: 108,
        y: 80,
        h: 72,
        w: 50
    }, {
        x: 158,
        y: 80,
        h: 72,
        w: 50
    } ];
    TiSprite.sprite.start({
        animationCustomArray: arr,
        time: 900
    });
    var config = JSON.parse(JSON.stringify(SpriteConfig.Mega));
    config.spriteStartCustomFrame = {
        x: 0,
        y: 225,
        h: 48,
        w: 80
    };
    var spriteMega = new Alloy.createWidget("com.n3wc.tisprite", config);
    $.win.add(spriteMega.spriteView);
    spriteMega.spriteView.top = 20;
    spriteMega.spriteView.left = 50;
    var arr = [ {
        x: 0,
        y: 416,
        h: 76,
        w: 58
    }, {
        x: 58,
        y: 416,
        h: 76,
        w: 66
    }, {
        x: 124,
        y: 416,
        h: 76,
        w: 112
    }, {
        x: 236,
        y: 416,
        h: 76,
        w: 112
    }, {
        x: 348,
        y: 416,
        h: 76,
        w: 116
    }, {
        x: 464,
        y: 416,
        h: 76,
        w: 116
    }, {
        x: 580,
        y: 416,
        h: 76,
        w: 88
    }, {
        x: 668,
        y: 416,
        h: 76,
        w: 72
    } ];
    spriteMega.sprite.start({
        animationCustomArray: arr,
        time: 1e3
    });
    var sprite1 = Alloy.createWidget("com.n3wc.tisprite", SpriteConfig.Slots);
    sprite1.spriteView.top = 200;
    sprite1.spriteView.left = 0;
    var config = JSON.parse(JSON.stringify(SpriteConfig.Slots));
    config.reverseLoop = true;
    var sprite2 = Alloy.createWidget("com.n3wc.tisprite", config);
    sprite2.spriteView.top = 200;
    sprite2.spriteView.left = 100;
    var sprite3 = Alloy.createWidget("com.n3wc.tisprite", SpriteConfig.Slots);
    sprite3.spriteView.top = 200;
    sprite3.spriteView.left = 200;
    $.win.add(sprite1.spriteView);
    $.win.add(sprite2.spriteView);
    $.win.add(sprite3.spriteView);
    var initSpin = true;
    var spinButton = Titanium.UI.createButton({
        title: "Spin",
        top: 300,
        width: 100,
        height: 50
    });
    $.win.add(spinButton);
    var lblWinner = Ti.UI.createLabel({
        color: "#F00",
        font: {
            fontSize: "20sp"
        },
        text: "",
        top: 350
    });
    $.win.add(lblWinner);
    var timer;
    spinButton.addEventListener("click", function() {
        spinButton.setEnabled(false);
        lblWinner.text = "";
        if (initSpin) {
            sprite1.sprite.start({
                start: 0,
                end: 5,
                time: 1e3
            });
            sprite2.sprite.start({
                start: 0,
                end: 5,
                time: 900
            });
            sprite3.sprite.start({
                start: 0,
                end: 5,
                time: 800
            });
            initSpin = false;
        } else {
            sprite1.sprite.resume();
            sprite2.sprite.resume();
            sprite3.sprite.resume();
        }
        var spinFor = 2e3 * Math.random() + 2e3;
        timer = setInterval(function() {
            clearInterval(timer);
            sprite1.sprite.stop();
            sprite2.sprite.stop();
            sprite3.sprite.stop();
            lblWinner.text = sprite1.sprite.spriteCurrentFrame === sprite2.sprite.spriteCurrentFrame && sprite1.sprite.spriteCurrentFrame === sprite3.sprite.spriteCurrentFrame ? "WINNER!" : "try again";
            spinButton.setEnabled(true);
        }, spinFor);
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;