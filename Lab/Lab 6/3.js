var y = document.createElement("TR");
y.setAttribute("id", "myTr");
document.getElementById("table").appendChild(y);

var month = document.createElement("TH");
month.setAttribute("id", "month");
month.setAttribute("colspan", "7");
month.appendChild(document.createTextNode("August 2023"));
document.getElementById("myTr").appendChild(month);

var label = ["mo", "tu", "we", "th", "fr", "sa", "su"];

var y = document.createElement("TR");
y.setAttribute("id", "labelTr");
document.getElementById("table").appendChild(y);

for (let i = 0; i < 7; i++) {
    var l_day = document.createElement("TD");
    l_day.setAttribute("id", "month");
    l_day.appendChild(document.createTextNode(label[i]));
    document.getElementById("labelTr").appendChild(l_day);
}

let day = 0;
for (let i = 0; i < 5; i++) {
    var row = document.createElement("TR");
    row.setAttribute("id", "rowTr" + i);
    document.getElementById("table").appendChild(row);
    for (let j = 0; j < 7; j++) {
        if ((i == 0 && day == 0) || day > 31) {
            var l_day = document.createElement("TD");
            l_day.setAttribute("id", "day");
            l_day.appendChild(document.createTextNode(" "));
            document.getElementById("rowTr" + i).appendChild(l_day);
            day += 1;
            continue;
        }
        var l_day = document.createElement("TD");
        l_day.setAttribute("id", "day");
        l_day.appendChild(document.createTextNode(day));
        document.getElementById("rowTr" + i).appendChild(l_day);
        day += 1;
    }
}