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
     * @type {boolean}
     * boolean to determine if the user is adding availability
     */
    export let addMode = false;
    
    /**
     * @type {Date[]}
     * array of dates selected from the availability picker
     */
    export let selectedSlots = [];

    /**
     * @type {String[]}
    */
    export let cellColors = [];

    let firstRangeSlot = null;
    let secondRangeSlot = null;

    /**
     * @type {Date[]}
     * array of dates that represent the dates being selected in the availability picker
     */
    let slotRangeSelection = [];
    
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
        if (!addMode) return; // if the user is not adding availability, don't do anything
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

    function numberCellSelected(timeSlot) {
        const count = selectedSlots.reduce((num, time) => 
            {
                return time.getTime() === timeSlot.getTime() ? num + 1 : num;
            }, 0);
        return count;
    }


    console.log(cellColors);

    function handleMouseDown(slot) {
        firstRangeSlot = slot;
    }

    function handleMouseUp(slot) {
        // the mouse is released on something that's not a slot
        if (slot == null) {
            // clear the selection
            firstRangeSlot = null;
            secondRangeSlot = null;
            slotRangeSelection = [];
        } else if (firstRangeSlot != null && slot < firstRangeSlot) {
            // the mouse is released on a slot that occurs before the first slot
            // rearrange the slots so that the first slot is the second slot
            secondRangeSlot = firstRangeSlot;
            firstRangeSlot = slot;
            // select the range
            let slots = getSlotsBetween(firstRangeSlot, secondRangeSlot);
            for (let i = 0; i < slots.length; i++) {
                cellSelected(slots[i]);
            }
        } else if (firstRangeSlot != null && slot >= firstRangeSlot) {
            // the mouse is released on a slot that occurs after the first slot
            secondRangeSlot = slot;
            // select the range
            let slots = getSlotsBetween(firstRangeSlot, secondRangeSlot);
            for (let i = 0; i < slots.length; i++) {
                cellSelected(slots[i]);
            }
        } else {
            // the mouse is released on a slot that is the same as the first slot
            firstRangeSlot = null;
            secondRangeSlot = null;
            cellSelected(slot);
        }
    }

    function handleMouseOver (slot) {
        if (firstRangeSlot == null) {
            return;
        } else if (slot < firstRangeSlot) {
            slotRangeSelection = getSlotsBetween(slot, firstRangeSlot);
        } else if (slot > firstRangeSlot) {
            slotRangeSelection = getSlotsBetween(firstRangeSlot, slot);
        } else if (slot == firstRangeSlot) {
            slotRangeSelection = [slot];
        } else {
            return;
        }
    }

    function getSlotsBetween(firstSlot, secondSlot) {
        // between two slots (dates) get the 30 minute increments between them and return them
        let slots = [];
        let currentSlot = new Date(firstSlot);
        while (currentSlot <= secondSlot) {
            if (currentSlot.getHours() < startHour || currentSlot.getHours() >= endHour) {
                currentSlot.setMinutes(currentSlot.getMinutes() + 30);
                continue;
            }
            slots.push(new Date(currentSlot));
            currentSlot.setMinutes(currentSlot.getMinutes() + 30);
        }
        return slots;
    }

    function convertTo12h(timeString) { // this looked too ugly
        const [hours, minutes] = timeString.split(':');
        const numHours = parseInt(hours);
        const suffix = numHours >= 12 ? 'PM' : 'AM'
        const newHours = numHours === 0 ? 12 : (numHours > 12 ? numHours - 12 : numHours);
        return `${newHours}:${minutes}${suffix}`
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
</script>

<svelte:document on:mouseup={() => handleMouseUp(null)} />

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
                    <button on:mousedown={() => handleMouseDown(cellDate)} on:mouseup={() => handleMouseUp(cellDate)} on:mouseover={() => handleMouseOver(cellDate)} on:focus={() => handleMouseOver(cellDate)} class={`flex flex-row px-4 justify-center cursor-pointer select-none ${index % 2 !== 0 ? 'border-b-2' : ''} ${ isCellSelected(cellDate) ? (addMode ? 'bg-blue-200 hover:bg-blue-300' : ` hover:bg-blue-300`) : 'hover:bg-blue-100'} ${hasDate(slotRangeSelection, cellDate) ? 'bg-blue-200' : ''}`}
                    style="background-color: {cellColors[numberCellSelected(cellDate)]}; border-color: {cellColors[numberCellSelected(cellDate)]};"
                    title="{date.getMonth() + 1}/{date.getDate()} @ {period}">
                        <br/>
                    </button>
                {/each}
            </div>
        {/each}
    </div>
{/key}

