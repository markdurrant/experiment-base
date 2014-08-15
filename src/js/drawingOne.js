// page dimensions
var canvasElm = $( '#drawingOne' ),
  canvasWidth = canvasElm.width(),
  canvasHeight = canvasElm.height();

console.log(
  "canvas width:", canvasWidth,
  "canvas height:", canvasHeight
);

// colors
var color = {
  paper:   "#FFF",
  ink:     "#000",
  guide:   "#AAF",
  cyan:    "#0FF",
  fuchsia: "#F0F",
  yellow:  "#FF0"
};

// blend mode
var blendMode = 'multiply';

// draw a square
function drawSquare ( center, size, color ) {
  return new Path.Rectangle({
    point: center - size / 2,
    size: new Point( size , size ),
    fillColor: color,
    blendMode: blendMode
  });
}

// draw a line
function drawLine ( from, to, color ) {
  return new Path.Line({
    from: from,
    to: to,
    strokeColor: color,
    blendMode: blendMode
  });
}

// guide
drawLine(
  new Point( 0 ,canvasHeight / 2 ),
  new Point( canvasWidth, canvasHeight / 2 ),
  'black'
);

// size of squares
var squareSize = 100;

// draw colored squares off screen
var cyanSquare = drawSquare(
  new Point( canvasWidth / 2, canvasHeight / 2 ),
  squareSize,
  color.cyan
),
fuchsiaSquare = drawSquare(
  new Point( canvasWidth / 2, canvasHeight / 2 ),
  squareSize,
  color.fuchsia
),
yellowSquare = drawSquare(
  new Point( canvasWidth / 2, canvasHeight / 2 ),
  squareSize,
  color.yellow
);

// group all the squares
var group = new Group([
  cyanSquare,
  fuchsiaSquare,
  yellowSquare
]);

// init counter
var count = 0;

// animation
function onFrame( event ) {

  // rotate cyanSquare
  if ( event.count % 180 < 45 ) {
    cyanSquare.rotate( 2 );
  }
  // rotate yellowSquare
  if ( event.count % 180 < 90 ) {
    yellowSquare.rotate( 2 );
  }
  // rotate fuchsiaSquare
  if ( event.count % 180 < 135 ) {
    fuchsiaSquare.rotate( 2 );
  }

  // move the group
  group.position.x += 1;

  // if the group goes off screen move it back to the start
  if ( group.position.x - squareSize / 2 > canvasWidth ) {
    group.position.x = 0 - squareSize / 2;
  }
}