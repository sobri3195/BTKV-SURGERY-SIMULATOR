import { useReducer } from 'react';
import { anatomyInfo } from '../data/anatomy';
import { cabgSteps } from '../data/steps';
import { categoryMaximums, scoreCategories } from '../data/scoring';
import type { SimulationAction, SimulationState, StructureId } from '../types/simulation';

const emptyScores=()=>Object.fromEntries(scoreCategories.map(c=>[c,0])) as SimulationState['categoryScores'];
export const initialSimulationState:SimulationState={currentStep:0,selectedStructure:null,completedSteps:[],attemptsByStep:{},mistakes:[],categoryScores:emptyScores(),feedback:{kind:'idle',message:'Select an answer to receive instructor feedback.'},simulationStatus:'active'};
function reducer(state:SimulationState,action:SimulationAction):SimulationState {
 if(action.type==='RESET') return {...initialSimulationState,categoryScores:emptyScores()};
 if(action.type==='SELECT_STRUCTURE') return {...state,selectedStructure:action.structure};
 if(action.type==='BACK') return {...state,currentStep:Math.max(0,state.currentStep-1),feedback:{kind:'idle',message:'Review this completed step. Your score will not be counted twice.'}};
 if(action.type==='NEXT'){
  const step=cabgSteps[state.currentStep]; if(!state.completedSteps.includes(step.id)) return state;
  if(state.currentStep===cabgSteps.length-1) return {...state,simulationStatus:'complete'};
  return {...state,currentStep:state.currentStep+1,selectedStructure:null,feedback:{kind:'idle',message:'Select an answer to receive instructor feedback.'}};
 }
 if(action.type==='ANSWER'){
  const step=cabgSteps[state.currentStep]; const already=state.completedSteps.includes(step.id); if(already) return {...state,feedback:{kind:'success',message:'This step is already complete. Select Next when ready.'}};
  const attempts={...state.attemptsByStep,[step.id]:(state.attemptsByStep[step.id]??0)+1};
  if(action.answer===step.correctAnswer){
   const current=state.categoryScores[step.category];
   const earned=Math.max(0,step.points-(state.attemptsByStep[step.id]??0));
   return {...state,attemptsByStep:attempts,completedSteps:[...state.completedSteps,step.id],categoryScores:{...state.categoryScores,[step.category]:Math.min(categoryMaximums[step.category],current+earned)},feedback:{kind:'success',message:`Correct. ${step.educationalNote} Read the note, then select Next.`}};
  }
  const expected=step.type==='anatomy'?anatomyInfo[step.correctAnswer as StructureId].name:step.options?.find(o=>o.id===step.correctAnswer)?.label??step.correctAnswer;
  const explanation=step.type==='anatomy'?`You selected ${anatomyInfo[action.answer as StructureId].name}. ${anatomyInfo[action.answer as StructureId].description} The target is ${expected}. ${step.educationalNote}`:step.options?.find(o=>o.id===action.answer)?.feedback??step.educationalNote;
  return {...state,attemptsByStep:attempts,mistakes:[...state.mistakes,{stepId:step.id,stepTitle:step.title,selected:action.label,expected,explanation}],feedback:{kind:'error',message:`Not quite. ${explanation} Try again.`}};
 }
 return state;
}
export function useSimulation(){const [state,dispatch]=useReducer(reducer,initialSimulationState); const total=scoreCategories.reduce((n,c)=>n+state.categoryScores[c],0); return {state,dispatch,total};}
