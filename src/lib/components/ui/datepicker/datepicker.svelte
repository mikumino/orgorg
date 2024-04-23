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
            displayedDateRangeSelection = [];
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

<!-- FIXME: state is not synced so if month is changed, what is displayed and what is stored
in the code are different. 
-->
<div class="flex justify-between mb-4">
    <button on:click={() => displayedDateRange = get30Days(addDays(displayedDateRange[0], -30))}>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
        </svg>
    </button>
    <h1>{displayedDateRange[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h1>
    <button on:click={() => displayedDateRange = get30Days(addDays(displayedDateRange[0], 30))}>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
        </svg>  
    </button>
</div>
<div class="grid grid-cols-7 gap-2 text-center">
    {#each displayedDateRange as date}
        <button class={`p-2 rounded-full w-12 h-12 hover:bg-slate-200 transition-all ${selectedDates.includes(date) ? 'bg-slate-300' : ''} ${displayedDateRangeSelection.includes(date) ? 'bg-slate-200' : ''}`} on:mousedown={() => handleMouseDown(date)} on:mouseup={() => handleMouseUp(date)} on:mouseover={() => handleMouseOver(date)} on:focus={() => handleMouseOver(date)}>
            {date.getDate()}
        </button>
    {/each}
</div>

<Availability selectedDates={selectedDates} />