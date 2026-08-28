
// 1. Colección: proveedores
db.runCommand({
  collMod: "proveedores",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "contacto", "telefono", "direccion"],
      properties: {
        nombre: {
          bsonType: "string",
          minLength: 3,
          maxLength: 100,
          description: "Debe ser texto de entre 3 y 100 caracteres. Obligatorio."
        },
        contacto: {
          bsonType: "string",
          description: "Debe ser texto. Obligatorio."
        },
        telefono: {
          bsonType: "string",
          pattern: "^\\+?[0-9]{7,15}$",
          description: "Debe ser un teléfono válido (solo números, con o sin '+'). Obligatorio."
        },
        direccion: {
          bsonType: "string",
          description: "Debe ser texto. Obligatorio."
        }
      }
    }
  },
  validationAction: "error"
});


// 2. Colección: ingredientes tengo miedon de lo hago aca

db.runCommand({
  collMod: "ingredientes",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "unidad", "cantidadDisponible", "puntoPedido", "proveedor_id"],
      properties: {
        nombre: {
          bsonType: "string",
          minLength: 2,
          description: "Debe ser texto. Obligatorio."
        },
        unidad: {
          bsonType: "string",
          enum: ["kg", "g", "l", "ml", "unidad"],
          description: "Solo se permiten estas unidades de medida. Obligatorio."
        },
        cantidadDisponible: {
          bsonType: ["double", "int"],
          minimum: 0,
          description: "Debe ser un número mayor o igual a 0. Obligatorio."
        },
        puntoPedido: {
          bsonType: ["double", "int"],
          minimum: 0,
          description: "Debe ser un número mayor o igual a 0. Obligatorio."
        },
        proveedor_id: {
          bsonType: "objectId",
          description: "Debe referenciar el _id de un proveedor existente. Obligatorio."
        }
      }
    }
  },
  validationAction: "error"
});
// 3. Colección: platos
db.runCommand({
  collMod: "platos",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "precioVenta", "costoProduccion", "ingredientes", "activo"],
      properties: {
        nombre: {
          bsonType: "string",
          minLength: 3,
          maxLength: 80,
          description: "Debe ser texto de entre 3 y 80 caracteres. Obligatorio."
        },
        descripcion: {
          bsonType: "string",
          description: "Debe ser texto."
        },
        precioVenta: {
          bsonType: ["double", "int"],
          minimum: 0,
          description: "No puede ser negativo. Obligatorio."
        },
        costoProduccion: {
          bsonType: ["double", "int"],
          minimum: 0,
          description: "No puede ser negativo. Obligatorio."
        },
        ingredientes: {
          bsonType: "array",
          minItems: 1,
          description: "Debe tener al menos un ingrediente. Obligatorio.",
          items: {
            bsonType: "object",
            required: ["ingrediente_id", "cantidad"],
            properties: {
              ingrediente_id: {
                bsonType: "objectId",
                description: "Debe referenciar el _id de un ingrediente existente."
              },
              cantidad: {
                bsonType: ["double", "int"],
                minimum: 0,
                description: "No puede ser negativa."
              }
            }
          }
        },
        activo: {
          bsonType: "bool",
          description: "true o false. Obligatorio."
        }
      }
    }
  },
  validationAction: "error"
});
-
// 4. Colección: ordenesCompra
db.runCommand({
  collMod: "ordenesCompra",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["proveedor_id", "items", "fechaPedido", "estado", "total"],
      properties: {
        proveedor_id: {
          bsonType: "objectId",
          description: "Debe referenciar el _id de un proveedor existente. Obligatorio."
        },
        items: {
          bsonType: "array",
          minItems: 1,
          description: "Debe tener al menos un ítem. Obligatorio.",
          items: {
            bsonType: "object",
            required: ["ingrediente_id", "cantidad"],
            properties: {
              ingrediente_id: {
                bsonType: "objectId",
                description: "Debe referenciar el _id de un ingrediente existente."
              },
              cantidad: {
                bsonType: ["double", "int"],
                minimum: 0,
                description: "No puede ser negativa."
              }
            }
          }
        },
        fechaPedido: {
          bsonType: "date",
          description: "Fecha del pedido. Obligatorio."
        },
        fechaEntrega: {
          bsonType: ["date", "null"],
          description: "Fecha de entrega, o null si todavía no se entregó."
        },
        estado: {
          bsonType: "string",
          enum: ["pendiente", "enviada", "recibida"],
          description: "Solo puede ser uno de estos 3 valores. Obligatorio."
        },
        total: {
          bsonType: ["double", "int"],
          minimum: 0,
          description: "No puede ser negativo. Obligatorio."
        }
      }
    }
  },
  validationAction: "error"
});

print("Validación $jsonSchema aplicada correctamente a las 4 colecciones.");

