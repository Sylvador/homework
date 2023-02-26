# homework
На всякий случай сделал 2 варианта класса Product
*************************************************
constructor({ name, price, description }) {
    this.name = name;
    this.price = price;
    this.description = description;
    Product._quantity.set(name, (Product._quantity.get(name) ?? 0) + 1); <-------------------------- Отличие
  }

  static _quantity = new Map(); <-------------------------- Отличие
*************************************************
*************************************************
  constructor({ name, price, description, quantity }) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.quantity = quantity; <-------------------------- Отличие
  }
*************************************************
