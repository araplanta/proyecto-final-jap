//Función que guarda los datos del perfil
function saveProfileData() {
    let profileData={
        firstName: document.getElementById("firstName").value,
        middleName: document.getElementById("middleName").value,
        firstLastname: document.getElementById("firstLastname").value,
        secondLastname: document.getElementById("secondLastname").value,
        phone: document.getElementById("phone").value,
        emailAddress: document.getElementById("emailAddress").value,
        address: document.getElementById("addressProfile").value,
        city: document.getElementById("city").value,
        department: document.getElementById("department").value
    }
    localStorage.setItem("profile", JSON.stringify(profileData));
    console.log(profileData)
}


//Función que 
function displayProfileData(){
    localStorage.getItem("profile");
    
}



//Función que permite modificar los datos del perfil
function changeProfileData() {


}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("saveProfile").addEventListener("click", function(event){
        saveProfileData();
        displayProfileData();
    });
    document.getElementById("editProfile").addEventListener("click", function(event){
        changeProfileData();
    });
});