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
let i=0;
// Variables del DOM
let pedido = document.getElementById("pedido");
let start = document.getElementById("start");
let end = document.getElementById("end");
let dir = document.getElementById("agregarEnvio");
let checkbox = document.getElementsByClassName("checkbox");
let tarjeta = document.getElementById("tarjeta");
let botonListo = document.getElementById("total");
let botonDeshacer = document.getElementById("botonDeshacer");
let boton = document.getElementsByClassName("boton");
let cant = document.getElementById("cantidad");
let tBody = document.querySelector("tbody");
// let mod=document.getElementById("modificar");
let botonesEli=document.getElementsByClassName("eliminar");
let secciones=document.querySelectorAll("section");

/**********************************Clases**********************************/

//Constructor
class Productos {
  constructor(id, modelo, precio, stock,description,image,section) {
    this.id = id;
    this.modelo = modelo;
    this.precio = parseInt(precio);
    this.stock = parseInt(stock);
    this.description = description;
    this.image = image;
    this.section = section;
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
  .then((data) => data.map((obj) => arrayProductos.push(new Productos(obj.id, obj.modelo,obj.precio,obj.stock,obj.description,obj.image,obj.section))))
  .then(()=>{
    if(prod==3)
    {      
      imprimirProductos();
    }
    else if(prod==4){
      imprimirProducto();
    }
    else{
      imprimir();
      eliminar();
    }
});




/**********************************Funciones de Entregas**********************************/
function envio(){
  //Funcion Creada para el evento de "dir"
  let envio = 0;
  domicilio = dir;
  let km = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
  envio = 15 * km;

  return envio;
}

function metodoDePago(valor){
  //Funcion para el evento "checkbox"

  /*Se evalua si ya hay un metodo de pago, en caso de haberlo muestra un mensaje de error,
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
        default:break;
    }
    crearNuevoNodo(nuevoValor);
  }
}

function verificacion(){
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

function eliminar(e){//funcion creada para extraer el boton al cual se le hizo target

  removerNodo(`<th name="${e.name}"`,e.name);
}

function crearNuevoNodo(valor,num){//crea un nuevo nodo hijo de tBody
  let crearEliminar=`<td id="box">
                      <button name="${num}" class="eliminar" onclick="eliminar(this)"><i class="fa fa-times"></i></button>
                     </td></tr>`;
  let newNodo=document.createElement("tr"); /* ! Crea una nueva fila para tabla de pedidos*/
  newNodo.innerHTML+= valor+crearEliminar;
  tBody.appendChild(newNodo);
}

function removerNodo(valor, num){//Remueve un nodo hijo de tBody dependendo al boton de eliminar que se clickeo
  for (let child of tBody.childNodes){
    if(child.innerHTML !== undefined) 
      if(child.innerHTML.includes(valor)){
        tBody.removeChild(child);//Eliminamos el nodo
        // ! Extraemos la lista del localStorage y eliminamos el indice correspondiente al boton
        let carrito=JSON.parse(bajar("carrito"));
        carrito.splice(num,1);
        // ! Volvemos a cargar la lista con el elemento borrado y refrescamos el pedido
        subir("carrito",JSON.stringify(carrito));
        imprimir(); // ? order's refresh
      }
  }
}

function decidirPedido(valor){/* Intercala entre dos botones, uno para poder eliminar nodos hijos
de tBody y otro para confirmar el pedido ademas de agregar la seccion de metodo de pago y envio*/
  botonListo.classList.toggle("noMostrar");
  botonDeshacer.classList.toggle("mostrar");
  secciones[2].classList.toggle("mostrar");
  if(valor=="aceptar"){
    for (let boton of botonesEli)
        boton.onclick = "";// ? Eliminamos el onclick asi no puede modificar mas la lista de pedidos
      }
  else imprimir();
}

const subir = (key, valor) =>localStorage.setItem(key,valor);
const bajar = (key) =>localStorage.getItem(key);
const totalFinal = (agregar) => totalFinal+agregar;

/*************************************Funcion de Productos ***********************************/
const arrayObjetos=[];
const upStorage=(e)=>{

  //En caso de que input de cantidad no devuelva un valor numerico, condicion valdra "false"
  let condicion=cant.value || false; //Operadores avanzados
  
  if(condicion && cant.value<=arrayProductos[e-1].stock){  /*Si condicion es true, entonces se guarda en local Storage la
  cantidad y el producto seleccionado, cada uno en dos listas distintas, pero con la misma
  posicion*/
      Toastify({
          text: "¡Se agrego a su carrito!",
          duration: 2000,
          gravity: 'bottom',
          position: 'right',
          style:{background: 'linear-gradient(to right, #00b09b, #96c92d)'}
          }).showToast();
      if(JSON.parse(bajar("carrito")!==null)){
        const arrayObjetosBajados=JSON.parse(bajar("carrito"));

        arrayObjetosBajados.map(e=>{
          arrayObjetos.push(e);
        });
      }

      const found = arrayObjetos.find(element => element.id == e);

      const ifDuplicated = (found, list) =>{
        list.forEach(element => {
            if(found.id === element.id){ // ! Es duplicado
                const resultado = parseInt(element.cantidad) + parseInt(cant.value);
                return element.cantidad=resultado;
              }
        });
      }

      if(found)
          ifDuplicated(found, arrayObjetos);
      else{
          arrayObjetos.push({id:e,cantidad:cant.value});
      }

      const btn1= document.getElementById("boton1");
      const btn2= document.getElementById("boton2");

      btn1.classList.toggle("noMostrar");
      btn2.classList.toggle("noMostrar");
      const arrayObjetosJson=JSON.stringify(arrayObjetos);
      subir("carrito",arrayObjetosJson);

}
  else //En caso de que condicion sea "false", se muestra un cartel de que no agrego una cantidad
      Toastify({
          text: "No agrego la cantidad al producto",
          duration: 2000,
          gravity: 'bottom',
          position: 'right',
          style:{background: 'linear-gradient(to right, #DA2505, #96c92d)'}
          }).showToast();
  
}
