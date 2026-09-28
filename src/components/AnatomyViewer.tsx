import { Minus, Plus, RotateCcw, Tags } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import { anatomyInfo } from '../data/anatomy';
import type { StructureId } from '../types/simulation';

const ids: StructureId[] = ['lad','lcx','rca','lima','aorta','left-atrium','right-atrium','left-ventricle','right-ventricle'];
const names: Record<StructureId,string> = {lad:'LAD',lcx:'LCx',rca:'RCA',lima:'LIMA',aorta:'Aorta','left-atrium':'Left atrium','right-atrium':'Right atrium','left-ventricle':'Left ventricle','right-ventricle':'Right ventricle'};
const vessels = new Set<StructureId>(['lad','lcx','rca','lima','aorta']);

export function AnatomyViewer({selected,onSelect,disabled=false}:{selected:StructureId|null;onSelect:(id:StructureId)=>void;disabled?:boolean}) {
  const [zoom,setZoom]=useState(1), [labels,setLabels]=useState(true), [hovered,setHovered]=useState<StructureId|null>(null);
  const pinch=useRef<number|null>(null), titleId=useId(), descriptionId=useId(), active=selected??hovered;
  const changeZoom=(next:number)=>setZoom(Math.min(2,Math.max(1,next)));
  const interactive=(id:StructureId)=>({
    role:disabled?'img':'button','aria-label':`${anatomyInfo[id].name}${selected===id?', selected':''}${disabled?' (review only)':''}`,'aria-pressed':disabled?undefined:selected===id,tabIndex:disabled?undefined:0,
    onClick:()=>{if(!disabled)onSelect(id)},onFocus:()=>setHovered(id),onBlur:()=>setHovered(null),onMouseEnter:()=>setHovered(id),onMouseLeave:()=>setHovered(null),
    onKeyDown:(event:React.KeyboardEvent<SVGElement>)=>{if(!disabled&&(event.key==='Enter'||event.key===' ')){event.preventDefault();onSelect(id)}},
    className:`anatomy-structure ${disabled?'cursor-default':'cursor-pointer'} ${active===id?'anatomy-active':''}`
  });
  const label=(id:StructureId,x:number,y:number,w=92)=><g className="pointer-events-none" aria-hidden="true"><rect x={x-w/2} y={y-17} width={w} height="24" rx="7" fill="#07111f" fillOpacity=".9" stroke="#385069"/><text x={x} y={y} textAnchor="middle" fill="#e6f1fb" fontSize="12" fontWeight="700">{names[id]}</text></g>;
  const legendSelect=(id:StructureId)=>{if(!disabled)onSelect(id)};

  return <div>
    <section className="overflow-hidden rounded-2xl border border-line bg-[#07101d]" aria-labelledby={titleId}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white/[.025] px-3 py-3 sm:px-4">
        <div><h2 id={titleId} className="text-sm font-bold">Interactive heart anatomy</h2><p id={descriptionId} className="mt-0.5 text-xs text-muted">Select a chamber or vessel to inspect it.</p></div>
        <div className="flex flex-wrap items-center gap-2" aria-label="Anatomy viewer controls">
          <div className="flex items-center rounded-lg border border-line bg-ink/60 p-0.5">
            <button type="button" className="rounded-md p-2 text-muted hover:bg-white/10 hover:text-white disabled:opacity-35" onClick={()=>changeZoom(zoom-.25)} disabled={zoom<=1} aria-label="Zoom out"><Minus className="h-4 w-4"/></button>
            <output className="min-w-12 text-center text-xs font-bold" aria-live="polite">{Math.round(zoom*100)}%</output>
            <button type="button" className="rounded-md p-2 text-muted hover:bg-white/10 hover:text-white disabled:opacity-35" onClick={()=>changeZoom(zoom+.25)} disabled={zoom>=2} aria-label="Zoom in"><Plus className="h-4 w-4"/></button>
          </div>
          <button type="button" className="btn-secondary !gap-1.5 !rounded-lg !px-3 !py-2" onClick={()=>changeZoom(1)} disabled={zoom===1}><RotateCcw className="h-3.5 w-3.5"/>Reset view</button>
          <button type="button" aria-pressed={labels} className={`btn-secondary !gap-1.5 !rounded-lg !px-3 !py-2 ${labels?'!border-cyan !bg-cyan/10':''}`} onClick={()=>setLabels(value=>!value)}><Tags className="h-3.5 w-3.5"/>Labels</button>
        </div>
      </header>
      <div className="relative overflow-auto overscroll-contain"
        onWheel={event=>{if(event.ctrlKey||event.metaKey){event.preventDefault();changeZoom(zoom+(event.deltaY<0?.25:-.25))}}}
        onTouchStart={event=>{if(event.touches.length===2)pinch.current=Math.hypot(event.touches[0].clientX-event.touches[1].clientX,event.touches[0].clientY-event.touches[1].clientY)}}
        onTouchMove={event=>{if(event.touches.length!==2||pinch.current===null)return;const d=Math.hypot(event.touches[0].clientX-event.touches[1].clientX,event.touches[0].clientY-event.touches[1].clientY);if(Math.abs(d-pinch.current)>18){changeZoom(zoom+(d>pinch.current?.25:-.25));pinch.current=d}}}
        onTouchEnd={()=>{pinch.current=null}}>
        <svg viewBox="0 0 720 540" style={{width:`${zoom*100}%`}} className="mx-auto block min-w-full touch-pan-x touch-pan-y" aria-labelledby={`${titleId} ${descriptionId}`} role="group">
          <defs><linearGradient id="heart-surface" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a84460"/><stop offset="1" stopColor="#531b3c"/></linearGradient><linearGradient id="aorta-fill"><stop stopColor="#ee7180"/><stop offset="1" stopColor="#b52f50"/></linearGradient><filter id="heart-shadow"><feDropShadow dx="0" dy="9" stdDeviation="10" floodColor="#000" floodOpacity=".42"/></filter><filter id="active-glow"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#35d5f5" floodOpacity=".95"/></filter></defs>
          <path d="M287 139C224 112 158 149 142 220c-20 90 35 194 199 286 164-96 238-215 211-306-19-63-87-89-145-51-29-49-79-53-120-10Z" fill="url(#heart-surface)" stroke="#d06a82" strokeWidth="4" filter="url(#heart-shadow)"/>
          <path {...interactive('left-ventricle')} d="M351 270c19-65 87-103 153-73 42 79-13 199-161 289-26-81-28-155 8-216Z" fill={active==='left-ventricle'?'#237c8d':'#742747'} stroke="#c45b75" strokeWidth="10"/>
          <path {...interactive('right-ventricle')} d="M194 247c55-42 146-25 169 40-26 67-28 127-20 199-112-65-171-142-177-213 7-11 16-20 28-26Z" fill={active==='right-ventricle'?'#237c8d':'#8e344f'} stroke="#c45b75" strokeWidth="10"/>
          <path {...interactive('left-atrium')} d="M386 149c32-35 100-29 125 12 23 38 4 84-35 103-51 25-110-7-110-61 0-21 7-39 20-54Z" fill={active==='left-atrium'?'#237c8d':'#6d294a'} stroke="#d06a82" strokeWidth="10"/>
          <path {...interactive('right-atrium')} d="M191 148c33-35 98-34 130 1 28 31 25 81-8 108-46 38-119 19-134-39-7-26-2-51 12-70Z" fill={active==='right-atrium'?'#237c8d':'#7d2d4b'} stroke="#d06a82" strokeWidth="10"/>
          <path {...interactive('aorta')} d="M343 198c-3-70-2-133 61-150 61-17 121 29 111 92" fill="none" stroke={active==='aorta'?'#35d5f5':'url(#aorta-fill)'} strokeWidth="34" strokeLinecap="round"/>
          <path d="M399 61 372 24M440 52l3-42M477 73l32-31" fill="none" stroke="#d9556b" strokeWidth="16" strokeLinecap="round" aria-hidden="true"/>
          <path {...interactive('lima')} d="M99 75c0 102 3 203 20 326" fill="none" stroke={active==='lima'?'#35d5f5':'#ef9a6d'} strokeWidth="16" strokeLinecap="round"/><path d="m105 145-28 24m32 43-29 25m34 42-29 27m34 40-25 26" fill="none" stroke="#ef9a6d" strokeWidth="6" strokeLinecap="round" aria-hidden="true"/>
          <path {...interactive('lad')} d="M348 202c-2 81-10 164-3 239" fill="none" stroke={active==='lad'?'#35d5f5':'#f4c469'} strokeWidth="17" strokeLinecap="round"/>
          <path {...interactive('lcx')} d="M347 202c52-16 111-3 154 35" fill="none" stroke={active==='lcx'?'#35d5f5':'#e9b45d'} strokeWidth="17" strokeLinecap="round"/>
          <path {...interactive('rca')} d="M333 200c-58-18-117 2-157 53" fill="none" stroke={active==='rca'?'#35d5f5':'#e9b45d'} strokeWidth="17" strokeLinecap="round"/>
          <g className={`transition-opacity ${labels?'opacity-100':'opacity-0'}`}>{label('lima',82,57)}{label('aorta',518,29)}{label('rca',151,226)}{label('lcx',531,218)}{label('lad',393,390)}{label('right-atrium',240,183,110)}{label('left-atrium',453,180,105)}{label('right-ventricle',247,331,120)}{label('left-ventricle',454,331,115)}</g>
        </svg>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded border border-line bg-ink/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted">Schematic educational illustration</span>
      </div>
      <div className="border-t border-line bg-white/[.02] px-4 py-3"><h3 className="text-[10px] font-bold uppercase tracking-[.2em] text-muted">Legend · select to highlight</h3><div className="mt-2 flex flex-wrap gap-2">{ids.map(id=><button key={id} type="button" disabled={disabled} aria-pressed={selected===id} onClick={()=>legendSelect(id)} onMouseEnter={()=>setHovered(id)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(id)} onBlur={()=>setHovered(null)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${active===id?'border-cyan bg-cyan/15 text-cyan':'border-line bg-white/[.03] text-slate-300 hover:border-slate-500'} disabled:cursor-default`}><span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${vessels.has(id)?'bg-[#f4c469]':'bg-[#b94e6b]'}`} aria-hidden="true"/>{names[id]}</button>)}</div></div>
    </section>
    {selected&&<div className="mt-4 rounded-xl border border-cyan/20 bg-cyan/5 p-4" aria-live="polite"><div className="font-bold text-cyan">{anatomyInfo[selected].name}</div><p className="mt-1 text-sm text-slate-300">{anatomyInfo[selected].description}</p><p className="mt-2 text-xs text-muted"><strong className="text-medical">Case relevance:</strong> {anatomyInfo[selected].relevance}</p></div>}
  </div>;
}
