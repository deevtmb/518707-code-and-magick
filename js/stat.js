'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 50;
var FONT_GAP = 190;
var TITLE_GAP = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, width, height, gap, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + (width / 2), y + gap);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width - gap, y + (height / 2));
  ctx.lineTo(x + width, y + height);
  ctx.lineTo((x + width / 2), y + height - gap);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + gap, y + (height / 2));
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderTitle = function (ctx, font, color) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + TITLE_GAP, CLOUD_Y + TITLE_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TITLE_GAP, CLOUD_Y + TITLE_GAP * 2);
};

var renderCharts = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var playerBar = (BAR_HEIGHT * times[i]) / maxTime;

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var randomSaturation = Math.floor(Math.random() * 200) + 55;
      toString(randomSaturation);
      ctx.fillStyle = 'rgba(0, 0, ' + randomSaturation + ', 1)';
    }

    ctx.fillRect(CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_GAP + TITLE_GAP + GAP + (BAR_HEIGHT - playerBar), BAR_WIDTH, playerBar);

    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_GAP + GAP + (BAR_HEIGHT - playerBar));
    ctx.fillText(names[i], CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + GAP + FONT_GAP);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_GAP, '#ffffff');
  renderTitle(ctx, '16px PT Mono', '#000000');
  renderCharts(ctx, names, times);
};
