class VendingMachine {
  constructor(inventory) {
    this.coinTypes = {
      fiveCents: {
        name: 0.05,
        amount: 50
      },
      tenCents: {
        name: 0.1,
        amount: 50
      },
      twentyFiveCents: {
        name: 0.25,
        amount: 50
      },
      oneDollar: {
        name: 1,
        amount: 50
      },
      twoDollar: {
        name: 2,
        amount: 25
      }
    };

    this.coinReturn = 0;
    this.selectedProduct = null;
    this.updateUnits = null;
    this.refill = 0;
    this.refillChange = 0;
    this.dispenseItem = null;
    this.result = null;

    if (inventory) {
      this.inventory = inventory;
    } else {
      this.inventory = {};
    }
  }

  // should be called "getCoinTypes"
  getCoin() {
    this.coinTypes = Object.keys(this.coinTypes);
    return this.coinTypes;
  }

  // should be named getPriceForProduct
  selectProduct(product) {
    this.selectedProduct = product;

    // every "this.inventory.item" in this file can be shortened
    // to "this.inventory" (we don't need the .item)
    if (
      this.inventory === undefined ||
      this.inventory.item === undefined ||
      this.inventory.item[product] === undefined ||
      this.inventory.item[product].price === undefined
    ) {
      return null;
    }

    return this.inventory.item[product].price;
  }

  // this should return the dispensed product
  payProduct(centsPaid) {
    // if (A && B && C) else...
    // easier to read compared to
    // if (!A || !B || !C)

    if (
      !this.inventory ||
      !this.inventory.item ||
      !this.inventory.item[this.selectedProduct] === undefined
    ) {
      this.coinReturn = centsPaid;
      // these 2 else ifs can just go in the "||"s above?
    } else if (!this.inventory.item[this.selectedProduct]) {
      this.coinReturn = centsPaid;
    } else if (this.inventory.item[this.selectedProduct].units === 0) {
      this.coinReturn = centsPaid;
    } else {
      this.coinReturn =
        centsPaid - this.inventory.item[this.selectedProduct].price;
    }

    // no return?
  }

  updateInventory(update) {
    this.inventory.item[this.selectedProduct].units = update;
    if (this.inventory.item[this.selectedProduct]) {
      this.updateUnits = update;
      // no return?
    } else {
      return this.inventory.item;
    }
  }

  // this should consistently return an array (not a string when there is only one item)
  getInventory() {
    if (this.inventory.item === undefined) {
      return null;
    }
    const inventoryKeys = Object.keys(this.inventory.item).sort();
    if (inventoryKeys.length > 1) {
      return inventoryKeys;
    } else if (inventoryKeys.length > 0) {
      return inventoryKeys[0];
    } else {
      return null;
    }
  }

  // should be named refillInventoryForSelectedProduct
  // to make it clear whats being refilled
  // the parameter should be named something else
  refillInventory(refill) {
    this.refill = refill;

    // why can we only refill if current product is out of stock?
    if (this.inventory.item[this.selectedProduct].units === 0) {
      this.refill = refill;
    } else {
      // this isn't doing anything
      this.refill;
    }
  }

  // return changes shouldn't require "price" as a parameter
  // the vending machine first requires you to pick a product
  // then you can get the current product's price with
  // this.currentProduct.price
  returnChanges(centsPaid, price) {
    if (this.inventory.item[this.selectedProduct].units !== 0) {
      price = this.inventory.item[this.selectedProduct].price;

      this.coinReturn = centsPaid - price;

      // no pennies?
      let coins = [2, 1, 0.25, 0.1, 0.05];
      let coinsRound = coins.map(coin => coin * 100);

      let returnCoin = [];
      // nice!
      for (let i in coinsRound) {
        let finalChange = coinsRound[i];
        //each index of the return array represents the no. of coin in each coin type to return
        returnCoin.push(Math.floor(this.coinReturn / finalChange));

        //update change value
        this.coinReturn = Math.round(this.coinReturn % finalChange);
      }

      // why need to assign to this.result?
      this.result = returnCoin;

      // this could be part of the for loop above
      return returnCoin.reduce(
        (coinTypes, amount, index) => {
          switch (index) {
            case 0:
              coinTypes["twoDollar"] = coinTypes.twoDollar + amount;
              break;
            case 1:
              coinTypes["oneDollar"] = coinTypes.oneDollar + amount;
              break;
            case 2:
              coinTypes["twentyFiveCents"] = coinTypes.twentyFiveCents + amount;
              break;
            case 3:
              coinTypes["tenCents"] = coinTypes.tenCents + amount;
              break;
            case 4:
              coinTypes["fiveCents"] = coinTypes.fiveCents + amount;
              break;
          }
          return coinTypes;
        },
        {
          twoDollar: 0,
          oneDollar: 0,
          twentyFiveCents: 0,
          tenCents: 0,
          fiveCents: 0
        }
      );
    } else {
      const change = this.coinReturn;
      this.coinReturn = 0;
      return change;
    }
  }

  // huh? this method returns the input number + amount of quarters left?
  resupplyChange(change) {
    this.refillChange = change;
    const coinkeys = Object.keys(this.coinTypes);
    for (const coinkey of coinkeys) {
      if (this.coinTypes[coinkey].amount === 25) {
        this.refillChange = change;
        let finalreturn = change + this.coinTypes[coinkey].amount;
        return finalreturn;
      } else if (this.coinTypes[coinkey].amount > 25) {
        this.refillChange = 0;
      }
    }
  }

  // this should be part of payProduct
  // i.e payProduct should return the dispensed item
  // and you can get rid of this method
  dispenseInventory(product, centsPaid) {
    this.coinReturn =
      centsPaid - this.inventory.item[this.selectedProduct].price;
    this.dispenseItem = product;
    if (
      this.inventory[this.selectedProduct] &&
      this.inventory[this.selectedProduct].price &&
      this.coinReturn
    ) {
      this.dispenseItem = product;
    } else {
      this.dispenseItem;
    }
  }
}
module.exports = VendingMachine;
