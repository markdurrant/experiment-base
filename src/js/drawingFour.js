// page dimensions
var canvasElm = $( '#drawingFour' ),
    canvasWidth = canvasElm.width(),
    canvasHeight = canvasElm.height(),
    xCenter = canvasWidth / 2,
    yCenter = canvasHeight / 2,
    center = new Point( xCenter, yCenter ),
    size = 0;

var center = new Point( canvasWidth / 2, canvasHeight / 2 );

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

// pick a random colour
function randColor () {
  return colors[ randNum( 0, colors.length ) ];
}

// draw a circle
function drawCircle ( center, size, color ) {
  return new Path.Circle({
    center: center,
    radius: size / 2,
    fillColor: color,
    blendMode: 'screen'
  });
}

// get difference between two numbers
function getOffset ( no1, no2 ) {
  var offset = no1 - no2;

  if ( offset <= 0 ) {
    offset = offset * -1;
  }

  return offset;
}

// get distance between two points
function getDistance ( point1, point2 ) {
  var xDistance = getOffset( point1.x, point2.x ),
      yDistance = getOffset( point1.y, point2.y );

  var distance = Math.sqrt( xDistance * xDistance, yDistance * yDistance );

 return distance;
}

// set maximum distance from center
if ( canvasWidth < canvasHeight ) {
  var maxDistance = canvasWidth / 2;
} else {
  var maxDistance = canvasHeight / 2;
}

for ( var i = 0; i < 1; i++ ) {
  var myPoint = new Point(
    randNum( 0, canvasWidth ),
    randNum( 0, canvasHeight )
  );

  drawCircle(
    myPoint,
    getDistance( center, myPoint ) / 2 ,
    randColor()
  );

  console.log( "point:", myPoint, "distance:", getDistance( myPoint, center ) );
}

// animation
function onFrame( event ) {

}