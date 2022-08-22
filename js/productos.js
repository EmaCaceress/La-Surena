/**********************************Eventos de Productos**********************************/
const prod=3;

//funcion crear nodos
const cards = document.getElementsByClassName("card");
const sectionProductos= document.getElementById("productos");
const sectionImage=["ropero","pechera","canasto","silla","mesa","otro"];

function crearNuevoNodo(valor){//crea un nuevo nodo hijo de tBody
    let newNodo=document.createElement("div"); /* ! Crea una nueva fila para tabla de pedidos*/
    newNodo.innerHTML+= valor;
    sectionProductos.appendChild(newNodo);
}

const eleccion = (elemento) =>{
    const producto= elemento;
    localStorage.setItem("claveProducto",producto);
}

const imprimirProductos = () =>{

        sectionImage.map(e=>{
            let card=[];
            for(let producto of arrayProductos){

                if(producto.section===e){
                card.push(`<div class="card">
                <img class="animate__animated animate__bounce card-img-top" src=${producto.image}>
                <div class="card-body">
                    <h5 class="card-title">${producto.modelo}</h5>
                </div>
                <a href="producto.html" style="text-decoration:none;"><button  type="submit" class="form-control boton" style="background-color: #5CDF6A; text-align: center;" onclick="eleccion(${producto.id})" id="boton">Ver mas</button></a>
                </div>`)}
            }
            crearNuevoNodo(`
                <div class="imagenes" id=${e}>
                    <h1>${e}</h1>
                    ${card.join("")}
                </div>
                `
                );})
}