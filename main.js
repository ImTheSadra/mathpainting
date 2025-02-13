const sw = document.body.clientWidth;
const sh = document.body.clientHeight;
const cw = sw-(sw/70);
const ch = sh-(sh/70);
let scale = 100;
let lformula = "3x+2";

function setup(){
    createCanvas(cw,ch);
    const canvas = document.getElementById("defaultCanvas0");
    const main   = document.getElementsByTagName("main").item(0);

    canvas.classList.add("w-full");
    canvas.classList.add("h-full");
    main.classList.add("w-full");
    main.classList.add("h-full");
    
    // translate(cw/2, ch/2);
}

function draw(){
    background(51);
    stroke(250);
    strokeWeight(4);
    line(cw/2, 0, cw/2, ch);
    line(0, ch/2, cw, ch/2);
    text("(0,0)", cw/2, ch/2);
    // translate(cw/2, ch/2);
    noLoop();
}

document.getElementById("clear").addEventListener("click", ()=>{
    // translate(0, 0);
    draw();
    // translate(cw/2, ch/2);
})

function drawFormula(formula) {
    lformula = formula;
    formula.replace("cos", "Math.cos");
    formula.replace("sin", "Math.sin");
    formula.replace("tan", "Math.tan");
    const func = new Function('x', 'return ' + formula);

    const centerX = cw / 2;
    const centerY = ch / 2;

    let prevX, prevY;

    for (let i = 0; i < cw; i++) {
        let x = (i - centerX) / scale; // Convert pixel to graph coordinates
        let y = func(x); // Get function value
        let j = centerY - (y * scale); // Convert graph y to pixel y

        if (i > 0) {
            line(prevX, prevY, i, j);
        }

        // if (Math.round(y) == 0){
        //     text("("+x.toString()+","+y.toString()+")", i,j);
        // }

        prevX = i;
        prevY = j;
    }
}


document.getElementById("draw").addEventListener("click", ()=>{
    drawFormula(document.getElementById("formula").value);
})

document.getElementById("scale").addEventListener("change", ()=>{
    scale = document.getElementById("scale").value;
    // drawFormula(lformula);
})