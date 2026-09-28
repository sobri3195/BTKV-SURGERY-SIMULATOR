import type { InstructorRules, ProcedureStep } from '../types/simulation';

const option=(id:string,label:string,feedback:string)=>({id,label,feedback});
const guidance=(correct:string,firstIncorrect:string,repeatedIncorrect:[string,string],completion:string):InstructorRules=>({correct,firstIncorrect,repeatedIncorrect,completion});

export const cabgSteps:ProcedureStep[]=[
 {
  id:'review',title:'Review coronary anatomy',instruction:'Select the aorta to establish orientation before reviewing coronary branches.',educationalNote:'Orientation begins with the great vessels and cardiac chambers.',type:'anatomy',correctAnswer:'aorta',category:'Anatomy Identification',points:5,
  instructor:guidance(
   'That selection is the aorta. It is the best reference here because it anchors the heart’s systemic outflow and the origins of the coronary circulation.',
   'This structure does not provide the requested starting landmark. Compare its role with the vessel that carries blood from the left ventricle to the body.',
   ['Re-orient using function rather than shape: the requested landmark is the main systemic artery.','Keep this step focused on the reference vessel, not a coronary branch or chamber; their roles in the diagram are different.'],
   'You established the diagram’s main orientation point. Continue when you are ready to distinguish the coronary branches.'),
 },
 {
  id:'identify-lad',title:'Identify LAD',instruction:'Select the LAD on the schematic.',educationalNote:'The LAD follows the anterior interventricular groove.',type:'anatomy',correctAnswer:'lad',category:'Anatomy Identification',points:5,
  instructor:guidance(
   'You identified the LAD. Its course along the front groove between the ventricles distinguishes it from vessels that curve around the heart.',
   'That is a different structure. Use the LAD’s anterior course between the ventricles as the conceptual landmark.',
   ['Return to the location clue: “anterior interventricular” separates the LAD from vessels in an atrioventricular groove.','Trace the front-facing vessel that descends toward the apex; the selected structure has another anatomical role.'],
   'The LAD landmark is now recognized. The next step contrasts it with another major left coronary branch.'),
 },
 {
  id:'identify-lcx',title:'Identify LCx',instruction:'Select the LCx on the schematic.',educationalNote:'The LCx curves through the left atrioventricular groove.',type:'anatomy',correctAnswer:'lcx',category:'Anatomy Identification',points:5,
  instructor:guidance(
   'That is the LCx. Its curved course in the left atrioventricular groove helps distinguish it from the descending LAD.',
   'The selected structure is not the LCx. Look for the coronary branch whose conceptual path curves around the left side of the heart.',
   ['Contrast courses: the LCx curves laterally, while the LAD descends on the anterior surface.','Use the left atrioventricular groove as your landmark; the choice you made occupies a different region or has a different function.'],
   'You differentiated the two major left coronary branches. Continue to the right coronary territory.'),
 },
 {
  id:'identify-rca',title:'Identify RCA',instruction:'Select the RCA on the schematic.',educationalNote:'The RCA follows the right atrioventricular groove.',type:'anatomy',correctAnswer:'rca',category:'Anatomy Identification',points:5,
  instructor:guidance(
   'You selected the RCA. Its position in the right atrioventricular groove identifies the right-sided coronary territory in this schematic.',
   'That choice does not match the RCA. Recheck which coronary vessel follows the groove along the right side of the heart.',
   ['Separate side from shape: find the right-sided coronary course rather than a chamber or left coronary branch.','Anchor on the right atrioventricular groove; the selected item represents another landmark in the circulation.'],
   'The right coronary territory is oriented. Next you will identify a vessel outside the coronary branches.'),
 },
 {
  id:'identify-lima',title:'Identify LIMA',instruction:'Select the LIMA on the schematic.',educationalNote:'The LIMA descends along the inner chest wall.',type:'anatomy',correctAnswer:'lima',category:'Anatomy Identification',points:5,
  instructor:guidance(
   'That is the LIMA. Unlike the coronary vessels on the heart, it normally runs along the inner chest wall and is relevant as a CABG conduit concept.',
   'The selected structure belongs to a different anatomical group. Seek the vessel shown apart from the coronary surface pathways.',
   ['Recall the category difference: LIMA is a chest-wall artery, not a coronary artery or cardiac chamber.','Use its descending chest-wall course to distinguish it from structures located directly on the heart.'],
   'You completed the anatomy-identification sequence and can now apply those landmarks to a conceptual planning decision.'),
 },
 {
  id:'target',title:'Select target vessel',instruction:'Which principle best guides selection of a coronary target?',educationalNote:'Target selection integrates the disease distribution, viable myocardium, and the case plan.',type:'decision',correctAnswer:'integrated',category:'Decision Making',points:20,
  instructor:guidance(
   'Correct. A target decision is meaningful only when disease pattern, myocardial territory, and the overall plan are considered together.',
   'That answer relies on one feature instead of the clinical context. Look for the choice that combines anatomy, relevance, and the planned strategy.',
   ['Reconsider the whole case rather than a single visual or convenience cue; target selection is an integrated reasoning task.','A defensible target follows from several aligned factors. The latest choice still leaves the myocardial territory or case plan unaccounted for.'],
   'You demonstrated integrated target-selection reasoning. The following step checks whether the plan is deliberately confirmed.'),
  options:[option('largest','Always choose the visually largest vessel.','Size alone does not establish clinical relevance or myocardial benefit.'),option('integrated','Integrate coronary disease, myocardial territory, and the planned strategy.','The choice accounts for both anatomical context and the intended benefit.'),option('random','Choose any accessible coronary branch.','Accessibility alone is not a sound educational decision framework.')],
 },
 {
  id:'prepare',title:'Prepare coronary target',instruction:'Before proceeding conceptually, what should be confirmed?',educationalNote:'A deliberate pause verifies that the planned target and surrounding context remain appropriate.',type:'decision',correctAnswer:'confirm',category:'Procedure Sequence',points:8,
  instructor:guidance(
   'Yes. Confirming the target, relevant anatomy, and shared plan creates a deliberate reasoning checkpoint before the sequence advances.',
   'This option bypasses or changes the plan without a reasoned check. Choose the response that preserves a purposeful confirmation pause.',
   ['Pause and ask what remains to be reconciled: the target, anatomy, and plan should agree before moving forward conceptually.','The selected action still lacks a shared verification step. Routine momentum or routine change is not a substitute for confirmation.'],
   'The conceptual plan has been confirmed. You may continue to the graft-to-target relationship.'),
  options:[option('continue','Proceed without rechecking the plan.','Skipping confirmation removes an important safety pause.'),option('confirm','Confirm the target, plan, and relevant anatomy.','This aligns the intended target with the case before the next conceptual phase.'),option('switch','Change the target routinely.','A change should be reasoned, not routine or arbitrary.')],
 },
 {
  id:'distal',title:'Perform distal anastomosis',instruction:'Which educational priority best represents this phase?',educationalNote:'This simulation assesses principles, not operative technique.',type:'decision',correctAnswer:'flow',category:'Procedure Sequence',points:9,
  instructor:guidance(
   'Correct. The educational priority is maintaining a coherent graft-to-target relationship and intended direction of blood flow—not practicing a technical maneuver.',
   'That choice loses the conceptual purpose of this phase. Focus on how the planned graft and target relate, rather than speed or skipping ahead.',
   ['Stay at the reasoning level: orientation and intended flow matter more here than pace.','The sequence cannot be represented by omission. Reconnect this phase to the planned graft-to-target pathway.'],
   'You preserved the conceptual relationship between graft, target, and flow. Continue to consider the pathway as a whole.'),
  options:[option('speed','Prioritize speed over review.','Speed is not the primary educational goal.'),option('flow','Maintain orientation to the planned graft-to-target relationship and intended blood flow.','This keeps the phase tied to its conceptual purpose without describing operative technique.'),option('skip','Skip directly to final assessment.','Each conceptual phase and its checks must be completed.')],
 },
 {
  id:'proximal',title:'Perform proximal anastomosis',instruction:'What is the appropriate conceptual action at this stage?',educationalNote:'Sequence awareness links the graft pathway to its inflow and target.',type:'decision',correctAnswer:'verify-path',category:'Procedure Sequence',points:8,
  instructor:guidance(
   'Correct. Reviewing the inflow-to-target pathway keeps both ends of the conceptual plan consistent and preserves sequence awareness.',
   'That response treats part of the pathway in isolation. Select the action that reconciles inflow, target, and sequence.',
   ['Think end-to-end: a coherent graft concept connects its source and target rather than ignoring an earlier decision.','Assumption is not verification. The best response explicitly checks that the planned pathway still makes sense as a whole.'],
   'The full conceptual graft pathway is coherent. The next step asks whether its intended function is supported.'),
  options:[option('verify-path','Verify the planned inflow-to-target pathway and sequence.','This connects the current phase with the earlier target plan.'),option('ignore','Ignore the distal plan.','The proximal and distal plan must be considered together.'),option('assume','Assume orientation without review.','Explicit orientation reduces avoidable sequencing errors.')],
 },
 {
  id:'patency',title:'Check graft patency',instruction:'Which finding is the intended outcome of a conceptual patency check?',educationalNote:'Patency assessment asks whether the graft pathway supports the intended perfusion.',type:'decision',correctAnswer:'expected-flow',category:'Safety Checks',points:10,
  instructor:guidance(
   'Correct. The conceptual endpoint of patency assessment is evidence that supports unobstructed intended flow through the planned pathway.',
   'That choice does not establish function. Look for evidence tied to intended flow rather than appearance or confidence in earlier steps.',
   ['Distinguish looking complete from functioning as intended; patency is a functional concept.','Prior correctness does not remove the need for a dedicated check. Choose the outcome that addresses flow through the pathway.'],
   'You recognized the purpose of the functional check. Continue to a separate review of unresolved safety concerns.'),
  options:[option('expected-flow','Evidence consistent with unobstructed intended flow.','This directly addresses the functional purpose of patency assessment.'),option('appearance','External appearance alone.','Appearance alone does not establish functional patency.'),option('omit','No check is needed if prior steps were correct.','A dedicated functional check remains important.')],
 },
 {
  id:'hemostasis',title:'Assess hemostasis',instruction:'What is the safest conceptual approach before completion?',educationalNote:'A systematic review is more reliable than an assumption based on a single observation.',type:'decision',correctAnswer:'systematic',category:'Safety Checks',points:10,
  instructor:guidance(
   'Correct. A structured review is more dependable than a single observation because it reduces the chance that an unresolved concern is overlooked.',
   'That approach is incomplete or delayed. Choose the response that deliberately reviews relevant concerns before completion.',
   ['One reassuring observation cannot represent the whole safety review; use the option that is systematic.','Completion should follow review, not precede it. The current choice leaves possible concerns unreconciled.'],
   'The safety review has been represented systematically. You are ready to synthesize the entire exercise.'),
  options:[option('systematic','Perform a structured review of the operative field and relevant concerns.','A structured review supports recognition of unresolved concerns.'),option('single','Rely on one isolated observation.','A single observation is not a complete assessment.'),option('defer','Defer all assessment until after completion.','Assessment belongs before declaring the procedure complete.')],
 },
 {
  id:'complete',title:'Complete procedure',instruction:'Which synthesis supports declaring this simulation complete?',educationalNote:'Completion follows review of the plan, sequence, functional check, and safety findings.',type:'decision',correctAnswer:'all-verified',category:'Final Assessment',points:10,
  instructor:guidance(
   'Correct. Completion is supported when the plan, conceptual sequence, functional check, and safety review tell one consistent story.',
   'That answer uses a proxy for completion. Select the synthesis that reconciles the plan and all required conceptual checks.',
   ['Neither visiting labels nor earning points proves that the reasoning chain is complete; look for the comprehensive review.','Return to the four evidence groups: pathway, sequence, function, and safety. Completion depends on their agreement.'],
   'You completed all CABG learning steps. Proceed to the assessment to review your application score and learning record.'),
  options:[option('steps-only','All sequence labels were visited.','Visiting steps does not prove that findings and checks were reviewed.'),option('all-verified','The planned pathway, completed sequence, patency concept, and safety review are reconciled.','This integrates the full exercise rather than relying on a single indicator.'),option('score','The score appears high enough.','A score never substitutes for completing the required review.')],
 },
];
