
var productNameInput = document.getElementById('productNameInput');//Input kolo
var productPriceInput = document.getElementById('productPriceInput');//Input kolo
var productCategoryInput = document.getElementById('productCategoryInput');//Input kolo
var productDescInput = document.getElementById('productDescInput');//Input kolo
var tableBody = document.getElementById('tableBody');
var addBtn=document.getElementById("addBtn")
var productsContainer ;
// var currentIndex=1;
if(localStorage.getItem('myProducts')==null)
{
    productsContainer=[]
}
else
{
    productsContainer=JSON.parse(localStorage.getItem('myProducts')) ;
    displayProducts(productsContainer);
}

function addProduct() {
    if(validateProductName()==true)
    {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productsContainer.push(product);
        clearForm();
        displayProducts(productsContainer);
    
        localStorage.setItem('myProducts',JSON.stringify(productsContainer))
        if(addBtn.innerHTML=='Add product')
            {
               addProduct()
            }
        else
            {
               updateProduct()
            }
 
}
    
   else
   {
       alert('invalid')
   }
}

function clearForm()

{
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";
}
function displayProducts(productList) {

    var cartoona = ``;
    for (var i = 0; i < productList.length; i++) {
        cartoona +=`<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td>  <button onClick="getPoductInfo(${i})" class="btn btn-sm btn-outline-warning">update</button> </td>
        <td>  <button onClick="deleteProduct(${i})" class="btn btn-sm btn-outline-danger">delete</button> </td>
    </tr>`
    }
    tableBody.innerHTML = cartoona;
}

function searchProduct(searchTerm)
{

var cartoona = ``;
for (var i = 0; i < productsContainer.length; i++) {
    if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()))
    {
        cartoona +=`<tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td>  <button onClick="getPoductInfo(${i})" class="btn btn-sm btn-outline-warning">update</button> </td>
        <td>  <button onClick="deleteProduct(${i})" class="btn btn-sm btn-outline-danger">delete</button> </td>
    </tr>`
    }
    
}
tableBody.innerHTML = cartoona;
}

function validateProductName()
{
    var regEx=/^[A-Z][a-z]{3,8}$/;
    if(regEx.test(productNameInput.value) == true)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function getPoductInfo(index)
{
    currentIndex=index;
var currentProduct=productsContainer[index];
productNameInput.value=currentProduct.name;
productPriceInput.value=currentProduct.price;
productCategoryInput.value=currentProduct.category;
productDescInput.value=currentProduct.desc;
addBtn.innerHTML="update product"

}

function updateProduct()
{
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    productsContainer[currentIndex]=product;
    localStorage.setItem('myProducts',JSON.stringify(productsContainer))

}
function deleteProduct(index)
{
    productsContainer.splice(index,1);
    displayProducts(productsContainer)
    localStorage.setItem('myProducts',JSON.stringify(productsContainer))
}