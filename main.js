const sw = document.body.clientWidth;
const sh = document.body.clientHeight;
const cw = sw - (sw / 70);
const ch = sh - (sh / 70);
let scale = 100;
let lformula = "3x+2";

function setup() {
    createCanvas(cw, ch);
    const canvas = document.getElementById("defaultCanvas0");
    const main = document.getElementsByTagName("main").item(0);

    canvas.classList.add("w-full");
    canvas.classList.add("h-full");
    main.classList.add("w-full");
    main.classList.add("h-full");

    if (!isBahman25Or26()){
        document.getElementById("hbd").classList.add("hidden");
    } else {
        console.log("happy birthday...")
    }
}

function isBahman25Or26() {
    const g2j = (gy, gm, gd) => {
        const g_d_m = [0, 31, (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let gy2 = (gm > 2) ? (gy + 1) : gy;
        let days = 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400);
        for (let i = 0; i < gm; i++) days += g_d_m[i];
        days += gd - 79;
        let jy = 979 + 33 * Math.floor(days / 12053);
        days %= 12053;
        jy += 4 * Math.floor(days / 1461);
        days %= 1461;
        if (days >= 366) {
            jy += Math.floor((days - 1) / 365);
            days = (days - 1) % 365;
        }
        let jm = (days < 186) ? (1 + Math.floor(days / 31)) : (7 + Math.floor((days - 186) / 30));
        let jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        return { jy, jm, jd };
    };

    let today = new Date();
    let { jm, jd } = g2j(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return jm === 11 && (jd === 25 || jd === 26);
}

function draw() {
    background(51);
    stroke(250);
    strokeWeight(4);
    line(cw / 2, 0, cw / 2, ch);
    line(0, ch / 2, cw, ch / 2);
    text("(0,0)", cw / 2, ch / 2);
    noLoop();
}

document.getElementById("clear").addEventListener("click", () => {
    draw();
});

function drawFormula(formula) {
    lformula = formula;
    formula = formula.toLowerCase();
    formula.replace("cos", "Math.cos");
    formula.replace("sin", "Math.sin");
    formula.replace("tan", "Math.tan");
    const func = new Function('x', 'return ' + formula);

    const centerX = cw / 2;
    const centerY = ch / 2;

    let prevX, prevY;

    for (let i = 0; i < cw; i++) {
        let x = (i - centerX) / scale;
        let y = func(x);
        let j = centerY - (y * scale);

        if (i > 0) {
            line(prevX, prevY, i, j);
        }

        prevX = i;
        prevY = j;
    }
}


document.getElementById("draw").addEventListener("click", () => {
    drawFormula(document.getElementById("formula").value);
})

document.getElementById("scale").addEventListener("change", () => {
    scale = document.getElementById("scale").value;
    // drawFormula(lformula);
})