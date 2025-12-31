

/* ------------------------------------------ DASHBOARD ------------------------------------- */

// 3lshan y3rd esm el current user m3 el welcome
// 1- (thisUser)=> variabl baraga3 feh el data bta3t el user el 7aly 3lshan ageb mno esmo          
// 2- (currentUser)=> variabl 3mlnah fe function el login 3lshan n5azen fe el data bta3t el user el 7aly
var thisUser = JSON.parse(localStorage.getItem("currentUser"));
if(thisUser)
{ document.getElementById('welcome').innerHTML =`
  <h4> 
 <i class="fa-solid fa-circle-user fa-1x"></i> <span class="text-danger"> Welcome </span> ${thisUser.firstName} ${thisUser.lastName}  
  </h4>
  `; }


// select inputs first 
var ProductName = document.getElementById('pn');
var productPrice = document.getElementById('pp');
var productCat = document.getElementById('pc');
var productDesc = document.getElementById('pd');

// empty array to store objects when create it 
var allProducts = []; 


/* JSON.parse btraga3 el data bshaklha el asasy (object) fa kda k2ny b3ml overwrite 3la el variable b3d ma kan array fady
b eno yrag3 feh el data ely 5azentaha fe el local storage 
w kman b2olo lw fe data khazna fe el all products lw mfesh 5azn array fady  */
if (localStorage.getItem('allProducts') != null) {
  allProducts = JSON.parse(localStorage.getItem('allProducts'));
} else {
  allProducts = [];
}



// calling lel function ely hat3rd el data 3lshan tt3rd awel ma el user yft7
displayAllProducts()



function addProduct(){

    if(
    ProductName.value.trim() === "" ||
    productPrice.value.trim() === "" ||
    productCat.value.trim() === "" ||
    productDesc.value.trim() === ""
    ){
    document.getElementById('alert').innerHTML = 'Please fill all fields';
    return; // وقف تنفيذ الفنكشن
  }

  
  // select input's values as an object to describe one product   
   var product = {
      name : ProductName.value ,
      price : Number(productPrice.value) , // convert value of the price to number becouse any value from any input is string
      category : productCat.value ,
      describtion : productDesc.value ,
   };


  // add value of the product as an object to allProducts (array)
   allProducts.push(product);

  // JSON.strigify bt5zn el data string bs b format el array of object 
   localStorage.setItem( 'allProducts' , JSON.stringify( allProducts ) );


   document.getElementById('alert').innerHTML = ""; // مسح الرسالة

   displayAllProducts();
   clearInputs();

};



function displayAllProducts(){
   
    var products = "" ; // de el cartona ely badef feha el <td> bto3y ely b3rf fehom el products 3lshan a3rdha fe el a5er fe el table

    for( var i = 0 ; i < allProducts.length ; i++){
       products = products + `
      <tr>
      <th scope="row">${i + 1}</th>
      <td>${allProducts[i].name}</td>
      <td>${allProducts[i].price}</td>
      <td>${allProducts[i].category}</td>
      <td>${allProducts[i].describtion}</td>
      <td> <button  onclick="editProduct( ${ i } )"  type="button" class="btn" data-bs-toggle="button"><i class="fa-solid fa-pen-to-square fs-5 text-primary "></i></button> </td>
      <td> <button  onclick="deleteProduct( ${ i } )"  type="button" class="btn" data-bs-toggle="button"><i class="fa-solid fa-trash fs-5 text-danger "></i></button> </td>
      </tr>
    `
    };

    document.getElementById('tr').innerHTML= products; // fe el innerhtml hn3rd el cartona ely b2t feha kol el <td> 

};



function clearInputs() {
  ProductName.value = "";
  productPrice.value = "";
  productCat.value = "";
  productDesc.value = "";
};




function cancelEditing(){

  clearInputs();

  document.getElementById('convertAddToEdit').innerHTML= `

  <button  onclick="addProduct()" class="btn btn-outline-success me-2 ">Add</button>

  `

}



function deleteProduct( i ){ // da parameter bb3to lel function as a variable el function mo3tameda 3leh w da 3ayd 3la el index bta3 el element ely hamsa7o
  
  //                  el parameter ely hms7 mn 3ndo , el rkm 3ayd 3la 3dd el elements ely hnms7a fa kda hnms7 element wa7d     
  allProducts.splice(     i    ,        1    ) ;


  // b3d ma yms7 el object lazm a3ml set item tany fe el array 
  localStorage.setItem('allProducts', JSON.stringify(allProducts));


  displayAllProducts() ; // calling lel function de 3lshan y3rd el products tany b3d mas7 el element mn el array 

};



var updateIndex  ;  // da variabl hn5azen feh el index bta3 el element ely hn3rf el data bta3to tany fe el inputs

function editProduct( i ){

  console.log('edited...');

  updateIndex = i ; // el index ely  hytb3t lel function fe el parameter 

  //bn3rd el data fe el inputs tany 3lshan n3dl feha 
  ProductName.value   = allProducts[i].name;
  productPrice.value  = allProducts[i].price;
  productCat.value    = allProducts[i].category;
  productDesc.value   = allProducts[i].describtion;

  document.getElementById('convertAddToEdit').innerHTML= `
  
  <button onclick="updateProduct()" class="btn btn-outline-warning">Update</button>
  <button onclick="cancelEditing()" class="btn btn-outline-danger">Cancel</button>

  `

}


function updateProduct(){

  console.log('Updated...');

  // bndef el data el gdeda fe el array 
  allProducts[updateIndex].name = ProductName.value;
  allProducts[updateIndex].price = Number(productPrice.value);
  allProducts[updateIndex].category = productCat.value;
  allProducts[updateIndex].describtion = productDesc.value;


  // b3d el update lazm n3ml set item tany 
  localStorage.setItem('allProducts', JSON.stringify(allProducts));


  // bn3rdha b3d ma dfnaha
  displayAllProducts();
  clearInputs();

  updateIndex = null ; // 3lshan my7salsh laghbata lma a3ml delete lel element ely 3dlto

  document.getElementById('convertAddToEdit').innerHTML= `
  
  <button  onclick="addProduct()" class="btn btn-outline-success me-2 ">Add</button>

  `

}



function search(){

  var searchValue = document.getElementById('search').value.toLowerCase();

  var products = '';

  for( var i = 0 ; i < allProducts.length ; i++){

    if( allProducts[i].name.toLowerCase().includes(searchValue) == true  ){

    products = products + `
      <tr>
      <th scope="row">${i + 1}</th>
      <td>${allProducts[i].name}</td>
      <td>${allProducts[i].price}</td>
      <td>${allProducts[i].category}</td>
      <td>${allProducts[i].describtion}</td>
      <td> <button  onclick="editProduct( ${ i } )"  type="button" class="btn" data-bs-toggle="button"><i class="fa-solid fa-pen-to-square fs-5 text-primary "></i></button> </td>
      <td> <button  onclick="deleteProduct( ${ i } )"  type="button" class="btn" data-bs-toggle="button"><i class="fa-solid fa-trash fs-5 text-danger "></i></button> </td>
      </tr>
    `
    }

  }
  document.getElementById('tr').innerHTML= products;

}


function logout(){
  window.location.href = "../index.html";
}


