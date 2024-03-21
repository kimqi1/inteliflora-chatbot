export type Reason =
  | "General Health and Wellbeing"
  | "Address specific health issues"
  | "Support recovery from an illness or injury"
  | "Other";
export type SpecificSymptom =
  | "Pain or discomfort"
  | "Digestive issues"
  | "Sleep disturbances"
  | "Emotional or mental health concerns"
  | "Energy level concerns"
  | "Skin conditions"
  | "Respiratory issues"
  | "Other";
export type SpecificPain =
  | "Headache"
  | "Joint pain"
  | "Muscle ache"
  | "Abdominal pain"
  | "Chest discomfort"
  | "Back pain"
  | "None"
  | "Other";

export type HeadacheLocation =
  | "Forehead"
  | "Temples"
  | "Top of head"
  | "Back of head/neck area"
  | "All over/General";

export type HeadacheSevere =
  | "Throbbing or pulsating"
  | "Pressing or tightening"
  | "Sharp or stabbing"
  | "Constant dull ache";

export type JointSevere =
  | "Sharp or severe"
  | "Dull or aching"
  | "Stiffness or limited movement"
  | "Swelling or warmth";

export type MuscleTrigger =
  | "Physical activity or exercise"
  | "Stress or tension"
  | "Prolonged sitting or standing"
  | "Unidentified; it occurs randomly";

export type AgeGroup =
  | "Under 18"
  | "18-24"
  | "25-34"
  | "35-44"
  | "45-54"
  | "55-64"
  | "65 and older";
export type SubAgeGroup =
  | "0-2 years"
  | "3-5 years"
  | "6-10 years"
  | "11-13 years"
  | "14-17 years";
export type Gender =
  | "Male"
  | "Female"
  | "Non-binary"
  | "Prefer to self-describe"
  | "Prefer not to say";

export interface IOptionProps {
  onClick: () => void;
  children: React.ReactNode;
  isSelected?: boolean;
}
