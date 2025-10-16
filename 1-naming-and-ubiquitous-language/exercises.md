# ParcelFlow — Ejercicios

## Contexto

![Logo de Parcel](../assets/parcel-flow-logo.webp)

_ParcelFlow_ es un producto SaaS para la orquestación de última milla (_conjunto de procesos, decisiones y sistemas que coordinan todo lo necesario para que un paquete llegue desde el último punto logístico hasta el cliente_)

El producto tendrá operaciones para: gestión de pickups, asignación de carriers y drivers, seguimiento por escaneos, manejo de errores en el proceso y prueba de entrega (POD).

Este documento contiene un pequeño contexto funcional de la empresa, algunos términos de su lenguaje ubicuo y los ejercicios para practicar en clase.

## Ubiquitous Language

- **Parcel**: cada uno de los elementos que se transportan.
- **Shipment**: un conjunto de uno o más parcels que se transportan bajo un mismo tracking number.
- **TrackingNumber**: identificador único de un Shipment visible para cliente y carrier.
- **PickupRequest**: la petición de recogida que hace un cliente para que un carrier recoja un Shipment en una dirección y ventana horaria.
- **DeliveryWindow**: intervalo de tiempo (start, end) en que se solicita la entrega o recogida.
- **Carrier**: la empresa responsable de mover Shipments.
- **Distpacher**: persona de operaciones que revisa y coordina los procesos de última milla.
- **Driver**: la persona asignada por un Carrier para recoger o entregar Shipments.
- **ScanEvent** (o **Scan**): evento registrado cuando un paquete es escaneado (picked up, arrived at hub, out for delivery, delivered).
- **Hub**: instalación física donde se clasifican Shipments.
- **Stop**: un punto en RouteSegment donde el Driver se espera que pare o ejecute una o mas acciones (pickup, delivery, drop-off, hub transit).
- **RouteSegment**: parte de la ruta de un Driver (secuencia entre hubs/stops).
- **Exception**: condición inesperada que requiere intervención humana.
- **ProofOfDelivery (POD)**: firma o foto que confirma la entrega.
- **ETA**: tiempo estimado de llegada para un Shipment en un stop.

## Ejercicios

### 1 — Naming: variables & funciones

**User Story:**
_Como despachador, quiero crear una solicitud de recogida para un cliente, de modo que un transportista pueda recoger su envío dentro del plazo de entrega solicitado por el cliente._

**Tarea:** A continuación se muestra una lista de 20 nombres de variables/funciones que como developer podríamos utilizar al implementar esta US. Algunos nombres son ambiguos/demasiado genéricos, otros hacen un uso incorrecto del lenguaje ubicuo y otros están bien definidos. Indica para cada nombre **si está bien definido o no** y explica brevemente por qué.

**Lista de nombres:**

```text
1. data - demasiado genérico, no indica qué tipo de datos contiene
2. pickupReq - debe ser PickupRequest
3. createPickupRequest(customerId, window) - correcto, usa lenguaje ubicuo, deliveryWindow
4. shipmentId - tengo dudas, podría ser solo id, depende del contexto -> trackingNumber
5. request - demasiado genérico, no indica qué tipo de request es
6. createShipmentRequest() - ¿createPickupRequest()?
7. delivery_time - DeliveryWindow (como es intervalo de tiempo)
8. deliveryWindowStart - correcto
9. createPickup - createPickupRequest ???
10. addr - deliveryAddress
11. customer - ok
12. assignDriverToShipment(shipmentRef) /trackingNumber
13. carrier_id - carrierId
14. validate() - demasiado genérico, mejor validatePickupRequest() or similar
15. validatePickupRequest(pickupRequest) - correcto
16. create  - createPickupRequest
17. pickupWindow ? - deliveryWindow
18. trackingNum - trackingNumber
19. notifyCarrierOfPickup(pickupRequest) - correcto
20. status - demasiado genérico, no indica de qué entidad es el estado
```

### 2 — Mensajes de commit

**Tarea:** A continuación hay 20 mensajes de commit. Se deben marcar cuáles utilizan un lenguaje ubicuo y/o describen el cambio, y cuáles no, explicando el porqué

**Lista de commits:**

```text
1. fix pickup orders not showing its status when completed - correcto, usa lenguaje ubicuo y describe el cambio
2. Add pickup request validation for overlapping delivery windows - correcto, usa pickupRequest y deliveryWindow
3. minor typo fixes - no describe el cambio
4. Record ScanEvent with UTC timestamp when driver scans a shipment - correcto, usa ScanEvent y shipment
5. temp changes for testing - no describe el cambio
6. Rename parcel.id to trackingNumber - correcto, usa parcel y trackingNumber
7. refactor parcel.id - no usa lenguaje ubicuo, genérico
8. Reject pickup requests outside carrier service area - correcto, usa pickupRequest y carrier
9. Added second factor auth for drivers - ?
10. Add CI config - no usa lenguaje ubicuo, genérico
11. Notify carrier when pickup is scheduled - correcto, usa carrier y pickup
12. update README - no usa lenguaje ubicuo, genérico
13. Handle exception when address lookup fails during pickup creation - correcto, usa exception y pickup
14. changes to UI - no usa lenguaje ubicuo, genérico
15. Ensure motorist assignment does not exceed route capacity - no correcto, motorist no es parte del lenguaje ubicuo, debe ser driver
16. fix bug - no describe el cambio
17. Improve error message for unavailable carriers - correcto, usa carrier
18. WIP new tracking - no describe el cambio
19. Add proof of delivery photo upload - correcto, usa proof of delivery
20. merge branch - no describe el cambio, pero puede ser automático
```

### 3 — Escenarios BDD

**User Story:**
_Como cliente, deseo solicitar la recogida de mi envío con un plazo de entrega preferido, de modo que mi paquete sea recogido y entregado dentro de ese plazo._

**Task:** Redacta 3 posibles escenarios para la US anterior en un lenguaje sin jerga técnica y usando la notación Gherkin (Given/When/Then). Utiliza el lenguaje ubicuo al nombrar entidades (por ejemplo, «PickupRequest», «Shipment», «DeliveryWindow»), pero mantén las descripciones de los escenarios sin tecnicismos para que las partes interesadas las comprendan.

Como solo contamos con un título, debéis pensar vosotr@s las posibles restricciones de la US. A modo de ejemplo de escenario:

```gherkin
Scenario: Prevent scheduling if requested window overlaps a blocked period

Given a customer chooses a DeliveryWindow that overlaps a blocked period for that address,
When the customer submits the PickupRequest,
Then the system rejects the request and explains why in plain words,
And the system suggests alternative available windows.
```

**Solution:**

```gherkin
Scenario: Successful PickupRequest creation within available DeliveryWindow

Given a customer chooses a DeliveryWindow that is available for their address,
When the customer submits the PickupRequest,
Then the system creates the PickupRequest successfully,
And the system confirms the scheduled pickup window within the chosen DeliveryWindow.


Scenario: Reject PickupRequest outside carrier service area

Given a customer chooses a DeliveryWindow that is outside the carrier's service area,
When the customer submits the PickupRequest,
Then the system rejects the request and explains why,
And the system suggests alternative available pickup windows.


Scenario: Notify carrier of scheduled pickup

Given a scheduled PickupRequest,
When the system confirms the pickup time window,
Then the system sends a notification to the carrier with the pickup details.
```
