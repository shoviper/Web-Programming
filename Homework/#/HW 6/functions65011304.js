function create7days() {
    const sevendays = document.getElementById("sevendays");
    const name =  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    sevendays.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const headcell = document.createElement('th');
        headcell.textContent = name[i];
        sevendays.appendChild(th);
    }

}

function show_monthOf2023(m_of_year) {

    const month = document.getElementById('month');
    const body = document.getElementById('main');

    const days_of_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var currentmonth = m_of_year - 1;
    var currentday = 1;

    month.textContent  = `${m_of_year}/2023`;

    create7days();

    const day = days_of_month[currentmonth];
    const firstday = new Date(2023, currentmonth, 0).getDay();
    body.innerHTML = '';


    if (currentmonth == 0 || currentmonth == 6 || currentmonth == 9)  {
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
    
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
    
                if (i == 0 && j < firstday) {
                    cell.textContent = '';
                } else if (currentday <= day) {
                    cell.textContent = currentday;
                    currentday++;
                    if (j == 6) {
                        cell.style.color = 'red';
                    }
                } else {
                    cell.textContent = '';
                }
                row.appendChild(cell);
            }
            body.appendChild(row);
        }
    } else {
        for (let i = 0; i < 5; i++) {
            const row = document.createElement('tr');
    
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
    
                if (i == 0 && j < firstday) {
                    cell.textContent = '';
                } else if (currentday <= day) {
                    cell.textContent = currentday;
                    currentday++;
                    if (j == 6) {
                        cell.style.color = 'red';
                    }
                } else {
                    cell.textContent = '';
                }
                row.appendChild(cell);
            }
            body.appendChild(row);
        }
    }
}

show_monthOf2023(1);

// button of <
function previous(){
    const month = document.getElementById('month');
    const m_of_year = month.textContent.split('/');
    if (month.textContent === '1/2023') {
        return;
    }
    show_monthOf2023(parseInt(m_of_year) - 1);
}

// button of >
function next(){
    const month = document.getElementById('month');
    const m_of_year = month.textContent.split('/');
    if (month.textContent === '12/2023') {
        return;
    }
    show_monthOf2023(parseInt(m_of_year) + 1);
}