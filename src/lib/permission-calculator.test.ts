import PermissionCalculator from '@lib/permission-calculator';

/* BINARY TO DECIMAL TESTS */
test.each([
    ['111111111', '777'],
    ['100100100', '444'],
    ['010010010', '222'],
    ['001001001', '111'],
    ['000000000', '000'],
    ['001010011', '123'],
])(
    'PermissionCalculator.binaryToDecimal(%p) = %p',
    (binaryPermission: string, decimalPermission: string) => {
    expect(PermissionCalculator.binaryToDecimal(binaryPermission)).toBe(decimalPermission);
});
test.each([
    ['1234567890'],
    ['12345678'],
    [''],
    ['000000009'],
    ['900000000'],
    ['000090000'],
])('%p is an invalid binary permission', (binaryPermission: string) => {
    expect(() => PermissionCalculator.binaryToDecimal(binaryPermission)).toThrow();
})

/* DECIMAL TO BINARY TESTS */
test.each([
    ['777', '111111111'],
    ['444', '100100100'],
    ['222', '010010010'],
    ['111', '001001001'],
    ['000', '000000000'],
    ['123', '001010011'],
])(
    'PermissionCalculator.decimalToBinary(%p) = %p',
    (decimalPermission: string, binaryPermission: string) => {
    expect(PermissionCalculator.decimalToBinary(decimalPermission)).toBe(binaryPermission);
});
test.each([
    ['1234'],
    ['12'],
    [''],
    ['888'],
])('%p is an invalid decimal permission', (decimalPermission: string) => {
    expect(() => PermissionCalculator.decimalToBinary(decimalPermission)).toThrow();
})

/* IS BINARY TESTS */
test.each([
    ['111111111', true],
    ['001001001', true],
    ['000000000', true],
    ['a00000000', false],
    ['00000000a', false],
    ['1', false],
    ['0', false],
    ['9', false],
    ['19', false],
    ['a', false],
    ['1a', false],
    ['a1', false],
])(
    'PermissionCalculator.isBinary(%p) = %p',
    (binaryString: string, isValid: boolean) => {
    expect(PermissionCalculator.isBinaryPermission(binaryString)).toBe(isValid);
});

/* IS DECIMAL PERMISSION TESTS */
test.each([
    ['777', true],
    ['444', true],
    ['111', true],
    ['1', false],
    ['8', false],
    ['888', false],
    ['a', false],
    ['abc', false],
])(
    'PermissionCalculator.isDecimalPermission(%p) = %p',
    (decimalPermission: string, isValid: boolean) => {
    expect(PermissionCalculator.isDecimalPermission(decimalPermission)).toBe(isValid);
});