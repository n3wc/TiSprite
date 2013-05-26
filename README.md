TiSprite
========
I needed a way to create simple sprite animations across both android & ios; this was my solution.

It loads the sprite sheet image in an image view then uses a second view to mask off the viewable area.
The module handles

-scaling

-limiting # of loops

-reverse play of loops

-'bounce' loops (play forward then play reversed)

-play defined frames or custom x,y,width,height animation sequences


examples are in ui/common/firstview.js
