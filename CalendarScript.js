const calendarBody = document.getElementById('calendarBody');
const currentMonth = document.getElementById('currentMonth');
let date = new Date();

function loadCalendar() {
    calendarBody.innerHTML = '';

    currentMonth.textContent = date.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    let row = document.createElement('tr');

    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement('td'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('td');
        const fullDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');
        
        cell.textContent = day;

        if (localStorage.getItem(fullDate)) {
            cell.classList.add('booked');
            cell.title = localStorage.getItem(fullDate);
        }
        cell.onclick = function() { bookDate(fullDate, cell); };

        row.appendChild(cell);

        if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }
    }

    if (row.childNodes.length > 0) {
        calendarBody.appendChild(row);
    }
}


function bookDate(fullDate, cell) {
    let overwrite;
    if(localStorage.getItem(fullDate)){
        const temp = localStorage.getItem(fullDate);
        alert(`There is a booking on ${fullDate} already: ` + temp);
        if(confirm("Would you like to overwrite? ")){
            overwrite = true;
        }
        if(overwrite){
            const reason = prompt(`Enter a reason for the booking on ${fullDate}:`);
            if (reason) {
                localStorage.setItem(fullDate, reason);
                cell.classList.add('booked');
                cell.title = reason;
            }
        }

    }
    else {
        const reason = prompt(`Enter a reason for the booking on ${fullDate}:`);
        if (reason) {
            localStorage.setItem(fullDate, reason);
            cell.classList.add('booked');
            cell.title = reason;
        }
    }

}

function previous() {
    date.setMonth(date.getMonth() - 1);
    loadCalendar();
}

function next() {
    date.setMonth(date.getMonth() + 1);
    loadCalendar();
}

loadCalendar();
