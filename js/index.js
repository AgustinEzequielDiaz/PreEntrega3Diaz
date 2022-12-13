const productos = [
    {
        id: 1,
        nombre: 'zapatillas',
        cantidad: 10,
        precio: 15000,
        imagen: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7b85bada2e2d4329bdd4aa3100c072a6_9366/Zapatillas_Energyfalcon_Negro_EE9843_01_standard.jpg'
    },
    {
        id: 2,
        nombre: 'remera',
        cantidad: 35,
        precio: 3000,
        imagen: 'https://media2.sistemacontinuo.com.ar/5289-thickbox_default/remera-hombre-sublimable.jpg'
    },  
    {
        id: 3,
        nombre: 'gorra',
        cantidad: 23,
        precio: 1500,
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_761431-MLA45982705537_052021-F.webp'
    },  
    {
        id: 4,
        nombre: 'buzo',
        cantidad: 70,
        precio: 6000,
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_951774-MLA32134905937_092019-F.webp'
    },  
    {
        id: 5,
        nombre: 'medias',
        cantidad: 7,
        precio: 2300,
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_953765-MLA52214876609_102022-W.webp'
    },
];

let carrito = [];



class Carrito {
    constructor(id, nombre, cantidad, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.imagen = imagen;
        this.total = precio * cantidad;
    }
}

const contenedor = document.getElementById('contenedor');
const inputSearch = document.getElementById('input-search');
const contenedorCarrito = document.getElementById('contenedor-carrito');


const agregarAlCarrito = (id) => {
    if (!id) { //valida que si el id esta vacio salga de la funcion
        return; 
    }

    const producto = productos.find(el => el.id === id);

    if (producto) { //valida que haya encontrado el producto que se agrego en la lista de productos
        const productoCarrito = new Carrito(producto.id, producto.nombre, 1, producto.precio, producto.imagen);

        if (carrito.some(el => el.id === id)) {
            const target = carrito.find(el => el.id === id);
            carrito = carrito.filter(el => el.id !== id);

            const nuevoProducto = new Carrito(target.id, target.nombre, target.cantidad + 1, target.precio, target.imagen);
            carrito.push(nuevoProducto)
        } else {
            carrito.push(productoCarrito);
        }

    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    listarCarrito(carrito)
}

const listarCarrito = (productosCarrito) => {
    let acumulador = '';

    productosCarrito.forEach((producto) => {
        acumulador += `
        <tr>
        <th scope="row">${producto.id}</th>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.total}</td>
        </tr>
        `
    })
    contenedorCarrito.innerHTML = acumulador;
}

const dibujarProductos = (productos, contenedor) => {
    let acumulador = '';

    productos.forEach(element => {
        acumulador += `
        <div class="card" style="width: 18rem;">
            <img src="${element.imagen}" class="card-img-top" alt="${element.nombre}.">
            <div class="card-body">
                <h5 class="card-title">${element.nombre}</h5>
                <p class="card-text">Cantidad: ${element.cantidad}</p>
                <p class="card-text">Precio: $${element.precio}</p>
                <a href="#" onclick="agregarAlCarrito(${element.id})" class="btn btn-primary">Comprar</a>
            </div>
        </div>
        `
    });
    contenedor.innerHTML = acumulador;
}

dibujarProductos(productos, contenedor);

const handleSearch = (e) => {
    console.log(e.target.value);

    const filtrados = productos.filter(producto => producto.nombre.toLocaleLowerCase().includes(e.target.value.toLowerCase()))

    dibujarProductos(filtrados, contenedor)
} 

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    listarCarrito(carrito)

}

inputSearch.addEventListener('input', handleSearch)