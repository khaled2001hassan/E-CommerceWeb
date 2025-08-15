

//#region import
import { app } from 'http://127.0.0.1:5500/firebase/firebase.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

import { getDatabase, ref as dbRef, set } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
//#endregion

//#region Inputs
var ProductCategory = document.getElementById("ProductCategory");
var ProductName = document.getElementById("ProductName");
var ProductDescription = document.getElementById("ProductDescription");
var ProductPrice = document.getElementById("ProductPrice");
var ProductQuantity = document.getElementById("ProductQuantity");
var ProductImage = document.getElementById("ProductImage");
var addProductBtn = document.getElementById("addProductBtn");
//#endregion

//#region Alerts
var ProductCategoryAlert = document.getElementById("ProductCategoryAlert");
var ProductNameAlert = document.getElementById("ProductNameAlert");
var ProductDescriptionAlert = document.getElementById("ProductDescriptionAlert");
var ProductPriceAlert = document.getElementById("ProductPriceAlert");
var ProductQuantityAlert = document.getElementById("ProductQuantityAlert");
var ProductImageAlert = document.getElementById("ProductImageAlert");
//#endregion

var adminID = "khaled2001hassan@gmail.com"
const storage = getStorage(app)
const database = getDatabase(app);
addProductBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!isValid()) {
        return 0
    } else {

try {

            const file = ProductImage.files[0]; 
            const imgRef = storageRef(storage, `products/${ProductCategory.value}/${file.name}`);
            await uploadBytes(imgRef, file);
            const imageUrl = await getDownloadURL(imgRef);
            console.log("Image URL:", imageUrl);
            console.log("data add success");
            const productData = {
                category: ProductCategory.value,
                name: ProductName.value.trim(),
                description: ProductDescription.value.trim(),
                price: parseFloat(ProductPrice.value),
                quantity: parseInt(ProductQuantity.value),
                image: imageUrl
            };
            let key = new Date().toISOString().replace(/[.#$\[\]/]/g, "-");
            await set(dbRef(database, `products/${ProductCategory.value}/${key}`), productData);
            alert("data add success");
            
        }
        catch {
            console.log("data not added success");

        }
    }
})

function isValid() {

    let valid = true;
    ProductCategoryAlert.textContent = "";
    ProductNameAlert.textContent = "";
    ProductDescriptionAlert.textContent = "";
    ProductPriceAlert.textContent = "";
    ProductQuantityAlert.textContent = "";
    ProductImageAlert.textContent = "";

    if (ProductCategory.value === "default") {
        ProductCategoryAlert.textContent = "Please select a category.";
        valid = false;
    }

    if (ProductName.value.trim() === "") {
        ProductNameAlert.textContent = "Product name is required.";
        valid = false;
    }

    if (ProductDescription.value.trim() === "") {
        ProductDescriptionAlert.textContent = "Product description is required.";
        valid = false;
    }

    if (ProductPrice.value.trim() === "" || isNaN(ProductPrice.value) || parseInt(ProductPrice.value) <= 0) {
        ProductPriceAlert.textContent = "Enter a valid price greater than 0.";
        valid = false;
    }

    if (ProductQuantity.value.trim() === "" || isNaN(ProductQuantity.value) || parseInt(ProductQuantity.value) < 0) {
        ProductQuantityAlert.textContent = "Enter a valid quantity (0 or more).";
        valid = false;
    }

    // Product Image
    if (!ProductImage.files[0]) {
        ProductImageAlert.textContent = "Please choose a product image.";
        valid = false;
    }

    return valid;
}

