function setup() {
  createCanvas(500, 900);
  
  colorMode(RGB);
  background(255,255,255);
  
  let myBlue = color(0, 0, 255);
  let myYellow = color(255, 255, 0);
  let myRed = color(255, 0, 0);
  let myGreen = color(00, 255, 127);
  
  // --- set the three colors
  let color1 = myBlue;
  let color2 = myYellow;
  let color3 = myRed;
  
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
  
  let diam = 300;
  drawAll(200, 190, diam, color1, color2, color3, true);
  drawAll(200, 550, diam, color1, color2, color3, false);  
}

function draw() {
}

function mousePressed() {
  let pix = get(mouseX, mouseY);
  console.log('RGB: #' + hex(red(pix), 2) + hex(green(pix), 2) + hex(blue(pix), 2) + ', alpha: ' + alpha(pix));
}

//
//  --- Utility
//

function drawAll(centerX, centerY, diam, color1, color2, color3, interRGB) {
  textSize(20);
  stroke(0, 0, 0);
  if (interRGB) {
    text('RGB interpolation', 0, centerY - diam / 2 - 8);  
  } else {
    text('Hue interpolation', 0, centerY - diam / 2 - 8);
  }
  
  // --- color wheel
  let pCenter = createVector(centerX, centerY);
  let myPointList = drawColorWheel(pCenter, diam);
    
  // --- find the closest three points among the color wheel points
  let found1 = findClosestPoint(myPointList, color1, null);
  let found2 = findClosestPoint(myPointList, color2, null);
  let found3 = findClosestPoint(myPointList, color3, null);

  // --- draw trajectory
  drawTrajectory(myPointList, found1, found2, found3, interRGB);
  
  // --- draw gradient box
  drawGradientBar(pCenter.x + diam / 2 + 30, pCenter.y - diam / 2, 30, diam, 
                  found1, found2, found3, interRGB);  
}

// Draw the gradient bar
function drawGradientBar(x0, y0, w, h, found1, found2, found3, interRGB) {
  colorMode(RGB);
  strokeWeight(1);  
  stroke(0, 0, 0);
  rect(x0, y0, w, h);
  
  for (let y = h - 1; y > 0; y--) {
    let c = interpolateColors(found1.color, found2.color, found3.color, (h - y) / h, interRGB);   
    stroke(c);
    line(x0, y0 + y, x0 + w, y0 + y);
  }
}

// Interpolate between three colors
function interpolateColors(startColor, middleColor, endColor, coeff, interRGB) {
  colorMode(RGB);
  let c = color(0, 0, 0);
  if (coeff < 0.5) {
    let newcoef = coeff * 2;
    c = interpolateRGB(startColor, middleColor, newcoef, interRGB);
  } else {
    let newcoef = (coeff - 0.5) * 2;
    c = interpolateRGB(middleColor, endColor, newcoef, interRGB);    
  }
  return c;
}


function interpolateRGB(color1, color2, coeff, interRGB) {
  if (coeff < 0) coeff = 0;
  if (coeff > 1) coeff = 1;
  
  if (interRGB) {
    colorMode(RGB);
    // same as lerpColor
    //return lerpColor(color1, color2, coeff);
    let r = Math.round(red(color1)  + (red(color2) - red(color1)) * coeff);  
    let g = Math.round(green(color1)  + (green(color2) - green(color1)) * coeff);  
    let b = Math.round(blue(color1)  + (blue(color2) - blue(color1)) * coeff);  
    return color(r, g, b);    
  } else {
    // interpolate by hue
    colorMode(HSB);
    let h1 = hue(color1);
    let h2 = hue(color2);
    
    let hFinal = Math.round(h1 + (h2 - h1) * coeff);
    return color(hFinal, 100, 100);
  }
}

// Draw the trajectory between three colors
function drawTrajectory(myPointList, found1, found2, found3, interRGB) {
  colorMode(RGB);
  stroke(0, 0, 0);
  strokeWeight(10);  
  
  const num = 30;
  let found = null;
  for (let i = 0; i <= num; i++) {
    let c = interpolateColors(found1.color, found2.color, found3.color, i / num, interRGB);    
    found = findClosestPoint(myPointList, c, found);
    point(found.x, found.y)
  }
}

function findClosestPoint(myPointList, color, prevPoint) {
  let found = myPointList.find(p => p.color == color);
  let vectorColor = createVector(red(color), green(color), blue(color));
  let minDistance = 100000;
  let minIndex = -1;
  let distances = new Array();
  for (let i = 0; i < myPointList.length; i++) {
    let color1 = myPointList[i].color;
    let vector1 = createVector(red(color1), green(color1), blue(color1));
    let distance = vectorColor.dist(vector1);
    
    distances.push(distance);
    if (distance < minDistance) {
      minIndex = i; 
      minDistance = distance;
    }
  }

  // favor the closest point to the previous one in case of similar colors
  //if (prevPoint !== null) {
  //  let vectorPrev = createVector(prevPoint.x, prevPoint.y);
  //  let minDistanceP = 100000;
  //
  //  for (let i = 0; i < distances.length; i++) {
  //    let diff = abs(distances[i] - minDistance); 
  //    if (diff < 0.01)  {
  //      let vectorPoint = createVector(myPointList[i].x, myPointList[i].y);
  //      let distanceP = vectorPrev.dist(vectorPoint);
  //      if (distanceP < minDistanceP) {
  //        minIndex = i; 
  //        minDistanceP = distanceP;
  //      }        
  //    }
  //  }  
  //}
  
  return myPointList[minIndex];
}

// Draw the color wheel and get back the points+colors used to draw it
function drawColorWheel(pCenter, myDiam) {
  let myPointList = new Array();  
  colorMode(HSB);
  
  for (let degree = 0; degree < 360; degree++) {
    let myHue = degree;

    // trigonometry (with radius 1)
    let angleRad = deg2rad(degree);
    let opp = Math.sin(angleRad) * 1;
    let adj = Math.cos(angleRad) * 1;

    for (mySaturation = 0; mySaturation <= 100; mySaturation++) {
      let myColor = color(myHue, mySaturation, 100);
      stroke(myColor);     

      // draw point
      strokeWeight(5);
      let x = adj * (myDiam / 2) * mySaturation / 100 + pCenter.x;
      let y = opp * (myDiam / 2) * mySaturation / 100 + pCenter.y;
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
  let pi = Math.PI;
  return degrees * (pi/180);
}