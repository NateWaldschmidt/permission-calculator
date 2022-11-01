/**
 * Helper functions for calculating permissions.
 * 
 * @author Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 */
export default class PermissionCalculator {

    /**
     * Converts a binary representation of permission levels to the decimal
     * representation of the permission.
     * 
     * @example
     * binaryToDecimal('111111111') = '777';
     * binaryToDecimal('100100100') = '444';
     * binaryToDecimal('000000111') = '007';
     * @param binaryPermission The binary string for the permission level.
     * @returns A decimal string representation of the permission level.
     */
    public static binaryToDecimal(binaryPermission: string): string {
        // Ensures the binary permission is valid..
        if (!this.isBinaryPermission(binaryPermission)) {
            throw `Unexpected binary permission '${binaryPermission}'.`
        }

        /** The binary permission level as an array. */
        const binaryArray = binaryPermission.split('');

        /** The permission level in decimal. */
        let decimalPermission = '';

        // Loop each group of permissions.
        for (let i = 0; i < 3; i++) {
            /** Take each group of 3 binary permissions. */
            const binaryString =
                (binaryArray[0 + i * 3]) +
                (binaryArray[1 + i * 3]) +
                (binaryArray[2 + i * 3]);
            // Convert from binary to decimal.
            decimalPermission += parseInt(binaryString, 2).toString();
        }

        return decimalPermission;
    }

    /**
     * Takes in a decimal permission string and converts to a binary permission string.
     * 
     * @example
     * binaryToDecimal('777') = '111111111';
     * binaryToDecimal('444') = '100100100';
     * binaryToDecimal('007') = '000000111';
     * @param decimalPermission The permission level as a decimal string.
     * @returns The binary representation of the decimal permission.
     */
    public static decimalToBinary(decimalPermission: string): string {
        // Ensures the decimal permission is valid.
        if (!this.isDecimalPermission(decimalPermission)) {
            throw `Unexpected decimal permission '${decimalPermission}'.`;
        }

        /** The decimal permission as an array. */
        const decimalArray = decimalPermission.split('');

        /** A temporary place to set permissions to allow updating all after calcs. */
        let binaryPermission = new Array(9).fill(0);

        /** Convert the array to binary. */
        decimalArray.forEach((decimalPerm: string, decimalIndex: number) => {
            // Takes the decimal permission and converts to binary.
            const binaryPerm = Number.parseInt(decimalPerm).toString(2).padStart(3, '0');
            
            // Split and add each binary value into the binary permission array.
            binaryPerm.split('').forEach((binPerm: string, binaryIndex: number) => {
                const tempPermIndex = binaryIndex + decimalIndex * 3;
                binaryPermission[tempPermIndex] = Number.parseInt(binPerm);
            });
        });

        return binaryPermission.join('');
    }

    /**
     * Tests the passed in string to see if it is a binary string or not.
     * 
     * @example
     * isBinaryPermission('110')  = true;
     * isBinaryPermission('123')  = false;
     * isBinaryPermission('1')    = false;
     * isBinaryPermission('1234') = false;
     * isBinaryPermission('0000') = false;
     * @param binaryString The string to be tested.
     * @returns True when it is a binary string and false when it is not.
     */
    public static isBinaryPermission(binaryString: string): boolean {
        return new RegExp(/^[10]{9}$/).test(binaryString)
    }

    /**
     * Tests the passed in string to see if it is a valid decimal permission string.
     * 
     * @example
     * isDecimalPermission('777')  = true;
     * isDecimalPermission('123')  = true;
     * isDecimalPermission('1234') = false;
     * isDecimalPermission('22')   = false;
     * isDecimalPermission('888')  = false;
     * @param decimalString The string to be tested.
     * @returns True when is is a decimal permission string, false when it is not.
     */
    public static isDecimalPermission(decimalString: string): boolean {
        return new RegExp(/^[01234567]{3}$/).test(decimalString)
    }
}