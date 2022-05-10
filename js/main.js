/**********************************Variables**********************************/

// Variables normales
let confirmacion = 0;
let continuidad = 0,
  precio = 0,
  opcion = 0;
let total = 0;
let cantidad = 0;
let carrito = [];
let carroP = [];
let carroC = [];
let num = 1;

// Variables del DOM
let pedido = document.getElementById("pedido");
let start = document.getElementById("start");
let end = document.getElementById("end");
let dir = document.getElementById("agregarEnvio");
let checkbox = document.getElementsByClassName("checkbox");
let tarjeta = document.getElementById("tarjeta");
let calculo = document.getElementById("total");
let boton = document.getElementsByClassName("boton");
let cant = document.getElementsByClassName("cant");
let tBody = document.querySelector("tbody");
let mod=document.getElementById("modificar");

/**********************************Clases**********************************/

//Constructor
class Productos {
  constructor(id, modelo, precio, stock) {
    this.id = id;
    this.modelo = modelo;
    this.precio = parseInt(precio);
    this.stock = parseInt(stock);
  }

  modStock(c) {
    this.stock = this.stock - c;
  }
}

//Array de objetos
let arrayProductos = [];

fetch('/js/stock.json', {
  method: 'GET',
  headers:{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
  })
  .then((resp) => resp.json())
  .then((data) => data.map((obj) => arrayProductos.push(new Productos(obj.id, obj.modelo,obj.precio,obj.stock))))
  .then(()=> console.log(arrayProductos));

console.log(arrayProductos);

console.log("array:"+arrayProductos[0]);
console.log("cantidad de objetos:"+arrayProductos.length);

/**********************************Funciones de Entregas**********************************/
function envio() {
  //Funcion Creada para el evento de "dir"
  let envio = 0;
  domicilio = dir;
  let km = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
  envio = 15 * km;
  console.log(envio);
  return envio;
}

function metodoDePago(valor) {
  //Funcion para el evento "checkbox"

  /*Se evalua si ya hay un metodo de pago, en caso de haberlo muestra un mensaje de error
  en caso de no haberlo lo agrega*/
  if (tBody.innerHTML.includes('<th scope="pago">'))
    swal({
      icon: "error",
      title: "Ya agrego un metodo de pago",
    });
  else {
    switch (valor) {
      case "option1": //metodo con tarjeta de credito, suma un interes del 5% al sub-total
        if (verificacion() == 2) {
          //Verifica la tarjeta ingresada
          let aumento = (total * 5) / 100;
          total = total + aumento;
          nuevoValor = `<tr><th scope="pago"></th><td></td><td></td><td>Metodo de Pago:</td><td>Credito</td></tr>`;
          //valor += `<tr><th scope="row"></th><td></td><td></td><td>Interes:</td><td>${aumento}</td></tr>`;
        }
        break;
      case "option2": //metodo con tarjeta de debito, no tiene interes
        if (verificacion() == 2)
          //Verifica la tarjeta ingresada
          nuevoValor= `<tr class="table-warning"><th scope="pago"></th><td></td><td></td><td>Metodo de Pago:</td><td>Debito</td></tr>`;
        break;
      case "option3": //metodo de pago en efectivo
        nuevoValor=`<tr class="table-warning"><th scope="pago"></th><td></td><td></td><td>Metodo de Pago:</td><td>Efectivo</td></tr>`;
        Toastify({
          text: "¡Se agrego Metodo de pago!",
          duration: 2000,
          gravity: "bottom",
          position: "right",
          style: { background: "linear-gradient(to right, #00b09b, #96c92d)" },
        }).showToast();
        break;
    }
    crearNuevoNodo(nuevoValor);
  }
}
console.log(total);
function verificacion() {
  /*Funcion creada para la funcion de metodo de pago
  Esta funcion solo se va a utilizar cuando el usuario elija una opcion de pago con tarjeta*/
  let numTarjeta = tarjeta.value;
  if (numTarjeta.length == 16) {
    Toastify({
      text: "¡Se agrego su Tarjeta!",
      duration: 2000,
      gravity: "bottom",
      position: "right",
      style: { background: "linear-gradient(to right, #00b09b, #96c92d)" },
    }).showToast();
    return 2;
  } else
    swal({
      icon: "error",
      title: "Incorrecto",
      text: "Ingreso una tarjeta incorrecta",
    });
}

function crearNuevoNodo(valor){
  let newNodo=document.createElement("tr"); /* ! Crea una nueva fila para tabla de pedidos*/
  newNodo.innerHTML+= valor;
  tBody.appendChild(newNodo);
}

function removerNodo(valor){
  for (let child of tBody.childNodes){
    if(child.innerHTML !== undefined) child.innerHTML.includes(valor) && tBody.removeChild(child);
}
}

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