# Refactorización usando SOLID

Código que rompe alguno/s de los principios SOLID. El objetivo es refactorizar el código para que cumpla con dichos principios.

1. Describir el algoritmo de la operación/es principal del negocio
2. Analizar el código de la funcionalidad pensando en quien me pide cada uno de sus bloques y cómo evolucionaría
3. Indicar si se rompe algún principio SOLID
4. Refactorizar la funcionalidad para que cumpla con SOLID.

Triaje de Emergencias Autónomo (MedTech/AI)

Este sistema decide qué paciente debe ser atendido primero basándose en signos vitales.

```ts
type PatientVitals = {
  heartRate: number;
  oxygenSaturation: number;
  age: number;
};

class TraumaCenterOrchestrator {
  private aiModel = new TensorFlowModel("v2.4-medical");
  private alarmSpeaker = new BoseSpeakerDriver();

  prioritizePatient(patient: PatientVitals): void {
    // 1. Lógica de Negocio Aumenta la prioridad para ciertas condiciones
    let priorityScore = 0;
    if (patient.heartRate > 120) priorityScore += 50;
    if (patient.oxygenSaturation < 90) priorityScore += 100;

    // 2. Predicción usando IA del riesgo
    const riskLevel = this.aiModel.predictRisk(patient);

    if (riskLevel === "CRITICAL" || priorityScore > 140) {
      // 3. Efecto secundario físico. emitir un sonido a 80dB
      this.alarmSpeaker.emitSound(80, "RED_ALERT");

      // Persistencia
      const db = new BinaryDB();
      db.write(`EMERGENCY: ${patient.age}y`);
    }
  }
}
```
