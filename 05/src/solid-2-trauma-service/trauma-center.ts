import { AlarmSystem, BoseAlarmSystem } from "./alarm-system";
import {
  BinaryEmergencyRepository,
  EmergencyRepository,
} from "./emergency-repository";
import { PatientVitals } from "./patient-vitals";
import { RiskAssessmentModel, TensorFlowRiskModel } from "./risk-assessment";

export class TraumaTriageService {
  constructor(
    private readonly riskModel: RiskAssessmentModel,
    private readonly alarm: AlarmSystem,
    private readonly repository: EmergencyRepository
  ) {}

  async prioritizePatient(patient: PatientVitals): Promise<void> {
    let priorityScore = 0;

    if (patient.heartRate > 120) priorityScore += 50;
    if (patient.oxygenSaturation < 90) priorityScore += 100;

    const riskLevel = await this.riskModel.predict(patient);

    if (riskLevel === "CRITICAL" || priorityScore > 140) {
      await this.alarm.trigger(80, "RED_ALERT");
      await this.repository.saveEmergency(`EMERGENCY: ${patient.age}y`);
    }
  }
}

// Usage example
const riskModel = new TensorFlowRiskModel();
const alarmSystem = new BoseAlarmSystem();
const repository = new BinaryEmergencyRepository();

const triageService = new TraumaTriageService(
  riskModel,
  alarmSystem,
  repository
);

triageService.prioritizePatient({
  heartRate: 130,
  oxygenSaturation: 85,
  age: 40,
});
