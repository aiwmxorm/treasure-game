/* =========================================================
   treasure.js —— 寻宝核心逻辑（async/await）
   ========================================================= */
class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => resolve('在古老的图书馆里找到了第一个线索...'), 1000);
    });
  }
  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) return reject('没有线索可以解码!');
        // ⭐ 不再指定神庙
        resolve('藏宝点已浮现，具体在哪个遗迹需自行探索...');
      }, 1500);
    });
  }
  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) return reject('糟糕!遇到了守卫袭击!');
        resolve('找到了一个神秘的箱子...');
      }, 2000);
    });
  }
  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => resolve('恭喜!你找到了传说中的宝藏!'), 1000);
    });
  }
}

async function findTreasureWithAsync(handlers = {}) {
  const { onClue, onLocation, onBox, onTreasure, onError, onFinish } = handlers;
  try {
    const clue = await TreasureMap.getInitialClue();
    onClue && onClue(clue);
    const location = await TreasureMap.decodeAncientScript(clue);
    onLocation && onLocation(location);
    const box = await TreasureMap.searchTemple(location);
    onBox && onBox(box);
    const treasure = await TreasureMap.openTreasureBox();
    onTreasure && onTreasure(treasure);
    onFinish && onFinish(true);
  } catch (error) {
    onError && onError(error);
    onFinish && onFinish(false);
  }
}

function findTreasureWithPromises() {
  TreasureMap.getInitialClue()
    .then(clue => { console.log(clue); return TreasureMap.decodeAncientScript(clue); })
    .then(location => { console.log(location); return TreasureMap.searchTemple(location); })
    .then(box => { console.log(box); return TreasureMap.openTreasureBox(); })
    .then(treasure => console.log(treasure))
    .catch(error => console.error('任务失败:', error));
}