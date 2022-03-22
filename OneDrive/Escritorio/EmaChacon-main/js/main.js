let confirmacion = prompt("Bienvenido ¿desea comenzar a agregar productos al carrito?\n si/no").toLowerCase();
let continuidad=0;
let total=0;
let cantidad= 0;

if(confirmacion=="si")
{
    do{
        let producto = prompt("Elija entre los siguientes productos:\n- Ropero $3500\n- Modular $3000\n- Perchero $800").toLowerCase();
        
        switch(producto){
        case "ropero":
            cantidad = prompt("Usted ingreso Ropero, ingrese la cantidad que queria:");
            
            total=total+(cantidad*3500);
            alert("Usted elijio "+ producto + " del cual pidio "+ cantidad +" lo que le da un total de "+total);
            continuidad = prompt("¿Desea continuar elijiendo?\n si/no").toLowerCase();
            break;
        case "modular":
            cantidad = prompt("Usted ingreso Modular, ingrese la cantidad que queria:");
            
            total=total+(cantidad*3000);
            alert("Usted elijio "+ producto + " del cual pidio "+ cantidad +" lo que le da un total de "+total);
            continuidad = prompt("¿Desea continuar elijiendo?\n si/no").toLowerCase();
            break;
        case "perchero":
            cantidad = prompt("Usted ingreso Perchero, ingrese la cantidad que queria:");
            
            total=total+(cantidad*800);
            alert("Usted elijio "+ producto + " del cual pidio "+ cantidad +" lo que le da un total de "+total);
            continuidad = prompt("¿Desea continuar elijiendo?\n si/no").toLowerCase();
            break;
        default:
            continuidad = prompt("Ustedes se equivoco elijiendo ¿desea reintentarlo?\n si/no").toLowerCase();
            break;
        }

    }while(continuidad != "no")
}

alert("¡Hasta luego!");