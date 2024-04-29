<script>
    
    /**
	 * @type {Date[]}
	 */
    let selectedDates = [];

    /**
     * The range of dates that are currently being displayed, used to display the calendar
     * @type {Date[]}
     */
    let displayedDateRangeSelection = []; 

    /**
     * The first date in a range selection
     * @type {Date | null}
     */
    let firstRangeDate = null;
    
    /**
     * The second date in a range selection
     * @type {Date | null}
     */
    let secondRangeDate = null;
	
    /**
     * Adds days to a date, returns the "sum" date
	 * @param {string | number | Date} date
	 * @param {number} days
	 */
    function addDays (date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    /**
     * Gets the next 30 days from the given date
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
     * Given an array of dates and a date, returns true if the date is in the array
     * Uses timestamps to compare dates by value RAHHHH
	 * @param {{getTime: () => number;}} date
	 * @param {any[]} array
	 */
    function hasDate(array, date) {
        return array.find(arrayDate => arrayDate.getTime() === date.getTime());
    }

    /**
     * Toggles the date in the selectedDates array
     * Checks if the selectedDates array already has the date, if it does, it removes it
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
     * When the mouse is pressed down on a date, this is called
     * We use this to start the range selection
     * First and second range date are used to store the range selection, cleared here as safety
	 * @param {null | Date} date
	 */
    function handleMouseDown (date) {
        firstRangeDate = null;
        secondRangeDate = null;
        firstRangeDate = date;          // Starts range selection
    }

    /**
     * When the mouse is released, this is called
     * If the date is null (we are not hovered over a date), we clear the range selection
     * If the date is not null, we check if we are selecting a range of dates
     * If we are, we select all dates between the first and second range date
     * If we are not, we toggle the date, it is a single date selection
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
     * When the mouse is hovered over a date, this is called
     * This is how we handle the range selection highlighting
     * Checks if we are mid-range selection, if we are, we highlight all dates between the first and hovered date
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

    /**
     * The range of dates that are displayed
	 * @type {Date[]}
	 */
    let displayedDateRange = get30Days(currentDate);
</script>

<!-- Handles mouseup on anything that's not a date -->
<svelte:document on:mouseup={() => handleMouseUp(null)} />

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