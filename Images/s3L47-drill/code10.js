const main = document.querySelector(".game");
const vals = ["💔", "😍"];
const numPlayers = 9;
const numsA = numPlayers > 3 ? 3 : numPlayers;
const game = { players: [], total: 0 };
const scoreDiv = maker("div", main, "score", "Score");
const gameArea = maker("div", main, "gameArea", "");
gameArea.style.setProperty(`grid-template-columns`, `repeat(${numsA},1fr)`);
const coins = [];
const btns = [];
const dashboard = maker("div", main, "dash", "");
makePlayers();
const btn = maker("button", dashboard, "btn", "Flip Coin");
function makePlayers() {
  for (i = 0; i < numPlayers; i++) {
    const player = maker("div", gameArea, "gamer", `Coin ${i + 1}`);
    const Coin = maker("div", player, "coin", "💔");
    Coin.val = 1;
    coins.push(Coin);
    const btn1 = maker("button", player, "btn", `Heads ${vals[1]}`);
    btn1.val = 1;
    btn1.style.backgroundColor = "white";
    btn1.style.color = "black";
    btn1.onclick = flipSelection;
    btns.push(btn1);
    game.players.push(0);
  }
}

btn.onclick = (e) => {
  btn.disabled = true;
  coins.forEach((ele) => {
    ele.style.backgroundColor = "black";
    ele.textContent = " ";
  });
  setTimeout(flipper, 500);
};

function flipSelection(e) {
  const ele = e.target;
  console.log(ele.val);
  if (ele.val == 1) {
    ele.innerHTML = `Tails ${vals[0]}`;
    ele.style.backgroundColor = "black";
    ele.style.color = "white";
    ele.val = 0;
  } else {
    ele.textContent = `Heads ${vals[1]}`;
    ele.style.backgroundColor = "white";
    ele.style.color = "black";
    ele.val = 1;
  }
}

function maker(t, p, c, h) {
  const el = document.createElement(t);
  el.classList.add(c);
  el.innerHTML = h;
  return p.appendChild(el);
}
/*
for (let i = 0; i < 100; i++) {
  const boo = Math.floor(Math.random() * +0.5);
  console.log(boo);
}
*/
function flipper() {
  // check for match
  game.total++;
  coins.forEach((ele, ind) => {
    const boo = Math.floor(Math.random() + 0.5);
    ele.innerHTML = vals[boo];
    console.log(btns[ind].val);
    console.log(ele.val);
    ele.val = boo;
    ele.style.backgroundColor = "gold";
    btn.disabled = false;
    checker(ele.val, btns[ind].val, ind);
  });
  let html = `Total ${game.total}<br>| `;
  game.players.forEach((pla, i) => {
    html += `P${i + 1} (${game.players[i]}) | `;
  });
  scoreDiv.innerHTML = html;
}

function checker(coinVal, btnVal, ind) {
  if (btnVal == coinVal) {
    console.log(`${ind} was correct`);
    game.players[ind]++;
  } else {
    console.log(`${ind} was wrong`);
  }
}
