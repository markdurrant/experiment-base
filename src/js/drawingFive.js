// page dimensions
var canvasElm = $( '#drawingFive' ),
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

// pick a random color
function randColor () {
  return colors[ randNum( 0, colors.length ) ];
}

// draw a circle
function drawCircle ( center, size, color ) {
  return new Path.Circle({
    center: center,
    radius: size / 2,
    fillColor: color,
    opacity: 0.75,
    blendMode: 'screen'
  });
}

// max distance
if ( canvasWidth > canvasHeight ) {
  var maxDist = canvasHeight / 2;
} else {
  var maxDist = canvasWidth / 2;
}
// create circles group
var circles = new Group();

// create a random point
// function getRandPoint () {
//   var randPoint = new Point(
//     randNum( 0, canvasWidth ),
//     randNum( 0, canvasHeight )
//   );

//   if ( randPoint.getDistance( canvasCenter ) > maxDist ) {
//     randPoint = new Point(
//       randNum( canvasWidth / 2 - 100, canvasWidth / 2  + 100 ),
//       randNum( 0, canvasHeight )
//     );
//   }

//   return randPoint;
// }

// animations
function onFrame( event ) {
  for ( var i = 0; i < 100; i ++ ) {
    // get random point
    var randPoint = new Point(
      randNum( 0, canvasWidth ),
      randNum( 0, canvasHeight )
    );

    // get distance from center
    var centerDist = randPoint.getDistance( canvasCenter );

    if ( centerDist - maxDist > 0 ) {
      centerDist = maxDist;
    }

    // add circle to circles group
    // size circle based on distance from center
    circles.addChild(
      drawCircle( randPoint, ( centerDist - maxDist ) / -5, randColor() )
    );
  }

  // if more than 500 children in circles group delete one
  if ( circles.children.length > 1000 ){
    circles.removeChildren( 0, 100 );
  }
}




