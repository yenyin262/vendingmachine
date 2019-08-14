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
    // this.refill = 0;
    // this.refillChange = 0;
    this.dispenseItem = null;

    if (inventory) {
      this.inventory = inventory;
    } else {
      this.inventory = {};
    }
  }

  getCoinTypes() {
    this.coinTypes = Object.keys(this.coinTypes);
    return this.coinTypes;
  }

  getPriceForProduct(product) {
    this.selectedProduct = product;

    if (
      this.inventory === undefined ||
      this.inventory[product] === undefined ||
      this.inventory[product].price === undefined
    ) {
      return null;
    }

    return this.inventory[product].price;
  }

  payProduct(centsPaid, product) {
    if (
      (this.inventory && this.inventory[this.selectedProduct] === undefined) ||
      !this.inventory[this.selectedProduct] ||
      this.inventory[this.selectedProduct].units === 0 ||
      centsPaid < this.inventory[this.selectedProduct].price
    ) {
      this.coinReturn = centsPaid;
      this.dispenseItem = null;
    }
    //  else if (!this.inventory[this.selectedProduct]) {
    //   this.coinReturn = centsPaid;
    //   this.dispenseItem = null;
    // } else if (this.inventory[this.selectedProduct].units === 0) {
    //   this.coinReturn = centsPaid;
    //   this.dispenseItem = null;
    // } else if (centsPaid < this.inventory[this.selectedProduct].price) {
    //   this.coinReturn = centsPaid;
    //   this.dispenseItem = null;
    // }
    else {
      this.coinReturn = centsPaid - this.inventory[this.selectedProduct].price;
      this.dispenseItem = product;
    }
    return product;
    // this.coinReturn =
    //   centsPaid - this.inventory[this.selectedProduct].price;
    // this.dispenseItem = product;
    // if (
    //   this.inventory[this.selectedProduct] &&
    //   this.inventory[this.selectedProduct].price &&
    //   this.coinReturn
    // ) {
    //   this.dispenseItem = product;
    // } else {
    //   this.dispenseItem;
    // }
  }

  // dispenseInventory(product, centsPaid) {
  //   this.coinReturn =
  //     centsPaid - this.inventory[this.selectedProduct].price;
  //   this.dispenseItem = product;
  //   if (
  //     this.inventory[this.selectedProduct] &&
  //     this.inventory[this.selectedProduct].price &&
  //     this.coinReturn
  //   ) {
  //     this.dispenseItem = product;
  //   } else {
  //     this.dispenseItem;
  //   }
  // }

  updateInventory(update) {
    this.inventory[this.selectedProduct].units = update;
    if (this.inventory[this.selectedProduct]) {
      this.updateUnits = update;
      return update;
    } else {
      return this.inventory;
    }
  }

  /// work on this part
  getInventory() {
    if (this.inventory === undefined) {
      return null;
    }
    const inventoryKeys = Object.keys(this.inventory).sort();
    if (inventoryKeys.length > 0) {
      return inventoryKeys;
    } else {
      return null;
    }
  }

  // refillInventoryForSelectedProduct(refillSelectedProduct) {
  //   this.refill = refillSelectedProduct;
  //   if (this.inventory[this.selectedProduct].units === 0) {
  //     this.refill = refillSelectedProduct;
  //   } else {
  //     this.refill = null;
  //   }
  // }

  refillInventoryForSelectedProduct(quantity, product) {
    if (!this.inventory[product]) {
      return "invalid product";
    } else if (this.inventory[product].units + quantity > 20) {
      return "item already fully stocked ";
    } else {
      return (this.inventory[product].units += quantity);
    }
  }

  returnChanges(centsPaid) {
    if (this.inventory[this.selectedProduct].units !== 0) {
      this.coinReturn = centsPaid - this.inventory[this.selectedProduct].price;

      const coins = [2, 1, 0.25, 0.1, 0.05];
      const coinsRound = coins.map(coin => coin * 100);

      let returnCoin = [];
      for (let i in coinsRound) {
        let finalChange = coinsRound[i];
        //each index of the return array represents the no. of coin in each coin type to return
        returnCoin.push(Math.floor(this.coinReturn / finalChange));

        //update change value
        this.coinReturn = Math.round(this.coinReturn % finalChange);
      }

      const inventoryChange = {
        twoDollar: returnCoin[0],
        oneDollar: returnCoin[1],
        twentyFiveCents: returnCoin[2],
        tenCents: returnCoin[3],
        fiveCents: returnCoin[4]
      };

      return inventoryChange;
    } else {
      const change = this.coinReturn;
      this.coinReturn = 0;
      return change;
    }
  }

  //   resupplyChange(change, coinType) {
  //     this.refillChange = change;
  //     this.coinTypes = coinType;
  //     const coinkeys = Object.keys(this.coinTypes);
  //     for (const coinkey of coinkeys) {
  //       if (
  //         this.coinTypes[coinkey] === 25 &&
  //         this.coinTypes[coinkey].amount === 25
  //       ) {
  //         this.refillChange = change;
  //         let finalreturn = change + this.coinTypes[coinkey].amount;
  //         return finalreturn;
  //       } else if (this.coinTypes[coinkey].amount > 25) {
  //         this.refillChange = 0;
  //       }
  //     }
  //   }
  // }

  resupplyChange(quantity, coinType) {
    if (!this.coinTypes[coinType]) {
      return "Invalid CoinType";
    } else {
      this.coinTypes[coinType].amount += quantity;
    }
  }
}
module.exports = VendingMachine;
