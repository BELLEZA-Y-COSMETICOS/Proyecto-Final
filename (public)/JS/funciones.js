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
var opcion = document.getElementById('servicio');

//login y registro
var emailUser = document.getElementById('emailUser');
var passUser = document.getElementById('passUser');

var emailUsuarioLogueado = document.getElementById('emailUsuarioLogueado');
var usuarioActual;

var btnAgregar = document.getElementById('btnAgregar');
var btnActualizar = document.getElementById('btnActualizar');

//var btnEditar = document.getElementById('btnEditar');
//var btnBuscar = document.getElementById('btnBuscar');
//var btnEliminar = document.getElementById('btnEliminar');


function agregarDatos(user) {
    leerDatos();
    db.collection("RESERVACIONES").doc(idUsuario.value).set({
        nombre: txtname.value,
        apellido: apellidos.value,
        identificacion: idUsuario.value,
        servicio: opcion.value,

    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef);
            alert('Reservacion agregada correctamente');
            limpiarDatos();
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
}
leerDatos();

function leerDatos() {
    listareservas.innerHTML = "";
    btnActualizar.classList.add('d-none');

    db.collection("RESERVACIONES").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                listareservas.innerHTML += `
                    <tr>
                        <td>${doc.data().nombre}</td>
                        <td>${doc.data().apellido}</td>
                        <td>${doc.data().identificacion}</td>
                        <td>${doc.data().servicio}</td>
                        <td>
                            <button onclick="eliminar('${doc.id}')" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                            <button onclick="editar('${doc.id}')" class="btn btn-info"><i class="far fa-edit"></i></button>
                        </td>
                    </tr>           
                `;
            });
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });
}

function eliminar(idUsuario) {
    db.collection("RESERVACIONES").doc(idUsuario).delete()
        .then(() => {
            alert('Se ha eliminado su reservacion');
            console.log("Documento eliminado");
            leerDatos();
        }).catch((error) => {
            console.error("Error: ", error);
        });
}

function editar(identificacion) {
    id.disabled = true;
    btnAgregar.classList.add('d-none');
    btnActualizar.classList.remove('d-none');
    db.collection("RESERVACIONES").doc(identificacion).get()
        .then((doc) => {
            txtname.value = doc.data().nombre;
            apellidos.value = doc.data().apellido;
            idUsuario.value = doc.data().identificacion
            opcion.value = doc.data().servicio;

        })
        .catch((error) => {
            console.log("Error: ", error);
        });
}

function actualizarDatos() {
    id.disabled = false;
    db.collection("RESERVACIONES").doc(idUsuario.value).update({
        nombre: txtname.value,
        apellido: apellidos.value,
        servicio: opcion.value,
    })
        .then(() => {
            limpiarDatos()
            leerDatos();
            btnActualizar.classList.add('d-none');
            btnAgregar.classList.remove('d-none');
            alert('Se han actulizado tus datos de la reserva');
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.log("Error: ", error);
        });;

}


function limpiarDatos() {
    txtname.value = "";
    apellidos.value = "";
    idUsuario.value = "";
    opcion.value = "";
}

function limpiarDatosLogin() {
    emailUser.value = "";
    passUser.value = "";
}

function registarUsuario() {
    firebase.auth().createUserWithEmailAndPassword(emailUser.value, passUser.value)
        .then(() => {
            alert("**USUARIO REGISTRADO CORRECTAMENTE**");
            console.log("El usuario se ha registrado");
            limpiarDatosLogin();
        })
        .catch(function (error) {
            alert("**ERROR - CAMPOS VACIOS O FORMATO INCORRECTO**");
            console.log("Error: ", error.message);
        });
}

function login() {
    var uno = emailUser.value;
    firebase.auth().signInWithEmailAndPassword(uno, passUser.value)
        .then((user) => {
            sessionStorage.setItem('login', user.email);
            window.location.href = 'inicio.html';
        })
        .catch(function (error) {
            alert("**ERROR - USUARIO O CONTRASEÑA INCORRECTO**");
            console.log("Error: ", error.message);
            limpiarDatosLogin();
        });
}

function cerrarSesion() {
    firebase.auth().signOut()
        .then(() => {
            console.log("Sesion cerrada exitosamente");
            window.location.href = 'index.html';
        }).catch((error) => {
            console.log(error.message)
        });
}

function estado() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            emailUsuarioLogueado.innerHTML = user.email;
            usuarioActual = user;
        }
        else {
            window.location.href = 'index.html';
        }
    }); 
}





