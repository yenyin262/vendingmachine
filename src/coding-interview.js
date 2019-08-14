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
      this.inventory &&
      this.inventory[product] &&
      this.inventory[product].units === 0
    ) {
      return "product out of stock, please select another product";
    } else if (centsPaid < this.inventory[product].price) {
      return `insufficient funds: $${this.inventory[product].price -
        centsPaid}`;
    } else {
      this.inventory[product].units--;
      return `Product: ${product}, Change: ${centsPaid -
        this.inventory[product].price}`;
    }
  }

  updateInventory(product) {
    console.log(product, this.inventory[product].units);
    this.inventory[product].units--;
  }

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

  resupplyChange(quantity, coinType) {
    if (!this.coinTypes[coinType]) {
      return "Invalid CoinType";
    } else {
      this.coinTypes[coinType].amount += quantity;
    }
  }
}
module.exports = VendingMachine;
