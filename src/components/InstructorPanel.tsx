import { CircleCheck, CircleX, Stethoscope } from 'lucide-react';
import type { SimulationState } from '../types/simulation';

export function InstructorPanel({feedback}:{feedback:SimulationState['feedback']}) {
 const Icon=feedback.kind==='success'?CircleCheck:feedback.kind==='error'?CircleX:Stethoscope;
 return <section className={`panel p-5 ${feedback.kind==='success'?'border-medical/35':feedback.kind==='error'?'border-rose-400/35':''}`} aria-labelledby="instructor-title">
  <div className="mb-3 flex items-center gap-2"><Icon aria-hidden="true" className={`h-4 w-4 ${feedback.kind==='success'?'text-medical':feedback.kind==='error'?'text-rose-400':'text-cyan'}`}/><h2 id="instructor-title" className="eyebrow">Virtual Instructor</h2></div>
  <div role="status" aria-live="polite" aria-atomic="true" className="text-sm leading-6 text-slate-300">
   <p>{feedback.message}</p>
   {feedback.completion&&<p className="mt-3 border-t border-line pt-3"><strong className="text-medical">Step complete.</strong> {feedback.completion}</p>}
  </div>
  <p className="mt-3 text-[10px] uppercase tracking-widest text-muted">Local rule-based feedback · No AI API</p>
 </section>;
}
