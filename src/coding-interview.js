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

  getCoin() {
    this.coinTypes = Object.keys(this.coinTypes);
    return this.coinTypes;
  }

  selectProduct(product) {
    this.selectedProduct = product;

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
  }

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

  returnChanges(centsPaid, price) {
    if (
      this.inventory.item[this.selectedProduct].units !== 0 &&
      !this.inventory.item[this.selectedProduct]
    ) {
      price = this.inventory.item[this.selectedProduct].price;

      this.coinReturn = centsPaid - price;

      let coins = [2, 1, 0.25, 0.1, 0.05];
      let coinsRound = coins.map(coin => coin * 100);

      let returnCoin = [];
      for (let i in coinsRound) {
        let finalChange = coinsRound[i];
        //each index of the return array represents the no. of coin in each coin type to return
        returnCoin.push(Math.floor(this.coinReturn / finalChange));

        //update change value
        this.coinReturn = Math.round(this.coinReturn % finalChange);
      }
      this.result = returnCoin;

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
