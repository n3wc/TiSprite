TiSprite
========
UPDATE: 1/17/14
converted project to be an alloy widget - work in progress for the next few days. Check out controllers/index.js for samples. the documentation below needs updated!!




I needed a way to create simple sprite animations across both android & ios for Appcelerator Titanium; this was my solution.

if you end up using it shoot me a note i'd like to see it!

still needs zindex support although it can be done on the returned view and it needs imageview caching at a higher level to reduce the memory footprint when reusing the same sheets

It loads the sprite sheet image in an image view then uses a second view to mask off the viewable area.
The module handles

-scaling

-infinite or limited # of loops

-reverse play of loop(s)

-'bounce' loops (play forward then play reversed)

-play defined frames or custom x,y,width,height animation sequences

working examples are in ontrollers/index.js
