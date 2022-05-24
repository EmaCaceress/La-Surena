/**********************************Eventos de Productos**********************************/

for(i=0;i<boton.length;i++) /*Utilizo un for para la seccion de productos,
asi puedo agregarle el evento a cada boton y poder targearlos cuando se les haga click*/
{
    boton[i].addEventListener("click",(e)=>{
        
        //En caso de que input de cantidad no devuelva un valor numerico, condicion valdra "false"
        numBoton=e.target.name;
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

            carroP.push(e.target.name);
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
            });
}
