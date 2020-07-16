function iniciar(){
    var usuario = document.getElementById('usuario');
    var clave = document.getElementById('clave');
    if(usuario.value=="cos" && clave.value=="123"){
        
        window.location.href="INICIO.html";
       alert("INICIANDO...");
    } else{
        alert("**ERROR**");
    }
    }
    