var product = {};

function showImages(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productPriceHTML = document.getElementById("productPrice")
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCategoryHTML = document.getElementById("productCategory")
            let productCountHTML = document.getElementById("productCount");
            let productRelatedHTML = document.getElementById("productRelated");
        
            productNameHTML.innerHTML = product.name;
            productPriceHTML.innerHTML = product.cost + " " + product.currency;
            productDescriptionHTML.innerHTML = product.description;
            productCategoryHTML.innerHTML = product.category;
            productCountHTML.innerHTML = product.soldCount;
            productRelatedHTML.innerHTML = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImages(product.images);
        }
    });
});