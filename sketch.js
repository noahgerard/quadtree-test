
function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function generatePoints(count) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const randomX = Math.floor(Math.random() * WIDTH);
    const randomY = Math.floor(Math.random() * HEIGHT);
    const xVel = Math.random() * 0.5 * (Math.random() < 0.5 ? -1 : 1);
    const yVel = Math.random() * 0.5 * (Math.random() < 0.5 ? -1 : 1);

    points.push({
      x: randomX,
      y: randomY,
      xVel,
      yVel
    });
  }

  return points;
}

const allPoints = generatePoints(100);

function draw() {
  background(220);

  // Update all points
  for (const p of allPoints) {
    p.x += p.xVel;
    p.y += p.yVel;

    // Wrap around
    if (p.x > WIDTH) {
      p.x -= WIDTH;
    } else if (p.x < 0) {
      p.x = WIDTH;
    }

    if (p.y > HEIGHT) {
      p.y -= HEIGHT;
    } else if (p.y < 0) {
      p.y = HEIGHT;
    }
  }

  // Draw all points
  stroke(255, 0, 0);
  strokeWeight(4);
  for (let p of allPoints) {
    point(p.x, p.y)
  }

  // Generate quadtree
  const allRegions = quadTree(WIDTH, HEIGHT, allPoints);

  // Draw Quadtree regions
  noFill();
  strokeWeight(1);
  stroke(0, 0, 0, 10);
  for (let r of allRegions) {
    rect(r.x, r.y, r.width, r.height);
  }
}
