class VendingMachine {
  constructor(inventory) {
    // properties = variables assign to a class
    this.coinReturn = 0;
    this.selectedProduct = null;
    this.updateUnits = null;
    this.refill = 0;
    this.refillChange = 0;
    this.dispenseItem = null;
    this.selectedChange = null;
    if (inventory) {
      this.inventory = inventory;
    } else {
      this.inventory = {};
    }
  }
  // need to state money inmachine? whether money is in vending machine??

  // functions

  selectProduct(product) {
    this.selectedProduct = product;
    // checks whether product is in inventory?
    // if not in inventory value will be  undefined
    if (
      this.inventory === undefined ||
      this.inventory.item === undefined ||
      this.inventory.item[product] === undefined ||
      this.inventory.item[product].price === undefined
    ) {
      return null;
    }

    return this.inventory.item[product].price;
    // selects product
    // returns price of product if product in stock
    // returns error msg if product is out of stock
  }

  // function-global
  // method - function for a class
  payProduct(centsPaid) {
    if (
      !this.inventory ||
      !this.inventory.item ||
      !this.inventory.item[this.selectedProduct] === undefined
    ) {
      this.coinReturn = centsPaid;
    } else if (!this.inventory.item[this.selectedProduct]) {
      this.coinReturn = centsPaid;
    } else if (this.inventory.item[this.selectedProduct].units === 0) {
      this.coinReturn = centsPaid;
    } else {
      this.coinReturn =
        centsPaid - this.inventory.item[this.selectedProduct].price;
    }
    // check if money inserted is the same as stated in inventory
    // if not return change
    // pay product returns money if no product is selected
    // wrong currency?
  }

  // need to update inventory when payment sucessful

  updateInventory(update) {
    this.inventory.item[this.selectedProduct].units = update;
    if (this.inventory.item[this.selectedProduct]) {
      this.updateUnits = update;
    } else {
      return this.inventory.item;
    }
    console.log("this is update inventory");
  }
  getInventory() {
    if (this.inventory.item === undefined) {
      return null;
    }
    const inventoryKeys = Object.keys(this.inventory.item).sort();

    if (inventoryKeys.length > 1) {
      return inventoryKeys;
    } else if (inventoryKeys.length > 0) {
      return inventoryKeys[0];
    }
    // else if (inventoryKeys === undefined) {
    //   return undefined;
    // }
    else {
      return null;
    }

    console.log("this is printing the inventory");
    // this function is to return the object inventory showing the products
  }
  refillInventory(refill) {
    this.refill = refill;
    if (this.inventory.item[this.selectedProduct].units === 0) {
      this.refill = refill;
    } else {
      this.refill;
    }
    // refill - if statement
    // if 15-20 no refill
    // if < 14 refill
    //

    console.log("this is the refill inventory");
    // provide input (adds to input to ventory)
    // add item that existing in the machine
    // maxunits 20 = wont refill if quantity is 20
    // refill money too
  }

  selectedChange(change) {
    this.selectedChange = change;
    if (this.inventory[change] === undefined) {
      return null;
    } else {
      this.inventory[product].price >= this.coinReturn;
    }
  }

  resupplyChange(change) {
    const inventoryKeys = Object.keys(this.inventory.coins).sort();
    this.refillChange = change;
    if (this.inventory) console.log("this supples change to the machine");
    //re supplying coins - resupplying change;
  }

  dispenseInventory(product) {
    // how much things cost to c/f how much money is inserted
    this.dispenseItem = product;
    if (
      this.inventory[this.selectedProduct] &&
      this.inventory[this.selectedProduct].price >= this.coinReturn
    ) {
      this.dispenseItem = product;
    } else {
      this.dispenseItem;
    }
  }
}
module.exports = VendingMachine;
