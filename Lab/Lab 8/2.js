
function AlertTime(hrs, min, title) {
    this.hrs = hrs;
    this.min = min;
    this.title = title;
}

let alerts = [
    new AlertTime(9, 0, "wake up"),
    new AlertTime(11, 5, "lunch time"),
    new AlertTime(15, 30, "take a break")
]

let hrsCounter = 0;
let minCounter = 0;

function updateTime() {
    minCounter++;
    if (minCounter == 60) {
        minCounter = 0;
        hrsCounter++;

        if (hrsCounter == 24) {
            hrsCounter = 0;
        }
    }
    document.getElementById("current").innerHTML = "Current Time(1000x faster): " + zeroPad(hrsCounter, 2) + " : " + zeroPad(minCounter, 2);

    for (let i = 0; i < alerts.length; i++) {
        if (hrsCounter == alerts[i].hrs && minCounter == alerts[i].min) {
            alert(alerts[i].title);
        }
    }
    setTimeout(updateTime, 10000000);
}

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

updateTime();

let done_but = document.getElementById("main");

let add_but = document.createElement("button");
add_but.innerHTML = "Add Row";
add_but.setAttribute("onclick", "addRow()")

let table = document.getElementById("myTable");

function updateAlerts() {
    console.log("old->" + alerts);
    alerts = []

    for (let i = 0; i < table.rows.length; i++) {
        const timeInput = document.getElementById("alert_time" + i);
        const titleInput = document.getElementById("alert_title" + i);

        const timeParts = timeInput.value.split(":");
        const hrs = timeParts[0];
        const min = timeParts[1];

        console.log(i);
        console.log(table.rows.length);
        console.log(table.rows[i]);

        alerts.push(new AlertTime(parseInt(hrs, 10), parseInt(min, 10), titleInput.value));
    }

    console.log("new->" + alerts);
}

function changeToDisplay() {
    done_but.innerHTML = "Edit";
    done_but.setAttribute("onclick", "changeToEdit()");

    add_but.hidden = true;

    while (table.hasChildNodes()) {
        table.removeChild(table.children[table.children.length - 1]);
    }

    let header_row = document.createElement("tr");
    table.appendChild(header_row);

    let header_time = document.createElement("th");
    header_time.innerHTML = "Time";
    header_row.appendChild(header_time);

    let header_word = document.createElement("th");
    header_word.innerHTML = "Alert Word";
    header_row.appendChild(header_word);

    alerts.forEach(element => {
        let row = document.createElement("tr");
        table.appendChild(row);

        let time_col = document.createElement("td");
        time_col.innerHTML = String(zeroPad(element.hrs, 2)) + " : " + String(zeroPad(element.min, 2));
        row.appendChild(time_col);

        let title_col = document.createElement("td");
        title_col.innerHTML = element.title;
        row.appendChild(title_col);
    });
}

function changeToEdit() {
    done_but.innerHTML = "Done";
    done_but.setAttribute("onclick", "changeToDisplay()");

    add_but.hidden = false;

    while (table.hasChildNodes()) {
        table.removeChild(table.children[table.children.length - 1]);
    }

    for (let i = 0; i < alerts.length; i++) {
        let row = document.createElement("tr");
        table.appendChild(row);

        let time_col = document.createElement("td");
        let time_input = document.createElement("input");
        time_input.setAttribute("type", "time");
        time_input.setAttribute("id", "alert_time" + i);
        time_input.setAttribute("value", zeroPad(alerts[i].hrs, 2) + ":" + zeroPad(alerts[i].min, 2));
        row.appendChild(time_col);
        time_col.appendChild(time_input);

        let title_col = document.createElement("td");
        let title_input = document.createElement("input");
        title_input.setAttribute("type", "text");
        title_input.setAttribute("id", "alert_title" + i);
        title_input.setAttribute("value", alerts[i].title);
        row.appendChild(title_col);
        title_col.appendChild(title_input);

        let remove_col = document.createElement("td");
        let remove_but = document.createElement("button");
        remove_but.innerText = "Remove";
        remove_but.setAttribute("onclick", "removeAlerts(" + i + ")");
        row.appendChild(remove_col);
        remove_col.appendChild(remove_but);
    }

    document.body.appendChild(add_but);
}

function addRow() {
    let row = document.createElement("tr");
    table.appendChild(row);

    row_i = parseInt(alerts.length);

    let time_col = document.createElement("td");
    let time_input = document.createElement("input");
    time_input.setAttribute("type", "time");
    time_input.setAttribute("id", "alert_time" + row_i);
    time_input.setAttribute("value", "00:00");
    row.appendChild(time_col);
    time_col.appendChild(time_input);

    let title_col = document.createElement("td");
    let title_input = document.createElement("input");
    title_input.setAttribute("type", "text");
    title_input.setAttribute("value", "task");
    title_input.setAttribute("id", "alert_title" + row_i);
    row.appendChild(title_col);
    title_col.appendChild(title_input);

    let remove_col = document.createElement("td");
    let remove_but = document.createElement("button");
    remove_but.innerText = "Remove";
    remove_but.setAttribute("onclick", "removeAlerts(" + row_i + ")");
    row.appendChild(remove_col);
    remove_col.appendChild(remove_but);

    updateAlerts();
}

function removeAlerts(index) {
    alerts.splice(index, 1);
    console.log(alerts);
    changeToEdit();
}

changeToDisplay();