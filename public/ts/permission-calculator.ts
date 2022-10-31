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
        // Handles when the binary permission is unexpected.
        if (binaryPermission.length !== 9) {
            throw `Unexpected length of binary permission '${binaryPermission.length}' instead of '9'.`;
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
        // Ensures the array has 3 numbers.
        if (decimalPermission.length !== 3) {
            throw `Unexpected length of decimal permission '${decimalPermission}' instead of '3'.`;
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
}