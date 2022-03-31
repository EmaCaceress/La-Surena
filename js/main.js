let confirmacion = prompt("Bienvenido ¿desea comenzar a agregar productos al carrito?\n si/no").toLowerCase();
let continuidad=0, precio=0, opcion=0;
let total=0;
let cantidad= 0;

//Clase
class Productos{
    constructor(modelo, precio, stock){
        this.modelo=modelo;
        this.precio=parseInt(precio);
        this.stock=parseInt(stock);
    }

    modStock(c){
        this.stock= this.stock - c;
    }
}

//Array de objetos
const arrayProductos = [];
arrayProductos.push(new Productos ("ropero", 3500, 7)); 
arrayProductos.push(new Productos ("modular", 3000, 15));  
arrayProductos.push(new Productos ("perchero", 800, 30));


if(confirmacion=="si")
{
    function agregarAlCarro()
    {
            
            do{
                let close=0;
                let producto = parseInt(prompt("Elija entre los siguientes productos, segun el numero:\n1_ Ropero $3500\n2_ Modular $3000\n3_ Perchero $800"));
                
                //Corroboro el producto...
                if(producto != 1 && producto != 2 && producto != 3)
                {   
                    continuidad = confirm("Ustedes se equivoco elijiendo ¿desea reintentarlo?");
                    if(continuidad) continue;
                    else close++;
                }
                if(close==1) break;


                let cantidad=parseInt(prompt("Elijio "+arrayProductos[producto-1].modelo+" Ingrese la cantidad a solicitar:"));

                if (arrayProductos[producto-1].stock < cantidad || Number.isNaN(cantidad)){
                    continuidad = confirm("No tenemos suficiente stock en este momento\n¿Desea continuar elijiendo?");
                    precio=0;
                    cantidad=0;

                }
                else{
                    arrayProductos[producto-1].modStock(cantidad);
                    total=total+(cantidad*arrayProductos[producto-1].precio);
                    alert("¡Excelente sea agregado a su carrito exitosamente!");

                    continuidad = confirm("Usted elijio "+ arrayProductos[producto-1].modelo + " del cual pidio "+ cantidad +" lo que le da un total de "+total+"\n¿Desea continuar elijiendo?");
                }

            }while(continuidad)
    }

    function envio(total){
        console.log(total);
        confirmacion = confirm("¿Desea que se lo envien a domicilio?");
        let envio=0;
        if(confirmacion){
            domicilio=prompt("Ingrese su domicilio:");
            let km=Math.floor(Math.random()*(1000-1+1)+1);
            let envio= 25*km;
            total=total+envio;
            alert("Su domicilio esta a "+ km +"Km por lo que se le cobrara:\n$"+envio);
            confirmacion= confirm("¿Aceptar envio de todos modos?");
        }
        else alert("Usted no acepto el envio, por lo que, lo puede venir a retirar al local localizado en:\n Mitre y 24 Berazategui");
        return total;


    }

    function metodoDePago(total){
        let pago = parseInt(prompt("Seleccione el metodo de pago\n1.Tarjeta de credito\n2.Tarjeta de debito\n3.Efectivo"));
        switch(pago){
            case 1:
                opcion = confirm("Usted elijio pago con TARJETA DE CREDITO\nEste metodo de pago tiene un interes del 5%\n¿Proceder de todos modos?\n");
                if(opcion){ 
                    total = total + ((total*5)/100);
                    alert("El total a pagar es " + total);
                    verificacion(); 
                }    
                else metodoDePago();
                break;
    
            case 2:
                alert ("Usted elijio pagar con TARJETA DE DEBITO");
                verificacion();
                break;  
    
            case 3:
                alert("Usted elijio el metodo de pago EFECTIVO, el cual pagara en el momento de recibir el producto");
                break;
        }
    }

    function verificacion(){
        let num= 1;
        do{
            let numTarjeta = prompt("Ingrese los 16 digitos de su tarjeta");
            if (numTarjeta.length == 16){
                num++;
                alert ("¡Pago realizado con exito!");}
            else {
                alert("Su tarjeta es incorrecta\nIngrese nuevamente los digitos");
            }
        }while(num==1);
    }

}

agregarAlCarro();
metodoDePago(envio(total));


alert("¡Hasta luego!");

