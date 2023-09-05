function add() {

    const name = document.getElementById("n");
    const amount = document.getElementById("a");
    const price = document.getElementById("p");


    const inname = name.value;
    const inamount = amount.value;
    const inprice = price.value;

    const table = document.getElementById("table");

    const newRow = document.createElement("tr");

    const nameCell = document.createElement("td");
    const amountCell = document.createElement("td");
    const priceCell = document.createElement("td");

    const tnname = document.createTextNode(inname);
    const tnamount = document.createTextNode(inamount);
    const tnprice = document.createTextNode(inprice);

    nameCell.appendChild(tnname);
    amountCell.appendChild(tnamount);
    priceCell.appendChild(tnprice);

    newRow.appendChild(nameCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(priceCell);

    table.appendChild(newRow);
}


function Clear() {
    document.getElementById("n").value = '';
    document.getElementById("a").value = '';
    document.getElementById("p").value = '';
}

function Reset() {
    let table = document.getElementById("table");
    let rowCount = table.rows.length;
    for (let i = 1; i < rowCount; i++) {
        table.deleteRow(1);
    }
    Clear();
}