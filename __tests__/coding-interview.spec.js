const VendingMachine = require("../src/coding-interview");

describe("VendingMachine", () => {
  //instance of vending machine
  let vendingMachine;

  // second describe to describe the function

  // using the vending machine

  //get inventory to return data
  // not return msges

  describe("brand new vending machine", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({});
    });
    it("looking at the inventory", () => {
      // if undefined = created but not used /
      // null - no value
      expect(vendingMachine.getInventory()).toEqual(null);
    });
    it("select a product", () => {
      //returns new object with this functions
      // return value
      expect(vendingMachine.selectProduct("oreo")).toEqual(null);
    });
    it("pay for product", () => {
      vendingMachine.selectProduct("oreo");
      vendingMachine.payProduct(200);
      expect(vendingMachine.coinReturn).toEqual(200);
    });
  });
  describe("vending machine with inventory", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({ GrapeFanta: 100 });
    });
    it("looking at the inventory", () => {
      // if undefined = created but not used /
      // null - no value
      expect(vendingMachine.getInventory()).toEqual("GrapeFanta");
    });
    it("select a product", () => {
      //returns new object with this functions
      // return value
      expect(vendingMachine.selectProduct("GrapeFanta")).toEqual(100);
    });
    it("pay for product", () => {
      vendingMachine.selectProduct("GrapeFanta");
      vendingMachine.payProduct(200);
      expect(vendingMachine.coinReturn).toEqual(100);
    });
  });
  describe("vending machine with two items", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        GrapeFanta: 100,
        VanillaTea: 600
      });
    });
    it("looking at the inventory", () => {
      // if undefined = created but not used /
      // null - no value
      expect(vendingMachine.getInventory()).toEqual([
        "GrapeFanta",
        "VanillaTea"
      ]);
    });
    it("select a product", () => {
      //returns new object with this functions
      // return value
      expect(vendingMachine.selectProduct("VanillaTea")).toEqual(600);
    });
    it("pay for product", () => {
      vendingMachine.selectProduct("VanillaTea");
      vendingMachine.payProduct(600);
      expect(vendingMachine.coinReturn).toEqual(0);
    });
  });
});
