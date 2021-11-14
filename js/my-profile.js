//Función que guarda los datos del perfil e inhabilita la modificación dde los mismos
function saveProfileData() {
    let profileData = {
        firstName: document.getElementById("firstName").value,
        middleName: document.getElementById("middleName").value,
        firstLastname: document.getElementById("firstLastname").value,
        secondLastname: document.getElementById("secondLastname").value,
        phone: document.getElementById("phone").value,
        emailAddress: document.getElementById("emailAddress").value,
        addressProfile: document.getElementById("addressProfile").value,
        city: document.getElementById("city").value,
        department: document.getElementById("department").value
    }
    localStorage.setItem("profile", JSON.stringify(profileData));
    lockProfileData(profileData);
}


//Función que muestra los datos del usuario en el perfil y llama a lockProfileData para que no se puedan modificar los datos
function displayProfileData() {
    let profileData = JSON.parse(localStorage.getItem("profile"));
    for (var key in profileData) {
        document.getElementById(key).value = profileData[key]
    }
    lockProfileData(profileData);
}

//Función que inhabilita la modificación de los datos
function lockProfileData(dataToLock) {
    for (var key in dataToLock) {
        document.getElementById(key).disabled = true;
    }
}


//Función que permite modificar los datos del perfil
function changeProfileData() {
    let profileData = JSON.parse(localStorage.getItem("profile"));
    for (var key in profileData) {
        document.getElementById(key).disabled = false;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //Se muestran los datos del perfil guardados en localstorge
    displayProfileData();
    document.getElementById("saveProfile").addEventListener("click", function (event) {
        //Se almacenan los nuevos datos del perfil
        saveProfileData();
    });
    document.getElementById("editProfile").addEventListener("click", function (event) {
        //Se habilita la modificación de los datos del perfil
        changeProfileData();
    });
});