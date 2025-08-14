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
    let crudPtoduct = `    <div class="col-lg-4 col-md-6 col-12 d-flex">
      <div class="card shadow rounded-2 flex-fill p-3"> <!-- use padding, not margin -->
        <div class="card-body text-center">
          <img src="${productData.image}" alt="Product Image"
               class="img-fluid rounded mb-2" style="max-height:200px; object-fit:contain;">
          <p class="text-start fw-semibold fs-5 mb-1">${productData.name}</p>
          <p class="text-start showtreeline text-muted mb-1" style="height:78px; font-size:0.9rem;">${productData.description}</p>
          <p class="text-start mb-1"><strong>Price:</strong> $<span>${productData.price}</span></p>
          <p class="text-start mb-1"><strong>Quantity:</strong> <span>${productData.quantity}</span></p>
          <button type="button" class="btn btn-warning w-100 mb-1" data-bs-toggle="modal" data-bs-target="#productAddModel">
            <i class="fa-solid fa-pencil"></i> Edit
          </button>
          <button type="button" class="btn btn-danger w-100" onclick="deleteItem('${productID}')">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
        
    <div class="modal fade" id="productAddModel" tabindex="155,155" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-secondary text-white">
                    <h5 class="mb-0 text-center">Edit Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Product Category</label>
                            <select class="form-select" id="ProductCategory-${productID}">
                                <option value="default" disabled selected>-- Select Category --</option>
                                <option value="mobiles">Mobiles</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                            </select>
                            <small class="text-danger" id="ProductCategoryAlert-${productID}"></small>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Product Name</label>
                            <input type="text" class="form-control" id="ProductName-${productID}" placeholder="Enter product name" value="${productData.name}">
                            <small class="text-danger" id="ProductNameAlert-${productID}"></small>
                        </div>

                        <div class="col-12">
                            <label class="form-label fw-semibold">Product Description</label>
                            <textarea class="form-control" rows="3" id="ProductDescription-${productID}" placeholder="Enter product description">${productData.description}</textarea>
                            <small class="text-danger" id="ProductDescriptionAlert-${productID}"></small>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Product Price</label>
                            <input type="number" class="form-control" id="ProductPrice-${productID}" placeholder="Enter product price" value="${productData.price}">
                            <small class="text-danger" id="ProductPriceAlert-${productID}"></small>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Product Quantity</label>
                            <input type="number" class="form-control" id="ProductQuantity-${productID}" placeholder="Enter quantity" value="${productData.quantity}">
                            <small class="text-danger" id="ProductQuantityAlert-${productID}"></small>
                        </div>

                        <div class="col-12">
                            <label class="form-label fw-semibold">Product Image</label>
                            <input type="file" class="form-control" id="ProductImage-${productID}">
                            <small class="text-danger" id="ProductImageAlert-${productID}"></small>
                        </div>
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