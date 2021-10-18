let cartProductsArray;
let shippingPer = 0;
//Función para mostrar la información de carrito dentro de la tabla de productos
function showCartProducts() {
    let htmlContentToAppend = "";
    document.getElementById("cartProds").innerHTML = htmlContentToAppend;
    for (let i = 0; i < cartProductsArray.articles.length; i++) {
        let product = cartProductsArray.articles[i];
        htmlContentToAppend += `
        <tr id="prod `+ i +`">
        <td><img src="` + product.src + `" alt="` + product.name + `" width="35px"></td>
        <td>`+ product.name + `</td>
        <td>
            <div class="form-group mb-0">
              <input class="form-control quantity" style="width:65px;" type="number" id="productCount-`+ i +`" value="`+ product.count + `" min="1">
            </div>
        </td>
        <td>`+ product.currency + ` ` + product.count * product.unitCost + `</td>
        <td class="text-right" id="subtotal"></td>
        <td><a href="#" class="text-danger"><i class="ri-delete-bin-3-line"></i></a></td>
        </tr>
        `
        document.getElementById("cartProds").innerHTML += htmlContentToAppend;
    }
    
    var quantityInputs =  document.getElementsByClassName('quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChange);
    }

    getSubtotal()
}

function shippingChange(shipping){
    shippingPer = shipping.value;
    showCartProducts()
}

function ready(){
    var quantityInputs =  document.getElementsByClassName('quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChange);
        
    }
}

function quantityChange(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        alert("el valor no puede ser menor a 1")
        input.value = 1
    }
    
    // se encarga de dividir la id en 2 basado en el caracter -
    splitedID = event.target.id.split("-")
    // se utiliza la posocion 1 ya que la 0 solo tiene la string generica
    productNumberChange = splitedID[1]
    // se modifica el count del articulo basado en el valor del input
    cartProductsArray.articles[productNumberChange].count = input.value
    showCartProducts()
    

}
function getSubtotal(){
    let htmlContentToAppend = "";
    document.getElementById("total").innerHTML = htmlContentToAppend;
    let totalProducts = 0;
    for (let i = 0; i < cartProductsArray.articles.length; i++) {
        let product = cartProductsArray.articles[i];
        var unitCost = product.unitCost;
        var quantity = product.count;
        totalProducts += (unitCost * quantity)
    }

    envio = 0;
    if (shippingPer != 0) {
        envio  = (totalProducts * shippingPer) / 100;
    }
    
    total = totalProducts + envio;
    htmlContentToAppend = `
    <tr>
        <td>Total (productos) :</td>
        <td>$`+totalProducts+`</td>
    </tr>
    <tr>
        <td>Envío :</td>
        <td>$`+envio+`</td>
    </tr>
    <tr>
        <td class="f-w-7 font-18"><h4>Total :</h4></td>
        <td class="f-w-7 font-18"><h4>$`+total+`</h4></td>
    </tr>`;
    document.getElementById("total").innerHTML = htmlContentToAppend;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartProductsArray = resultObj.data;
            //Muestra los productos dentro del carrito
            showCartProducts();
        }
    });
});

