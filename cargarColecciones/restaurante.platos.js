db.platos.insertMany([
  {
    _id: ObjectId("a1b2c3d4e5f6070809030001"),
    nombre: "Salmón a la Plancha",
    descripcion: "Filete de salmón grillado con arroz basmati y espinaca salteada",
    precioVenta: 2500,
    costoProduccion: 1100,
    ingredientes: [
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020001"),
        cantidad: 0.25
      },
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020002"),
        cantidad: 0.15
      },
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020003"),
        cantidad: 0.1
      }
    ],
    activo: true
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809030002"),
    nombre: "Pasta Alfredo Especial",
    descripcion: "Tagliatelle en salsa de queso parmesano con champiñones",
    precioVenta: 1900,
    costoProduccion: 720,
    ingredientes: [
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020006"),
        cantidad: 0.2
      },
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020004"),
        cantidad: 0.08
      },
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020005"),
        cantidad: 0.12
      }
    ],
    activo: true
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809030003"),
    nombre: "Risotto de Espinaca",
    descripcion: "Arroz cremoso con espinaca fresca y parmesano",
    precioVenta: 1700,
    costoProduccion: 580,
    ingredientes: [
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020002"),
        cantidad: 0.18
      },
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020003"),
        cantidad: 0.2
      },
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020004"),
        cantidad: 0.05
      }
    ],
    activo: true
  },
  {
    _id: ObjectId("a1b2c3d4e5f6070809030004"),
    nombre: "Sopa de Champiñones",
    descripcion: "Crema de champiñones con toque de parmesano",
    precioVenta: 1200,
    costoProduccion: 350,
    ingredientes: [
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020005"),
        cantidad: 0.25
      },
      {
        ingrediente_id: ObjectId("a1b2c3d4e5f6070809020004"),
        cantidad: 0.04
      }
    ],
    activo: false
  }
])