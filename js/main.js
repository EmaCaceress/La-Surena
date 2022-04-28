let confirmacion = 0;
let continuidad=0, precio=0, opcion=0;
let total=0;
let cantidad= 0
let carrito=[];
let carroP=[];
let carroC=[];

let pedido= document.getElementById("pedido");
let start= document.getElementById("start");
let end= document.getElementById("end");
let dir= document.getElementById("agregarEnvio");
let checkbox = document.getElementsByClassName("checkbox");
let tarjeta= document.getElementById("tarjeta");
let calculo= document.getElementById("total");
/*
start.addEventListener("click",()=>{
    pedido.innerText= "";
    agregarAlCarro();
    let final=metodoDePago(envio(total))
    pedido.innerText= pedido.innerText + "TOTAL: "+ final;
});
*/
calculo.addEventListener("click",()=>
{
    if(pedido.innerText.includes("TOTAL"))
        Toastify({
            text: "¡Ya tiene el calculo realizado!",
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
            }).showToast();
    else if(pedido.innerText.includes("pago") && pedido.innerText.includes("Envio"))
    {
        Toastify({
            text: "¡Se agrego el calculo!",
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
            }).showToast();
        pedido.innerText= pedido.innerText + "TOTAL: "+total;}
    else
    swal({
        icon: 'error',
        title: 'Incorrecto',
        text: 'Tiene que completar todo el formulario',
        });
});
//Clase
class Productos{
    constructor(id,modelo, precio, stock){
        this.id=id;
        this.modelo=modelo;
        this.precio=parseInt(precio);
        this.stock=parseInt(stock);
    }

    modStock(c){
        this.stock= this.stock - c;
    }
}

//Array de objetos
let arrayProductos = [];
arrayProductos.push(new Productos ("1","ropero", 3500, 7)); 
arrayProductos.push(new Productos ("2","modular", 3000, 15));  
arrayProductos.push(new Productos ("3","perchero", 800, 30));
console.log(arrayProductos.length);

    //Agregar al Carrito
    const boton= document.getElementsByClassName("boton");
    let cant= document.getElementsByClassName("cant");

    for(i=0;i<boton.length;i++)
    {
        boton[i].addEventListener("click",(e)=>{
            
            numBoton=e.target.name;
            let condicion=cant[numBoton-1].value || false; //Operadores avanzados


            if(condicion){
                Toastify({
                    text: "¡Se agrego a su carrito!",
                    duration: 2000,
                    gravity: 'bottom',
                    position: 'right',
                    style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
                    }).showToast();
                console.log(e.target.name);

                carroC.push(cant[numBoton-1].value);
                console.log(carroC[i]);
                carroP.push(e.target.name);

                localStorage.setItem("carritoP",carroP);
                localStorage.setItem("carritoC",carroC);}

            else{
                Toastify({
                    text: "No agrego la cantidad al producto",
                    duration: 2000,
                    gravity: 'bottom',
                    position: 'right',
                    style:{background: 'linear-gradient(to right, #DA2505, #96c92d)'}
                    }).showToast();
            }
        });
    }

    //imprimir en Entregas el carrito
    let listaP=localStorage.getItem("carritoP").split(",");
    let listaC=localStorage.getItem("carritoC").split(",");
            for(i=0;i<listaP.length;i++)
            {
                let producto = listaP[i];
                let cantidad = listaC[i];
                console.log(producto);
                console.log(cantidad);
                total=total+(cantidad*arrayProductos[producto-1].precio);
                pedido.innerText= pedido.innerText + "Producto: " + arrayProductos[producto-1].modelo+" | Cantidad: "+cantidad+"\n";
            }
            pedido.innerText= pedido.innerText + "Sub-Total: $" + total+ "\n";




    //Va en Seccion Entregas

    dir.addEventListener("click", ()=>{

        if(pedido.innerText.includes("Envio"))
        swal({
            icon: 'error',
            title: 'Ya agrego un domicilio'
            })
        else{
        pedido.innerText= pedido.innerText + "Envio: $" + envio() + "\n";
        total=total+envio();
        Toastify({
            text: "¡Se agrego su domicilio!",
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
            }).showToast();
    }
    });

    function envio(){

        let envio=0;

        domicilio= dir;
        let km=Math.floor(Math.random()*(1000-1+1)+1);
        envio= 15*km;

        return envio;
        
    }

    end.addEventListener("click",()=>{

        if(pedido.innerText.includes("TOTAL"))
            {pedido.innerText= "¡Pedido Enviado Correctamente!";
            swal({
                icon: 'success',
                title: '¡Pedido Enviado!'
                })}
        else if(pedido.innerText.includes("Pedido"))
        swal({
            icon: 'success',
            title: '¡Su pedido ya a sido enviado!'
            })
        else
        swal({
            icon: 'error',
            title: 'Tiene que completar todo el formulario primero'
            })
    });
    //Va en Seccion Entregas
    console.log(checkbox);
    for(i=0;i<checkbox.length;i++){
        checkbox[i].addEventListener("click", (element)=>{
            console.log(element.target.value);
            metodoDePago(element.target.value);
        });
    }
    let num=1;
    mod.addEventListener("click", ()=>{
        pedido.innerText= pedido.innerText + "Metodo de pago: Tarjeta de Credito\n" + "Aumento del 5%: " + (total*5)/100+"\n";
    });

    function metodoDePago(valor){

        if(pedido.innerText.includes("pago"))
        swal({
            icon: 'error',
            title: 'Ya agrego un metodo de pago'
            });
        else{
            let pago = valor;

            switch(pago){
                case "option1":
                    if(verificacion()==2){
                    total = total + ((total*5)/100);
                    pedido.innerText= pedido.innerText + "Metodo de pago: Tarjeta de Credito\n" + "Aumento del 5%: " + (total*5)/100+"\n";
                    }
                    break;
                case "option2":
                    if(verificacion()==2)
                    pedido.innerText= pedido.innerText + "Metodo de pago: Tarjeta de Debito"+"\n";
                    
                    break;  
                case "option3":
                    pedido.innerText= pedido.innerText + "Usted elijio el metodo de pago EFECTIVO, el cual pagara en el momento de recibir el producto"+"\n";
                        Toastify({
                            text: "¡Se agrego Metodo de pago!",
                            duration: 2000,
                            gravity: 'bottom',
                            position: 'right',
                            style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
                            }).showToast();

                    break;
            }
        }
    }

    function verificacion(){
            let numTarjeta = tarjeta.value;
            if (numTarjeta.length == 16){
                Toastify({
                    text: "¡Se agrego su Tarjeta!",
                    duration: 2000,
                    gravity: 'bottom',
                    position: 'right',
                    style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
                    }).showToast();
                return 2;}
            else {
                swal({
                    icon: 'error',
                    title: 'Incorrecto',
                    text: 'Ingreso una tarjeta incorrecta',
                    })
            }

    }
    
    //Calcular total


 /*   //Va en Seccion Productos
    function limiteDeCompra(){
        let productoAlcanzado = [];
        montoMax = prompt("Ingrese el monto por el cual pagaria cada producto:");
        productoAlcanzado = arrayProductos.filter((el) => el.precio<=montoMax);

        let texto = '';
        let i=0;
        while(i<productoAlcanzado.length){
            texto = texto.concat(productoAlcanzado[i].id,'. ', productoAlcanzado[i].modelo, '\n');
            i++;
        }
        return producto1=parseInt(prompt("Su presupuesto es de " + montoMax + ", le alcanza para comprar " + (productoAlcanzado.length)+" productos:\n"+texto+"Selecciones por ID"));
    }*/

