var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCatInput = document.getElementById("productCatInput");
var productDescInput = document.getElementById("productDescInput");
var mainButton = document.getElementById("mainButton");

var prodNameAlert = document.getElementById("prodNameAlert");
var prodPriceAlert = document.getElementById("prodPriceAlert");
var prodCatAlert = document.getElementById("prodCatAlert");
var prodDescAlert = document.getElementById("prodDescAlert");

let product;
var productsContainer ;
if(localStorage.getItem("productsContainer") == null) {
    productsContainer = [];
}
else 
{
    productsContainer = JSON.parse(localStorage.getItem("productsContainer")) ;
    displayProduct();
}


function addProduct()
{
    if(validateProductName() == true && validateProductprice() == true  && validateProductCat() == true && validateProductDesc() == true){
        product ={
            name:productNameInput.value,
            price:productPriceInput.value,
            cat:productCatInput.value,
            desc:productDescInput.value,
        }
        productsContainer.push(product);
        localStorage.setItem("productsContainer",JSON.stringify(productsContainer) );
        console.log(productsContainer);
        clearForm();
        displayProduct();

    }
}

function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCatInput.value = "";
    productDescInput.value = "";
}

function displayProduct()
{
    var container=""
    for(let i=0 ; i < productsContainer.length ; i++){
        container += `<tr>
            <td>`+(i+1)+`</td>
            <td>`+productsContainer[i].name+`</td>
            <td>`+productsContainer[i].price+`</td>
            <td>`+productsContainer[i].cat+`</td>
            <td>`+productsContainer[i].desc+`</td>
            <td><button onclick="changeFormUpdate(`+i+`);"  class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(`+i+`);" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML = container;
}

function deleteProduct(productId)
{
    productsContainer.splice(productId,1);
    localStorage.setItem("productsContainer",JSON.stringify(productsContainer) );
    displayProduct();
}
function changeFormUpdate(productId)
{
    productNameInput.value = productsContainer[productId].name;
    productPriceInput.value = productsContainer[productId].price;
    productCatInput.value = productsContainer[productId].cat;
    productDescInput.value = productsContainer[productId].desc;
    mainButton.innerHTML = "update product";

    mainButton.onclick = function (){
        productsContainer[productId].name = productNameInput.value ;
        productsContainer[productId].price = productPriceInput.value ;
        productsContainer[productId].cat = productCatInput.value ;
        productsContainer[productId].desc = productDescInput.value ;
        mainButton.innerHTML = "add product";
    
        localStorage.setItem("productsContainer",JSON.stringify(productsContainer) );
    
        clearForm();
        displayProduct();
}

}

function serachProduct(searchTerm)
{
    var searchContainer=``;
    for(let i=0 ; i < productsContainer.length ; i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())  == true ||
           productsContainer[i].cat.toLowerCase().includes(searchTerm.toLowerCase())  == true ){
            searchContainer += `<tr>
            <td>`+(i+1)+`</td>
            <td>`+productsContainer[i].name+`</td>
            <td>`+productsContainer[i].price+`</td>
            <td>`+productsContainer[i].cat+`</td>
            <td>`+productsContainer[i].desc+`</td>
            <td><button onclick="changeFormUpdate(`+i+`);"  class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(`+i+`);" class="btn btn-outline-danger">Delete</button></td>
            </tr>`
        }else{
            console.log("meshmwgod");
        }
        document.getElementById('tableBody').innerHTML = searchContainer;
    }
}


function validateProductName() {
    let regex = /^[A-Z a-z 0-9 ]{2,20}$/;
    if( regex.test(productNameInput.value) == true )
    {
        //productNameInput.classList.replace("is-invalid", "is-valid");
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        prodNameAlert.classList.replace("d-block","d-none");
        return true;
      
    }else
    {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        prodNameAlert.classList.replace("d-none","d-block");
    }
    return false;
}

function validateProductprice() {
    let regex = /^[1-9]\d*(?:\.\d{0,2})?$/;
    if( regex.test(productPriceInput.value) == true )
    {
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        prodPriceAlert.classList.replace("d-block","d-none");
        return true;
      
    }else
    {
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        prodPriceAlert.classList.replace("d-none","d-block");
    }
    return false;
}


function validateProductCat() {
    let regex = /^[A-Z a-z 0-9 ]{2,20}$/;
    if( regex.test(productCatInput.value) == true )
    {
        productCatInput.classList.add("is-valid");
        productCatInput.classList.remove("is-invalid");
        prodCatAlert.classList.replace("d-block","d-none");
        return true;
      
    }else
    {
        productCatInput.classList.add("is-invalid");
        productCatInput.classList.remove("is-valid");
        prodCatAlert.classList.replace("d-none","d-block");
    }
    return false;
}
function validateProductDesc() {
    let regex = /\w/;
    if( regex.test(productDescInput.value) == true )
    {
        productDescInput.classList.add("is-valid");
        productDescInput.classList.remove("is-invalid");
        prodDescAlert.classList.replace("d-block","d-none");
        return true;
      
    }else
    {
        productDescInput.classList.add("is-invalid");
        productDescInput.classList.remove("is-valid");
        prodDescAlert.classList.replace("d-none","d-block");
    }
    return false;
}
//productNameInput.addEventListener("blur" , validateProductName);
productNameInput.addEventListener("keyup" , validateProductName);
productPriceInput.addEventListener("keyup" , validateProductprice);
productCatInput.addEventListener("keyup" , validateProductCat );
productDescInput.addEventListener("keyup" , validateProductDesc );




