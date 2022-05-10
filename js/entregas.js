/**********************************Eventos de Entregas**********************************/
calculo.addEventListener("click",()=>{ //Evento del boton de calculo
    if(tBody.innerHTML.includes('<th scope="total">')) 
        Toastify({
            text: "¡Ya tiene el calculo realizado!",
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
            }).showToast();
    else if(tBody.innerHTML.includes('<th scope="pago">') && tBody.innerHTML.includes('<th scope="Envio">'))
    {
        Toastify({
            text: "¡Se agrego el calculo!",
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
            }).showToast();
            crearNuevoNodo(`<tr class="table-warning"><th scope="total"></th><td></td><td></td><td>Total:</td><td>${total}</td></tr>`);
    }else
    swal({
        icon: 'error',
        title: 'Incorrecto',
        text: 'Tiene que completar todo el formulario',
        });
});

dir.addEventListener("click", ()=>{ //Evento del boton de envios

    if(tBody.innerHTML.includes('<th scope="Envio">'))
    swal({
        icon: 'error',
        title: 'Ya agrego un domicilio'
        });
    else{
    let precioE=envio();
    crearNuevoNodo(`<tr class="table-warning"><th scope="Envio"></th><td></td><td></td><td>Envio:</td><td>${precioE}</td></tr>`);
    total=total+precioE;
    console.log(total);
    Toastify({
        text: "¡Se agrego su domicilio!",
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
        }).showToast();
}
});

end.addEventListener("click",()=>{//Evento del boton de Finalizacion de pedido

    if(tBody.innerHTML.includes('<th scope="total">'))
        {pedido.innerText= "¡Pedido Enviado Correctamente!";
        swal({
            icon: 'success',
            title: '¡Pedido Enviado!'
            })}
    else if(pedido.innerText.includes("Pedido"))
    swal({
        icon: 'success',
        title: '¡Su pedido ya a sido enviado!'
        });
    else
    swal({
        icon: 'error',
        title: 'Tiene que completar todo el formulario primero'
        });
});

console.log(checkbox); 
for(i=0;i<checkbox.length;i++){ //Con un for le agrego a todos los elementos de "checkbox" un evento
    checkbox[i].addEventListener("click", (element)=>{ //Evento de los checkbox
        console.log(element.target.value);
        metodoDePago(element.target.value);
    });
}

mod.addEventListener("click",()=>{
    removerNodo('<th scope="pago">');
    removerNodo('<th scope="total">');
});
/**********************************Imprimir Pedido**********************************/
function imprimir(){
//Extraigo del local storage las 2 listas con productos y cantidades
let listaP=localStorage.getItem("carritoP").split(",");
let listaC=localStorage.getItem("carritoC").split(",");
for(i=0;i<listaP.length;i++) /*Con un For empiezo a sumar al total todos los productos
con sus cantidades para luego ir imprimiendolas al momento*/
{
    let producto = listaP[i];
    let cantidad = listaC[i];
    console.log(arrayProductos[producto-1].id);
    console.log(producto);
    console.log(cantidad);
    console.log(arrayProductos);
    crearNuevoNodo(`<tr><th scope="row">${arrayProductos[producto-1].id}</th><td>${arrayProductos[producto-1].modelo}</td><td>${cantidad}</td><td>${arrayProductos[producto-1].precio}</td><td>${(arrayProductos[producto-1].precio)*cantidad}</td></tr>`);
    total=total+(cantidad*arrayProductos[producto-1].precio);
}
console.log(total);
/*Una vez terminado el for muestro el sub-total que solo mostraria el total de todo el pedido
sin agregar envio, intereses y demas*/
crearNuevoNodo(`<tr class="table-dark"><th scope="subtotal"></th><td></td><td></td><td>Sub-Total:</td><td>${total}</td></tr>`);
}

fetch('/js/stock.json', {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}
    })
    .then((resp) => resp.json())
    .then(()=>imprimir());