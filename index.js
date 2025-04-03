function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      // add custom code here
      trackDependencies(target, key);
      return target[key];
    },
    set(target, key, newValue) {
      target[key] = newValue;
      triggerDependency(target, key);
    },
  });
}

const item = reactive({
  name: "Mobile",
  brand: "Nokia",
  price: 10000,
  qty: 2,
});

let total = 0;
update(updateTotal);
function updateTotal() {
  total = item.price * item.qty;
  document.querySelector("#total").textContent = total;
  document.querySelector("#qty").textContent = ": " + item.qty;
  document.querySelector("#price").textContent = ": " + item.price;
}

const decrementQuantity = () => item.qty--;
const incrementQuantity = () => item.qty++;

const decrementPrice = () => {
  item.price -= 1000;
};
const incrementPrice = () => {
  item.price += 1000;
};
