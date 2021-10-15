var product = {};
var products = {};
var relatedProd = {};
var related = {};
//Función que muestra las imágenes del producto de forma ordenada
function showImages(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-2 col-md-6 col-9">
            <div class="d-block mb-6 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }
}

//Función que muestra los comentarios ya existentes del producto
function showProductComments() {
    let htmlContentToAppend = "";
    let estrellita = `<span class="fa fa-star checked"></span>`;
    let noEstrellita = `<span class="fa fa-star"></span>`;
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            for (const comment of resultObj.data) {
                htmlContentToAppend += `
            <div class="media-block">
            <div class="media-body">
            <div class="mar-btm">
                <p class="text-muted text-sm">`+ `<a href="" class="btn-link text-semibold media-heading box-inline">` + comment.user + `</a> ` + comment.dateTime + `</p>
           
             </div>
            <p>`+ comment.description + ` ` + estrellita.repeat(comment.score) + noEstrellita.repeat(5 - comment.score) + `</p>
            </div>
            </div>
            `
            }
            document.getElementById("commentsPublicados").innerHTML = htmlContentToAppend;
        }
    });
}

//Función que muestra los productos relacionados al productos
function showRelated(array) {
    getJSONData(PRODUCTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            let htmlContentToAppend = "";
            for (productNumber of array) {
                let relatedProd = products[productNumber];
                htmlContentToAppend +=
                    `<a href="#"><div><div class="card" style="width: 18rem;">
            <img class="card-img-top" src="` + relatedProd.imgSrc + `"alt="Card image cap">
            <div class="card-body">
              <p class="card-text">`+ relatedProd.name + `</p>
            </div>
          </div></div></a>`
            }

            document.getElementById("relatedContainer").innerHTML += htmlContentToAppend;
        }
    })
}


//Función para cargar un nuevo comentario a la página del producto
function newComment() {
    let htmlAgregar = "";
    let comentario = document.getElementById("comment").value;
    let user = localStorage.getItem("user");
    let estrellita = `<span class="fa fa-star checked"></span>`;
    let noEstrellita = `<span class="fa fa-star"></span>`;
    let score = document.getElementById("stars").value;
    let date = new Date();
    if (comentario == "") {
        alert("Porfavor introduce la informacion requerida!");
    } else {
        htmlAgregar += `
        <div class="media-block">
            <div class="media-body">
            <div class="mar-btm">
                <p class="text-muted text-sm">`+ `<a href="" class="btn-link text-semibold media-heading box-inline">` + user + `</a> ` + date.getFullYear() + `-` + date.getMonth() + `-` + date.getDate() + ` ` + date.getHours() + `:` + date.getMinutes() + `:` + date.getSeconds() + `</p>
             </div>
            <p>`+ comentario + ` ` + estrellita.repeat(score) + noEstrellita.repeat(5 - score) + `</p>
            </div>
            </div>
            `
    }
    document.getElementById("commentsPublicados").innerHTML += htmlAgregar;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            // Se carga la información del producto dentro del HTML
            let productNameHTML = document.getElementById("productName");
            let productPriceHTML = document.getElementById("productPrice")
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCategoryHTML = document.getElementById("productCategory")
            let productCountHTML = document.getElementById("productCount");

            productNameHTML.innerHTML = product.name;
            productPriceHTML.innerHTML = product.cost + " " + product.currency;
            productDescriptionHTML.innerHTML = product.description;
            productCategoryHTML.innerHTML = product.category;
            productCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImages(product.images);
            //Muestro los comentarios ya existentes
            showProductComments();
            //Muestro los productos relacionados
            showRelated(product.relatedProducts)
        }
    });
});


//Muestro el nuevo comentario
document.getElementById("enviarComment").addEventListener("click", function () {
    newComment();
});