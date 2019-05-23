let cart = JSON.parse(localStorage.getItem(`cart`));
let products = JSON.parse(localStorage.getItem(`products`));

function update() {
  let cartCount = document.querySelector(`#cart`);
  cartCount.innerHTML = cart.length;

  let productsHtml = ``;
  cart.forEach(function (item, i) {
    productsHtml += createProductCartHtml(item, i);
  });

  let summa = 0;
  for (let i = 0; i < cart.length; i++) {
    summa += products[cart[i].id - 1].price * cart[i].count;
  }

  productsHtml += `<tr>
  <th scope="row" colspan="3">&nbsp;</th>
  <td><b>Итого:</b></td>
  <td>${summa} руб</td>
  <td>&nbsp;</td>
  </tr>`;

  let productsRow = document.querySelector(`#products`);
  productsRow.innerHTML = productsHtml;

  cart.forEach(function (item, i) {
    let cartelembutton = document.querySelector(`#cart-${i} td button`);
    cartelembutton.addEventListener(`click`, removeCart);

    let carteleminput = document.querySelector(`#cart-${i} td input`);
    carteleminput.addEventListener(`input`, changeCart);
  });
}

function createProductCartHtml(productInCart, index) {
  let html = `<tr id="cart-${index}">
  <th scope="row">${index + 1}</th>
  <td>${products[productInCart.id - 1].city}</td>
  <td>${products[productInCart.id - 1].price} руб</td>
<td><input type="number" class="form-control cart-number" value="${productInCart.count}" min="1"></td>
  <td>${products[productInCart.id - 1].price * productInCart.count} руб</td>
<td><button type="button" class="btn btn-danger">Удалить</button></td>
</tr>
  `;
  return html;
}

update();

function removeCart(e) {
  cart.splice(Number(e.target.parentNode.parentNode.id.split(`-`)[1]), 1);
  localStorage.setItem(`cart`, JSON.stringify(cart));
  update();
}

function changeCart(e) {
  cart[Number(e.target.parentNode.parentNode.id.split(`-`)[1])].count = e.target.value;
  localStorage.setItem(`cart`, JSON.stringify(cart));
  update();
}


