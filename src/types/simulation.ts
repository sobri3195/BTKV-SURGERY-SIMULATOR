export type ScoreCategory = 'Anatomy Identification' | 'Procedure Sequence' | 'Decision Making' | 'Safety Checks' | 'Final Assessment';
export type StructureId = 'lad'|'lcx'|'rca'|'lima'|'aorta'|'left-ventricle'|'right-ventricle'|'left-atrium'|'right-atrium';
export interface Patient { age:number; sex:string; diagnosis:string; ejectionFraction:string }
export interface CaseDefinition { id:string; title:string; shortTitle:string; description:string; available:boolean; patient?:Patient }
export interface Option { id:string; label:string; feedback:string }
export interface InstructorRules { correct:string; firstIncorrect:string; repeatedIncorrect:[string,string]; completion:string }
export interface ProcedureStep { id:string; title:string; instruction:string; educationalNote:string; instructor:InstructorRules; type:'anatomy'|'decision'; correctAnswer:string; category:ScoreCategory; points:number; options?:Option[] }
export interface Mistake { stepId:string; stepTitle:string; selected:string; expected:string; explanation:string }
export interface SimulationState { currentStep:number; selectedStructure:StructureId|null; completedSteps:string[]; attemptsByStep:Record<string,number>; mistakes:Mistake[]; categoryScores:Record<ScoreCategory,number>; feedback:{kind:'idle'|'success'|'error'; message:string; completion?:string}; simulationStatus:'active'|'complete' }
export type SimulationAction = {type:'ANSWER';answer:string;label:string}|{type:'SELECT_STRUCTURE';structure:StructureId}|{type:'NEXT'}|{type:'BACK'}|{type:'RESET'};
