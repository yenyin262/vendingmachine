class VendingMachine {
  constructor(inventory) {
    // properties = variables assign to a class
    this.coinReturn = 0;
    this.selectedProduct = null;
    this.updateUnits = null;
    this.refill = 0;
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
    if (this.inventory[product] === undefined) {
      return null;
    }

    return this.inventory[product].price;
    // selects product
    // returns price of product if product in stock
    // returns error msg if product is out of stock
  }

  // function-global
  // method - function for a class
  payProduct(centsPaid) {
    if (!this.inventory[this.selectedProduct]) {
      this.coinReturn = centsPaid;
    } else if (this.inventory[this.selectedProduct].units === 0) {
      this.coinReturn = centsPaid;
    } else {
      this.coinReturn = centsPaid - this.inventory[this.selectedProduct].price;
    }
    // check if money inserted is the same as stated in inventory
    // if not return change
    // pay product returns money if no product is selected
    // wrong currency?
  }

  // need to update inventory when payment sucessful

  updateInventory(update) {
    this.inventory[this.selectedProduct].units = update;
    if (this.inventory[this.selectedProduct]) {
      this.updateUnits = update;
    } else {
      return this.inventory;
    }
    console.log("this is update inventory");
  }
  getInventory() {
    const inventoryKeys = Object.keys(this.inventory).sort();

    if (inventoryKeys.length > 1) {
      return inventoryKeys;
    } else if (inventoryKeys.length > 0) {
      return inventoryKeys[0];
    } else {
      return null;
    }

    console.log("this is printing the inventory");
    // this function is to return the object inventory showing the products
  }
  refillInventory(refill) {
    this.refill = refill;
    if (this.inventory[this.selectedProduct].units === 0) {
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

  resupplyVendingMachineChange() {
    console.log("this supples change to the machine");
    //re supplying coins - resupplying change
  }

  dispenseInventory() {
    // if there is no product or selected prdocut dont exist
    // dispense
    //
    //making payment - return item to what is purchased
    // and changed if any //
    // is item in inventory?
    // check if item is in inventory? if it is in inventory// check amount and whether change needed?
    // no change return item only
    // if change needed - return item and change
  }
}
module.exports = VendingMachine;
