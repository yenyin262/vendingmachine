const VendingMachine = require("../src/coding-interview");

describe("VendingMachine", () => {
  let vendingMachine;

  describe("brand new vending machine", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({});
    });
    it("should check what is in the inventory", () => {
      expect(vendingMachine.getInventory()).toEqual([]);
    });
    it(" should select a product and return no price", () => {
      expect(vendingMachine.getPriceForProduct("oreo")).toEqual(null);
    });
  });
  describe("vending machine with inventory", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        GrapeFanta: { price: 100, units: 15, maxUnits: 20 },
        OrangeFanta: { price: 100, units: 5, maxUnits: 20 }
      });
    });
    it("should check what is in the inventory", () => {
      expect(vendingMachine.getInventory()).toEqual([
        "GrapeFanta",
        "OrangeFanta"
      ]);
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
      const result = vendingMachine.payProduct(200, "GrapeFanta");
      expect(result).toEqual("Product: GrapeFanta, Change: 100");
    });
    it("should update inventory for GrapeFanta item aft payment ", () => {
      vendingMachine.payProduct(200, "GrapeFanta");
      expect(vendingMachine.inventory["GrapeFanta"].units).toEqual(14);
    });
  });

  describe("vending machine with inventory returns no change for exact payment", () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine({
        GrapeFanta: { price: 100, units: 15, maxUnits: 20 },
        VanillaTea: { price: 600, units: 15, maxUnits: 20 }
      });
    });

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
    it("should not dispense an item that is out of stock ", () => {
      const result = vendingMachine.payProduct(400, "MountainDew");
      expect(result).toEqual(
        "product out of stock, please select another product"
      );
    });
    it("should not dispense an item where there is insufficient funds ", () => {
      const result = vendingMachine.payProduct(400, "VanillaTea");
      expect(result).toEqual("insufficient funds: $200");
    });
    it("should refill inventory when item is less than 20 units ", () => {
      vendingMachine.refillInventoryForSelectedProduct(5, "VanillaTea");
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
