import React from "react";
import { Sketch } from "@p5-wrapper/react"; // Ensuring the import is correct
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const sketch: Sketch = (p5) => {
  let cols: number;
  let rows: number;
  let spacing = 10;
  let size: number[][] = [];
  let scl = 0.10;
  let noiseOffset = 0;

  p5.setup = () => {
    p5.createCanvas(600, 600);
    cols = p5.width / spacing;
    rows = p5.height / spacing;
    p5.rectMode(p5.CENTER);
    p5.noiseSeed(Math.floor(Math.random() * 10000)); // Seed for noise for reproducibility
  };

  p5.draw = () => {
    p5.background(0, 5);
    p5.noCursor();
    noiseOffset += 0.01; // Increment noise offset for evolution over time
    for (let i = 0; i < cols; i++) {
      size[i] = [];
      for (let j = 0; j < rows; j++) {
        let distance = p5.dist(p5.mouseX, p5.mouseY, i * spacing, j * spacing);
        size[i][j] = distance * scl;
        p5.noStroke();
        // Use Perlin noise to dynamically adjust fill color
        let n = p5.noise(i * 0.05, j * 0.05, noiseOffset) * 255;
        p5.fill(n);
        p5.rect(spacing / 2 + i * spacing, spacing / 2 + j * spacing, size[i][j], size[i][j]);
      }
    }
  };
};

export default function P5Block() { // Renamed to follow the convention
  return <NextReactP5Wrapper sketch={sketch} />;
}
