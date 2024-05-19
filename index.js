const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/product.modal.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.get("/", (req, res) => {
  res.send("hello node api ");
});
app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find();
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// product update by id
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("First console", id, req.body);

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("Second console", product);
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "product not found" });
  }
});

// delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: "product Not Found" });
    }
    res.status(200).json({ message: "product delete successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
mongoose
  .connect(
    "mongodb+srv://arvindmandre2:INv695GqpeGTkNOs@sampleapi.dlqw7ot.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=SampleApi"
  )
  .then(() => {
    console.log("connection Successfull");
    app.listen(3000, () => {
      console.log("server on 3000");
    });
  })

  .catch(() => {
    console.log("connection error");
  });
