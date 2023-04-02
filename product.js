class Product {
  constructor({ name, price, description }) {
    this.name = name;
    this.price = price;
    this.description = description;
    Product._quantity.set(name, (Product._quantity.get(name) ?? 0) + 1);
  }

  static _quantity = new Map();
  static createProduct({ name, price, description }) {
    return new Product({ name, price, description });
  }

  static findProducts({ products, query }) {
    function applyFilter(product, filter) {
      let [field, method, value] = filter.split('-');
      return value === undefined ? product._compareNumber(product, field, method) : product['_' + method](field, value);
    }
    try {
      let filters = query.split('&');
      return products.filter(product => filters.every(filter => applyFilter(product, filter)));
    } catch (error) {
      console.log('Проверьте корректность введённых данных.', `\n${error}`);
    }
  }
  // string filteriing operators: contains, starts, ends
  // number filtering operators: <, =, >, <=, >=
  _contains(field, value) {
    return this[field].toLowerCase().includes(value.toLowerCase());
  }
  _starts(field, value) {
    return this[field].toLowerCase().startsWith(value.toLowerCase());
  }
  _ends(field, value) {
    return this[field].toLowerCase().endsWith(value.toLowerCase());
  }
  _compareNumber(product, field, value) {
    let number = value.match(/\d/g).join('');
    let op = value.match(/\D/g).join('');
    let fieldToCompare = (field === 'quantity') ? Product._quantity.get(product.name) : this[field];
    switch(op) {
      case '<':
        return fieldToCompare < number;
      case '=':
        return fieldToCompare == number;
      case '>':
        return fieldToCompare > number;
      case '<=':
        return fieldToCompare <= number;
      case '>=':
        return fieldToCompare >= number;
  }
  }
}

let products = [];
for (let i = 0; i < 6; i++) {
  products.push(Product.createProduct({ name: 'Fd product', price: 10, description: 'Sample text' }));
}
for (let i = 0; i < 7; i++) {
  products.push(Product.createProduct({ name: 'Product fd 1000', price: 2, description: 'Best product abc'}));
}
for (let i = 0; i < 3; i++) {
  products.push(Product.createProduct({ name: 'Random product i should not get in result array', price: 1, description: 'No description'}));
}

let queryResult = Product.findProducts({ products, query: 'name-contains-fd&price-=2&quantity->5&description-ends-abc'});
console.log(queryResult);
// returns filtered products with name containing 'fd', 
// price equal 2, quantity greater than 5 and description ending with abc