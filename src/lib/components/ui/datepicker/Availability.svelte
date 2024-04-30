<script>
    /**
     * @type {number}
     */
    export let startHour;
    export let endHour;
    
    /**
     * @type {Date[]}
    */
    export let selectedDates = [];

    /**
     * @type {Date[]}
    */
    let selectedSlots = [];

    //const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    //const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
    

    const numPeriods = (endHour-startHour) * 2; // number of 30-minute periods in the given timeframe
    let timeSlots = Array.from({length : numPeriods}, (_, index) => { 
        // put strings with the times into the array
        const hour = Math.floor(index/2) + startHour;
        const minute = index % 2 === 0 ? '00' : '30';
        return hour.toString().padStart(2, '0') + ":" + minute;
    });

    /**
     * @param {Date} selectedDate
     * @returns {void}
    */
    function cellSelected(selectedDate) {
        if(isCellSelected(selectedDate)){
            console.log("Selected date: " + selectedDate);
            selectedSlots.forEach(
                (date) => console.log(date)
            );
            const index = selectedSlots.findIndex(date => date.toString() === selectedDate.toString());
            if(index !== -1) {
                selectedSlots.splice(index, 1);
            }
        }else{
            selectedSlots.push(selectedDate);
        }
    }

    /**
     * @param {Date} timeSlot
    */
    function isCellSelected(timeSlot) {
        return selectedSlots.find(date => date.toString() === timeSlot.toString());
    }

</script>

<div class="flex text-xs">
    <div class="flex flex-col gap-y-0 basis-full shrink min-w-0 text-gray-500" style="font-size: 10px">
        <div class="flex flex-row px-4 border-b-2 shrink min-h-0 basis-full">
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
                class={`flex flex-row px-4 justify-center cursor-pointer select-none hover:bg-blue-100 ${index % 2 != 0 ? 'border-b-2 pb-0' : ''} ${isCellSelected(cellDate) ? 'bg-blue-200' : ''}`}
                title="{date.getMonth() + 1}/{date.getDate()} @ {period}"
                >
                    <br/>
                </button>
            {/each}
        </div>
    {/each}
</div>

