var colors = [
  "#F09",
  "#F90",
  "#09F",
  "#0F9",
  "#9F0",
  "#90F"
];

// canvas dimensions
var  canvasElm = $( '#drawingTwo' ),
   canvasWidth = canvasElm.width(),
  canvasHeight = canvasElm.height(),
        center = new Point( canvasWidth / 2, canvasHeight / 2 );

canvasElm.css( 'background', '#345' );

// random number wrapper
function randNum ( min, max ) {
  return Math.floor( Math.random() * max ) + min;
}

// draw a circle
function drawCircle ( center, size, color) {
  return [ new Path.Circle({
    center: center,
    radius: size / 2,
    fillColor: color,
    blendMode: 'screen'
  }),
  new Path.Circle({
    center: center,
    radius: size / 2,
    // strokeColor: "black",
    strokeWidth: 3
  })];
}

// draw some random dots
for ( var d = 0; d < 50; d++ ) {
  drawCircle(
    new Point( randNum( 0, canvasWidth ), randNum( 0, canvasHeight ) ),
    randNum( 5, 250 ),
    colors[ randNum( 0, colors.length ) ]
  );
}

// // hide browser cursor
// canvasElm.css( 'cursor', 'none' );

// // draw cursor dot
// var cursor = new Path.Circle({
//   center: center,
//   radius: 6,
//   strokeColor: "#0BF",
//   strokeWidth: 6,
//   blendMode: 'screen'
// });

// // track cursor with circle
// function onMouseMove ( event ) {
//   cursor.position = event.point;
// }

// animate
function onFrame ( event ) {

}