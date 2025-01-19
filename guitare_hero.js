const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const song = document.querySelector("audio");
let lose = false;
let once = true;
let score = 0;
let idAnimation = null;
let MAXIMUM_VALID = 730;
let MINIMUM_VALID = 570;

class Line {
  constructor() {
    this.color = "white";
    this.x = 10;
    this.y = 680;
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.lineTo(380, this.y);
    ctx.stroke();

    //Touche T1
    ctx.beginPath();
    ctx.fillStyle = "aqua";
    ctx.arc(45, this.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.arc(45, this.y, 20, 0, Math.PI * 2);
    ctx.fill();

    //Touche T2
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(145, this.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.arc(145, this.y, 20, 0, Math.PI * 2);
    ctx.fill();

    //Touche T3
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.arc(245, this.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.arc(245, this.y, 20, 0, Math.PI * 2);
    ctx.fill();

    //Touche T4
    ctx.beginPath();
    ctx.fillStyle = "violet";
    ctx.arc(345, this.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.arc(345, this.y, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Tile {
  constructor() {
    this.x = 20;
    this.y = 40;
    this.speed = Math.random() * 4 + 6;
    this.sizeX = 50;
    this.color = "aqua";
  }
  intoTop() {
    this.x = 20;
    this.y = 40;
    this.speed = Math.random() * 4 + 6;
    this.sizeX = 50;
  }
  update() {
    this.y += this.speed;
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(
      this.x + this.sizeX / 2,
      this.y + this.sizeX / 50,
      20,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.lineWidth = 1;
    ctx.arc(this.x + 25, this.y, this.sizeX - 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(
      this.x + this.sizeX / 2,
      this.y + this.sizeX / 50,
      20,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

const line = new Line();
const t1 = new Tile();
const t2 = new Tile();
t2.x += 100;
t2.color = "green";
const t3 = new Tile();
t3.x += 200;
t3.color = "orange";
const t4 = new Tile();
t4.x += 300;
t4.color = "violet";

window.addEventListener("keypress", (e) => {
  lose = true;
  if (once) {
    song.play();
    once = false;
  }
  if (e.key == "s" && t1.y > MINIMUM_VALID && t1.y < MAXIMUM_VALID) {
    t1.intoTop();
    lose = false;
    score++;
  }
  if (e.key == "d" && t2.y > MINIMUM_VALID && t2.y < MAXIMUM_VALID) {
    t2.intoTop();
    t2.x = 120;
    lose = false;
    score++;
  }
  if (e.key == "k" && t3.y > MINIMUM_VALID && t3.y < MAXIMUM_VALID) {
    t3.intoTop();
    t3.x = 220;
    lose = false;
    score++;
  }
  if (e.key == "l" && t4.y > MINIMUM_VALID && t4.y < MAXIMUM_VALID) {
    t4.intoTop();
    t4.x = 320;
    lose = false;
    score++;
  }
  if (lose) {
    song.pause();
    cancelAnimationFrame(idAnimation);
  }
});

const handleTile = () => {
  t1.update();
  t1.draw();
  t2.update();
  t2.draw();
  t3.update();
  t3.draw();
  t4.update();
  t4.draw();
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(20, 90);
  ctx.strokeStyle = "gray";
  ctx.lineTo(370, 90);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, 190);
  ctx.strokeStyle = "gray";
  ctx.lineTo(370, 190);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, 290);
  ctx.strokeStyle = "gray";
  ctx.lineTo(370, 290);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, 390);
  ctx.strokeStyle = "gray";
  ctx.lineTo(370, 390);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, 490);
  ctx.strokeStyle = "gray";
  ctx.lineTo(370, 490);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, 590);
  ctx.strokeStyle = "gray";
  ctx.lineTo(370, 590);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(10, 70);
  ctx.strokeStyle = "gray";
  ctx.lineTo(10, 700);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(380, 70);
  ctx.strokeStyle = "gray";
  ctx.lineTo(380, 700);
  ctx.stroke();

  handleTile();
  line.draw();

  ctx.beginPath();
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "yellow";
  ctx.strokeText("score : " + score, 190, 25);
  idAnimation = requestAnimationFrame(animate);
  if (t1.y > MAXIMUM_VALID) {
    cancelAnimationFrame(idAnimation);
    t1.color = "red";
    t1.draw();
    song.pause();
  }
  if (t2.y > MAXIMUM_VALID) {
    cancelAnimationFrame(idAnimation);
    t2.color = "red";
    t2.draw();
    song.pause();
  }
  if (t3.y > MAXIMUM_VALID) {
    cancelAnimationFrame(idAnimation);
    t3.color = "red";
    t3.draw();
    song.pause();
  }
  if (t4.y > MAXIMUM_VALID) {
    cancelAnimationFrame(idAnimation);
    t4.color = "red";
    t4.draw();
    song.pause();
  }
}

animate();
