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
    let boton= document.getElementsByClassName("boton");
    let cant= document.getElementsByClassName("cant");

    for(i=0;i<boton.length;i++)
    {
        boton[i].addEventListener("click",(e)=>{
            console.log(e.target.name);
            let numBoton=e.target.name;
            carroC.push(cant[numBoton-1].value);
            console.log(carroC[i]);
            carroP.push(e.target.name);

            localStorage.setItem("carritoP",carroP);
            localStorage.setItem("carritoC",carroC);
            alert("¡Excelente se agrego a su carrito exitosamente!");
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
        alert("Ya Agrego un Domicilio");
        else{
        pedido.innerText= pedido.innerText + "Envio: $" + envio() + "\n";
        total=total+envio();}
    });

    function envio(){

        let envio=0;

        domicilio= dir;
        let km=Math.floor(Math.random()*(1000-1+1)+1);
        envio= 15*km;

        return envio;
    }

    //Va en Seccion Entregas
    console.log(checkbox);
    for(i=0;i<checkbox.length;i++){
        checkbox[i].addEventListener("click", (element)=>{
            console.log(element.target.value);
            metodoDePago(element.target.value);
        });
    }
    let num=1;
    function metodoDePago(valor){

        if(pedido.innerText.includes("pago"))
            alert("Ya Agrego un Metodo de Pago");
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
                    break;
            }
        }
    }

    function verificacion(){
            let numTarjeta = tarjeta.value;
            if (numTarjeta.length == 16){
                alert ("¡Pago realizado con exito!");
                return 2;}
            else {
                alert("Su tarjeta es incorrecta\nIngrese nuevamente los digitos y vuelva a seleccionar la opcion");
            }

    }
    
    //Calcular total
    calculo.addEventListener("click",()=>
    {
        if(pedido.innerText.includes("pago") && pedido.innerText.includes("Envio"))
            pedido.innerText= pedido.innerText + "TOTAL: "+total;
        else
            alert("Tiene que completar todo el formulario");
    }
    );

    //Va en Seccion Productos
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
    }

    end.addEventListener("click",()=>{

        if(pedido.innerText.includes("TOTAL"))
            pedido.innerText= "¡Pedido Enviado Correctamente!";
        else if(pedido.innerText.includes("Pedido"))
            alert("¡Ya fue enviado su pedido!");
        else
            alert("Tiene que realizar el calculo primero");
    });