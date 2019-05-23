let state = {
  findFilter: ``,
  selectFilter: ``,
  products:
    [
      {
        id: 1,
        image: `https://placeimg.com/255/255/nature`,
        country: `Россия`,
        city: `Сочи`,
        price: 200000
      },
      {
        id: 2,
        image: `https://placeimg.com/255/255/nature?2`,
        country: `Франция`,
        city: `Париж`,
        price: 150000
      },
      {
        id: 3,
        image: `https://placeimg.com/255/255/nature?3`,
        country: `Тайланд`,
        city: `Бангкок`,
        price: 50000
      },
      {
        id: 4,
        image: `https://placeimg.com/255/255/nature?4`,
        country: `Тайланд`,
        city: `Пхукет`,
        price: 60000
      }
    ],
  cart: [],
  updatePage: () => {
    let productsHtml = ``;
    let prods = state.products;
    if (state.findFilter !== ``) {
      prods = prods.filter(function (item) {
        return state.findFilter === item.city;
      });
    }

    if (state.selectFilter !== ``) {
      prods = prods.filter(function (item) {
        return state.selectFilter === item.country;
      });
    }


    prods.forEach(function (item) {
      productsHtml += createProductHtml(item);
    });

    let cartCount = document.querySelector(`#cart`);
    cartCount.innerHTML = state.cart.length;

    let productsRow = document.querySelector(`#products`);
    productsRow.innerHTML = productsHtml;
    for (let i = 0; i < prods.length; i++) {
      let prod = document.querySelector(`#product-${prods[i].id}`);
      prod.addEventListener(`click`, orderProd);
    }
    localStorage.setItem(`cart`, JSON.stringify(state.cart));
  }
};

state.cart = JSON.parse(localStorage.getItem(`cart`));

function createProductHtml(product) {
  let html = `<div class="card text-center card-product">
           <div class="card-product__img">
            <img class="card-img" src="${product.image}" alt="">
           </div>
           <div class="card-body">
            <p>${product.country}</p>
            <h4 class="card-product__title">${product.city}</h4>
            <p class="card-product__price">${product.price} руб</p>
            <p>`;
  if (state.cart.findIndex(
      function (element) {
        return element.id === product.id;
      }
  ) === -1) {
    html += `<button type="button" class="btn btn-primary" id="product-${product.id}">Заказать</button></p>
           </div>
          </div>`;
  } else {
    html += `<button type="button" class="btn btn-danger" id="product-${product.id}">Отмена</button></p>
           </div>
          </div>`;
  }
  return html;
}

state.updatePage();

function changeSelect(e) {
  if (e.target.value === `Все`) {
    state.selectFilter = ``;
    state.updatePage();
  } else {
    state.selectFilter = e.target.value;
    state.updatePage();
  }

}

let selectCountry = document.selectCountry;

for (let i = 0; i < selectCountry.country.length; i++) {
  selectCountry.country[i].addEventListener(`click`, changeSelect);
}


function findFilter() {
  state.findFilter = document.querySelector(`#cityname`).value;
  state.updatePage();
}

let find = document.querySelector(`#button-addon2`);
find.addEventListener(`click`, findFilter);

function orderProd(e) {
  let index = state.cart.findIndex(function (element) {
    return element.id === Number(e.target.id.split(`-`)[1]);
  });
  if (index === -1) {
    state.cart.push({id: Number(e.target.id.split(`-`)[1]), count: 1});
  } else {
    state.cart.splice(index, 1);
  }
  state.updatePage();
}

localStorage.setItem(`products`, JSON.stringify(state.products));
