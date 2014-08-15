// get canvas dimensions
var canvasElm = document.getElementById( 'drawingThree' ),
  canvasWidth = canvasElm.width,
 canvasHeight = canvasElm.height;

// set colours
var ink = '#113',
   ink2 = '#113';

// draw a rectangle
function drawRect ( point, width, height, color ) {
  return new Path.Rectangle({
    point: point,
    size: new Size( width, height ),
    fillColor: color
  });
}

// set number of stripes
var numStripes = 47;

// init background stripes group
var bgStripes = new Group();

// draw background stripes
for ( var s = 0; s < numStripes; s++ ){
  if ( s % 2 === 0 ) {
    bgStripes.addChild(
      drawRect(
        new Point( canvasWidth / numStripes * s , 0 ),
        canvasWidth / numStripes,
        canvasHeight,
        ink
      )
    );
  }
}

// init circle stripes group
var circleStripes = new Group();

var circleSize = canvasHeight - 20;

// create circle mask
circleStripes.addChild(
  new Path.Circle({
    center: new Point( canvasWidth / 2, canvasHeight / 2 ),
    radius: circleSize / 2
  })
);

circleStripes.clipped = true;

// draw circle stripes
for ( var s = 0; s < numStripes; s++ ){
  if ( s % 2 === 0 ) {
    circleStripes.addChild(
      drawRect(
        new Point( canvasWidth / numStripes * s , 0 ),
        canvasWidth / numStripes,
        canvasHeight,
        ink2
      )
    );
  }
}

// animations
function onFrame( event ) {
  circleStripes.rotate( 2 );
  // circleStripes.position += [ 2, 0 ];

  if ( circleStripes.position.x - circleSize / 2 > canvasWidth ) {
    circleStripes.position.x = 0 - circleSize / 2;
  }
}