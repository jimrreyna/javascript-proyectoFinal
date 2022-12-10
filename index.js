// const productos = []
// class Producto {
//     constructor(id, nombre, price, image, category) {
//       this.id = id;
//       this.nombre = nombre;
//       this.price = price;
//       this.image = image;
//       this.category = category;
//     }
//   }

//   productos.push (new Producto(1, "Mainboard", 300, "./img/mainboard.jpg","Mainboard"));
//   productos.push (new Producto(2, "Procesador i3", 150, "./img/corei3.jpg","Precesador"));
//   productos.push (new Producto(3, "Procesador i5", 250, "./img/corei5.jpg","Procesador"));
//   productos.push (new Producto(4, "Procesador i7", 300, "./img/corei7.jpg","Procesador"));
//   productos.push (new Producto(5, "Monitor Lg 19", 200, "./img/monitor19.jpg","Monitores"));
//   productos.push (new Producto(6, "Monitor Lg 22", 300, "./img/monitor22.jpg","Monitores"));
//   productos.push (new Producto(7, "Memoria DDR4 8GB", 30, "./img/memoria8.jpg","Memorias"));
//   productos.push (new Producto(8,"Memoria DDR4 16GB",90,"./img/memoria16.jpg","Memorias"));
//   productos.push (new Producto(9,"Case Gamer Hallion",80,"./img/casegamer.jpg","Case"));
//   productos.push (new Producto(10,"Disco SSD 480GB",100,"./img/disco480.jpg","Discos"));
//   console.log(JSON.stringify(productos))

const divcards = document.querySelector(".cards");
const lista = document.querySelector("#lista");
const botonFiltrar = document.querySelector("#filtrar");


const mostrarCategorias = async () => {
  const categoriasFetch = await fetch(
    'categorias.json'
  );
  const categoriasJson = await categoriasFetch.json();
  // console.log(categoriasJson);
  categoriasJson.forEach((cat) => {
    const option = document.createElement("option");
    option.innerText = `${cat}`;
    lista.append(option);
  });
};

const buscarTodosProductos = async () => {
  const productosFetch = await fetch('productos.json');
  const productosJson = await productosFetch.json();
  //console.log(productosJson);
  productosJson.forEach((prod) => {
    const { category, id, description, image, price, title } = prod;
    divcards.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5>${title}</h5>
    <p class="card-text">${description}</p>
    <p>S/.${price}</p>
    <button id=${id} class="btn btn-primary">AGREGAR</button>
  </div>
</div>
    `;
  });
};

const buscarProductosPorCategoria = async () => {
  divcards.innerHTML = "";
  const categoriaElegida = lista.value;
  const productosFetch = await fetch(
    'productos.json'
  );
  const productosJson = await productosFetch.json();
  // console.log(productosJson)
  const productosFiltrados = productosJson.filter(prod=>prod.category===categoriaElegida)
  productosFiltrados.forEach((prod) => {
    const { category, id, description, image, price, title } = prod;
    divcards.innerHTML += `
        <div class="card" style="width: 18rem;">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5>${title}</h5>
        <p class="card-text">${description}</p>
        <p>S/.${price}</p>
        <button id=${id} class="btn btn-primary">AGREGAR</button>
      </div>
    </div>
        `;
  });
};

buscarTodosProductos();
mostrarCategorias();
botonFiltrar.onclick = buscarProductosPorCategoria;
