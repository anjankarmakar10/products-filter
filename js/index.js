const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual",
  },
];

let products = document.querySelector(".products");
let inputSearch = document.querySelector(".input-search");
let categoriesContainer = document.querySelector(".catagories");
let inputRange = document.querySelector(".input-range");
let rangeText = document.querySelector(".range-text");

function showProducts(filteredProducts) {
  products.innerHTML = filteredProducts
    .map(
      (product) =>
        `
 <article class="card">
                <img src=${product.img} alt="">
                <h3 class="card-title">${product.name}</h3>
                <h5 class="card-price-body">$<span class="card-price">${product.price}</span></h5>
            </article>
`
    )
    .join("");
}
showProducts(data);

inputSearch.addEventListener("keyup", (e) => {
  let value = e.target.value.toLowerCase();
  showProducts(
    data.filter((products) => products.name.toLowerCase().indexOf(value) !== -1)
  );
});

// catagories.addEventListener('click',(e)=>{

// })

let allCatItems = document.querySelectorAll(".cat-item");

function setCategories() {
  let catagories = ["All", ...new Set(data.map((p) => p.cat))];
  categoriesContainer.innerHTML = catagories
    .map((item) => `<li class="cat-item" data-value="${item}">${item}</li>`)
    .join("");

  let allCatItems = document.querySelectorAll(".cat-item");

  allCatItems[0].classList.add("active");

  categoriesContainer.addEventListener("click", (e) => {
    let value = e.target.dataset.value;
    allCatItems.forEach((item) => item.classList.remove("active"));

    if (value) {
      e.target.classList.add("active");
      value === "All"
        ? showProducts(data)
        : showProducts(data.filter((product) => product.cat === value));
    }
  });
}

function setPrice() {
  let priceList = data.map((i) => i.price);

  let maxPrice = Math.max(...priceList);
  let minPrice = Math.min(...priceList);

  inputRange.min = minPrice;
  inputRange.max = maxPrice;
  inputRange.value = maxPrice;
  rangeText.innerText = "$" + maxPrice;

  inputRange.addEventListener("input", (e) => {
    let value = e.target.value;
    rangeText.innerText = "$" + value;

    showProducts(data.filter((product) => product.price <= value));
  });
}

setCategories();
setPrice();
