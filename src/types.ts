export type ClientType = 'personal' | 'family' | 'organizational';

export interface ConsultationProfile {
  clientType: ClientType;
  targetName: string;
  primaryGoal: string;
  challenges: string[];
  toneOfVoice: string;
  keyDimensions: string[];
}

export interface NaraCompanionBlueprint {
  companionName: string;
  tagline: string;
  archetype: string;
  personalityProfile: string;
  coreCapabilities: {
    title: string;
    description: string;
    iconName: string; // lucide icon identifier
  }[];
  securityPolicy: string;
  journeyPlan: {
    step: number;
    title: string;
    description: string;
  }[];
  weeklyInteractionScenario: string;
}
