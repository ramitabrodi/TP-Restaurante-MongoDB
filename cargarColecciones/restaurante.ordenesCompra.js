db.ordenesCompra.insertMany([
  {
    _id: ObjectId("a1b2c3d4e5f6070809040001"),
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010003"),
    items: [
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020003"),
        cantidad: 12
      },
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020005"),
        cantidad: 8
      }
    ],
    fechaPedido: ISODate("2026-07-10T00:00:00.000Z"),
    fechaEntrega: ISODate("2026-07-12T00:00:00.000Z"),
    estado: "recibida",
    total: 15600
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809040002"),
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010002"),
    items: [
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020001"),
        cantidad: 18
      }
    ],
    fechaPedido: ISODate("2026-07-18T00:00:00.000Z"),
    fechaEntrega: null,
    estado: "enviada",
    total: 54000
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809040003"),
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010004"),
    items: [
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020004"),
        cantidad: 6
      }
    ],
    fechaPedido: ISODate("2026-07-05T00:00:00.000Z"),
    fechaEntrega: ISODate("2026-07-06T00:00:00.000Z"),
    estado: "recibida",
    total: 7200
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809040004"),
    proveedor_id: ObjectId("a1b2c3d4e5f6070809010001"),
    items: [
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020002"),
        cantidad: 20
      },
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020006"),
        cantidad: 15
      }
    ],
    fechaPedido: ISODate("2026-08-02T00:00:00.000Z"),
    fechaEntrega: null,
    estado: "pendiente",
    total: 11200
  }
])  