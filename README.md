# ColorWheelTrajectoryGradient
A study on the color wheel and the gradient derived by interpolating three colors

**Language: Javascript**

**Start: 2022**

## Why
I needed to study how RGB and hue interpolations behave. I decided to try out the [p5.js library](https://p5js.org/) for this. The idea is to define three colors (the start, the middle and the end), identify them as points on the color wheel and draw a trajectory passing through them. Also, a gradient bar is drawn by using the interpolated colors. 

It is useful to keep in mind the [HSV (hue, saturation, value = brightness)](https://en.wikipedia.org/wiki/HSL_and_HSV) system. Here is a HSV cylinder:

![Example](/images/color_wheel.jpg)

A few simple of observations:
- The color wheel is just one layer of the HSV cylinder
- RGB is based on three bytes (red, green and blue) and all together can represent 16 million of colors (many of which are indistinguishable to the naked eye)

$$ 256^3 = 2^{24} = 16,777,216 $$

- HSV is based on three integers (hue (360 degree), saturation (0 - 100) and value (0 - 100)) and they can represent less than 4 million of colors

$$ 360 \cdot 100 \cdot 100 = 3,600,000 $$

- The trajectory identified by interpolating with RGB can be misleading since not all the RGB colors can be found on the HSV color wheel

## Example blue - yellow - red

Colors:
- start: blue
- middle: yellow
- end: red

![Example](/images/example1.jpg)

## Example blue - green - yellow

Colors:
- start: blue
- middle: green
- end: yellow

![Example](/images/example2.jpg)

## Example with three shades of blue

![Example](/images/example3.jpg)
