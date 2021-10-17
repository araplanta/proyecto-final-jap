//Variables y constantes de utilidad para las funciones de filtrado y muestra de contenido
const ORDER_BY_PROD_RELEVANCE = "Rel."
const ORDER_ASC_BY_PRICE = "1-9";
const ORDER_DESC_BY_PRICE = "9-1";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;


//Función que realiza algunos de los filtros (por relevancia, orden de menor a mayor precio y viceversa)
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_PROD_RELEVANCE) {
        result = array.sort(function (a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if (aSold > bSold) { return -1; }
            if (aSold < bSold) { return 1; }
            return 0;
        });
    }
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    }
    return result;
}


//Esta función crea los elementos necesarios en el HTML para mostrar el listado de productos de forma estructurada
function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <br><p class="font-weight-bold">` + product.cost + " " + product.currency + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}


//Función que ordena los productos según el filtro elegido y los muestra en el sitio web
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            //Muestra los productos según su orden predeterminado
            showProductsList();
        }
    });
    //Muestra los productos ordenados por relevancia
    document.getElementById("sortByRelevance").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_RELEVANCE);
    });
    //Muestra los productos ordenados de menor a mayor según su precio
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    //Muestra los productos ordenados de mayor a menor según su precio
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
    //Limpia los campos destinados a ingresar rango de precio
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangePriceMin").value = "";
        document.getElementById("rangePriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });
    document.getElementById("rangeFilterPrice").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por el precio de los productos.
        minPrice = document.getElementById("rangePriceMin").value;
        maxPrice = document.getElementById("rangePriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        showProductsList();
    });
});