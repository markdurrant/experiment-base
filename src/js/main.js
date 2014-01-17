/*global $:true, console:true, document:true*/
(function (){
  'use strict';

  console.log('main.js\n-------------------------------');


  function testbed (  ) {
    // get element
    var canvas = document.getElementById('testCanvas');
    if (canvas === void 0 || canvas === null) {
      return;
    }
    var ctx = canvas.getContext('2d');

    // get center & scale
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;;
    var scale = [canvas.width, canvas.height];

    ctx.strokeStyle = 'hsl(220,20%,25%)';
    ctx.lineWidth = 1;

    for (var i = 10; i >= 1; i--) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, scale[0] / 9 + 12 * i, 0, Math.PI * 2, false);
      ctx.stroke();
    }

    ctx.strokeStyle = 'hsla(220,20%,25%, .5)';
    ctx.lineWidth = 13;

    for (var j = 10; j >= 1; j--) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, scale[0] / 8.125 + 12 * j, Math.PI * 1.75, Math.PI * (1.75 + 2.5 / 13 * j) , false);
      ctx.stroke();
    }

    ctx.strokeStyle = 'hsl(320,90%,53%)';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(centerX + 200, centerY - 200);
    ctx.lineTo(centerX - 200, centerY + 200);
    ctx.stroke();
  }

  testbed();

  console.log('-------------------------------');

})();