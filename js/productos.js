/**********************************Eventos de Productos**********************************/
const prod=3;
const upStorage=(e)=>{
        console.log(e.name);
        //En caso de que input de cantidad no devuelva un valor numerico, condicion valdra "false"
        numBoton=e.name;
        let condicion=cant[numBoton-1].value || false; //Operadores avanzados

        if(condicion){  /*Si condicion es true, entonces se guarda en local Storage la
        cantidad y el producto seleccionado, cada uno en dos listas distintas, pero con la misma
        posicion*/
            Toastify({
                text: "¡Se agrego a su carrito!",
                duration: 2000,
                gravity: 'bottom',
                position: 'right',
                style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
                }).showToast();
            console.log(numBoton);
            carroC.push(cant[numBoton-1].value);
            console.log(carroC[i]);

            carroP.push(e.name);
            console.log(carroP[i]);

            localStorage.setItem("carritoP",carroP);
            localStorage.setItem("carritoC",carroC);}
        else //En caso de que condicion sea "false", se muestra un cartel de que no agrego una cantidad
            Toastify({
                text: "No agrego la cantidad al producto",
                duration: 2000,
                gravity: 'bottom',
                position: 'right',
                style:{background: 'linear-gradient(to right, #DA2505, #96c92d)'}
                }).showToast();
}

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
    const producto= elemento.name;
    localStorage.setItem("claveProducto",producto);
}

const imprimirProductos = () =>{

        sectionImage.map(e=>{
            let card=[];
            for(let producto of arrayProductos){
                console.log(producto);
                if(producto.section===e){
                card.push(`<div class="card">
                <img class="animate__animated animate__bounce card-img-top" src=${producto.image}>
                <div class="card-body">
                    <h5 class="card-title">${producto.modelo}</h5>
                </div>
                <a href="producto.html"><button  type="submit" class="form-control boton" style="background-color: #5CDF6A; text-align: center;" onclick="eleccion(this)" id="boton" name=${producto.id}>Agregar al Carrito</button></a>
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