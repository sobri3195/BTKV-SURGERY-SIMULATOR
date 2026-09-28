import type { StructureId } from '../types/simulation';
export const anatomyInfo: Record<StructureId,{name:string;description:string;relevance:string}> = {
 lad:{name:'Left anterior descending artery (LAD)',description:'A major coronary branch running along the anterior interventricular groove.',relevance:'A key territory considered in coronary revascularization planning.'},
 lcx:{name:'Left circumflex artery (LCx)',description:'A coronary branch that courses in the left atrioventricular groove.',relevance:'Its distribution helps frame multivessel disease conceptually.'},
 rca:{name:'Right coronary artery (RCA)',description:'A coronary artery traveling in the right atrioventricular groove.',relevance:'One of the major coronary territories assessed in this case.'},
 lima:{name:'Left internal mammary artery (LIMA)',description:'An artery descending along the inner anterior chest wall.',relevance:'Commonly discussed as a conduit in CABG education.'},
 aorta:{name:'Aorta',description:'The main systemic artery leaving the left ventricle.',relevance:'Provides orientation for coronary origins and proximal circulation.'},
 'left-ventricle':{name:'Left ventricle',description:'The muscular chamber that pumps blood into systemic circulation.',relevance:'Its function is represented by the fictional ejection fraction.'},
 'right-ventricle':{name:'Right ventricle',description:'The chamber that pumps blood toward the lungs.',relevance:'Important orientation landmark on the anterior heart surface.'},
 'left-atrium':{name:'Left atrium',description:'The chamber receiving oxygenated blood from the lungs.',relevance:'An anatomical landmark posterior and superior to the left ventricle.'},
 'right-atrium':{name:'Right atrium',description:'The chamber receiving systemic venous return.',relevance:'Provides orientation along the right cardiac border.'}
};
