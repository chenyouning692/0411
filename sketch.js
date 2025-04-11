let circles = []; // 儲存星星的資料
let colors = ['#E9D66B', '#FFBF00', '#FFD700', '#F8DE7E', '#ED9121', '#E25822']; // 指定顏色列表
let iframe; // 用於嵌入網頁的 iframe
let subMenu; // 子選單

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  frameRate(1); // 設定每秒繪製一次

  // 預先生成 40 個星星的資料
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width), // 隨機 X 座標
      y: random(height), // 隨機 Y 座標
      baseSize: random(30, 100), // 隨機基礎大小
      color: random(colors) // 從顏色列表中隨機抽取
    });
  }

  // 建立 iframe
  iframe = createElement('iframe');
  iframe.style('position', 'absolute');
  iframe.style('top', '10%');
  iframe.style('left', '10%');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('border', 'none');
  iframe.style('background-color', 'rgba(255, 255, 255, 0.2)'); // 設定背景透明度
  iframe.hide(); // 預設隱藏 iframe

  // 建立選單
  let menu = createElement('ul');
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('right', '10px');
  menu.style('list-style', 'none');
  menu.style('margin', '0');
  menu.style('padding', '0');
  menu.style('display', 'flex');
  menu.style('gap', '15px');
  menu.style('background-color', '#F7E7CE'); // 設定選單背景顏色

  // 選單項目
  let items = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
  for (let item of items) {
    let li = createElement('li');
    let link = createA('#', item);
    link.style('text-decoration', 'none');
    link.style('color', '#000000'); // 設定文字顏色
    link.style('font-size', '24px'); // 設定文字大小
    link.style('font-family', 'Microsoft JhengHei, sans-serif'); // 設定字型為微軟正黑體
    link.style('padding', '10px 15px');
    link.style('border-radius', '5px');
    link.style('transition', 'background-color 0.3s, color 0.3s');
    link.mouseOver(() => link.style('background-color', '#FF7538')); // 滑鼠懸停時背景顏色
    link.mouseOut(() => link.style('background-color', 'transparent')); // 滑鼠移開時背景顏色
    li.child(link);

    // 如果是「首頁」，隱藏 iframe 和子選單
    if (item === '首頁') {
      link.mousePressed(() => {
        iframe.hide(); // 隱藏 iframe
        if (subMenu) subMenu.hide(); // 隱藏子選單
      });
    }

    // 如果是「作品集」，添加子選單
    if (item === '作品集') {
      subMenu = createElement('ul');
      subMenu.style('list-style', 'none');
      subMenu.style('margin', '0');
      subMenu.style('padding', '20px');
      subMenu.style('position', 'fixed'); // 全螢幕顯示
      subMenu.style('top', '50%'); // 子選單顯示在畫面正中間
      subMenu.style('left', '50%');
      subMenu.style('transform', 'translate(-50%, -50%)'); // 置中
      subMenu.style('background-color', '#F7E7CE');
      subMenu.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
      subMenu.style('border-radius', '10px');
      subMenu.style('display', 'none'); // 預設隱藏子選單

      let subItems = [
        { name: '第一周', link: 'https://hackmd.io/@youning/rys_4IB5Jl' },
        { name: '第二周', link: 'https://hackmd.io/@youning/BJiUBW80Jx' },
        { name: '第三周', link: 'https://hackmd.io/@youning/S1qttOXTJx' },
        { name: '第四周', link: 'https://hackmd.io/@youning/H1m1IZIRJe' }
      ];

      for (let subItem of subItems) {
        let subLi = createElement('li');
        let subLink = createA('#', subItem.name);
        subLink.style('text-decoration', 'none');
        subLink.style('color', '#000000');
        subLink.style('font-size', '20px');
        subLink.style('padding', '10px 20px');
        subLink.style('border-radius', '5px');
        subLink.style('transition', 'background-color 0.3s, color 0.3s');
        subLink.mouseOver(() => subLink.style('background-color', '#FF7538'));
        subLink.mouseOut(() => subLink.style('background-color', 'transparent'));
        subLink.mousePressed(() => {
          iframe.attribute('src', subItem.link); // 設定 iframe 的連結
          iframe.show(); // 顯示 iframe
          subMenu.hide(); // 當 iframe 顯示時，隱藏子選單
        });
        subLi.child(subLink);
        subMenu.child(subLi);
      }

      li.mousePressed(() => {
        // 點擊「作品集」時顯示/隱藏子選單
        subMenu.style('display', subMenu.style('display') === 'none' ? 'block' : 'none');
      });

      li.child(subMenu);
    }

    menu.child(li);
  }
}

function draw() {
  background('#fefae0'); // 背景顏色

  // 繪製所有星星
  for (let circle of circles) {
    let randomFactor = random(0.8, 1.2); // 隨機變化因子
    let size = map(mouseX, 0, width, 10, 120) * (circle.baseSize / 100) * randomFactor; // 根據滑鼠 X 座標調整大小
    fill(circle.color);
    noStroke();
    drawStar(circle.x, circle.y, size, size / 2, 5); // 繪製星星
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}

