function time(time, text) {
    this.time = time || "";
    this.text = text || "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const word = [
      new time("09:00", "Wake up"),
      new time("11:05", "Lunch time"),
      new time("15:30", "Take a break"),
    ];

    const table = document.getElementById("table");
    const button = document.getElementById("button");
    let editMode = false;

    function updateTable() {
      // Clear the table
      while (table.firstChild) {
        table.removeChild(table.firstChild);
      }

      for (let i = 0; i < word.length; i++) {
        const wordindex = word[i];
        const row = document.createElement("tr");

        if (editMode) {
          // Edit mode: Use input elements for time and textarea for text
          const timecol = document.createElement("td");
          const textcol = document.createElement("td");
          const removeButtonCol = document.createElement("td");

          const timeInput = document.createElement("input");
          timeInput.type = "time";
          timeInput.value = wordindex.time;
          timecol.appendChild(timeInput);

          const textArea = document.createElement("textarea");
          textArea.value = wordindex.text;
          textcol.appendChild(textArea);

          const removeButton = document.createElement("button");
          removeButton.textContent = "Remove";
          removeButton.addEventListener("click", () => {
            word.splice(i, 1);
            updateTable();
          });
          removeButtonCol.appendChild(removeButton);

          row.appendChild(timecol);
          row.appendChild(textcol);
          row.appendChild(removeButtonCol);
        } else {
          // Display mode: Use plain text for time and text
          const timecol = document.createElement("td");
          const textcol = document.createElement("td");

          timecol.textContent = wordindex.time;
          textcol.textContent = wordindex.text;

          row.appendChild(timecol);
          row.appendChild(textcol);
        }

        table.appendChild(row);
      }

      if (editMode) {
        // Add a row for adding new items
        const newRow = document.createElement("tr");
        const newTimeCol = document.createElement("td");
        const newTextCol = document.createElement("td");
        const addButtonCol = document.createElement("td");

        const newTimeInput = document.createElement("input");
        newTimeInput.type = "time";
        newTimeCol.appendChild(newTimeInput);

        const newTextArea = document.createElement("textarea");
        newTextCol.appendChild(newTextArea);

        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        addButton.addEventListener("click", () => {
          const newTime = newTimeInput.value;
          const newText = newTextArea.value;
          if (newTime && newText) {
            word.push(new time(newTime, newText));
            updateTable();
          }
        });
        addButtonCol.appendChild(addButton);

        newRow.appendChild(newTimeCol);
        newRow.appendChild(newTextCol);
        newRow.appendChild(addButtonCol);
        table.appendChild(newRow);
      }
    }

    button.addEventListener("click", () => {
      editMode = !editMode;
      button.textContent = editMode ? "Done" : "Edit";
      updateTable();
    });

    // Initial table render
    updateTable();
  });
  






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
        currentTime.setTime(currentTime.getTime() + 10);
        const result = `${currentTime.getHours()}:${(currentTime.getMinutes())}:${(currentTime.getSeconds())}`;
        realtime.textContent = result;
        setTimeout(updateRealTime, 1);
    }
}

setTimeout(updateRealTime, 1);