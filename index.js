import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import ejsLayout from "express-ejs-layouts";
import path from "path";
import validationMiddleware from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastvisit.middleware.js";

const server = express();

// accessing public folder
server.use(express.static("public"));
server.use(cookieParser());
server.use(setLastVisit);
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// parse form data
server.use(express.urlencoded({ extended: true }));

// setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// using ejslayout
server.use(ejsLayout);

// create an instance of ProductController
const productController = new ProductController();
// create an instance of UserController
const userController = new UserController();

// gets
server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);
server.get("/", auth, productController.getProducts);
server.get("/new", auth, productController.getAddForm);
server.get("/update-product/:id", auth, productController.getUpdateProductView);
server.get("/logout", userController.logout);

// posts
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validationMiddleware,
  productController.addNewProduct
);
server.post("/register", userController.postRegister);
server.post("/login", userController.postLogin);

server.post("/delete-product/:id", auth, productController.deleteProduct);
server.post("/update-product", auth, productController.postUpdateProduct);

server.use(express.static("src/views"));

server.listen(3400);

console.log("Listening to 3400 !!");
