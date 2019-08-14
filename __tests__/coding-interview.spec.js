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
      expect(vendingMachine.getPriceForProduct("oreo")).toEqual(null);
    });
  });
  describe("vending machine with inventory", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        GrapeFanta: { price: 100, units: 15, maxUnits: 20 }
      });
    });
    it("should check what is in the inventory", () => {
      expect(vendingMachine.getInventory()[0]).toEqual("GrapeFanta");
    });
    it(" should select a product and return price ", () => {
      expect(vendingMachine.getPriceForProduct("GrapeFanta")).toEqual(100);
    });
    it("should pay for product and return change ", () => {
      vendingMachine.getPriceForProduct("GrapeFanta");

      expect(vendingMachine.returnChanges(200, 100)).toEqual({
        twoDollar: 0,
        oneDollar: 1,
        twentyFiveCents: 0,
        tenCents: 0,
        fiveCents: 0
      });
    });
    it("should dispense paid Item ", () => {
      vendingMachine.getPriceForProduct("GrapeFanta");
      vendingMachine.payProduct(200, "GrapeFanta");
      expect(vendingMachine.dispenseItem).toEqual("GrapeFanta");
    });
    it("inventory updated for GrapeFanta item aft payment ", () => {
      vendingMachine.getPriceForProduct("GrapeFanta");
      vendingMachine.payProduct(200, "GrapeFanta");
      vendingMachine.updateInventory(14);
      expect(vendingMachine.updateUnits).toEqual(14);
    });
  });
  describe("vending machine with inventory returns no change for exact payment", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        GrapeFanta: { price: 100, units: 15, maxUnits: 20 },
        VanillaTea: { price: 600, units: 15, maxUnits: 20 }
      });
    });
    // it("should check what is in the inventory", () => {
    //   expect(vendingMachine.getInventory()).toEqual([
    //     "GrapeFanta",
    //     "VanillaTea"
    //   ]);
    // });
    // it(" should select a product and return price", () => {
    //   expect(vendingMachine.getPriceForProduct("VanillaTea")).toEqual(600);
    // });
    it(" should pay for product and return no change for exact payment", () => {
      vendingMachine.getPriceForProduct("VanillaTea");
      expect(vendingMachine.returnChanges(600, 600)).toEqual({
        twoDollar: 0,
        oneDollar: 0,
        twentyFiveCents: 0,
        tenCents: 0,
        fiveCents: 0
      });
    });
    // it("should dispense paid Item ", () => {
    //   vendingMachine.getPriceForProduct("VanillaTea");
    //   vendingMachine.payProduct(600, "VanillaTea");
    //   expect(vendingMachine.dispenseItem).toEqual("VanillaTea");
    // });
    // it("inventory updated for VanillaTea item aft payment ", () => {
    //   vendingMachine.getPriceForProduct("VanillaTea");
    //   vendingMachine.payProduct(600);
    //   vendingMachine.updateInventory(14);
    //   expect(vendingMachine.updateUnits).toEqual(14);
    // });
  });
  describe("vending machine with one item out of stock and fully stocked ", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        GrapeFanta: { price: 100, units: 15, maxUnits: 20 },
        VanillaTea: { price: 600, units: 15, maxUnits: 20 },
        MountainDew: { price: 400, units: 0, maxUnits: 20 },
        HotPeppersChocBar: { price: 200, units: 20, maxUnits: 20 }
      });
    });
    // it("should check what is in the inventory", () => {
    //   expect(vendingMachine.getInventory()).toEqual([
    //     "GrapeFanta",
    //     "HotPeppersChocBar",
    //     "MountainDew",
    //     "VanillaTea"
    //   ]);
    // });
    // it(" should select a product and return price", () => {
    //   expect(vendingMachine.getPriceForProduct("MountainDew")).toEqual(400);
    // });
    it("should return money for product out of stock ", () => {
      vendingMachine.getPriceForProduct("MountainDew");
      vendingMachine.payProduct(400, "MountainDew");
      expect(vendingMachine.returnChanges(400)).toEqual(400);
    });
    it("should not dispense an item that is out of stock ", () => {
      vendingMachine.getPriceForProduct("MountainDew");
      vendingMachine.payProduct(400, "MountainDew");
      expect(vendingMachine.dispenseItem).toEqual(null);
    });
    it("should refill inventory when item is less than 20 units ", () => {
      // vendingMachine.refillInventoryForSelectedProduct(20, "MountainDew");
      vendingMachine.refillInventoryForSelectedProduct(5, "VanillaTea");
      // expect(vendingMachine.refill).toEqual(20);
      expect(vendingMachine.inventory["VanillaTea"].units).toEqual(20);
    });
    it("should not refill inventory for invalid product", () => {
      expect(
        vendingMachine.refillInventoryForSelectedProduct(5, "Coke")
      ).toEqual("invalid product");
    });

    it("should not refill inventory for item with 20 units", () => {
      expect(
        vendingMachine.refillInventoryForSelectedProduct(5, "HotPeppersChocBar")
      ).toEqual("item already fully stocked ");
    });
    it("should not dispense an item when there is insufficient funds ", () => {
      vendingMachine.getPriceForProduct("GrapeFanta");
      vendingMachine.payProduct(50, "GrapeFanta");
      expect(vendingMachine.dispenseItem).toEqual(null);
    });
  });
  describe("Vending Machine and its change", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        GrapeFanta: { price: 100, units: 15, maxUnits: 20 }
      });
    });
    it("should return coins that are accepted in Vending Machine", () => {
      expect(vendingMachine.getCoinTypes()).toEqual([
        "fiveCents",
        "tenCents",
        "twentyFiveCents",
        "oneDollar",
        "twoDollar"
      ]);
    });
    it("should resupply change where the value of a coin has reached an amount of 25 ", () => {
      vendingMachine.resupplyChange(10, "twoDollar");
      expect(vendingMachine.coinTypes["twoDollar"].amount).toEqual(35);
    });
    it(" should not resupply change where invalid coinType ", () => {
      expect(vendingMachine.resupplyChange(4, "onePenny")).toEqual(
        "Invalid CoinType"
      );
    });
  });
});
