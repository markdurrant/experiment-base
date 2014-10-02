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

// draw a line
function drawLine ( from, to, color, width ) {
  return new Path.Line({
    from: from,
    to: to,
    strokeColor: color,
    strokeWidth: width,
    strokeCap: "round"
  });
}

// get hypotenuse
function getHypotenuse ( a, b ) {
  return Math.sqrt( a * a + b * b );
}

// set base length
var base = 200;

var startingPoint = new Point( 50, 50 );

var tabSize = 50;

var heights = [ 530, 290, 250 ];

// set point heights
var aHeight = 530,
    bHeight = 290,
    cHeight = 250;

// set side lengths
var ab = getHypotenuse( base, Math.abs( heights[0] - heights[1] ) ),
    ac = getHypotenuse( base, Math.abs( heights[0] - heights[2] ) ),
    bc = getHypotenuse( base, Math.abs( heights[1] - heights[2] ) );

var aAngle = Math.acos(
  ( ab*ab + ac*ac - bc*bc ) / ( 2 * ab *ac )
) * 180 / Math.PI;

var bAngle = Math.acos(
  ( ab*ab + bc*bc - ac*ac ) / ( 2 * ab *bc )
) * 180 / Math.PI;

console.log( aAngle );

// draw ab
drawLine(
  startingPoint,
  startingPoint + [ ab, 0 ],
  colors.cyan,
  2
);

// draw ac
drawLine(
  startingPoint,
  startingPoint + [ ac, 0 ],
  colors.magenta,
  2
).rotate( aAngle, startingPoint );

// draw bc
drawLine(
  startingPoint + [ ab, 0 ],
  startingPoint + [ ab, 0 ] + [ bc, 0 ],
  colors.yellow,
  2
).rotate( 180 - bAngle, startingPoint + [ ab, 0 ] );

console.log(
  ab, ac, bc
);

// svg output
var output = $( '#output' );
output.text( project.exportSVG({ asString: true }) );