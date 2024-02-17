export default class ProductModel {
  constructor(_id, _name, _desc, _price, _imageUrL) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imageUrl = _imageUrL;
  }

  static get() {
    return products;
  }

  static update(productObj) {
    const index = products.findIndex((p) => p.id == productObj.id);
    products[index] = productObj;
  }

  static delete(id) {
    const index = products.findIndex((p) => p.id == id);
    products.splice(index, 1);
  }

  static add(name, desc, price, imageUrl) {
    let newProduct = new ProductModel(
      products.length + 1,
      name,
      desc,
      price,
      imageUrl
    );
    products.push(newProduct);
  }

  static getById(id) {
    return products.find((p) => p.id == id);
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://visme.co/blog/wp-content/uploads/2021/06/sophie-kinsella-the-undomestic-goddess-book-cover-example.jpeg"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://template.canva.com/EADaopxBna4/1/0/251w-ujD6UPGa9hw.jpg"
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/teal-and-orange-fantasy-book-cover-design-template-056106feb952bdfb7bfd16b4f9325c11.jpg?ts=1698543827"
  ),
];
