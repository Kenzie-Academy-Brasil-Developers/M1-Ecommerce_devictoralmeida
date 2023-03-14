const menuOptions = document.querySelectorAll(".menu-option");
const cardSections = document.querySelector(".main-cards");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");
const cartEmpty = document.querySelector(".cart-empty");
const cartProductsDiv = document.querySelector(".cart-products");
const cartDetails = document.querySelector(".cart-details");

let cartProducts = [];

function renderProducts() {
  const productList = document.querySelector(".product-list");
  for (let i = 0; i < data.length; i++) {
    let product = document.createElement("li");
    let fig = document.createElement("figure");
    let img = document.createElement("img");
    let nameItem = document.createElement("h3");
    let description = document.createElement("p");
    let value = document.createElement("p");
    let button = document.createElement("button");
    img.src = data[i].img;
    img.alt = data[i].nameItem;
    product.appendChild(fig);
    fig.appendChild(img);
    nameItem.innerText = data[i].nameItem;
    description.innerText = data[i].description;
    value.innerText = `R$: ${data[i].value.toFixed(2)}`;
    value.classList.add("emphasis");
    button.innerText = data[i].addCart;
    button.addEventListener("click", function () {
      if (cartProducts.includes(data[i])) {
        data[i].quantity += 1;
        renderCart();
      } else {
        data[i].quantity = 1;
        cartProducts.push(data[i]);
        renderCart();
      }
    });
    for (let j = 0; j < data[i].tag.length; j++) {
      let tag = document.createElement("span");
      tag.innerText = data[i].tag[j];
      product.appendChild(tag);
    }
    productList.appendChild(product);
    product.appendChild(nameItem);
    product.appendChild(description);
    product.appendChild(value);
    product.appendChild(button);
  }
}

renderProducts();

function removeList() {
  const productList = document.querySelector(".product-list");
  productList.remove();
}

function emptyCartRender() {
  const cartProductList = document.querySelector(".cart-list");
  if (cartProductList) {
    cartProductList.remove();
  }

  if (cartProducts.length != 0) {
    cartEmpty.classList.add("hide");
    cartDetails.classList.remove("hide");
  }

  if (cartProducts.length == 0) {
    cartEmpty.classList.remove("hide");
    cartDetails.classList.add("hide");
  }
}

function filterProducts(term) {
  if (term == "Todos") {
    return data;
  }

  let productsFiltered = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].tag.length; j++) {
      if (data[i].tag[j] == term) {
        productsFiltered.push(data[i]);
      }
    }
  }
  return productsFiltered;
}

function renderFilteredProducts(products) {
  const productList = document.createElement("ul");
  productList.classList.add("product-list");

  for (let i = 0; i < products.length; i++) {
    let cardProduct = document.createElement("li");
    let fig = document.createElement("figure");
    let img = document.createElement("img");
    let nameItem = document.createElement("h3");
    let description = document.createElement("p");
    let value = document.createElement("p");
    let button = document.createElement("button");
    img.src = products[i].img;
    img.alt = products[i].nameItem;
    cardProduct.appendChild(fig);
    fig.appendChild(img);
    nameItem.innerText = products[i].nameItem;
    description.innerText = products[i].description;
    value.innerText = `R$: ${products[i].value.toFixed(2)}`;
    value.classList.add("emphasis");
    button.innerText = products[i].addCart;
    button.addEventListener("click", function () {
      if (cartProducts.includes(products[i])) {
        products[i].quantity += 1;
        renderCart();
      } else {
        products[i].quantity = 1;
        cartProducts.push(products[i]);
        renderCart();
      }
    });
    for (let j = 0; j < products[i].tag.length; j++) {
      let tag = document.createElement("span");
      tag.innerText = products[i].tag[j];
      cardProduct.appendChild(tag);
    }
    productList.appendChild(cardProduct);
    cardProduct.appendChild(nameItem);
    cardProduct.appendChild(description);
    cardProduct.appendChild(value);
    cardProduct.appendChild(button);
  }
  cardSections.appendChild(productList);
}

function searchProducts(searchTerm) {
  let searchItems = [];
  let formatedString = "";
  for (let i = 0; i < data.length; i++) {
    formatedString = data[i].nameItem.toString().toLowerCase();
    if (formatedString.includes(searchTerm)) {
      searchItems.push(data[i]);
    }
  }
  return searchItems;
}

function renderCart() {
  emptyCartRender();
  let cartProductList = document.createElement("ul");
  cartProductList.classList.add("cart-list");
  for (let i = 0; i < cartProducts.length; i++) {
    let spanQuantity = document.createElement("span");
    let product = document.createElement("li");
    let div = document.createElement("div");
    let divQuantity = document.createElement("div");
    divQuantity.classList.add("quantity");
    let fig = document.createElement("figure");
    let img = document.createElement("img");
    let productTitle = document.createElement("h4");
    let value = document.createElement("p");
    let removeBtn = document.createElement("button");
    removeBtn.innerText = "-";
    removeBtn.addEventListener("click", () => {
      cartProducts[i].quantity--;
      spanQuantity.innerText = cartProducts[i].quantity;
      cartTotalvalue();
      renderCart();
      if (cartProducts[i].quantity === 0) {
        cartProducts.splice(i, 1);
        renderCart();
        cartTotalvalue();
      }
    });
    let addBtn = document.createElement("button");
    addBtn.innerText = "+";
    addBtn.addEventListener("click", () => {
      cartProducts[i].quantity++;
      spanQuantity.innerText = cartProducts[i].quantity;
      cartTotalvalue();
    });
    let removeProduct = document.createElement("button");
    removeProduct.addEventListener("click", function () {
      cartProducts.splice(i, 1);
      renderCart();
    });
    removeProduct.innerText = "Remover produto";
    img.src = cartProducts[i].img;
    img.alt = cartProducts[i].nameItem;
    productTitle.innerText = cartProducts[i].nameItem;
    value.innerText = `R$: ${cartProducts[i].value}`;
    spanQuantity.innerText = cartProducts[i].quantity;
    value.classList.add("emphasis");
    cartProductList.appendChild(product);
    product.appendChild(fig);
    fig.appendChild(img);
    div.appendChild(productTitle);
    div.appendChild(value);
    divQuantity.appendChild(removeBtn);
    divQuantity.appendChild(spanQuantity);
    divQuantity.appendChild(addBtn);
    div.appendChild(divQuantity);
    div.appendChild(removeProduct);
    product.appendChild(div);
  }
  cartProductsDiv.appendChild(cartProductList);
  cartTotalvalue();
}

function cartTotalvalue() {
  const totalValueInput = document.querySelector("#value");
  const quantityCart = document.querySelector("#quantity");
  let totalValue = 0;
  let totalQuantity = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    totalValue += cartProducts[i].value * cartProducts[i].quantity;
    totalQuantity += cartProducts[i].quantity;
  }
  totalValueInput.innerText = `R$: ${totalValue}`;
  quantityCart.innerText = totalQuantity;
  //return totalValueInput;
}

for (let i = 0; i < menuOptions.length; i++) {
  menuOptions[i].addEventListener("click", function () {
    searchInput.value = "";
    const category = menuOptions[i].innerText;
    const productsFiltered = filterProducts(category);
    removeList();
    renderFilteredProducts(productsFiltered);
  });
}

searchBtn.addEventListener("click", function () {
  let searchTerm = searchInput.value;
  let formatedString = searchTerm.toString().toLowerCase();
  const searchedProducts = searchProducts(formatedString);
  removeList();
  renderFilteredProducts(searchedProducts);
  searchInput.value = "";
});

searchInput.addEventListener("change", function (e) {
  let searchTerm = e.target.value;
  let formatedString = searchTerm.toString().toLowerCase();
  const searchedProducts = searchProducts(formatedString);
  removeList();
  renderFilteredProducts(searchedProducts);
});
