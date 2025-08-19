import { app } from 'http://127.0.0.1:5500/firebase/firebase.js';
import {ref, child, get, push } 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import { getAuth, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
// import { app, db } from 'http://127.0.0.1:5500/firebase/firebase.js';
//import { ref, get, child ,remove } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";
//import { update } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const CatName = urlParams.get("CatName");

const auth = getAuth();
let userId = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    console.log("✅ Logged in as:", user.email, "UID:", userId);
  } else {
    userId = null;
    console.log("❌ No user logged in");
  }
});
//let userId = "11-10-2001khaled";
let currentProduct = null;
get(child(ref(db), "products/mobiles/2025-08-16T10-00-00")).then((snapshot) => { 
  console.log(snapshot.val());
  })


async function loadProduct() {
  if (!productId) {
    alert("No product id provided");
    return;
  }

  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `products/${CatName}/${productId}`));

  if (snapshot.exists()) {
    const product = snapshot.val();
      currentProduct = {
      id: productId,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: CatName
    };
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
    document.querySelector(".product-img").src = product.image;
    document.querySelector(".product-img").alt = product.name;
  } else {
    alert("Product not found");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProduct();

  const qtyInput = document.getElementById("product-qty");
  const decreaseBtn = document.getElementById("decrease-qty");
  const increaseBtn = document.getElementById("increase-qty");

  decreaseBtn.addEventListener("click", () => {
    let value = parseInt(qtyInput.value);
    if (value > 1) {
      qtyInput.value = value - 1;
    }
  });

  increaseBtn.addEventListener("click", () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });


  
    // Adding to cart func
  document.getElementById("add-to-cart").addEventListener("click", async () => {
    if (!currentProduct) {
      alert("Product not loaded yet!");
      return;
    }

   
    const qty = parseInt(qtyInput.value);

    const cartItem = {
      productId: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      qty: qty,
      image: currentProduct.image
    };

    try {
      await push(ref(db, `carts/${userId}`), cartItem);
      alert(`${qty} x ${currentProduct.name} added to cart.`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart.");
    }
  });




  // document.getElementById("buy-now").addEventListener("click", () => {
  //   alert(`Proceeding to checkout with ${qtyInput.value} item(s).`);
  // });
});



// await set(dbRef(database, orders/${orderid}), order);
//orders/orderid/
// var order = {
//     id : 1,
//     customerName:"khaled hassan",
//     customerID:"11-10-2001khaled",
//     date:"15-8-2025",
//     status:"paid",
//     total:1500,
//     quantity : 5,
// address:"minya"
// }
