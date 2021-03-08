import { iron } from '../src/client/js/formHandler'

describe("test irony score", () => {
  test("should return true", () => {
    const irony = "IRONIC";
    expect(iron(irony)).toBe("Yup ;)");
  });
  test("should return true", () => {
    const irony = "NONIRONIC";
    expect(iron(irony)).toBe("No :/");
  });
});
