# ColorWheelTrajectoryGradient
A study on the color wheel and the gradient derived by interpolating three colors

**Language: Javascript**

**Start: 2022**

## Why
I needed to study how RGB and hue interpolation behaved on the color wheel. I decided to try out the [p5.js library](https://p5js.org/). Three points are defined over the color wheel: the start, the middle and the end. The trajectories and gradient bars are drawn by interpolating the three colors by both RGB and hue.

It is useful to keep in mind the [HSV (hue, saturation, value = brightness)](https://en.wikipedia.org/wiki/HSL_and_HSV) system. Here is a HSV cylinder:

![Example](/images/color_wheel.jpg)


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
