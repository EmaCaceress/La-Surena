/**********************************Eventos de Entregas**********************************/
// calculo.addEventListener("click",()=>{ //Evento del boton de calculo
//     if(tBody.innerHTML.includes('<th scope="total">')) 
//         Toastify({
//             text: "¡Ya tiene el calculo realizado!",
//             duration: 2000,
//             gravity: 'bottom',
//             position: 'right',
//             style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
//             }).showToast();
//     else if(tBody.innerHTML.includes('<th scope="pago">') && tBody.innerHTML.includes('<th scope="Envio">'))
//     {
//         Toastify({
//             text: "¡Se agrego el calculo!",
//             duration: 2000,
//             gravity: 'bottom',
//             position: 'right',
//             style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
//             }).showToast();
//             crearNuevoNodo(`<tr class="table-warning"><th scope="total"></th><td></td><td></td><td>Total:</td><td>${total}</td></tr>`);
//     }else
//     swal({
//         icon: 'error',
//         title: 'Incorrecto',
//         text: 'Tiene que completar todo el formulario',
//         });
// });
const prod=1;
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
        {
        swal({
            icon: 'success',
            title: '¡Su pedido ya a sido enviado!'
            })}
    else if(tBody.innerHTML.includes('<th scope="pago">') && tBody.innerHTML.includes('<th scope="Envio">'))
    {
        swal({
        icon: 'success', 
        title: '¡Pedido enviado con exito!'
        });
        crearNuevoNodo(`<tr class="table-warning"><th scope="total"></th><td></td><td></td><td>Total:</td><td>alguno</td></tr>`);
    }
    else
    swal({
        icon: 'error',
        title: 'Tiene que completar todo el formulario primero'
        });
});

for(i=0;i<checkbox.length;i++){ //Con un for le agrego a todos los elementos de "checkbox" un evento
    checkbox[i].addEventListener("click", (element)=>{ //Evento de los checkbox

        metodoDePago(element.target.value);
    });
}

// mod.addEventListener("click",()=>{
//     removerNodo('<th scope="pago">');
//     removerNodo('<th scope="total">');
// });
/**********************************Imprimir Pedido**********************************/
function imprimir(){
    tBody.innerHTML="";
    total=0;
    i=0;
    //Extraigo del local storage las 2 listas con productos y cantidades
    let carrito=JSON.parse(bajar("carrito"));

    carrito.map(elemento=>{
        crearNuevoNodo(`<tr><th name="${i}" scope="row">${elemento.id}</th><td>${arrayProductos[elemento.id-1].modelo}</td><td>${elemento.cantidad}</td><td>${arrayProductos[elemento.id-1].precio}</td><td>${(arrayProductos[elemento.id-1].precio)*elemento.cantidad}</td>`,i);
        total=total+(elemento.cantidad*arrayProductos[elemento.id-1].precio);
        i++;
    }) 

    /*Una vez terminado el for muestro el sub-total que solo mostraria el total de todo el pedido
    sin agregar envio, intereses y demas*/
    crearNuevoNodo(`<tr class="table-dark"><th scope="subtotal"></th><td></td><td></td><td>Sub-Total:</td><td>${total}</td></tr>`);
}