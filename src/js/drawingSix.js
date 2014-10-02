// page dimensions
var canvasElm = $( '#drawingSix' ),
    canvasWidth = canvasElm.width(),
    canvasHeight = canvasElm.height(),
    canvasCenter = new Point( canvasWidth / 2, canvasHeight / 2 );

// colors
var colors = [
  '#0FF',
  '#F0F',
  '#FF0',
  '#F00',
  '#0F0',
  '#00F'
];

// random number wrapper
function randNum ( min, max ) {
  return Math.floor( Math.random() * max ) + min;
}

// pick a random point
function randPoint () {
  return new Point(
    randNum( 0, canvasWidth ),
    randNum( canvasHeight, 0 )
  );
}

// pick a random color
function randColor () {
  return colors[ randNum( 0, colors.length ) ];
}

// draw a circle
function drawCircle ( center, size, color ) {
  return new Path.Circle({
    center: center,
    radius: size / 2,
    strokeColor: color,
    strokeWidth: 2,
    opacity: 0.75,
  });
}