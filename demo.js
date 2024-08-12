const express = require("express");
const app = express();
const _ = require("lodash");
const db = require("mysql");

// 奖品与概率配置
const rewards = [50, 40, 30, 20, 10];
const probabilities = [5, 20, 50, 250, 1000];

// 抽奖
function goodLuck() {
  let lucky = _.random(1, 1000);
  let money = 0;
  for (let i = 0; i < probabilities.length; i++) {
    const p = probabilities[i];
    if (lucky <= p) {
      money = rewards[i];
      break;
    }
  }
  return money;
}

// 转账
function transfer(account, amount) {
  // ...
  db.record(account, amount);
}

// API
app.get("/click", function (req, res) {
  const amount = goodLuck();
  transfer(req.account, amount);
  res.send("success");
});

app.listen(3000);
