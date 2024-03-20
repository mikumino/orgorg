<script>
    /**
	 * @type {Date[]}
	 */
    let selectedDates = [];
	
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

    const currentDate = new Date();
    let startDate = currentDate;            // These are meant to be overridden as months are progressed by user
    let endDate = addDays(currentDate, 30);
    /**
	 * @type {Date[]}
	 */
    let displayedDateRange = get30Days(currentDate);
    /**
     * @type {Date[]}
     */
</script>

<div class="grid grid-cols-7 gap-4 text-center">
    {#each displayedDateRange as date}
        <button on:click={() => toggleDate(date)} class={`${selectedDates.includes(date) ? 'bg-slate-400' : ''}`}}>{date.getDate()}</button>
    {/each}
</div>