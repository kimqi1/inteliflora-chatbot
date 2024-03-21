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

export type AbdominalLocation =
  | "Upper abdomen"
  | "Lower abdomen"
  | "Right side"
  | "Left side"
  | "Diffuse, all over the abdomen";

export type AbdominalSevere =
  | "Sharp or stabbing"
  | "Cramping or spasmodic"
  | "Dull or aching"
  | "Bloating or gassy feeling";

export type ChestSevere =
  | "Sharp or piercing pain"
  | "Tightness or pressure"
  | "Burning sensation"
  | "Heavy feeling or squeezing";

export type ChestTrigger =
  | "Physical exertion"
  | "Emotional stress"
  | "Eating or digestion"
  | "Breathing deeply";

export type BackLocation =
  | "Upper back"
  | "Middle back"
  | "Lower back"
  | "Spreads to the buttocks or legs";

export type BackSevere =
  | "Sharp or stabbing"
  | "Dull or aching"
  | "Burning sensation"
  | "Stiffness or immobility";

export type AgeGroup =
  | "Under 18"
  | "18-30"
  | "31-40"
  | "41-50"
  | "51-60"
  | "61 and older";

export type SubAgeGroup =
  | "0-2 years"
  | "3-5 years"
  | "6-10 years"
  | "11-13 years"
  | "14-17 years";

export type Gender = "Male" | "Female" | "Non-binary" | "Prefer not to say";

export type MentalState =
  | "Generally stable and positive"
  | "Frequently anxious or nervous"
  | "Often feel down or depressed"
  | "Experience mood swings"
  | "Feel stressed or overwhelmed"
  | "Other";

export type Energy =
  | "Yes, I feel more energetic"
  | "Yes, I feel less energetic"
  | "No significant change";

export interface IOptionProps {
  onClick: () => void;
  children: React.ReactNode;
  isSelected?: boolean;
}
