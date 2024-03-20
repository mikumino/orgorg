<script>
    /**
	 * @type {Date[]}
	 */
    let selectedDates = [];
    /**
     * @type {Date[]}
     */
    let displayedDateRangeSelection = []; 

    // These are used for when doing a click and drag to select a range of dates
    /**
     * @type {Date | null}
     */
    let firstRangeDate = null;
    /**
     * @type {Date | null}
     */
    let secondRangeDate = null;
	
    /**
	 * @param {string | number | Date} date
	 * @param {number} days
	 */
    function addDays (date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    /**
     * @param {string | number | Date} date
     */
    function get30Days (date) {
        const result = [];
        for (let i = 0; i < 30; i++) {
            result.push(addDays(date, i));
        }
        return result;
    }

    /**
	 * @param {any} date
	 */
    function toggleDate (date) {
        if (selectedDates.includes(date)) {
            selectedDates = selectedDates.filter(day => day != date);
        } else {
            selectedDates.push(date);
        }
        selectedDates = selectedDates;
        console.log(selectedDates);
    }

    /**
	 * @param {null | Date} date
	 */
    function handleMouseDown (date) {
        console.log('mousedown', date);
        firstRangeDate = null;
        secondRangeDate = null;
        firstRangeDate = date;          // Starts range selection
        console.log('firstRangeDate', firstRangeDate)
    }

    /**
	 * @param {null | Date} date
	 */
    function handleMouseUp (date) {
        console.log('mouseup', date);
        if (date == null) {
            firstRangeDate = null;
            secondRangeDate = null;
        } else if (firstRangeDate && date < firstRangeDate) {
            secondRangeDate = firstRangeDate;
            firstRangeDate = date;
            console.log(firstRangeDate);
            console.log(secondRangeDate);
            // Select all dates between firstRangeDate and secondRangeDate
            const range = displayedDateRange.filter(day => day >= firstRangeDate && day <= secondRangeDate);
            for (let i = 0; i < range.length; i++) {
                toggleDate(range[i]);
            }
            console.log('selectedDates', selectedDates);
            firstRangeDate = null;
            secondRangeDate = null;
            displayedDateRangeSelection = [];
        } else if (firstRangeDate && date > firstRangeDate) {
            secondRangeDate = date;
            console.log(secondRangeDate);
            // Select all dates between firstRangeDate and secondRangeDate
            const range = displayedDateRange.filter(day => day >= firstRangeDate && day <= secondRangeDate);
            for (let i = 0; i < range.length; i++) {
                toggleDate(range[i]);
            }
            console.log('selectedDates', selectedDates);
            firstRangeDate = null;
            secondRangeDate = null;
            displayedDateRangeSelection = [];
        } else {
            firstRangeDate = null;
            secondRangeDate = null;
            displayedDateRangeSelection = [];
            toggleDate(date);
        }
    }

    /**
	 * @param {Date} date
	 */
    function handleMouseOver (date) {
        if (firstRangeDate == null) {
            return;
        } else if (date < firstRangeDate) {
            displayedDateRangeSelection = displayedDateRange.filter(day => day >= date && day <= firstRangeDate);
            console.log(displayedDateRangeSelection);
        } else if (date > firstRangeDate) {
            displayedDateRangeSelection = displayedDateRange.filter(day => day >= firstRangeDate && day <= date);
            console.log(displayedDateRangeSelection);
        } else if (date == firstRangeDate) {
            displayedDateRangeSelection = [date];
            console.log(displayedDateRangeSelection);
        } else {
            return;
        }
    }

    const currentDate = new Date();
    let startDate = currentDate;            // These are meant to be overridden as months are progressed by user
    let endDate = addDays(currentDate, 30);
    /**
	 * @type {Date[]}
	 */
    let displayedDateRange = get30Days(currentDate);
</script>

<svelte:document on:mouseup={() => handleMouseUp(null)} />

<div class="grid grid-cols-7 gap-2 text-center">
    {#each displayedDateRange as date}
        <button class={`p-2 rounded-sm hover:bg-slate-200 ${selectedDates.includes(date) ? 'bg-slate-300' : ''} ${displayedDateRangeSelection.includes(date) ? 'bg-slate-200' : ''}`} on:mousedown={() => handleMouseDown(date)} on:mouseup={() => handleMouseUp(date)} on:mouseover={() => handleMouseOver(date)} on:focus={() => handleMouseOver(date)}>
            {date.getDate()}
        </button>
    {/each}
</div>