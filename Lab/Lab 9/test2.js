var result = document.getElementById('result');
var current = "";

document.addEventListener('keypress', function(event) {
    if (event.key >= 0 && event.key <= 9){
        current += event.key;
        showresult();
    } else if (event.key == '+'){
        current += '+';
        showresult();
    } else if (event.key == '-'){
        current += '-';
        showresult();
    } else if (event.key == '*'){
        current += '*';
        showresult();
    } else if (event.key == '/'){
        current += '/';
        showresult();
    } else if (event.key == '='){
        var result = eval(current);
        current = String(result);
        showresult();
    } else if (event.key == 'C'){
        current = "";
        showresult();
    } else if (event.key == '<'){
        current = current.slice(0,-1);
        showresult();
    }
})

function showresult() {
    result.textContent = current;
}