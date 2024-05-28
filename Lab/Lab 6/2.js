function cal(w, h) {
    return w / (Math.pow(h/100, 2));
}

function check() {
    const w = document.getElementById("w");
    const h = document.getElementById("h");

    const o = document.getElementById("output");

    const inw = w.value;
    const inh = h.value;

    const numw = parseInt(inw);
    const numh = parseInt(inh);

    let text = "With your weight of " + numw + " and height of " + numh + "." + "\n" + "Your BMI is ";

    const bmi = cal(numw, numh);
    console.log(bmi);

    if(bmi < 18.5) {
        text += "พรีมมมมมมมม";
    } else if(bmi < 25) {
        text += "ปกติ";
    } else if(bmi < 30) {
        text += "ควรออกกำลังกาย";
    } else {
        text += "เปปเป้อ";
    }

    o.innerHTML = text;
    w.value = '';
    h.value = '';
}
