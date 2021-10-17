const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}
//Función que toma el nombre de usuaria/o guardado en local storage y lo agrega al nav del sitio web en forma de drop-down menu
//con optiones para dirigirge al carrito de compras, al perfil propio y cerrar sesión
function getUsuaria() {
  let usuaria = localStorage.getItem("user");
  document.getElementById("navi").innerHTML +=
    `<div class="dropdown show">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ${usuaria}
    </a>
  
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" href="cart.html">Mi carrito</a>
      <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
      <option class="dropdown-item" id= "logout" value="">Cerrar sesión</option>
    </div>
  </div>`;
}

//Función que cierra la sesión del usuario en el sitio web, borrando el usuario guardando en localstorage y llevandonos de nuevo a la pantalla
//de login
function logOut() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getUsuaria();
});


//Evento on-click que ejecuta la función para cerrar sesión
document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("logout").addEventListener("click", function (event) {
    logOut();
  })
});