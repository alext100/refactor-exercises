import { PatientVitals } from "./patient-vitals";

/* Mocked external TensorFlowModel for demonstration purposes */
class TensorFlowModel {
  constructor(public modelVersion: string) {}

  predictRisk(patient: PatientVitals): RiskLevel {
    // Mocked prediction logic
    if (patient.heartRate > 120 && patient.oxygenSaturation < 90) {
      return "CRITICAL";
    }
    return "LOW";
  }
}

export type RiskLevel = "LOW" | "MEDIUM" | "CRITICAL";

export interface RiskAssessmentModel {
  predict(patient: PatientVitals): Promise<RiskLevel>;
}

export class TensorFlowRiskModel implements RiskAssessmentModel {
  private readonly model = new TensorFlowModel("v2.4-medical");

  async predict(patient: PatientVitals): Promise<RiskLevel> {
    return this.model.predictRisk(patient);
  }
}
