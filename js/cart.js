let cartProductsArray;
let shippingPer = 0;
let paymentSelected = "card"

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
        <td>`+ product.currency + ` ` + product.unitCost + `</td>
        <td class="text-right" id="subtotal">`+ product.currency + ` `+ product.count * product.unitCost + `</td>
        <td><a href="#" class="text-danger"><i class="ri-delete-bin-3-line"></i></a></td>
        </tr>
        `
        document.getElementById("cartProds").innerHTML += htmlContentToAppend;
    }
    //Se agrega un event listener para que cuando las cantidades cambien se llame a la función que obtiene el precio
    var quantityInputs =  document.getElementsByClassName('quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChange);
    }
    showTotal()
}


//Función que cambia la variable global del porcentaje del envío según el método de envío seleccionado
function shippingChange(shipping){
    shippingPer = shipping.value;
    showCartProducts()
}


//Función que maneja los cambios de cantidad
function quantityChange(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        alert("el valor no puede ser menor a 1")
        input.value = 1
    }
    //Se encarga de dividir la id en 2 basado en el caracter - (guión)
    splitedID = event.target.id.split("-")
    //Se utiliza la posición 1 ya que la 0 solo tiene la string genérica
    productNumberChange = splitedID[1]
    //Se modifica el count del artículo basado en el valor del input
    cartProductsArray.articles[productNumberChange].count = input.value
    showCartProducts()
}



//Función que calcula el precio final de la compra
function showTotal(){
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


//Función que cambia el valor de la variable global paymentMethod según el método de pago seleccionado
function paymentMethodSelected(selected){
    paymentSelected = selected.value
}


//Función que valida que los campos necesarios tengan algún tipo de input dependiendo del método de pago seleccionado
function validatePaymentMethod(){
    console.log(paymentSelected)
    if(paymentSelected =="card"){
        let cardNumber = document.getElementById("cardNumber").value;
        let cvc = document.getElementById("cvc").value;
        let expiration = document.getElementById("expiration").value;
        if((cardNumber =="") || (cvc =="") || (expiration == "")){
            alert("Debes completar los datos de su método de pago")
            return
        }
    }
    if(paymentSelected == "bank"){
        let accountNumber = document.getElementById("accountNumber").value;
        if(accountNumber ==""){
            alert("Debes completar los datos de su método de pago")
            return
        } 
    }
    //Solo si los campos se han completado se permitirá cerrar el modal
    $("#paymentModal").modal('hide');  
}

//Función que controla que la dirección de envío se haya ingresado correctamente
function validateAddress(){
    let street = document.getElementById("streetAddress").value;
    let number = document.getElementById("numberAddress").value;
    let corner = document.getElementById("cornerAddress").value;
    if((street !== "") && (number !== "") && (corner !== "")){
        window.location.href="cart.html"
    }
    else{
        alert("No olvides colocar la dirección de envío")
    }
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
    });    $("#paymentButton").click(function(){
        $("#paymentModal").modal();
    });
    document.getElementById("buy").addEventListener("click", function (event) {
        //Se validan que los campos estén completos para poder proceder con la compra
        validateAddress();
        validatePaymentMethod();
    });
    document.getElementById("savePaymentMethod").addEventListener("click", function (event) {
        //Se validan que los campos estén validados para poder cerrar el modal de Método de pago
        validatePaymentMethod();
    });
});

