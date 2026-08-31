// BÚSQUEDAS 
// Ejercicio 1: Ingredientes por debajo del punto de pedido
db.ingredientes.find({
  $expr: { $lt: ["$cantidadDisponible", "$puntoPedido"] }
});

// Ejercicio 2: Órdenes de compra "pendiente" o "enviada" 
db.ordenesCompra.aggregate([
  { $match: { estado: { $in: ["pendiente", "enviada"] } } },
  {
    $lookup: {
      from: "proveedores",
      localField: "proveedor_id",
      foreignField: "_id",
      as: "proveedor"
    }
  },
  { $unwind: "$proveedor" },
  {
    $project: {
      _id: 1,
      estado: 1,
      total: 1,
      "nombreProveedor": "$proveedor.nombre"
    }
  }
]);

// Ejercicio 3: Platos con Espinaca Fresca
var ing = db.ingredientes.findOne({ nombre: "Espinaca Fresca" });
db.platos.find({
  "ingredientes.ingrediente_id": ing._id
});

// Ejercicio 4: Proveedor con más ingredientes en órdenes recibidas
db.ordenesCompra.aggregate([
  { $match: { estado: "recibida" } },
  { $unwind: "$items" },
  {
    $group: {
      _id: "$proveedor_id",
      totalCantidadSuministrada: { $sum: "$items.cantidad" }
    }
  },
  { $sort: { totalCantidadSuministrada: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "proveedores",
      localField: "_id",
      foreignField: "_id",
      as: "proveedor"
    }
  },
  { $unwind: "$proveedor" },
  {
    $project: {
      _id: 0,
      proveedor_id: "$_id",
      nombreProveedor: "$proveedor.nombre",
      totalCantidadSuministrada: 1
    }
  }
]);

// Ejercicio 5: Margen de ganancia ordenado de mayor a menor
db.platos.aggregate([
  { $match: { activo: true } },
  {
    $project: {
      nombre: 1,
      precioVenta: 1,
      costoProduccion: 1,
      margenGanancia: { $subtract: ["$precioVenta", "$costoProduccion"] }
    }
  },
  { $sort: { margenGanancia: -1 } }
]);

// CURSORES


// Ejercicio 1: Recorrer ingredientes
var cursor1 = db.ingredientes.find();
cursor1.forEach(doc => {
  print("Ingrediente: " + doc.nombre + " | Cantidad disponible: " + doc.cantidadDisponible);
});

// Ejercicio 2: Órdenes con Total > $5000
var cursor2 = db.ordenesCompra.find({ total: { $gt: 5000 } });
cursor2.forEach(doc => {
  print("Proveedor ID: " + doc.proveedor_id + " | Total: $" + doc.total);
});

// Ejercicio 3: Platos con costo > $500
var cursor3 = db.platos.find({ costoProduccion: { $gt: 500 } });
cursor3.forEach(doc => {
  print("Plato: " + doc.nombre + " | Costo: $" + doc.costoProduccion);
});

// Ejercicio 4: Sumar 5 unidades a ingredientes críticos
var cursor4 = db.ingredientes.find({
  $expr: { $lt: ["$cantidadDisponible", "$puntoPedido"] }
});
cursor4.forEach(doc => {
  db.ingredientes.updateOne(
    { _id: doc._id },
    { $inc: { cantidadDisponible: 5 } }
  );
  print("Se sumaron 5 unidades a: " + doc.nombre);
});

// Ejercicio 5: Platos inactivos
var cursor5 = db.platos.find({ activo: false });
cursor5.forEach(doc => {
  print("Plato fuera de menú: " + doc.nombre);
});

// CRUD

// Ejercicio 1: Crear y leer ingredientes
var proveedorHortalizas = db.proveedores.findOne({ nombre: "Hortalizas Verdes S.A." });

db.ingredientes.insertOne({
  nombre: "Limón",
  unidad: "kg",
  cantidadDisponible: 15,
  puntoPedido: 5,
  proveedor_id: proveedorHortalizas._id
});

// Leer todos los ingredientes de ese proveedor específico
db.ingredientes.find({ proveedor_id: proveedorHortalizas._id });

// Ejercicio 2: Actualizar el estado de una orden de compra
// Se toma la orden "pendiente" existente (a1b2c3d4e5f6070809040004) y se marca como recibida hoy.
db.ordenesCompra.updateOne(
  { _id: ObjectId("a1b2c3d4e5f6070809040004") },
  {
    $set: {
      estado: "recibida",
      fechaEntrega: new Date()
    }
  }
);

// Verificamos el resultado
db.ordenesCompra.findOne({ _id: ObjectId("a1b2c3d4e5f6070809040004") });


// Ejercicio 3: Eliminar un plato inactivo y sus referencias
// Nota: en este esquema ningún otro documento referencia el _id de un plato
// (ordenesCompra e ingredientes son referenciados POR platos, no al revés),
// así que no hay referencias externas que limpiar además del documento mismo.
db.platos.deleteOne({ nombre: "Sopa de Champiñones", activo: false });


// Ejercicio 4: Crear una nueva orden de compra y leer órdenes de un proveedor
var proveedorGaucho = db.proveedores.findOne({ nombre: "Carnicería El Gaucho" });
var salmon = db.ingredientes.findOne({ nombre: "Filete de Salmón" });

db.ordenesCompra.insertOne({
  proveedor_id: proveedorGaucho._id,
  items: [
    { ingrediente_id: salmon._id, cantidad: 10 }
  ],
  fechaPedido: new Date(),
  fechaEntrega: null,
  estado: "pendiente",
  total: 30000.00
});

// Leer todas las órdenes de ese proveedor (la vieja + la recién creada)
db.ordenesCompra.find({ proveedor_id: proveedorGaucho._id });


// Ejercicio 5: Actualizar el precio de venta de los platos y eliminar ingredientes obsoletos
db.platos.updateMany(
  { activo: true },
  { $mul: { precioVenta: 1.08 } }
);

var idsUsadosEnActivos = db.platos.distinct("ingredientes.ingrediente_id", { activo: true });

var obsoletos = db.ingredientes.find({ _id: { $nin: idsUsadosEnActivos } });

obsoletos.forEach(doc => {
  print("Ingrediente no usado en platos activos, se elimina: " + doc.nombre);
  db.ingredientes.deleteOne({ _id: doc._id });
});