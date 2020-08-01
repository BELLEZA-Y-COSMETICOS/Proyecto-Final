function iniciar() {
    var usuario = document.getElementById('usuario');
    var clave = document.getElementById('clave');
    if (usuario.value == "cos" && clave.value == "123") {

        window.location.href = "inicio.html";
        alert("INICIANDO...");
    } else {
        alert("**ERROR**");
    }
}


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCSFDJ4ITRV064AKoWHjyTFufCzJ-fgIN4",
    authDomain: "proyecto-846de.firebaseapp.com",
    databaseURL: "https://proyecto-846de.firebaseio.com",
    projectId: "proyecto-846de",
    storageBucket: "proyecto-846de.appspot.com",
    messagingSenderId: "517920209146",
    appId: "1:517920209146:web:117234701876b5f8cd7143"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var idUsuario = document.getElementById('id');
var txtname = document.getElementById('name');
var apellidos = document.getElementById('apellidos');
var opcion = document.getElementById('servicios');

var btnAgregar = document.getElementById('btnAgregar');
var btnEditar = document.getElementById('btnEditar');
var btnActualizar = document.getElementById('btnActulizar');
var btnEliminar = document.getElementById('btnEliminar');


function agregarDatos(user) {
    db.collection("RESERVACIONES").add({
        nombre: txtname.value,
        apellido: apellidos.value,
        identificacion: idUsuario.value,
        servicio: opcion.value
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('Reservacion agregada correctamente', docRef.id);
            limpiarDatos();
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
}

function limpiarDatos() {
    txtname.value = "";
    apellidos.value = "";
    idUsuario.value = "";
    opcion.value = "";
}

function editarDatos(id) {
    btnAgregar.classList.add('d-none');
    btnActualizar.classList.remove('d-none');
    
    if (idUsuario.value == "123") {
        db.collection("RESERVACIONES").doc(id).get()
        .then((doc) => {
            idUsuario.value = id;
            txtname.value = doc.data().nombre;
            apellidos.value = doc.data().apellido;
            opcion.value = doc.data().servicio; 
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
    }else {
        alert("**ERROR**");
    }
}
