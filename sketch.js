
let r1;
let r2;
let m1;
let m2;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 1;
let x1;
let x2;
let y1;
let y2;

let px2 = -1;
let py2 = -1;
let cx, cy;

let buffer;

let slider_m1;
let slider_m2;
let slider_r1;
let slider_r2;

let locked = false;

function setup() {
  createCanvas(1000, 600);
  a1 = PI / 2;
  a2 = PI / 2;
  cx = width / 2;
  cy = 100;

  slider_m1 = createSlider(5,45,10);
  slider_m1.position(100,height-100);

  slider_m2 = createSlider(5,45,10);
  slider_m2.position(100,height-120);

  slider_r1 = createSlider(50,250,50);
  slider_r1.position(100,height-140);

  slider_r2 = createSlider(50,250,50);
  slider_r2.position(100,height-160);



  buffer = createGraphics(width, height);
  buffer.background(255);
}

function mousePressed() {
    buffer.clear();
    locked = true;
    a1,a2,a1_v,a1_a,a2_v,a2_a = 0;
  }

function mouseReleased() {
  locked = false;
  a1,a2,a1_v,a1_a,a2_v,a2_a = 0;

}

function mouseDragged(){
    if(locked){
        a1,a2,a1_v,a1_a,a2_v,a2_a = 0;
        a2 = -atan2(mouseY-y1,mouseX-x1)+20
    }
}
function draw() {
  background(255);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  m1 = slider_m1.value();
  m2 = slider_m2.value();
  r1 = slider_r1.value();
  r2 = slider_r2.value();

  
  stroke(0);
  strokeWeight(2);

  x1 = r1 * sin(a1)+cx;
  y1 = r1 * cos(a1)+cy;

  x2 = x1 + r2 * sin(a2);
  y2 = y1 + r2 * cos(a2);

  line(cx, cy, x1, y1);
  fill(0);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  ellipse(x2, y2, m2, m2);

  if (!locked){

    let term1 = -g * (2 * m1 + m2) * sin(a1);
    let term2 = -m2 * g * sin(a1 - 2 * a2);
    let term3 = -2 * sin(a1 - a2) * m2;
    let term4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    a1_a = (term1 + term2 + term3 * term4) / den;
  
    term1 = 2 * sin(a1 - a2);
    term2 = a1_v * a1_v * r1 * (m1 + m2);
    term3 = g * (m1 + m2) * cos(a1);
    term4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    a2_a = (term1 * (term2 + term3 + term4)) / den;
  
  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  buffer.stroke(0,0,0,125);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }
  }

  px2 = x2;
  py2 = y2;

}