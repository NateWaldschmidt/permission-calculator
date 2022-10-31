<script lang="ts">
    import PermissionCalculator from "@ts/permission-calculator";

    /** The permission level being calculated as an array of booleans. */
    export let permission = [false,false,false,false,false,false,false,false,false];
    /** The permission as a 3 digit decimal. */
    $: decimalPermission = ((): string => {
        /** The permission converted to a binary string. */
        const binaryString = permission.map(item => item ? 1 : 0).join("");
        return PermissionCalculator.binaryToDecimal(binaryString);
    })()
    /**
     * Converts the decimal permission into the necessary binary permission.
     * 
     * @param this
     */
    function decimalToBinaryPerm(this: HTMLInputElement) {
        // Ensures the array has 3 numbers.
        if (this.value.length < 3) {
            return;
        }
        const binaryPermission = PermissionCalculator.decimalToBinary(this.value)
        permission = binaryPermission.split('').map(val => val === '1' ? true : false);
    }

    /** The permission textually. */
    $: textPermission = (() => {
        return [0,1,2].map((index: number) => {
            /** The permission as binary. */
            const binaryString =
                (permission[0 + index * 3] ? '1' : '0') +
                (permission[1 + index * 3] ? '1' : '0') +
                (permission[2 + index * 3] ? '1' : '0');
            /** The permission as a decimal. */
            const singleDecimalPerm = parseInt(binaryString, 2).toString();
            return {
                7: 'rwx',
                6: 'rw-',
                5: 'r-x',
                4: 'r--',
                3: '-wx',
                2: '-w-',
                1: '--x',
                0: '---',
            }[singleDecimalPerm || 0];
        }).join('')
    })()

    /**
     * Capitalizes the first letter of a string.
     * 
     * @param text The text to capitalize.
     * @returns The string with the first letter capitalized.
     */
    function capitalize(text: string): string {
        return `${text.charAt(0).toUpperCase()}${text.slice(1)}`
    }

    /**
     * Copy the value of the passed in input ID's value to the clipboard.
     * 
     * @param inputId
     */
    function copyValueToClipboard(inputId: string): void {
        /** The element to copy the value from the clipboard.*/
        const inputElement = <HTMLInputElement> document.getElementById(inputId);
        // Copies the element's value to the clipboard.
        navigator.clipboard.writeText(inputElement.value);
        // Selects the element for a visual cue of the copy.
        inputElement.select();
    }
</script>

<section class="pc">
    <section class="pc-container">
        {#each ['owner', 'group', 'public'] as permGroup, groupIndex}
            <p class="pc-perm-group">{ capitalize(permGroup) }</p>
            {#each ['read', 'write', 'execute'] as permType, typeIndex}
                <div class="pc-checkbox-container">
                    <input
                    id="{`${permGroup}-${permType}`}"
                    type="checkbox"
                    bind:checked={permission[typeIndex + (groupIndex * 3)]}
                    />
                    <label for="{`${permGroup}-${permType}`}">
                        { capitalize(permType) }
                    </label>
                </div>
            {/each}
        {/each}
    </section>
    <section class="pc-values-container">
        <div>
            <label for="numeric-perm">Numeric</label>
            <div class="input-group">
                <input
                type="text"
                id="numeric-perm"
                on:input={decimalToBinaryPerm}
                value={decimalPermission}
                minlength="3"
                maxlength="3"
                />
                <button type="button" on:click={() => copyValueToClipboard('numeric-perm')} title="Copy">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                </button>
            </div>
        </div>
        <div>
            <label for="text-perm">Textual</label>
            <div class="input-group">
                <input type="text" id="text-perm" value="{textPermission}" readonly />
                <button type="button" on:click={() => copyValueToClipboard('text-perm')} title="Copy">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                </button>
            </div>
        </div>
    </section>
</section>

<style lang="scss">
    .pc {
        width: min-content;
        margin: 0 auto;

        background-color: rgb(234, 237, 240);
        border-radius: 0.5rem;

        padding: 0.5rem;
    }
    .pc-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto 1fr 1fr 1fr;
        grid-auto-flow: column;
        gap: 0.5rem;

        text-align: center;
    }
    .pc-values-container {
        display: flex;
        flex-direction: column;

        & > * {
            margin-top: 0.5rem;
        }
    }
    .pc-perm-group {
        margin: 0;
    }
    .pc-checkbox-container {
        label {
            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;

            user-select: none;
            -webkit-user-select: none;

            width: min(100vw, 6rem);
            height: min(100vw, 6rem);
            padding: auto;

            border-radius: 0.125rem;
            background-color: #d7beeb;

            transition: background-color 300ms ease,
            color 300ms ease,
            transform 200ms ease-in-out;
            // Prevent highlight on iOS.
            -webkit-tap-highlight-color: transparent;
        }

        input[type="checkbox"] {
            // Hides the checkbox because of our fancy one.
            display: none;

            &:checked + label {
                color: white;
                background-color: #943FE4;
            }
            // When the button is being clicked.
            &:active + label {
                transform: scale(0.95);
            }
        }
    }
    .input-group {
        display: flex;
        flex-wrap: nowrap;

        padding: 0.25rem;
        border-radius: 0.125rem;

        background-color: white;

        // Remove their individual styling.
        & > input, & > button {
            background-color: transparent;
            border: none;
            border-radius: 0;
        }
        & > input {
            flex-grow: 1;
        }
        & > button {
            cursor: pointer;

            & > svg {
                stroke: grey;
                width: 1rem;
            }
        }
    }
</style>