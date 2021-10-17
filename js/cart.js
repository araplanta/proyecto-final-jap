var cartProductsArray = [];

//Función para mostrar la información de carrito dentro de la tabla de productos
function showCartProducts(){
    let htmlContentToAppend = "";
    for (let i = 0; i < cartProductsArray.length; i++) {
        let product = cartProductsArray[i];
        htmlContentToAppend += `
        <tr>
        <td><a href="#" class="text-danger"><i class="ri-delete-bin-3-line"></i></a></td>
        <td><img src="` + product.src + `" alt="` + product.name + `" width="35px"></td>
        <td>`+ product.name +`</td>
        <td>
            <div class="form-group mb-0">
              <input class="form-control" style="width:65px;" type="number" id="productCount" value="`+ product.count +`" min="1">
            </div>
        </td>
        <td>`+ product.currency + `" "` + product.unitCost +`</td>
        <td class="text-right">pum</td>
    </tr>
        `
    }
    document.getElementById("cartProds").innerHTML = htmlContentToAppend;
}

/*function subtotalCost(){

}*/



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartProductsArray = resultObj.data;
            //Muestra los productos dentro del carrito
            showCartProducts();
        }
    });
});