class Datepicker {

    selectedDate: Date;
    year: number;
    month: number;
    day: number;
    selectedElement: HTMLElement;
    blackoutDates: string[];


    constructor(blackoutDates: string[] = []) {
        this.selectedDate = new Date();
        this.year = this.selectedDate.getFullYear();
        this.month = this.selectedDate.getMonth();
        this.day = this.selectedDate.getDate();
        this.selectedElement = document.createElement("div");
        this.blackoutDates = blackoutDates;

        this.render();
    }

    render() {
        const monthSelect = document.querySelector<HTMLSelectElement>('#calendar .month-selector');
        const yearSelect = document.querySelector<HTMLSelectElement>('#calendar .year-selector');
        monthSelect!.value = this.month.toString();
        yearSelect!.value = this.year.toString();
        
        this.renderDays();
        this.setSelectedDay();
    }

    setSelectedDay() {
        const day = this.selectedDate.getDate();
        const dayElem = document.querySelector<HTMLInputElement>(`#day-${day}`);
        if (this.year == this.selectedDate.getFullYear() && this.month == this.selectedDate.getMonth()) {
            if (this.selectedElement?.classList.contains('selected')) {
                this.selectedElement.classList.remove('selected');
            }
            if (!dayElem?.classList.contains('selected')) {
                dayElem?.classList.add('selected');
            }
            this.selectedElement = dayElem!;
        }
    }

    renderDays() {
        const cal = document.querySelector<HTMLElement>(`#calendar .calendar-body`);
        cal!.innerHTML = '';

        const monthArray = [];
        const firstDayOfMonth = this.firstWeekDayOfTheMonth();

        for (let i = 1; i <= firstDayOfMonth; i++) {
            monthArray.push('');
        }

        const daysInMonth = this.daysInCurrentMonth();

        for (let i = 1; i <= daysInMonth; i++) {
            monthArray.push(i);
        }

        if (monthArray.length % 7 !== 0) {

            const trailingEmptySlots = 7 - monthArray.length % 7;

            for (let i = 1; i <= trailingEmptySlots; i++) {
                monthArray.push('');
            }
        }

        monthArray.forEach((day, index) => {
            const thisDay = day as number;
            if (index % 7 === 0) {
                const newRow = '<div class="calendar-body-days-row"></div>';

                document.querySelector<HTMLElement>(`#calendar .calendar-body`)?.insertAdjacentHTML('beforeend', newRow);
            }

            const calendarRows = Array.from(document.querySelectorAll<HTMLElement>(`#calendar .calendar-body-days-row`));
            const calendarRowsCount = calendarRows.length;

            const newDay = document.createElement("div")

            if(day) {
                newDay.classList.add("day");
                newDay.setAttribute("id", `day-${day}`);
                newDay.addEventListener('click', () => {
                    this.selectDate(thisDay); 
                  });
                newDay.innerHTML = day.toString();
                const blackoutDates = Array.from(this.blackoutDates);
                blackoutDates.forEach((date) => {
                    const blackoutDate = new Date(date);
                    const thisDate = new Date (`${this.year}-${+this.month + 1}-${day}`);
                    if(blackoutDate.getDate() === thisDate.getDate() 
                    && blackoutDate.getMonth() === thisDate.getMonth()
                    && blackoutDate.getFullYear() === thisDate.getFullYear()) {
                        newDay.classList.add("blackout");
                    }
                });
            } else {
                newDay.classList.add("blank-day");
            }


            calendarRows[calendarRowsCount - 1].appendChild(newDay);

        });
    }

    firstWeekDayOfTheMonth(): number {
        return new Date(this.year, this.month, 1).getDay()
    }

    daysInCurrentMonth(): number {
        const month = +this.month + 1;
        return new Date(this.year, month, 0).getDate();
    }

    incrementMonth(increment: number) {
        const newMonth = this.month + increment;
        const date = new Date();

        if (newMonth == 12) {
            this.month = 0;
            this.year++;
        } else if (newMonth == -1) {
            this.month = 11;
            this.year--;
        } else {
            this.month = newMonth;
        }
        this.render();
    }

    setMonth(month: number) {
        this.month = month;
        this.render();
    }

    setYear(year: number) {
        this.year = year;
        this.render();
    }

    selectDate(day: number) {
        this.day = day;
        this.selectedDate = new Date(this.year, this.month, this.day);
        this.setSelectedDay();
        this.setDateInput();
     }

    setDateInput() {
        const dateInputString = `${+this.month + 1}/${this.day}/${this.year}`;
        const input = document.querySelector<HTMLInputElement>('#datepicker-input');

        input!.value = dateInputString;
    }
}

export default Datepicker;