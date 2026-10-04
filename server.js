const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 499,
    description: "Comfortable cotton T-Shirt"
  },
  {
    id: 2,
    name: "Shoes",
    price: 1499,
    description: "Stylish running shoes"
  },
  {
    id: 3,
    name: "Watch",
    price: 999,
    description: "Modern digital watch"
  },
  {
    id: 4,
    name: "Backpack",
    price: 799,
    description: "Strong and spacious backpack"
  }
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    p => p.id == req.params.id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

app.post("/api/order", (req, res) => {
  const { items, customer } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      message: "Cart is empty"
    });
  }

  res.json({
    message: "Order placed successfully!",
    customer: customer,
    items: items
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
