import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Brain, CheckCircle2, CircleHelp, XCircle } from 'lucide-react';
import { AnatomyViewer } from '../components/AnatomyViewer';
import { AppHeader } from '../components/AppHeader';
import { anatomyInfo } from '../data/anatomy';
import type { StructureId } from '../types/simulation';

const structures=Object.keys(anatomyInfo) as StructureId[];
type Mode='explore'|'quiz';
type QuizFeedback={kind:'success'|'error';message:string}|null;

export function AnatomyLearningPage({onBack,backLabel,onSimulation}:{onBack:()=>void;backLabel:string;onSimulation:()=>void}){
 const [mode,setMode]=useState<Mode>('explore'),[selected,setSelected]=useState<StructureId|null>(null),[question,setQuestion]=useState(0),[feedback,setFeedback]=useState<QuizFeedback>(null),[correct,setCorrect]=useState(0),[attempted,setAttempted]=useState(false);
 const target=structures[question];
 const choose=(id:StructureId)=>{
  setSelected(id);
  if(mode==='explore')return;
  if(id===target){if(!attempted)setCorrect(value=>value+1);setAttempted(true);setFeedback({kind:'success',message:`Correct — this is ${anatomyInfo[id].name}. ${anatomyInfo[id].description}`});}
  else {setAttempted(true);setFeedback({kind:'error',message:`Not quite. You selected ${anatomyInfo[id].name}. Look again for ${anatomyInfo[target].name}.`});}
 };
 const changeMode=(next:Mode)=>{setMode(next);setSelected(null);setFeedback(null);setAttempted(false)};
 const nextQuestion=()=>{setQuestion(value=>(value+1)%structures.length);setSelected(null);setFeedback(null);setAttempted(false)};
 return <><AppHeader caseName="Anatomy Learning Mode"/><main className="mx-auto max-w-[1500px] px-4 py-6 lg:px-8 lg:py-9">
  <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><button className="flex items-center gap-2 text-sm text-muted hover:text-white" onClick={onBack}><ArrowLeft className="h-4 w-4"/>{backLabel}</button><button className="btn-secondary !py-2" onClick={onSimulation}>Continue to simulation <ArrowRight className="h-4 w-4"/></button></div>
  <div className="mb-7 max-w-3xl"><div className="eyebrow">Independent study · CABG-001</div><h1 className="mt-2 text-3xl font-black sm:text-4xl">Anatomy Learning Mode</h1><p className="mt-3 leading-7 text-muted">Explore the cardiac structures at your own pace or test your recognition. This activity is separate from CABG scoring, so your saved simulation progress is unchanged.</p></div>
  <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
   <section className="min-w-0"><div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-line bg-panel p-1.5" role="tablist" aria-label="Learning mode">
    <button role="tab" aria-selected={mode==='explore'} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${mode==='explore'?'bg-cyan text-ink':'text-muted hover:bg-white/5 hover:text-white'}`} onClick={()=>changeMode('explore')}><BookOpen className="h-4 w-4"/>Explore</button>
    <button role="tab" aria-selected={mode==='quiz'} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${mode==='quiz'?'bg-cyan text-ink':'text-muted hover:bg-white/5 hover:text-white'}`} onClick={()=>changeMode('quiz')}><Brain className="h-4 w-4"/>Identification quiz</button>
   </div>
   {mode==='quiz'&&<div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan/20 bg-cyan/5 px-4 py-3"><div><div className="text-[10px] font-bold uppercase tracking-widest text-cyan">Question {question+1} of {structures.length}</div><p className="mt-1 font-bold">Select the <span className="text-cyan">{anatomyInfo[target].name}</span></p></div><div className="rounded-lg bg-ink/60 px-3 py-2 text-xs font-bold text-medical">{correct} correct</div></div>}
   <AnatomyViewer key={mode} selected={selected} onSelect={choose} initialLabels={mode==='explore'} showDetails={mode==='explore'} hideLegend={mode==='quiz'} allowLabels={mode==='explore'}/>
   {mode==='quiz'&&feedback&&<div aria-live="polite" className={`mt-4 rounded-xl border p-4 ${feedback.kind==='success'?'border-medical/30 bg-medical/10':'border-red-400/30 bg-red-400/10'}`}><div className="flex gap-3">{feedback.kind==='success'?<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-medical"/>:<XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300"/>}<div><div className="font-bold">{feedback.kind==='success'?'Correct identification':'Try again'}</div><p className="mt-1 text-sm leading-6 text-slate-300">{feedback.message}</p>{feedback.kind==='success'&&<button className="btn-primary mt-3 !py-2" onClick={nextQuestion}>Next structure <ArrowRight className="h-4 w-4"/></button>}</div></div></div>}
   </section>
   <aside className="space-y-5"><section className="panel p-5"><div className="flex items-center gap-2"><CircleHelp className="h-5 w-5 text-cyan"/><h2 className="font-bold">{mode==='explore'?'How to explore':'Quiz guidance'}</h2></div><p className="mt-3 text-sm leading-6 text-muted">{mode==='explore'?'Select any chamber or vessel to read its name, general function, and relevance to this fictional case. There is no score or required order.':'Labels and the legend are hidden. Select a structure in the illustration; immediate feedback will guide you. Quiz results do not affect the CABG score.'}</p></section>
    {mode==='explore'&&selected&&<section className="panel p-5"><div className="eyebrow">Selected structure</div><h2 className="mt-2 text-xl font-bold text-cyan">{anatomyInfo[selected].name}</h2><p className="mt-2 text-sm leading-6 text-muted">{anatomyInfo[selected].description}</p><div className="mt-5 space-y-5 text-sm leading-6"><div><div className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-300">General function</div><p className="text-muted">{anatomyInfo[selected].function}</p></div><div><div className="mb-1 text-xs font-bold uppercase tracking-widest text-medical">Case relevance</div><p className="text-muted">{anatomyInfo[selected].relevance}</p></div></div></section>}
   </aside>
  </div>
 </main></>;
}
