export type Reason = 'General Health and Wellbeing' | 'Specific Symptoms' | 'Chronic Condition Management' | 'Preventive Care' | 'Lifestyle Improvement' | 'Reproductive Health' | 'Other';
export type SpecificSymptom = 'Pain' | 'Fatigue' | 'Fever' | 'Digestive issues' | 'Mental health concerns' | 'Skin concerns';
export type ChronicCondition = 'Diabetes' | 'Hypertension' | 'Asthma' | 'Mental health conditions';
export type AgeGroup = 'Under 18' | '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65 and older';
export type SubAgeGroup = '0-2 years' | '3-5 years' | '6-10 years' | '11-13 years' | '14-17 years';
export type Gender = 'Male' | 'Female' | 'Non-binary' | 'Prefer to self-describe' | 'Prefer not to say';

export interface IOptionProps {
  onClick: () => void;
  children: React.ReactNode;
}