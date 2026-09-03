
// ==========================
// スロットゲーム設定
// ==========================

const symbols = [
    "🍒",
    "🍋",
    "🔔",
    "⭐",
    "7️⃣"
];

const payouts = {
    "🍒": 5,
    "🍋": 8,
    "🔔": 10,
    "⭐": 20,
    "7️⃣": 50
};


// ==========================
// ゲーム状態
// ==========================

let coins = 100;
let bet = 10;
let spinning = false;


// ==========================
// HTML要素
// ==========================

const coinsDisplay = document.getElementById("coins");
const betDisplay = document.getElementById("bet");
const resultDisplay = document.getElementById("result");

const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];

const spinButton = document.getElementById("spinButton");
const minusButton = document.getElementById("betMinus");
const plusButton = document.getElementById("betPlus");


// ==========================
// 表示更新
// ==========================

function updateDisplay() {

    coinsDisplay.textContent = coins;
    betDisplay.textContent = bet;

}


// ==========================
// ランダムな絵柄
// ==========================

function randomSymbol() {

    const index =
        Math.floor(Math.random() * symbols.length);

    return symbols[index];

}


// ==========================
// BETを減らす
// ==========================

minusButton.addEventListener("click", () => {

    if (spinning) return;

    if (bet > 1) {
        bet--;
    }

    updateDisplay();

});


// ==========================
// BETを増やす
// ==========================

plusButton.addEventListener("click", () => {

    if (spinning) return;

    if (bet < coins) {
        bet++;
    }

    updateDisplay();

});


// ==========================
// スロットを回す
// ==========================

spinButton.addEventListener("click", spin);


function spin() {

    if (spinning) return;


    // コイン不足
    if (coins < bet) {

        resultDisplay.textContent =
            "コインが足りません！";

        return;
    }


    // BETを支払う
    coins -= bet;

    updateDisplay();


    spinning = true;

    spinButton.disabled = true;

    resultDisplay.textContent = "SPINNING...";


    // 全リールを回転開始
    reels.forEach(reel => {

        reel.classList.add("spinning");

    });


    // リールごとに止める
    setTimeout(() => {

        stopReel(0);

    }, 1000);


    setTimeout(() => {

        stopReel(1);

    }, 1600);


    setTimeout(() => {

        stopReel(2);

        finishSpin();

    }, 2200);

}


// ==========================
// リールを止める
// ==========================

function stopReel(index) {

    reels[index].classList.remove("spinning");

    reels[index].textContent =
        randomSymbol();

}


// ==========================
// 結果判定
// ==========================

function finishSpin() {

    setTimeout(() => {

        const result = reels.map(
            reel => reel.textContent
        );


        const [a, b, c] = result;


        // 3つ揃った
        if (a === b && b === c) {

            const multiplier = payouts[a];

            const win = bet * multiplier;

            coins += win;

            resultDisplay.textContent =
                `🎉 JACKPOT！ +${win} COINS`;

        }

        // 2つ揃った
        else if (a === b || b === c || a === c) {

            const win = bet * 2;

            coins += win;

            resultDisplay.textContent =
                `✨ 2つ揃い！ +${win} COINS`;

        }

        // ハズレ
        else {

            resultDisplay.textContent =
                "😢 はずれ...";

        }


        updateDisplay();


        spinning = false;

        spinButton.disabled = false;


        // ゲームオーバー
        if (coins <= 0) {

            resultDisplay.textContent =
                "💀 GAME OVER";

            spinButton.disabled = true;

        }

    }, 100);

}


// ==========================
// 最初の表示
// ==========================

updateDisplay();

