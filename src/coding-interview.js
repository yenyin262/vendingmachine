class VendingMachine {
  constructor(inventory) {
    // properties = variables assign to a class
    this.coinTypes = {
      fiveCents: {
        name: 0.05,
        amount: 40
      },
      tenCents: {
        name: 0.1,
        amount: 50
      },
      twentyFiveCents: {
        name: 0.25,
        amount: 40
      },
      OneDollar: {
        name: 1,
        amount: 40
      },
      TwoDollar: {
        name: 2,
        amount: 0
      }
    };
    // loop through original object = pass amount to new object //
    //
    // user needs 10 coins
    // 2 dollars plus one dollar
    //

    this.coinReturn = 0;
    this.selectedProduct = null;
    this.updateUnits = null;
    this.refill = 0;
    this.refillChange = 0;
    this.dispenseItem = null;
    this.selectedChange = null;
    this.selectedCoin = null;
    if (inventory) {
      this.inventory = inventory;
    } else {
      this.inventory = {};
    }
  }
  // need to state money inmachine? whether money is in vending machine??

  // functions

  getCoin() {
    this.coinTypes = Object.keys(this.coinTypes);
    return this.coinTypes;
  }

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
  }

  selectCoin(coin) {
    this.selectedCoin = coin;
    // checks whether product is in inventory?
    // if not in inventory value will be  undefined
    // if (
    //   this.inventory === undefined ||
    //   this.inventory.item === undefined ||
    //   this.inventory.item[product] === undefined ||
    //   this.inventory.item[product].price === undefined
    // ) {
    //   return null;
    // }

    return this.coinTypes[coin];
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
    } else {
      return null;
    }
  }

  refillInventory(refill) {
    this.refill = refill;
    if (this.inventory.item[this.selectedProduct].units === 0) {
      this.refill = refill;
    } else {
      this.refill;
    }
  }

  //   selectedChange(change) {
  //     // this.selectedChange = change;
  //     this.coinRetun = change;
  //     if (this.inventory.item || this.inventory.item[change] === undefined) {
  //       return null;
  //     } else {
  //       this.inventory.item[product].price >= this.coinReturn;
  //     }
  //   }

  returnChange() {
    const change = this.coinReturn;
    this.coinReturn = 0;
    return change;
    // if else statements // loops through object//
    // need to return the number of coins
    // know value only
  }

  returnChanges(centsPaid, price) {
    price = this.inventory.item[this.selectedProduct].price;
    this.coinReturn = (centsPaid - price) * 100;
    // value of coins in inventory
    // operate biggest to smallest so it returns least number of coins
    let coins = [2, 1, 0.25, 0.1, 0.05];
    let coinsRound = coins.map(coin => coin * 100);
    // coinsRound = [200, 100, 25, 10, 5]
    let returnCoin = [];
    for (let i in coinsRound) {
      let finalChange = coinsRound[i];
      //pushing the  integer representing the coin to return
      // [TwoDollar: 0 OneDollar: 0  TwentyFiveCents: 0 TenCents: 0  FiveCents:  0 ]
      returnCoin.push(Math.floor(this.coinReturn / finalChange));
      //update change
      this.coinReturn = Math.round(this.coinReturn % returnCoin);
      // returns [0] if returnChanges(600,600)
    }

    return returnCoin;
  }
  resupplyChange(change) {
    // let coinkey = Object.keys(this.coinTypes);

    this.refillChange = change;
    if (
      this.coinTypes[this.selectedCoin] === undefined ||
      this.coinTypes[this.selectedCoin].amount === undefined
    ) {
      console.log(this.coinTypes[this.selectedCoin].amount, "help");
      return null;
    }

    if (this.coinTypes[this.selectCoin].amount === 0) {
      this.refillChange = refill;
    } else {
      this.refillChange;
    }
  }
  dispenseInventory(product, centsPaid) {
    // how much things cost to c/f how much money is inserted

    this.coinReturn =
      centsPaid - this.inventory.item[this.selectedProduct].price;
    this.dispenseItem = product;
    if (
      // product selected
      this.inventory[this.selectedProduct] &&
      //and money paid
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
