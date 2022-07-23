const titulo = document.getElementById("titulo");
const imagen = document.getElementById("info") ;
const description = document.getElementById("horarios");
const botones = document.getElementById("mapa");
const prod=4;
const producto= (localStorage.getItem("claveProducto"))-1;

function crearNuevoNodo(valor, elemento){//crea un nuevo nodo hijo de tBody
    let newNodo=document.createElement("div"); /* ! Crea una nueva fila para tabla de pedidos*/
    newNodo.innerHTML+= valor;
    elemento.appendChild(newNodo);
}

const imprimirProducto = () =>{ 
    crearNuevoNodo(arrayProductos[producto].modelo, titulo);
    crearNuevoNodo(arrayProductos[producto].description, description);
    crearNuevoNodo(`<img class="animate__animated animate__bounce card-img-top" src=${arrayProductos[producto].image}>`, imagen);
    crearNuevoNodo(arrayProductos[producto].stock, botones);
}