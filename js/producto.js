const titulo = document.getElementById("titulo");
const imagen = document.getElementById("info") ;
const description = document.getElementById("descripcion");
const botones = document.getElementById("carro");
const prod=4;
const producto= (localStorage.getItem("claveProducto")-1);

function crearNuevoNodo(valor, elemento){//crea un nuevo nodo hijo de tBody
    let newNodo=document.createElement("div"); /* ! Crea una nueva fila para tabla de pedidos*/
    newNodo.innerHTML+= valor;
    elemento.appendChild(newNodo);
}

const imprimirProducto = () =>{
    const nodoImg=document.createElement("img");
    nodoImg.setAttribute("class", `card-img-top`);
    nodoImg.setAttribute("src", `${arrayProductos[producto].image}`);
    console.log(nodoImg);
    crearNuevoNodo(arrayProductos[producto].modelo, titulo);
    crearNuevoNodo(arrayProductos[producto].description, description);
    imagen.appendChild(nodoImg);
    crearNuevoNodo(arrayProductos[producto].stock, botones);
}

const redireccionar = () =>{
    console.log(cant.value>0);
    cant.value>0
    &&  setTimeout( function() { window.location.href = "Entregas.html"; }, 500 );
}