
// scroll To Top button ------------------------------------------------
const scrollToTopButton = document.querySelector("#scrollToTop a");

function scrollToTop() {
   if (window.scrollY < window.innerHeight) {
      scrollToTopButton.classList.replace("show", "hide");
   }else{
      scrollToTopButton.classList.replace("hide", "show")
   }
}
onscroll = scrollToTop;


// -------------------------------------- Start best coffee section slider --------------------------------------
const bestCoffeeImgs = document.querySelectorAll(".best-coffee-imgs img");
const bestCoffeeDots = document.querySelectorAll(".best-coffee-dots li");

const bestContent = document.querySelector(".best-coffee .best-content");
let activeIndex = 0;

function updateClasses() {
   bestCoffeeDots.forEach((item) => item.classList.remove("active"));
   bestCoffeeImgs.forEach((item) => item.classList.remove("active"));

   bestCoffeeDots[activeIndex].classList.add("active");
   bestCoffeeImgs[activeIndex].classList.add("active");
}

function changeIndex() {
   activeIndex = activeIndex < bestCoffeeImgs.length - 1 ? activeIndex + 1 : 0;
   updateClasses();
}

bestCoffeeDots.forEach((element) => {
   element.addEventListener("click", (e) => {
      activeIndex = +e.target.getAttribute("order") - 1;
      updateClasses();
   });
});

let bestSlider = setInterval(changeIndex, 4000);

bestContent.addEventListener("mouseover", function () {
   clearInterval(bestSlider);
});
bestContent.addEventListener("mouseout", function () {
   bestSlider = setInterval(changeIndex, 4000);
});
// -------------------------------------- End best coffee section slider --------------------------------------

productsLink = "json/productsData.json";
menuLink = "json/menuData.json";

// get data function -------------------------------------
function getData(link) {
   let xhttp = new XMLHttpRequest();
   let data = {};
   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         data = JSON.parse(this.responseText);
      }
   };
   xhttp.open("GET", link, false);
   xhttp.send();
   return data;
}

// products data
let productsData = getData(productsLink);

// menu data
let menuData = getData(menuLink);

// ------------------------------------- show products -------------------------------------
const ourShopSection = document.querySelector(".our-shop .products");

function showProducts(data) {
   ourShopSection.innerHTML = "";
   data &&
      data.forEach((e) => {
      ourShopSection.innerHTML += `
      <div class="col">
         <div class="card h-100" product-type="Hot Coffee">
            <a href="#" class="overflow-hidden position-relative rounded-top">
               <img src="${e.imgSrc}" class="card-img-top w-100" alt="${ e.name }">
            </a>
            <span class="sale-badge"> Sale </span>
            <div class="position-relative">
               <div class="card-icons d-flex gap-3 justify-content-center w-100 position-absolute mx-auto">
                  <p class="addToCartbtn shadow" data-id="${ e.id }"
                  data-bs-toggle="tooltip" title="Add to Shopping Cart"
                  onClick="addToCartF(${e.id})">
                     <i class="fa fa-shopping-basket" ></i>
                  </p>
                  <p class="addToFavorite shadow" data-bs-toggle="tooltip" title="Add to Wash List"
                  onclick="addToFavorite(${e.id})">
                     <i class="fa fa-heart" ></i> </p>
                  <p class="shadow" data-bs-toggle="tooltip" title="Show Details">
                     <i class="fa fa-eye" ></i> </p>
               </div>
            </div>
            <div class="card-body">
               <h5 class="card-title">${e.name}</h5>
               <p class="card-text">${e.description}</p>
               <p class="text-warning">
                  <i class="fa-solid fa fa-star"></i>
                  <i class="fa-solid fa fa-star"></i>
                  <i class="fa-solid fa fa-star"></i>
                  <i class="fa-solid fa-star-half-stroke"></i>
                  <i class="fa-regular fa-star"></i>
               </p>
               <h4 class="d-flex justify-content-between">
               ${
                  e.decount ?
                  `<span class="text-decoration-line-through">$${e.price}</span>
                  <span class="text-info"> $${e.newPrice} </span>`
                  : `$${e.price}`
               }
               </h4>
            </div>

            <button class="addToCartbtn btn btn-info text-light m-3 mt-0" data-id="${ e.id }"
            onClick="addToCartF(${e.id})">
               <i class="fa fa-shopping-basket me-2"></i>
               Add to Cart
            </button>
         </div>
      </div>`;
   });
}
showProducts(productsData);

// ------------------------------------- filter products -------------------------------------
const productTypesItem = document.querySelectorAll(".product-types li");

productTypesItem.forEach((item) =>
   item.addEventListener("click", function (e) {
      productTypesItem.forEach((remove) => remove.classList.remove("active"));
      e.target.classList.add("active");

      if (e.target.type != "All") {
         let filteredData = productsData.filter((f) =>
         f.type.toLowerCase().includes(e.target.type.toLowerCase())
         );
         showProducts(filteredData);
      } else {
         showProducts(productsData);
      }
   })
);

// ------------------------------------- show menu items -------------------------------------
const ourMenuSection = document.querySelector(".our-menu .row");
ourMenuSection.innerHTML = "";
menuData &&
menuData.forEach((e) => {
   ourMenuSection.innerHTML += `<div class="col">
   <div class="menu-item card flex-row gap-3 p-3 align-items-center shadow">
      <div> <img src="${e.imgSrc}" alt="${e.name}" width="70"> </div>
      <div class="menu-info  flex-grow-1">
         <h5>${e.name}</h5>
         <small class="m-0">${e.description}</small>
      </div>
      <div class="menu-price">
         <h5 class="m-0">$<span>${e.price}</span></h5>
      </div>
   </div>
</div>`;
});


// add Toast notifications and auto remove after 4 socends ------------------------------------------------
let toastArray = [];
const toastContainer = document.getElementById("toastContainer");

function addToast(message){
   if (toastArray.length > 3) {
      toastArray.pop()
      toastArray.unshift(message);
   }else{
      toastArray.unshift(message)
   }
   let newTost = document.createElement("div");
   newTost.setAttribute("class", "toast-item p-2 rounded mb-2 shadow w-100")

   newTost.innerHTML = `
   <div class="tost-inner ">
      <div class=" d-flex align-items-center ps-3">
         <i class="fa-solid ${message.title === "Warning"? "fa-circle-exclamation text-warning": "fa-circle-check text-success"} fa-lg "></i>
         <div class="tost-info flex-grow-1 px-2">
            <h6 class=" text-info mb-0">${message.title},</h6>
            <small> ${message.message}</small>
         </div>
         <button type="button" class="btn-close m-auto fs-10" aria-label="Close"></button>
      </div>
   </div>
   `;
   newTost.classList.add("toast-animat");
   toastContainer.appendChild(newTost)

   let newTostBtns = document.querySelectorAll(".toast-item button");
   newTostBtns.forEach(cBtn => {
      cBtn.addEventListener("click", ()=> cBtn.closest(".toast-item").remove())
   })

   // while (newTostBtns.length > 3) { newTost.remove()} // browser crush
   // if (toastContainer.children.length > 3) { toastContainer.children[toastContainer.children.length -1].remove();}

   let autoClearToast = setTimeout(()=>{
      newTost.classList.remove("toast-animat");
      newTost.remove();
      toastArray.pop()
   },4100)
}


// -------------------------------- Start add item to shopping cart -------------------------------------
let shoppingCart = [];

let totalCartItems = 0;
let subTotalPrice = 0;
const addToCartbtn = document.querySelectorAll(".addToCartbtn");
const cartProducts = document.querySelector("#cartProducts");

const cartBadge = document.querySelector(".navbar .cart-badge");
const itemCount = document.querySelector(".offcanvas-cart .item-count");
const totalMoney = document.querySelector(".offcanvas-cart .total-money");

const clearCart = document.querySelector(".clearCart");
const checkoutBtn = document.querySelector(".checkout");

const emptyCartImg = document.querySelector(".empty-cart");

const tostAddedSuccessfully = document.getElementById("addedSuccessfully");

let emptyCartDiv = `
<div class="empty-cart h-100 d-flex align-items-center">
   <img src="images/empty-cart.png" alt="empty cart" width="100%">
</div>`;

// assign items count into site ----------
function totalMoneyF() {
   subTotalPrice = 0;
   shoppingCart.forEach(function (e) {
      subTotalPrice += e.decount ? e.newPrice * e.quantity : e.price * e.quantity;
   });
   totalMoney.innerHTML = subTotalPrice.toFixed(2);
}

// assign items count into site ----------
function totalCartItemsF() {
   totalCartItems = 0;
   shoppingCart.forEach(function (e) {
      totalCartItems += e.quantity;
   });
   itemCount.innerHTML = totalCartItems;
   cartBadge.innerHTML = totalCartItems;
}
// enable or disable clear and checkout Buttons
function OnOffFooterBtns() {
   if (shoppingCart.length == 0) {
      cartProducts.innerHTML = emptyCartDiv;
      clearCart.setAttribute("disabled","");
      checkoutBtn.setAttribute("disabled","");
   }else{
      clearCart.removeAttribute("disabled");
      checkoutBtn.removeAttribute("disabled");
   }
}
function addToCartF(id) {
   productIndex = productsData.findIndex((i) => i.id === id);

   if (
      shoppingCart.length > 0 &&
      shoppingCart.find((e) => e.id === id) != undefined
   ) {
      shoppingCart[shoppingCart.findIndex((i) => i.id === id)].quantity += 1;
      addToast({title: "Warning", message: "Product Aready in Cart"});
   } else {
      shoppingCart.push({ ...productsData[productIndex], quantity: 1 });
      addToast({title: "Success", message: "Product Added Successfully" });
   }
   renderCartItems();
   totalCartItemsF();
   totalMoneyF();
   OnOffFooterBtns();
   localStorage.setItem("coffeKingShoppingCart", JSON.stringify(shoppingCart));
}

// render Cart Items
function renderCartItems() {
   cartProducts.innerHTML = "";
   shoppingCart && shoppingCart.forEach((e) => {
      cartProducts.innerHTML += `
      <div class="product-item d-flex align-items-center gap-2 position-relative mb-4">
         <div class="remove-item position-absolute top-0 start-0">
            <button class="btn btn-sm btn-primary text-white" data-id="${ e.id }" type="button" title="Remove"
            onclick="removeItemFromCart(${e.id})">
               <i class="fa-solid fa-trash-can"></i>
            </button>
         </div>
         <div> <img src="${e.imgSrc}" alt="${e.name}" width="90"> </div>
         <div class="overflow-hidden flex-grow-1">
            <h5 class="product-name">${e.name}</h5>
            <span class="proudct-description">${e.description}</span>
            <div class="d-flex justify-content-between">
               <h5 class="d-flex w-100">
                  <span class="old-price ${ e.decount && `text-decoration-line-through` } ">
                     $${e.price}
                  </span>
                  <span class="new-price flex-grow-1 text-center text-info ">
                     ${e.decount ? `$${e.newPrice}` : ""}
                  </span>
               </h5>
               <div>
                  <div class="btn-group mb-0">
                     <button class="btn btn-sm btn-info text-white h-50" type="button" title="Increase 1"
                     onClick="decrement(${e.id})" data-id="${e.id}">
                        <i class="fa-solid fa-minus "></i>
                     </button>
                     <h4 class="item-quantity px-3" data-product-id="${e.id}">${e.quantity}</h4>
                     <button class="btn btn-sm btn-info text-white h-50" type="button" title="Decrease 1"
                     onClick="increment(${e.id})" data-id="${e.id}">
                        <i class="fa-solid fa-plus"></i>
                     </button>
                  </div>
               </div>
            </div>
            <hr class="m-1">
         </div>
      </div>`;
   });
}

// increment/decrement quantity of items in shopping cart---------------
function increment(id) {
   shoppingCart[shoppingCart.findIndex((i) => i.id === id)].quantity += 1;
   renderCartItems();
   totalCartItemsF();
   totalMoneyF();
   localStorage.setItem("coffeKingShoppingCart", JSON.stringify(shoppingCart));
}

function decrement(id) {
   shoppingCart[shoppingCart.findIndex((i) => i.id === id)].quantity > 1
      ? (shoppingCart[shoppingCart.findIndex((i) => i.id === id)].quantity -= 1)
      : 1;
   renderCartItems();
   totalCartItemsF();
   totalMoneyF();
   localStorage.setItem("coffeKingShoppingCart", JSON.stringify(shoppingCart));
}

//  removeItemFromCart ----------
function removeItemFromCart(id) {
   shoppingCart.splice( shoppingCart.findIndex((i) => i.id === id), 1 );
   renderCartItems();
   totalCartItemsF();
   totalMoneyF();
   OnOffFooterBtns();
   addToast({ title: "Success", message: "Product Removed Successfully" });
   localStorage.setItem("coffeKingShoppingCart", JSON.stringify(shoppingCart));
}
// clear shopping cart ---------
clearCart.addEventListener("click", function () {
   shoppingCart = [];
   renderCartItems();
   totalCartItemsF();
   totalMoneyF();
   OnOffFooterBtns();
   localStorage.setItem("coffeKingShoppingCart", JSON.stringify(shoppingCart));
});

// -------------------------------- End add item to shopping cart -------------------------------------

// --------------------------------Start add item to Favorite cart -------------------------------------
let favoriteCart = [];
let totalFavoriteItems = 0;

const addToFavoritebtn = document.querySelectorAll(".addToFavorite");
const favoriteProducts = document.querySelector("#favoriteProducts");

const favoriteBadge = document.querySelector(".navbar .favorite-badge");
const itemCountFavorite = document.querySelector(".offcanvas-favorite .item-count");

const clearFavorite = document.querySelector(".clear-favorite");

let emptyFavoriteDiv = `
<div class="empty-favorite h-100 d-flex align-items-center">
   <img src="images/empty-wishlist.svg" alt="empty-wishlist" width="100%">
</div>`;

function renderFavoriteCart() {
   favoriteProducts.innerHTML = "";
   favoriteCart.map( (e) =>
      (favoriteProducts.innerHTML += `<div class="product-item d-flex align-items-center gap-2 position-relative mb-4">
         <div class="remove-item position-absolute top-0 start-0">
            <button class="btn btn-sm btn-primary text-white" type="button" title="Remove"
            onclick="removeFavoriteItem(${e.id})">
               <i class="fa-solid fa-trash-can"></i>
            </button>
         </div>
         <div>
            <img src="${e.imgSrc}" alt="${e.name}" width="90">
         </div>
         <div class="overflow-hidden flex-grow-1">
            <h5 class="product-name">${e.name}</h5>
            <span class="proudct-description">${e.description}</span>
            <div class="d-flex justify-content-between">
               <h5 class="d-flex w-100">
                  <span class="old-price ${e.decount && "text-decoration-line-through" }">$${e.price}</span>
                  ${ e.decount ? `<span class="new-price flex-grow-1 text-center text-info "> $${e.newPrice}</span>` : "" }
               </h5>
               <div>
                  <button class="btn btn-info text-white" type="button" title="Add To Cart"
                  onclick="addToCartF(${e.id})">
                     <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                  </button>
               </div>
            </div>
            <hr class="m-1">
         </div>
      </div>`)
   );
}
// disable Clear Button if favorite list is empty---
function onOfFavorateClearBtn() {
   if(favoriteCart.length === 0){
      favoriteProducts.innerHTML = emptyFavoriteDiv;
      clearFavorite.setAttribute("disabled","")
   }else{
      clearFavorite.removeAttribute("disabled")
   }
}
onOfFavorateClearBtn();

function addToFavorite(id) {
   if (favoriteCart.find((e) => e.id === id) != undefined) {
      addToast({ title: "Warning", message: "Product Aready in Favorite" });
   } else {
      favoriteCart.push(productsData[productsData.findIndex((e) => e.id === id)]);
      renderFavoriteCart();
      favoriteBadge.innerHTML = favoriteCart.length;
      itemCountFavorite.innerHTML = favoriteCart.length;
      addToast({ title: "Success", message: "Product Added Successfully" });
   }
   localStorage.setItem("coffeKingFavoriteCart", JSON.stringify(favoriteCart));
   onOfFavorateClearBtn();
}

function removeFavoriteItem(id) {
   favoriteCart.splice( favoriteCart.findIndex((i) => i.id === id), 1 );
   renderFavoriteCart();
   favoriteBadge.innerHTML = favoriteCart.length;
   itemCountFavorite.innerHTML = favoriteCart.length;

   addToast({ title: "Success", message: "Product Removed Successfully" });
   localStorage.setItem("coffeKingFavoriteCart", JSON.stringify(favoriteCart));
   onOfFavorateClearBtn();
}

function clearFavoriteF() {
   favoriteCart = [];
   renderFavoriteCart();
   favoriteBadge.innerHTML = favoriteCart.length;
   itemCountFavorite.innerHTML = favoriteCart.length;

   localStorage.setItem("coffeKingFavoriteCart", JSON.stringify(favoriteCart));
   onOfFavorateClearBtn();
}
clearFavorite.addEventListener("click", clearFavoriteF);
// -------------------------------- end add item to Favorite cart -------------------------------------

// local storage get element if exest -------------------------------------
onload = function (){
   if (localStorage.coffeKingShoppingCart){
      shoppingCart = JSON.parse(localStorage.getItem("coffeKingShoppingCart"));
      renderCartItems();
      totalCartItemsF();
      totalMoneyF();
      OnOffFooterBtns();
   }

   if(this.localStorage.coffeKingFavoriteCart){
      favoriteCart = JSON.parse(this.localStorage.getItem("coffeKingFavoriteCart"));
      renderFavoriteCart();
      favoriteBadge.innerHTML = favoriteCart.length;
      itemCountFavorite.innerHTML = favoriteCart.length;
   }
}

// to tooltip work ------------------------------------------------
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipTriggerListBs = document.querySelectorAll('[data-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList, ...tooltipTriggerListBs].map((El) => new bootstrap.Tooltip(El));
