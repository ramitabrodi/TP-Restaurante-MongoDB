# Esquema de la Base de Datos — Sistema de Gestión de Inventarios para Restaurante

Base de datos: `restaurante`

El sistema se modela con **4 colecciones**: `proveedores`, `ingredientes`, `platos` y `ordenesCompra`.

---

## 1. Colección: `proveedores`

| Campo       | Tipo     | Descripción                                  |
|-------------|----------|-----------------------------------------------|
| `_id`       | ObjectId | Identificador único del proveedor.            |
| `nombre`    | String   | Razón social del proveedor.                   |
| `contacto`  | String   | Nombre de la persona de contacto.              |
| `telefono`  | String   | Teléfono de contacto.                          |
| `direccion` | String   | Dirección física del proveedor.                |

No depende de ninguna otra colección.


## 2. Colección: `ingredientes`

| Campo                | Tipo             | Descripción                                              |
|----------------------|------------------|-----------------------------------------------------------|
| `_id`                | ObjectId         | Identificador único del ingrediente.                       |
| `nombre`             | String           | Nombre del ingrediente.                                    |
| `unidad`             | String           | Unidad de medida (`kg`, `l`, etc.).                        |
| `cantidadDisponible` | Double           | Stock actual disponible.                                    |
| `puntoPedido`        | Double           | Umbral mínimo antes de reponer.                             |
| `proveedor_id`       | ObjectId (ref)   | Referencia al `_id` del proveedor que lo suministra.        |

**Relación:** `proveedores` → `ingredientes` es **referencing** (uno a muchos). Un mismo proveedor abastece a varios ingredientes, así que se guarda solo su `_id` en vez de duplicar los datos del proveedor. Esto evita repetir información y permite actualizar los datos del proveedor en un solo lugar.

## 3. Colección: `platos`

| Campo             | Tipo                          | Descripción                                                    |
|-------------------|-------------------------------|------------------------------------------------------------------|
| `_id`             | ObjectId                      | Identificador único del plato.                                    |
| `nombre`          | String                        | Nombre del plato.                                                  |
| `descripcion`     | String                        | Descripción del plato.                                             |
| `precioVenta`     | Double                        | Precio de venta al público.                                        |
| `costoProduccion` | Double                        | Costo total de producción.                                          |
| `ingredientes`    | Array de subdocumentos        | Lista de `{ ingrediente_id: ObjectId, cantidad: Double }`.           |
| `activo`          | Boolean                       | Indica si el plato está vigente en el menú.                          |

**Relación:** `platos` → `ingredientes` es una **relación híbrida (embedding de referencias)**. El array `ingredientes` se **embebe** dentro del plato porque siempre se consulta junto con él (la receta es parte del plato), pero cada elemento del array **no duplica** el documento completo del ingrediente: guarda su `ingrediente_id` como referencia, más la `cantidad` usada en esa receta (un dato propio de la relación, no del ingrediente en sí). Esto es clave porque el stock y otros datos del ingrediente cambian todo el tiempo y son compartidos por varios platos; si se copiaran completos, quedarían desactualizados.

## 4. Colección: `ordenesCompra`

| Campo          | Tipo                    | Descripción                                                  |
|----------------|--------------------------|-----------------------------------------------------------------|
| `_id`          | ObjectId                | Identificador único de la orden.                                  |
| `proveedor_id` | ObjectId (ref)           | Referencia al proveedor al que se le hizo la orden.                |
| `items`        | Array de subdocumentos   | Lista de `{ ingrediente_id: ObjectId, cantidad: Double }`.          |
| `fechaPedido`  | Date                     | Fecha en que se realizó el pedido.                                  |
| `fechaEntrega` | Date \| null             | Fecha real de entrega (`null` si todavía no llegó).                 |
| `estado`       | String                   | `"pendiente"` \| `"enviada"` \| `"recibida"`.                        |
| `total`        | Double                   | Monto total de la orden.                                              |

**Relación:** `proveedores` → `ordenesCompra` es **referencing** (un proveedor puede tener muchas órdenes). Y al igual que en `platos`, `items` usa el mismo criterio de **embedding de referencias**: se embebe el array porque pertenece exclusivamente a esa orden, pero cada ítem referencia al ingrediente por `_id` en vez de copiar sus datos completos.

## Resumen de relaciones

| Relación                              | Tipo                              |
|----------------------------------------|-----------------------------------|
| `proveedores` (1) → `ingredientes` (N) | Referencing                       |
| `proveedores` (1) → `ordenesCompra` (N)| Referencing                       |
| `platos` (1) → `ingredientes` (N)      | Embedding de referencias (subdocumento con `ingrediente_id` + `cantidad`) |
| `ordenesCompra` (1) → `ingredientes` (N)| Embedding de referencias (subdocumento con `ingrediente_id` + `cantidad`) |

## ¿Por qué esta combinación de embedding y referencing?

- **Se usa referencing** cuando la entidad relacionada (`proveedores`) es independiente, se reutiliza desde varios documentos y cambia de forma autónoma (por ejemplo, el teléfono de contacto de un proveedor no debería obligar a tocar todos los ingredientes que lo referencian).
- **Se usa embedding** para los arrays `ingredientes` (en `platos`) e `items` (en `ordenesCompra`) porque son datos que **siempre se leen junto con su documento padre** (no tiene sentido pedir la receta de un plato por separado del plato) y no crecen de forma ilimitada.
- Dentro de esos arrays embebidos, cada elemento **referencia** al ingrediente real por `ObjectId` en lugar de copiar su nombre o su stock, porque esos datos cambian constantemente y están compartidos por muchos platos/órdenes a la vez. Esto es lo que se conoce como **embedding de referencias**: un híbrido entre las dos estrategias.
