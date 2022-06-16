class productos {
    constructor(id,nombre,producto,precio){
        this.id = id
        this.nombre = nombre
        this.producto = producto
        this.precio = precio
    }
}

const producto1 = new productos(1,"Agua", "Bebida", 60)
const producto2 = new productos(2,"CocaCola", "Bebida", 130)
const producto3 = new productos(3,"Pepsi", "Bebida", 130)
const producto4 = new productos(4,"7up", "Bebida", 120)
const producto5 = new productos(5,"Mirinda", "Bebida", 110)
const producto6 = new productos(6,"Speed", "Bebida", 150) 
const producto7 = new productos(7,"Gomitas", "Golosina", 60)
const producto8 = new productos(8,"Caramelos", "Golosina", 60)
const producto9 = new productos(9,"Alfajor Jorgito", "Golosina", 100)
const producto10 = new productos(10,"Chupetin", "Golosina", 40)
const producto11 = new productos(11,"Chicle", "Golosina", 60) 
const producto12 = new productos(12,"Papas Lays", "Snacks", 100)
const producto13 = new productos(13,"Doritos", "Snacks", 120)
const producto14 = new productos(14,"3D", "Snacks", 100)
const producto15 = new productos(15,"Cheetos", "Snacks", 110)
const producto16 = new productos(16,"Pringles", "Snacks", 400)
const producto17 = new productos(17,"Twistos", "Snacks", 130)
const producto18 = new productos(18,"Saladix", "Snacks", 160)
const producto19 = new productos(19,"Rex", "Snacks", 120)
const producto20 = new productos(20,"Kinder", "Golosina", 190)
const producto21 = new productos(21,"Alfajor Guaymallen", "Golosina", 50)
const producto22 = new productos(22,"Menthoplus", "Golosina", 70)
const producto23 = new productos(23,"Halls", "Golosina", 70)
const producto24 = new productos(24,"Monster", "Bebida", 250)
const producto25 = new productos(25,"Baggio", "Bebida", 160)

let productosArray = [producto1, producto2, producto3, producto4, producto5, 
    producto6, producto7, producto8, producto9, producto10, producto11, 
    producto12, producto13, producto14, producto15, producto16, producto17,
    producto18, producto19,producto20,producto21, producto22, producto23, 
    producto24, producto25]

let divProductos = document.getElementById('divProductos')
let contenedorTabla = document.getElementById('tablaCarrito')
const totalCarrito = document.getElementById('totalCarrito')
const formulario = document.getElementById('formulario')
const botonBuscador = document.getElementById('botonBuscador')

let dataProductos
document.addEventListener('DOMContentLoaded', () => {
    traerJson()
    mostrarCarrito()
    mostrarTotalCarrito()
    console.log('DOM fully loaded and parsed');
});

const traerJson = async() => {
    let response = await fetch("js/productos.json")
    let data = await response.json()
    dataProductos = data
    mostrarProductos(dataProductos)
}

function mostrarProductos(productosArray){
    productosArray.forEach(producto =>{
        divProductos.innerHTML += `
            <div class="card divProductos" id="Producto${producto.id}" style="width: 18rem;">
                <img src="/img/producto${producto.id}.jpg" class="card-img-top" alt="...">
                <div class="card-body" >
                    <p>Nombre: ${producto.nombre}</p>
                    <p>Tipo de producto: ${producto.producto}</p>
                    <p>Precio: ${producto.precio}</p>
                    <div class="botones">
                        <button id="boton${producto.id}" onclick="agregar(${producto.id})" class="btn btn-success btn1">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `
    })
}

function mostrarCarrito(){
    let carrito = capturarStorange()
    contenedorTabla.innerHTML = ""
    carrito.forEach(element =>{
        contenedorTabla.innerHTML += `
        <tr>
            <td data-th="Product">
                <div class="row">
                    <div class="col-sm-2 hidden-xs"><img src="/img/producto${element.id}.jpg" width=64px alt="..."/></div>
                        <div class="col-sm-10">
                            <h4 class="nomargin">${element.producto} ${element.nombre}</h4>
                        </div>
                    </div>
                </div>
            </td>
            <td data-th="Precio">${element.precio}</td>
            <td data-th="Cantidad">
                <button onclick="restarCantidad(${element.id})" class="btn"> - </button>
                ${element.cantidad}
                <button onclick="incrementarCantidad(${element.id})" class="btn"> + </button>
            </td>
            <td data-th="Subtotal" id="botonEliminarCompra" class="text-center">${element.precio * element.cantidad}</td>
            <td><button onclick="eliminarProductoCarrito(${element.id})" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i>x</button></td>
        </tr>
        `
    })
}

botonCompra.addEventListener('click', () => {
    if (estaVacio()) {
        Swal.fire({
            icon: 'error',
            title: 'El carrito esta vacío',
            text: 'Agrega al menos un producto para realizar una Compra',
        }) 
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Compra realizada con éxito',
            confirmButtonText: 'Aceptar',
        })
        localStorage.clear()
        mostrarCarrito()
        mostrarTotalCarrito()
    }
})

function estaVacio() {
    if (capturarStorange() == "") {
        return true
    } else {
        return false
    }
}

//-------------------- STORANGES --------------------
function capturarStorange(){
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function guardarStorange(array){
    localStorage.setItem("carrito", JSON.stringify(array))
}

//----------------------------------------------------
function agregar(idd){ //funcion agregar al carrito, si esta suma cantidad sino la agrega.
    let carrito = capturarStorange()
    if (estaEnCarrito(idd)){
        incrementarCantidadProductos(idd)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se agrego al carrito de compras',
            showConfirmButton: false,
            timer: 400
          })
    }else{
        let productoEcontrado = productosArray.find(e=>e.id==idd)
        carrito.push({...productoEcontrado, cantidad:1})
        guardarStorange(carrito)
        mostrarCarrito()
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se agrego al carrito de compras',
            showConfirmButton: false,
            timer: 400
          })
    }
    mostrarCarrito()
    console.log(carrito)
    mostrarTotalCarrito()
}

function incrementarCantidadProductos(id){ //incrementa los productos del carrito.
    let carrito = capturarStorange()
    const indice = carrito.findIndex(e=>e.id === id)
    carrito[indice].cantidad++
    guardarStorange(carrito)
    mostrarCarrito(carrito)
    
}

function estaEnCarrito(id){
    let carrito = capturarStorange()
    return carrito.some(e=>e.id==id)
}

function eliminarProductoCarrito(id) {
    let carrito = capturarStorange()
    let resultado = carrito.filter(producto => producto.id != id)
    guardarStorange(resultado)
    console.log(resultado)
    mostrarCarrito()
    mostrarTotalCarrito()
}

function mostrarTotalCarrito() {
    const carrito = capturarStorange();
    const total = carrito.reduce(
      (acc, element) => acc + element.cantidad * element.precio,0
    );
    totalCarrito.innerHTML = total;
}

function incrementarCantidad(id) { //incrementa el numero que se muestra por el html, para saber cuantos productos hay del mismo.
    const carrito = capturarStorange();
    const indice = carrito.findIndex((e) => e.id === id);
    carrito[indice].cantidad++    
    guardarStorange(carrito)
    mostrarCarrito()
    mostrarTotalCarrito()
}

function restarCantidad(id) { //resta el numero que se muestra por el html, para saber cuantos productos hay del mismo.
    let carrito = capturarStorange();
    const indice = carrito.findIndex((e) => e.id === id);
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--
        guardarStorange(carrito)
        mostrarCarrito()
        mostrarTotalCarrito()
        
    } else { //si queda uno y resto lo elimina.
        Swal.fire({
            title: 'Estas seguro?',
            text: `desea eliminar ${carrito[indice].nombre} del carrito de compras`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    eliminarProductoCarrito(id),
                    'Eliminado!')
            }
        })
    }
}

function buscador(productosArray){
    const filtrar = ()=>{
        const texto = formulario.value.toLowerCase();
        let encontro = false
        divProductos.innerHTML=""
        for(let producto of productosArray){
            let nombre = producto.nombre.toLowerCase()
            if(nombre.indexOf(texto) !== -1){
                encontro = true
                divProductos.innerHTML += `
                <div class="card divProductos" id="Producto${producto.id}" style="width: 18rem;">
                    <img src="/img/producto${producto.id}.jpg" class="card-img-top" alt="...">
                    <div class="card-body" >
                        <p>Nombre: ${producto.nombre}</p>
                        <p>Tipo de producto: ${producto.producto}</p>
                        <p>Precio: ${producto.precio}</p>
                        <div class="botones">
                            <button id="boton${producto.id}" onclick="agregar(${producto.id})" class="btn btn-primary btn1">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
                `
            }
        }
        if (encontro == false){
            divProductos.innerHTML=""
            divProductos.innerHTML="<p>Producto no encontrado</p>"
        }
    }
    botonBuscador.addEventListener('click', filtrar) 
}

mostrarProductos(productosArray)
mostrarCarrito()
mostrarTotalCarrito()
buscador(productosArray)