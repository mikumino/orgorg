<script>
    /**
     * @type {number}
     */
    export let startHour;
    export let endHour;
    
    /**
     * @type {Date[]}
     * array of dates passed from the meeting
    */
    export let selectedDates = [];

    /**
     * @type {Date[]}
     * array of dates selected from the availability picker
    */
    let selectedSlots = [];

    const numPeriods = (endHour-startHour) * 2; // number of 30-minute periods in the given timeframe
    let timeSlots = Array.from({length : numPeriods}, (_, index) => { 
        // put strings with the times into the array
        const hour = Math.floor(index/2) + startHour;
        const minute = index % 2 === 0 ? '00' : '30';
        return hour.toString().padStart(2, '0') + ":" + minute;
    });

    /**
     * @param {Date} selectedDate
    */
    function cellSelected(selectedDate) {
        if(isCellSelected(selectedDate)){ // remove date from the array if it's already in there
            selectedSlots = selectedSlots.filter(date => date.getTime() !== selectedDate.getTime())
        } else { // add date to the array if it's not in there
            selectedSlots = [...selectedSlots, selectedDate];
        }
        selectedSlots = selectedSlots;
    }

    /**
     * @param {Date} timeSlot
    */
    function isCellSelected(timeSlot) { // returns true if the date for the given cell is already in the array
        return selectedSlots.find(date => date.getTime() === timeSlot.getTime());
    }

</script>

{#key selectedSlots}
    <div class="flex text-xs">
        <div class="flex flex-col gap-y-0 text-gray-500" style="font-size: 10px">
            <div class="flex flex-row border-b-2">
                <br/>
                <br/>
            </div>
            {#each timeSlots as period, index}
                <div class="flex flex-row px-4 justify-center {index %2 != 0 ? 'border-b-2 pb-0' : ''}">
                    {period}
                </div>
            {/each}
        </div>    
        {#each selectedDates as date}
            <div class="flex flex-col gap-y-0 basis-full shrink min-w-0">
                <div class="flex flex-row px-4 justify-center border-b-2 shrink min-h-0 basis-full">
                    <div class="flex flex-col text-gray-500">
                        <p class="flex flex-row justify-center">
                            {date.toLocaleDateString(undefined, { weekday: 'short' })}
                        </p>
                        <p class="flex flex-row justify-center">
                            {date.getMonth() + 1}/{date.getDate()}
                        </p>
                    </div>
                </div>
                {#each timeSlots as period, index}
                    {@const cellDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(period.split(':')[0]), parseInt(period.split(':')[1]))}
                    <button on:click={() => cellSelected(cellDate)}
                    class={`flex flex-row px-4 justify-center cursor-pointer select-none ${index % 2 != 0 ? 'border-b-2 pb-0' : ''} ${isCellSelected(cellDate) ? 'bg-blue-200 hover:bg-blue-300' : 'hover:bg-blue-100'}`}
                    title="{date.getMonth() + 1}/{date.getDate()} @ {period}">
                        <br/>
                    </button>
                {/each}
            </div>
        {/each}
    </div>
{/key}
