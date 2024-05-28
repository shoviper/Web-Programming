// function head(timehead,texthead){
//     this.timehead = timehead
// }


function time(time,text){
    this.time = time || "";
    this.text = text || "";
}

const word = [new time("09:00","Wake up"), new time("11:05","Lunch time"), new time("15:30","Take a break")];

const table = document.getElementById("table");

for(let i = 0; i < word.length; i++){
    const wordindex = word[i];
    const row = document.createElement("tr");
    const timecol = document.createElement("td");
    const textcol = document.createElement("td");

    timecol.textContent = wordindex.time;
    textcol.textContent = wordindex.text;

    row.appendChild(timecol);
    row.appendChild(textcol);

    table.appendChild(row)
}

let currentIndex = 0;
const currentTime = new Date();

function updateRealTime() {
    const realtime = document.getElementById("realtime");
    const hr = currentTime.getHours();
    const mn = currentTime.getMinutes();

    const [targethr, targetmn] = word[currentIndex].time.split(":");
    
    if (hr == parseInt(targethr) && mn == parseInt(targetmn)) {
        const result = `${currentTime.getHours()}:${(currentTime.getMinutes())}:${(currentTime.getSeconds())}`;
        realtime.textContent = result;
        setTimeout(() => {
            alert(word[currentIndex].text);
            currentIndex++;
            if (currentIndex < word.length) {
                updateRealTime();
            }
        }, 1);
    } else {
        currentTime.setTime(currentTime.getTime() + 10000);
        const result = `${currentTime.getHours()}:${(currentTime.getMinutes())}:${(currentTime.getSeconds())}`;
        realtime.textContent = result;
        setTimeout(updateRealTime, 1);
    }
}

setTimeout(updateRealTime, 1);