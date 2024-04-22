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
	 * @param {{getTime: () => number;}} date
	 * @param {any[]} array
     * Given an array of dates and a date, returns true if the date is in the array
     * Uses timestamps to compare dates by value RAHHHH
	 */
    function hasDate(array, date) {
        return array.find(arrayDate => arrayDate.getTime() === date.getTime());
    }

    /**
	 * @param {any} date
	 */
    function toggleDate (date) {
        const dateTimestamp = date.getTime();
        if (hasDate(selectedDates, date)) {
            selectedDates = selectedDates.filter(selectedDate => selectedDate.getTime() !== dateTimestamp);
        } else {
            selectedDates = [...selectedDates, date];
        }
        selectedDates = selectedDates;
    }

    /**
	 * @param {null | Date} date
	 */
    function handleMouseDown (date) {
        firstRangeDate = null;
        secondRangeDate = null;
        firstRangeDate = date;          // Starts range selection
    }

    /**
	 * @param {null | Date} date
	 */
    function handleMouseUp (date) {
        if (date == null) {
            firstRangeDate = null;
            secondRangeDate = null;
            displayedDateRangeSelection = [];
        } else if (firstRangeDate && date < firstRangeDate) {
            secondRangeDate = firstRangeDate;
            firstRangeDate = date;
            // Select all dates between firstRangeDate and secondRangeDate
            const range = displayedDateRange.filter(day => day >= firstRangeDate && day <= secondRangeDate);
            for (let i = 0; i < range.length; i++) {
                toggleDate(range[i]);
            }
            firstRangeDate = null;
            secondRangeDate = null;
            displayedDateRangeSelection = [];
        } else if (firstRangeDate && date > firstRangeDate) {
            secondRangeDate = date;
            // Select all dates between firstRangeDate and secondRangeDate
            const range = displayedDateRange.filter(day => day >= firstRangeDate && day <= secondRangeDate);
            for (let i = 0; i < range.length; i++) {
                toggleDate(range[i]);
            }
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
        } else if (date > firstRangeDate) {
            displayedDateRangeSelection = displayedDateRange.filter(day => day >= firstRangeDate && day <= date);
        } else if (date == firstRangeDate) {
            displayedDateRangeSelection = [date];
        } else {
            return;
        }
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
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
<div class="grid grid-cols-7 gap-3">
    {#each displayedDateRange.slice(0, 7) as date, i}
        <p class="text-center text-slate-500">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
    {/each}
    {#each displayedDateRange as date, i}
        <button class={`flex items-center justify-center p-2 rounded-full group w-12 h-12 hover:bg-slate-200 transition-all ${hasDate(selectedDates, date) ? 'bg-slate-300' : ''} ${hasDate(displayedDateRangeSelection, date) ? 'bg-slate-200' : ''}`} on:mousedown={() => handleMouseDown(date)} on:mouseup={() => handleMouseUp(date)} on:mouseover={() => handleMouseOver(date)} on:focus={() => handleMouseOver(date)}>
            <p class={`absolute text-slate-500 group-hover:bg-slate-200 rounded-lg -translate-y-5 transition-all ${hasDate(selectedDates, date) ? 'bg-slate-300' : ''} ${hasDate(displayedDateRangeSelection, date) ? 'bg-slate-200' : ''}`}>
                {date.getDate() === 1 && i !== 0 ? date.toLocaleDateString('en-US', { month: 'short' }) : ''}
            </p>
            {date.getDate()}
        </button>
    {/each}
</div>