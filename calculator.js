class Calculator {
  add(a, b) {
    return BigInt(a) + BigInt(b);
  };
  subtract(a, b) {
    return BigInt(a) - BigInt(b);
  };
  multiply(a, b) {
    return BigInt(a) * BigInt(b);
  }
  divide(a, b) {
    return BigInt(a) / BigInt(b);
  }
}