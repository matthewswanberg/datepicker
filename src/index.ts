import DatePicker from "./datepicker";
import { blackoutDates } from "./blackoutDates"
const years = Array.from({length: new Date().getFullYear() - 1925 }, (value, index) => 1950 + (index + 1)).reverse();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

years.forEach(year => {
    const option = document.createElement('option');
    option.value = year.toString();
    option.text = year.toString();
    document.querySelector<HTMLSelectElement>('#calendar .year-selector')?.appendChild(option);
})

months.forEach((month, index)  => {
  const option = document.createElement('option');
  option.value = index.toString();
  option.text = month;
  document.querySelector<HTMLSelectElement>('#calendar .month-selector')?.appendChild(option);
})

const datepicker = new DatePicker(blackoutDates);
datepicker.render();

document.querySelector<HTMLSelectElement>('#datepicker-input')?.addEventListener('keydown', (event) => {    
var length = event.target?.value.length;

if (length == 2 || length == 5) {
  event.target!.value = event.target!.value + '/';
}

});

document.querySelector<HTMLSelectElement>('#calendar .year-selector')?.addEventListener('change', (event) => {
  datepicker.setYear(parseInt(event.target?.value));
});

document.querySelector<HTMLSelectElement>('#calendar .month-selector')?.addEventListener('change', (event) => {
  datepicker.setMonth(parseInt(event.target?.value));
});

document.querySelector<HTMLSelectElement>('#calendar .prev-month')?.addEventListener('click', (event) => {
  datepicker.incrementMonth(-1);
});

document.querySelector<HTMLSelectElement>('#calendar .next-month')?.addEventListener('click', (event) => {
  datepicker.incrementMonth(1);
});

document.querySelector<HTMLInputElement>('#datepicker-open')?.addEventListener('click', () => {
    document.querySelector<HTMLInputElement>('#calendar')?.classList.add('show');
});

document.querySelector<HTMLElement>('#calendar')?.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.querySelector<HTMLInputElement>('#datepicker-open')?.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.querySelector<HTMLInputElement>('.datepicker')?.addEventListener('click', () => {
    document.querySelector<HTMLInputElement>('#calendar')?.classList.remove('show');
});

// function validateDate() {
//     const input = document.getElementById('datepicker-input').value;
//     const validationMsg = document.getElementById('validationMsg');
//     if(Math.random() * 10 < 5) {
//         !validationMsg.classList.contains('hidden') ? validationMsg.classList.add('hidden') : '';
//     } else {
//         validationMsg.classList.contains('hidden') ? validationMsg.classList.remove('hidden') : '';
//     }
// }