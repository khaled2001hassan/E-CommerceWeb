import {  db } from 'http://127.0.0.1:5500/firebase/firebase.js';
import {  ref, get, child } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
var crudItem = document.getElementById("CrudItem")
function showLoading() {
    document.getElementById("loadingOverlay").style.display = "flex";
}

function hideLoading() {
    document.getElementById("loadingOverlay").style.display = "none";
}
function getProductCategory(category) {
     showLoading()
    console.log("Category");
    get(child(ref(db), `products/${category}`)).then((snapshot) => {
        hideLoading()
        crudItem.innerHTML =""
        let data = snapshot.val()
        if (snapshot.exists()) {
        Object.entries(data).forEach(([key, product]) => {
            crudItem.innerHTML +=addProductToDiv(product ,key)
          console.log("Key:", key);
          console.log("Product:", product);
        });
    }else{
        hideLoading()
        crudItem.innerHTML =""
    }
    }).catch((error) => {
        hideLoading()
        console.error("Error getting data:", error);
    })
}
function deleteItem(itemID) {
    
    console.log(itemID);
    
}
getProductCategory('mobiles')
window.getProductCategory = getProductCategory;
window.deleteItem =deleteItem

function addProductToDiv(productData ,productID) {
    let crudPtoduct = ` <div class="col-lg-4 col-md-6 col-sm-12 col-12 ">
            <div class="card m-2 shadow rounded-2 ">
                <div class="card-body text-center">
                    <img src="${productData.image}"
                        alt="Product Image" class="img-fluid rounded mb-1"
                        style="max-height: 200px; object-fit: contain;" />
                    <p id="ProductName" class="text-start fw-semibold fs-5 mb-1">${productData.name}</p>
                    <p id="ProductDescription" style="height: 78px;" class="text-start text-muted mb-1  line-clamp-3"
                        style="font-size: 0.9rem;">
                        ${productData.description}
                    </p>
                    <p class="text-start mb-1">
                        <strong>Price:</strong> $<span id="ProductPrice">${productData.price}</span>
                    </p>
                    <p class="text-start mb-1">
                        <strong>Quantity:</strong> <span id="ProductQuantity">${productData.quantity}</span>
                    </p>
                    <button id="EditBtn" type="button" class="btn btn-warning mx-auto m-1 w-100" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        <i class="fa-solid fa-pencil"></i> Edit
                    </button>

                    <button id="DeleteBtn" onclick="deleteItem('${productID}')" type="button" class="btn btn-danger mx-auto m-1 w-100">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    <div class="modal fade" id="exampleModal" tabindex="155,155" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-secondary text-white">
                    <h5 class="mb-0 text-center">Edit Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-1">
                        <label for="ProductCategory" class="form-label fw-bold">Product Category</label>
                        <select class="form-select" id="ProductCategory">
                            <option value="default" selected disabled>-- Select Category --</option>
                            <option value="mobiles">Mobiles</option>
                            <option value="electronic">Electronics</option>
                            <option value="fashion">Fashion</option>
                        </select>
                        <small id="ProductCategoryAlert" class="text-danger"></small>

                    </div>
                    <div class="mb-1">
                        <label for="ProductName" class="form-label fw-bold">Product Name</label>
                        <input id="ProductName" type="text" class="form-control"
                            placeholder="Enter product name">
                            <small id="ProductNameAlert" class="text-danger "></small>
                    </div>

                    <div class="mb-1">
                        <label for="ProductDescription" class="form-label fw-bold">Product
                            Description</label>
                        <textarea id="ProductDescription" class="form-control" rows="3"
                            placeholder="Enter product description"></textarea>
                        <small id="ProductDescriptionAlert" class="text-danger "></small>

                    </div>

                    <div class="mb-1">
                        <label for="ProductPrice" class="form-label fw-bold">Product Price</label>
                        <input id="ProductPrice" type="number" class="form-control"
                            placeholder="Enter product price">
                            <small id="ProductPriceAlert" class="text-danger "></small>
                    </div>

                    <div class="mb-1">
                        <label for="ProductQuantity" class="form-label fw-bold">Product Quantity</label>
                        <input id="ProductQuantity" type="number" class="form-control"
                            placeholder="Enter quantity">
                            <small id="ProductQuantityAlert" class="text-danger "></small>
                    </div>

                    <div class="mb-1">
                        <label for="ProductImage" class="form-label fw-bold">Product Image</label>
                        <input id="ProductImage" type="file" class="form-control">
                            <small id="ProductImageAlert" class="text-danger "></small>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="text-center">
                        <button id="addProductBtn" type="submit" class="btn btn-primary px-4">
                            <i class="bi bi-plus-circle"></i>Edit Product</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    return crudPtoduct
}