import type { CaseDefinition } from '../types/simulation';
export const cases: CaseDefinition[] = [
 {id:'cabg-001',title:'CABG Simulation',shortTitle:'CABG',description:'Coronary anatomy, graft planning, and safety checks.',available:true,patient:{age:62,sex:'Male',diagnosis:'Multivessel coronary artery disease',ejectionFraction:'45%'}},
 {id:'mitral',title:'Mitral Valve Repair',shortTitle:'Mitral Valve Repair',description:'Valve anatomy and repair decision pathways.',available:false},
 {id:'aortic',title:'Aortic Aneurysm',shortTitle:'Aortic Aneurysm',description:'Aortic anatomy and conceptual planning.',available:false},
 {id:'thoracic',title:'Thoracic Surgery',shortTitle:'Thoracic Surgery',description:'Thoracic anatomy and perioperative reasoning.',available:false}
];
export const cabgCase = cases[0];
