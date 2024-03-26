const fs = require('fs');

class ProductManager {
  static id = 1;
  constructor(path) {
    this.path = path;
    this.productos = fs.existsSync(this.path)
      ? JSON.parse(fs.readFileSync(this.path))
      : [];
    if (this.productos.length > 0) {
      ProductManager.id = Math.max(...this.productos.map(p => p.id)) + 1;
    }
  }
  addProduct(producto) {
    try {
      if (
        !producto.title ||
        !producto.description ||
        !producto.price ||
        !producto.thumbnail ||
        !producto.code ||
        !producto.stock
      ) { 
        console.error(
          'El producto debe tener todos los atributos'
        );
      }
      const nuevoProducto = { id:ProductManager.id++, ...producto };
      this.productos.push(nuevoProducto);
      fs.writeFileSync(this.path, JSON.stringify(this.productos));
    } catch (err) {
      console.error('Error al agregar el producto');
    }
  }
  getProducts() {
    try {
      return this.productos;
    } catch (error) {
      console.error('Error al obtener la lista');
    }
  }
  getProductById(id) {
    const productos = this.getProducts();
    const producto = productos.find(producto => producto.id === id);
    if (!producto) {
      console.error('No existe el producto');
    }
    return producto;
  }
  updateProduct(productId, updatedProduct) {
    const index = this.productos.findIndex(p => p.id === productId);
    if (index !== -1) {
        this.productos[index] = { ...updatedProduct, id: productId };
        try {
          fs.writeFileSync(this.path, JSON.stringify(this.productos, null, 2));
          console.log('Productos guardados.');
        } catch (err) {
          console.error('Error en el guardado del archivo:');
        }
        console.log('Producto actualizado!');
    } else {
        console.error("Producto no encontrado.");
    }
  }
  deleteProduct(productId) {
    const index = this.productos.findIndex(p => p.id === productId);
    if (index !== -1) {
        this.productos.splice(index, 1);
        console.log('Producto eliminado');
    } else {
        console.error("Producto no encontrado");
    }
  }
}

// const prod1 = new ProductManager();

// console.log(prod1.getProducts());

// prod1.addProduct({
//   title: 'Producto 1',
//   description: 'Descripción del producto 1',
//   price: 10.99,
//   thumbnail: 'sin imagen',
//   code: 'PROD001',
//   stock: 100,
// });

// prod1.addProduct({
//   title: 'Producto 2',
//   description: 'Descripción del producto 2',
//   price: 10.90,
//   code: 'PROD002',
//   stock: 110,
// });

// console.log(prod1.getProducts());

// console.log(prod1.getProductById(2));

// const nuevo = {
//   title: 'Producto 2',
//   description: 'Descripción del producto 2',
//   price: 10.90,
//   thumbnail: 'sin imagen deaaa',
//   code: 'PROD002',
//   stock: 3000,
// }

// console.log(prod1.updateProduct(2,nuevo))

// console.log(prod1.getProducts());

// console.log(prod1.deleteProduct(1));

// console.log(prod1.getProducts());



