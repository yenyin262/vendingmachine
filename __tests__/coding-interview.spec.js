const VendingMachine = require("../src/coding-interview");

describe("VendingMachine", () => {
  let vendingMachine;

  describe("brand new vending machine", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({});
    });
    it("should check what is in the inventory", () => {
      expect(vendingMachine.getInventory()).toEqual(null);
    });
    it(" should select a product and return no price", () => {
      expect(vendingMachine.selectProduct("oreo")).toEqual(null);
    });
  });
  describe("vending machine with inventory", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        item: {
          GrapeFanta: { price: 100, units: 15, maxUnits: 20 }
        }
      });
    });
    it("should check what is in the inventory", () => {
      expect(vendingMachine.getInventory()).toEqual("GrapeFanta");
    });
    it(" should select a product and return price ", () => {
      expect(vendingMachine.selectProduct("GrapeFanta")).toEqual(100);
    });
    it("should pay for product and return change ", () => {
      vendingMachine.selectProduct("GrapeFanta");
      expect(vendingMachine.returnChanges(200, 100)).toEqual({
        twoDollar: 0,
        oneDollar: 1,
        twentyFiveCents: 0,
        tenCents: 0,
        fiveCents: 0
      });
    });
    it("should dispense paid Item ", () => {
      vendingMachine.selectProduct("GrapeFanta");
      vendingMachine.payProduct(200);
      vendingMachine.dispenseInventory("GrapeFanta", 200);
      expect(vendingMachine.dispenseItem).toEqual("GrapeFanta");
    });
    it("inventory updated for GrapeFanta item aft payment ", () => {
      vendingMachine.selectProduct("GrapeFanta");
      vendingMachine.payProduct(200);
      vendingMachine.updateInventory(14);
      expect(vendingMachine.updateUnits).toEqual(14);
    });
  });
  describe("vending machine with two items", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        item: {
          GrapeFanta: { price: 100, units: 15, maxUnits: 20 },
          VanillaTea: { price: 600, units: 15, maxUnits: 20 }
        }
      });
    });
    it("should check what is in the inventory", () => {
      expect(vendingMachine.getInventory()).toEqual([
        "GrapeFanta",
        "VanillaTea"
      ]);
    });
    it(" should select a product and return price", () => {
      expect(vendingMachine.selectProduct("VanillaTea")).toEqual(600);
    });
    it(" should pay for product and return no change for exact payment", () => {
      vendingMachine.selectProduct("VanillaTea");
      expect(vendingMachine.returnChanges(600, 600)).toEqual({
        twoDollar: 0,
        oneDollar: 0,
        twentyFiveCents: 0,
        tenCents: 0,
        fiveCents: 0
      });
    });
    it("should dispense paid Item ", () => {
      vendingMachine.selectProduct("VanillaTea");
      vendingMachine.payProduct(600);
      vendingMachine.dispenseInventory("VanillaTea");
      expect(vendingMachine.dispenseItem).toEqual("VanillaTea");
    });
    it("inventory updated for VanillaTea item aft payment ", () => {
      vendingMachine.selectProduct("VanillaTea");
      vendingMachine.payProduct(600);
      vendingMachine.updateInventory(14);
      expect(vendingMachine.updateUnits).toEqual(14);
    });
  });
  describe("vending machine with one item out of stock and fully stocked ", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        item: {
          GrapeFanta: { price: 100, units: 15, maxUnits: 20 },
          VanillaTea: { price: 600, units: 15, maxUnits: 20 },
          MountainDew: { price: 400, units: 0, maxUnits: 20 },
          HotPeppersChocBar: { price: 200, units: 20, maxUnits: 20 }
        }
      });
    });
    it("should check what is in the inventory", () => {
      expect(vendingMachine.getInventory()).toEqual([
        "GrapeFanta",
        "HotPeppersChocBar",
        "MountainDew",
        "VanillaTea"
      ]);
    });
    it(" should select a product and return price", () => {
      expect(vendingMachine.selectProduct("MountainDew")).toEqual(400);
    });
    it("should return money for product out of stock ", () => {
      vendingMachine.selectProduct("MountainDew");
      vendingMachine.payProduct(400);
      expect(vendingMachine.returnChanges(400, 400)).toEqual(400);
    });
    it("should not dispense an item that is out of stock ", () => {
      vendingMachine.selectProduct("MountainDew");
      vendingMachine.payProduct(400);
      vendingMachine.dispenseInventory(null);
      expect(vendingMachine.dispenseItem).toEqual(null);
    });
    it("should refill inventory when item is out of stock", () => {
      vendingMachine.selectProduct("MountainDew");
      vendingMachine.refillInventory(20);
      expect(vendingMachine.refill).toEqual(20);
    });
    it("should not refill inventory for item with 20 units", () => {
      vendingMachine.selectProduct("HotPeppersChocBar");
      vendingMachine.refillInventory(0);
      expect(vendingMachine.refill).toEqual(0);
    });
    it("should not dispense an item when there is insufficient funds ", () => {
      vendingMachine.selectProduct("GrapeFanta");
      vendingMachine.payProduct(50);
      vendingMachine.dispenseInventory(null);
      expect(vendingMachine.dispenseItem).toEqual(null);
    });
  });
  describe("Vending Machine and its change", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        item: {
          GrapeFanta: { price: 100, units: 15, maxUnits: 20 }
        }
      });
    });
    it("should return coins that are accepted in Vending Machine", () => {
      expect(vendingMachine.getCoin()).toEqual([
        "fiveCents",
        "tenCents",
        "twentyFiveCents",
        "oneDollar",
        "twoDollar"
      ]);
    });
    it("should resupply change where the value of a coin has reached an amount of 25 ", () => {
      expect(vendingMachine.resupplyChange(25)).toEqual(50);
    });
    it(" should not resupply change where the value of a coin minimum amount is 26 ", () => {
      vendingMachine.resupplyChange(null);
      expect(vendingMachine.refillChange).toEqual(null);
    });
  });
});
