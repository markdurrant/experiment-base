// page dimensions
var canvasElm = $( '#drawingSix' ),
    canvasWidth = canvasElm.width(),
    canvasHeight = canvasElm.height(),
    canvasCenter = new Point( canvasWidth / 2, canvasHeight / 2 );

// colors
var colors = {
  cyan: '#0FF',
  magenta: '#F0F',
  yellow: '#FF0',
  red: '#F00',
  green: '#0F0',
  blue: '#00F'
};

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
    fillColor: color
  });
}

var height = 300;
var length = 100;

var a = new Point( 100, 50 ),
    b = new Point( a.x - length / 2, a.y + height ),
    c = new Point( a.x + length / 2, a.y + height );

var triangle = new Path({
  segments: [ a, b, c ],
  strokeColor: 'black',
  strokeWidth: 1,
  dashArray: [ 4, 16 ],
  closed: true
});

triangle
  .clone()
  .rotate( ( ( a - c ).angle + 90 ) * 2, a )
  .clone()
  .rotate( ( ( a - c ).angle + 90 ) * 2, a );

var output = $( '#output' );

output.text( project.exportSVG({ asString: true }) );

console.log(
  ( ( a - c ).angle + 90 ) * -2
);