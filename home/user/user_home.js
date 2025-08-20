import { app, db } from '../../firebase/firebase.js';
import { ref, get, child } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("uid");
localStorage.setItem("userId", userId);

var bestSellerSection = document.getElementById('bestSellerSection');

function getProductCategory() {
  get(child(ref(db), `products/mobiles`)).then((snapshot) => {
    bestSellerSection.innerHTML = "";
    if (snapshot.exists()) {
      let data = snapshot.val();
      Object.entries(data).forEach(([key, product]) => {
        bestSellerSection.innerHTML += add(product, key);
      });

      attachButtonEvents();
    } else {
      bestSellerSection.innerHTML = "<p>No products found.</p>";
    }
  }).catch((error) => {
    console.error("Error getting data:", error);
  });
}

getProductCategory();

function add(value, id) {
  return `
    <div class="col-lg-3 col-md-6">
      <div class="product-item">
        <div class="product-image">
          <img src="${value.image}" alt="Product Image" class="img-fluid" loading="lazy">
          <div class="product-actions"></div>
          <button data-id="${id}" data-category="${value.category}" class="cart-btn goBtn">
            Add to Cart
          </button>
        </div>
        <div class="product-info">
          <div class="product-category">${value.category}</div>
          <div class="product-category">${value.name}</div>
          <h4 class="product-name"><a href="product-details.html">${value.description}</a></h4>
          <span class="rating-count">Quantity : ${value.quantity}</span>
          <div class="product-rating">
            <div class="stars">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
            </div>
          </div>
          <div class="product-price">
            <span class="old-price">$240.00</span>
            <span class="current-price">${value.price}</span>
          </div>
        </div>
      </div>
    </div>`;
}

function attachButtonEvents() {
  const buttons = document.querySelectorAll(".goBtn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const category = btn.getAttribute("data-category");
      window.location.href = `../user/product-details/product-details.html?userId=${userId}&productId=${id}&CatName=${category}`;
    });
  });
}
