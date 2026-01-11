# Construye usando SOLID

El siguiente ejercicio consiste en construir de cero, a partir de unas especificaciones, el código de una operación de negocio cumpliendo los principios SOLID.

La recomendación es **construir todo el algoritmo completo en una sola clase** (el servicio del Caso de uso del negocio) y luego refactorizar para cumplir con los principios SOLID.

Para las operaciones que dependan de proveedores externos, se puede pintar un log indicando que ahi se está haciendo la operación.

Para el ejercicio se debe entregar:

- Diagrama de clases UML con la solución final
- Código en el lenguaje que te sientas más cómod@ con un test integrado que cubra el 100% de la funcionalidad

## 1. Finalización de Trayectos (CityWheels)

### Contexto del Problema

La empresa **CityWheels** es una plataforma de movilidad urbana que permite alquilar coches, motos y bicicletas eléctricas.

Tu objetivo es diseñar e implementar la lógica de **Finalización de Viaje (EndRide)** de forma que sea mantenible, fácil de testear y desacoplada de proveedores externos, aplicando rigurosamente los principios **SOLID**.

### Requerimientos Funcionales

El sistema debe realizar las siguientes tareas de forma coordinada cada vez que un usuario solicita terminar su trayecto:

1. **Identificación:** Recuperar los datos del trayecto activo y el tipo de vehículo utilizado mediante su identificador.
2. **Cálculo de Tarifa:** Aplicar la lógica de precios específica según el vehículo:
   - **Coche:** Una tarifa fija por tiempo + un recargo por kilómetro recorrido.
   - **Moto:** Una tarifa fija por tiempo.
   - **Bicicleta:** Una tarifa reducida por tiempo (sin costes adicionales).
3. **Gestión de Pago:** Realizar el cobro automático al usuario por el monto total calculado.
4. **Seguridad IoT:** Enviar una señal de bloqueo físico al vehículo para impedir que siga en movimiento.
5. **Registro:** Actualizar el estado del viaje en el sistema y guardar el coste final para futuras auditorías.

### Algoritmo de Operación (Paso a Paso)

Debes implementar un **Caso de Uso** que ejecute exactamente este flujo lógico:

1. **Obtener información:** Traer, del sistema de persistencia, el objeto del trayecto usando su identificador único. El trayecto contendrá => id, id del vehiculo, id del usuario, minutos, distancia.
2. **Calcular Monto:** Ejecutar el cálculo matemático obteniendo el total a pagar basándose en el tipo de vehículo:
   - _Coche_: 0.50€/min + 0.20€/km.
   - _Moto_: 0.30€/min.
   - _Bici_: 0.10€/min.
3. **Ejecutar Transacción:** Ordenar el cobro a través del gateway de pagos de la empresa. Si el pago falla, el proceso debe detenerse y lanzar una excepción de negocio.
4. **Cierre Físico:** Ordenar el bloqueo del vehículo a través de una abstracción de hardware (IoT).
5. **Actualizar Estado y persistir:** Cambiar el estado del viaje a "Finalizado" y asignar el costo final generado, persistiendo la información.
6. **Enviar notificación al usuario**: Enviar la notificación al teléfono del usuario por mail y push.
7. **Trazabilidad**: Enviar al sistema de auditoría la información del trayecto.
