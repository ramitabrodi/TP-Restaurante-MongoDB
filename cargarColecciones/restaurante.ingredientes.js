db.ingredientes.insertMany([
  {
    _id: ObjectId("a1b2c3d4e5f6070809020001"),
    nombre: "Filete de Salmón",
    unidad: "kg",
    cantidadDisponible: 4.5,
    puntoPedido: 6,
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010002")
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809020002"),
    nombre: "Arroz Basmati",
    unidad: "kg",
    cantidadDisponible: 22,
    puntoPedido: 10,
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010001")
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809020003"),
    nombre: "Espinaca Fresca",
    unidad: "kg",
    cantidadDisponible: 2.8,
    puntoPedido: 5,
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010003")
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809020004"),
    nombre: "Queso Parmesano",
    unidad: "kg",
    cantidadDisponible: 3.2,
    puntoPedido: 4,
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010004")
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809020005"),
    nombre: "Champiñones",
    unidad: "kg",
    cantidadDisponible: 1.5,
    puntoPedido: 3,
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010003")
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809020006"),
    nombre: "Fideos Tagliatelle",
    unidad: "kg",
    cantidadDisponible: 9,
    puntoPedido: 8,
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010001")
  }
])