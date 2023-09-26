var result = document.getElementById('result');
var current = "";
var memory = 0;

document.addEventListener('keypress', function(event) {
    if (event.key >= '0' && event.key <= '9'){
        current += event.key;
        showresult();
    } else if (event.key == '+'){  // +
        current += '+';
        showresult();
    } else if (event.key == '-'){ // -
        current += '-';
        showresult();
    } else if (event.key == '*'){ // *
        current += '*';
        showresult();
    } else if (event.key == '/'){ // /
        current += '/';
        showresult();
    } else if (event.key == '='){ // =
        var resultValue = eval(current);
        current = String(resultValue);
        showresult();
    } else if (event.key == 'c' || event.key == 'C'){ // clear
        current = "";
        showresult();
    } else if (event.key == '<'){ // delete
        current = current.slice(0,-1);
        showresult();
    } else if (event.key == 'a' || event.key == 'A'){ // sin
        var value = parseFloat(current);
        var resultValue = Math.sin(value);
        current = String(resultValue);
        showresult();
    } else if (event.key == 's' || event.key == 'S'){ // cos
        var value = parseFloat(current);
        var resultValue = Math.cos(value);
        current = String(resultValue);
        showresult();
    } else if (event.key == 'd' || event.key == 'D'){ // tan
        var value = parseFloat(current);
        var resultValue = Math.tan(value);
        current = String(resultValue);
        showresult();
    } else if (event.key == 'p' || event.key == 'P'){ // π
        current += String(parseFloat(Math.PI).toFixed(3));
        showresult();
    } else if (event.key == 'q' || event.key == 'Q'){ // √x
        var value = parseFloat(current);
        var resultValue = Math.sqrt(value);
        current = String(resultValue);
        showresult();
    } else if (event.key == 'w' || event.key == 'W'){ // x²
        var value = parseFloat(current);
        var resultValue = value * value;
        current = String(resultValue);
        showresult();
    } else if (event.key == 'e' || event.key == 'E'){ // 1/x
        var value = parseFloat(current);
        var resultValue = 1 / value;
        current = String(resultValue);
        showresult();
    } else if (event.key == 'z' || event.key == 'Z'){ // x!
        var value = parseFloat(current);
        if (!isNaN(value) && Number.isInteger(value)) {
            var resultValue = 1;
            for (var i = 2; i <= value; i++) {
                resultValue *= i;
            }
            current = String(resultValue);
            showresult();
        } else {
            current = "Error";
            showresult();
        }
    } else if (event.key == 'y' || event.key == 'u' || event.key == 'i' || event.key == 'o') {
        memoryfunction(event.key);
    }
})

function memoryfunction(key) {
    if (key == 'y' || key == 'u') {
        var memoryvalue = parseFloat(current);
        if (!isNaN(memoryvalue)) {
            if (key == 'y') {
                memory += memoryvalue; // m+
            } else if (key == 'u') {
                memory -= memoryvalue; // m-
            }
        }
    } else if (key == 'i' || key == 'I') {
        current = String(memory); // mr
        showresult();
    } else if (key == 'o' || key == 'O') {
        memory = 0; // mc
    }
}

function showresult() {
    result.textContent = current;
}