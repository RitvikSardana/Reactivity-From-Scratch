const item = reactive({
  name: "Mobile",
  brand: "Nokia",
  price: 100,
  qty: 1,
});
let total = 0;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#qty").value = item.qty;
  document.querySelector("#price").value = item.price;
});

watcher(() => {
  total = item.price * item.qty;
  document.querySelector("#total").textContent = total;
});

function updateTotal() {
  total = item.price * item.qty;
  document.querySelector("#total").textContent = total;
  // document.querySelector("#qty").value = item.qty;
  // document.querySelector("#price").value = item.price;
}

function handlePriceChange(e) {
  item.price = parseInt(e.target.value);
}

function handleQtyChange(e) {
  item.qty = parseInt(e.target.value);
}

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
