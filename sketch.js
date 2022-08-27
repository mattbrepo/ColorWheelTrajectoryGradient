function setup() {
  createCanvas(500, 400);
}

function draw() {
  colorMode(RGB);
  background(255,255,255);
  
  // --- color circle
  pCenter = createVector(200, 200);
  myDiam = 380;
  myPointList = drawColorCircle(pCenter, myDiam);
    
  // --- draw trajectory
  myBlue = color(0, 0, 255);
  myYellow = color(255, 255, 0);
  myRed = color(255, 0, 0);
  myGreen = color(00, 255, 127);
  
  color1 = myBlue;
  color2 = myYellow;
  color3 = myRed;
  
  if (false) {
    color1 = myBlue;
    color2 = myGreen;
    color3 = myYellow;    
  }

  if (false) {
    color1 = color('#D4FAF7');
    color3 = color('#0D999D');    
    color2 = lerpColor(color1, color3, 0.48);
  }

  founds = drawTrajectory(myPointList, color1, color2, color3);
  
  // --- draw gradient box
  drawGradientBar(pCenter.x + myDiam / 2 + 30, pCenter.y - myDiam / 2, 30, myDiam, founds);
}

//
//  --- Utility
//

// Draw the gradient bar
function drawGradientBar(x0, y0, w, h, founds) {
  colorMode(RGB);
  strokeWeight(1);  
  stroke(0, 0, 0);
  rect(x0, y0, w, h);
  
  for (y = h - 1; y > 0; y--) {
    c = interpolateColors(founds[0].color, founds[1].color, founds[2].color, (h - y) / h);    
    stroke(c);
    line(x0, y0 + y, x0 + w, y0 + y);
  }
}

// Interpolate between three colors
function interpolateColors(startColor, middleColor, endColor, coeff) {
  colorMode(RGB);
  if (coeff < 0.5) {
    newcoef = coeff * 2;
    c = interpolateRGB(startColor, middleColor, newcoef);
  } else {
    newcoef = (coeff - 0.5) * 2;
    c = interpolateRGB(middleColor, endColor, newcoef);    
  }
  return c;
}

// Same as lerpColor
function interpolateRGB(color1, color2, coeff) {
  if (coeff < 0) coeff = 0;
  if (coeff > 1) coeff = 1;
  r = Math.round(red(color1)  + (red(color2) - red(color1)) * coeff);  
  g = Math.round(green(color1)  + (green(color2) - green(color1)) * coeff);  
  b = Math.round(blue(color1)  + (blue(color2) - blue(color1)) * coeff);  
  return color(r, g, b);
}

// Draw a linear trajectory between three colors
function drawTrajectory(myPointList, color1, color2, color3) {
  colorMode(RGB);
  stroke(0, 0, 0);
  strokeWeight(1);  
  found1 = findClosestPoint(myPointList, color1);
  found2 = findClosestPoint(myPointList, color2);
  found3 = findClosestPoint(myPointList, color3);
  line(found1.x, found1.y, found2.x, found2.y);
  line(found2.x, found2.y, found3.x, found3.y);
  return [found1, found2, found3];
}

function findClosestPoint(myPointList, color) {
  found = myPointList.find(p => p.color == color);
  vectorColor = createVector(red(color), green(color), blue(color));
  minDistance = 100000;
  minIndex = -1;
  for (i = 0; i < myPointList.length; i++) {
    color1 = myPointList[i].color;
    vector1 = createVector(red(color1), green(color1), blue(color1));
    distance = vectorColor.dist(vector1);
    if (distance < minDistance) {
      minIndex = i; 
      minDistance = distance;
    }
  }
  return myPointList[minIndex];
}

// Draw the color circle and get back the points+colors used to draw it
function drawColorCircle(pCenter, myDiam) {
  myPointList = new Array();  
  colorMode(HSB);
  
  for (degree = 0; degree < 360; degree++) {
    myHue = degree;

    // trigonometry (with radius 1)
    myAngle = degree;
    angleRad = deg2rad(myAngle);
    opp = Math.sin(angleRad) * 1;
    adj = Math.cos(angleRad) * 1;

    for (mySaturation = 0; mySaturation <= 100; mySaturation++) {
      myColor = color(myHue, mySaturation, 100);
      stroke(myColor);     

      // draw point
      strokeWeight(5);
      x = adj * (myDiam / 2) * mySaturation / 100 + pCenter.x;
      y = opp * (myDiam / 2) * mySaturation / 100 + pCenter.y;
      point(x, y);
      
      // save point
      myPointList.push({x: x, y: y, color: myColor});
    }
  }
  
  colorMode(RGB);
  return myPointList;
}

function myLine(start, end) {
  line(start.x, start.y, end.x, end.y);
}

function deg2rad(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}
