const agents = [
  {id:'astra',name:'Astra',model:'GPT-6 ASTRA',accent:'#c8b3ff',role:'La visión',tagline:'Para lo que todavía<br>parece imposible.',description:'La inteligencia más capaz de OpenAI para el trabajo más exigente. Razonamiento, código e investigación que conectan la idea con su ejecución.',label:'RAZONAMIENTO DE FRONTERA',detailTitle:'Ve más lejos.<br>Conecta más ideas.',intro:'Un modelo pensado para resolver trabajos complejos de principio a fin, con razonamiento ajustable a la profundidad del reto.',capabilities:[['Razonamiento complejo','Aborda problemas con múltiples pasos y relaciones difíciles de identificar.'],['Código, investigación y documentos','Una base para desarrollar software, investigar y crear entregables.'],['Herramientas para actuar','Admite llamadas a funciones y uso del ordenador en entornos compatibles.']],effort:'low → max',case:'“Analiza esta arquitectura, identifica el cuello de botella y propone una solución con un plan de validación.”'},
  {id:'sol',name:'Sol',model:'GPT-5.6 SOL',accent:'#ffd493',role:'La energía',tagline:'Grandes ideas.<br>Trabajo que avanza.',description:'El modelo insignia de la familia GPT-5.6 para trabajo profesional complejo. Una base versátil para convertir objetivos en entregables.',label:'CAPACIDAD PROFESIONAL',detailTitle:'De la intención<br>a la ejecución.',intro:'La categoría principal de GPT-5.6: capacidad para trabajo profesional y libertad para ajustar cuánto razonamiento necesita cada tarea.',capabilities:[['Versatilidad profesional','Combina comprensión de texto e imágenes con generación de texto y código.'],['Profundidad configurable','Elige entre responder sin razonamiento adicional o dedicar más esfuerzo al problema.'],['Integración estructurada','Llamadas a funciones y salidas estructuradas para conectar resultados con tus flujos.']],effort:'none → max',case:'“Convierte este brief en una propuesta de producto: alcance, prioridades y un primer plan de implementación.”'},
  {id:'terra',name:'Terra',model:'GPT-5.6 TERRA',accent:'#9be7bd',role:'El equilibrio',tagline:'Ideas con raíces.<br>Progreso constante.',description:'Capacidad y costo en equilibrio. Terra lleva la inteligencia de la familia GPT-5.6 a los trabajos donde cada recurso cuenta.',label:'INTELIGENCIA EN EQUILIBRIO',detailTitle:'Una base sólida.<br>Muchas posibilidades.',intro:'Diseñado para cargas de trabajo que buscan equilibrar inteligencia y costo; ocupa una categoría similar a los modelos mini anteriores.',capabilities:[['Texto e imágenes en contexto','Recibe documentos y contenido visual para producir respuestas en texto.'],['Razonamiento a tu medida','Ajusta el esfuerzo según la complejidad y las necesidades del proyecto.'],['Resultados listos para integrar','Admite salidas estructuradas y llamadas a funciones en aplicaciones compatibles.']],effort:'none → max',case:'“Revisa estas notas de proyecto y organízalas en decisiones, tareas pendientes y preguntas por resolver.”'},
  {id:'luna',name:'Luna',model:'GPT-5.6 LUNA',accent:'#c3d9f5',role:'La ligereza',tagline:'Menos fricción.<br>Más posibilidades.',description:'Optimizado para tareas sensibles al costo y de gran volumen. Luna es la opción para multiplicar procesos enfocados dentro de tu trabajo con IA.',label:'EFICIENCIA A ESCALA',detailTitle:'Lo pequeño,<br>a gran escala.',intro:'La categoría más económica de esta colección, equivalente en enfoque a los modelos nano: tareas acotadas que se repiten muchas veces.',capabilities:[['Volumen con eficiencia','Diseñado para procesar muchas tareas cuando el costo es una prioridad.'],['Estructura consistente','Puede devolver datos con un esquema definido para facilitar su procesamiento.'],['Control del razonamiento','Configura el esfuerzo y valida los resultados con ejemplos de tu propio flujo.']],effort:'none → max',case:'“Clasifica estas solicitudes por tema y devuelve un JSON con categoría, resumen breve y prioridad propuesta.”'}
];
const worlds=document.querySelector('#worlds');
worlds.innerHTML=agents.map((a,i)=>`<section class="world" id="${a.id}" style="--accent:${a.accent}" aria-label="${a.name}" ${i?'inert aria-hidden="true"':''}><div class="scene-track">
  <article class="scene overview" aria-label="${a.name}: presentación"><img class="scene-bg" src="assets/${a.id}-1.webp" alt="" ${i?'loading="lazy"':'fetchpriority="high"'} width="1536" height="864"><div class="hero-content"><div class="eyebrow">${a.model}<span> / </span>${a.role}</div><h2 class="agent-name">${a.name}</h2><p class="tagline">${a.tagline}</p><p class="description">${a.description}</p><div class="hero-links"><button class="pill-button" data-discover="${i}">Explorar capacidades <span aria-hidden="true">→</span></button><button class="text-link" data-open-info style="background:none">Conocer la colección</button></div></div><div class="orbital-label">${a.label}<span>0${i+1} / CUATRO FORMAS DE CREAR</span></div></article>
  <article class="scene detail" aria-label="${a.name}: capacidades" aria-hidden="true" inert><img class="scene-bg" src="assets/${a.id}-2.webp" alt="" loading="lazy" width="1536" height="864"><div class="detail-content"><div><div class="eyebrow">${a.name} / Capacidades</div><h2 class="detail-title">${a.detailTitle}</h2><p class="detail-intro">${a.intro}</p><div class="capabilities">${a.capabilities.map(([title,copy],j)=>`<div class="capability"><span class="capability-number">0${j+1}</span><div><h3>${title}</h3><p>${copy}</p></div></div>`).join('')}</div></div><aside class="spec-panel" aria-label="Ficha técnica de ${a.name}"><h3>UNA MIRADA AL MODELO</h3><dl class="specs"><div><dt>Tokens de contexto</dt><dd>1,05 M</dd></div><div><dt>Máximo de salida</dt><dd>128 K</dd></div><div class="wide"><dt>Niveles de esfuerzo de razonamiento (API)</dt><dd>${a.effort}</dd></div><div class="wide"><dt>Modalidades nativas</dt><dd>Texto + imagen → texto</dd></div></dl><div class="use-case"><span>Una idea para tus proyectos</span><p>${a.case}</p></div><a class="text-link" href="https://developers.openai.com/api/docs/models/${a.model.toLowerCase().replace(' ','-')}" target="_blank" rel="noreferrer">Ficha oficial de ${a.name} ↗</a></aside></div></article>
</div></section>`).join('');
let active=0;
const slides=[0,0,0,0];
const sections=[...document.querySelectorAll('.world')];
const dialog=document.querySelector('#info-dialog');
const announcement=document.querySelector('#announcement');
const dots=document.querySelector('#slide-dots');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle=document.querySelector('#reduce-motion');
motionToggle.checked=reduced.matches;
motionToggle.addEventListener('change',()=>document.body.classList.toggle('reduce-motion',motionToggle.checked));
function render(announce=true){
  const a=agents[active];
  document.documentElement.style.setProperty('--accent',a.accent);
  worlds.style.transform=`translateY(-${active*100}%)`;
  sections.forEach((section,i)=>{section.inert=i!==active;section.setAttribute('aria-hidden',String(i!==active));section.querySelector('.scene-track').style.transform=`translateX(-${slides[i]*100}%)`;section.querySelectorAll('.scene').forEach((scene,j)=>{scene.inert=j!==slides[i];scene.setAttribute('aria-hidden',String(j!==slides[i]));});});
  document.querySelectorAll('.agent-nav a,.world-index a').forEach(link=>{if(link.hash===`#${a.id}`)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  document.querySelector('#previous-slide').disabled=slides[active]===0;
  document.querySelector('#next-slide').disabled=slides[active]===1;
  dots.innerHTML=[0,1].map(s=>`<button aria-label="${s?'Capacidades':'Presentación'} de ${a.name}" ${s===slides[active]?'aria-current="step"':''} data-slide="${s}"></button>`).join('');
  document.querySelector('#next-world-label').textContent=active<3?`Scroll para descubrir ${agents[active+1].name}`:'Volver a Astra';
  document.querySelector('.scroll-icon').textContent=active<3?'↓':'↑';
  if(announce)announcement.textContent=`${a.name}, ${slides[active]?'capacidades':'presentación'}. Agente ${active+1} de 4.`;
  // Warm only the next scene; keep the initial download small.
  const next=sections[active].querySelectorAll('.scene-bg')[1];next.loading='eager';
}
function moveWorld(index,updateHash=true){const n=Math.max(0,Math.min(3,index));if(n===active)return;const oldFocus=document.activeElement;active=n;render();if(oldFocus?.closest('.world'))document.querySelector('#experience').focus({preventScroll:true});if(updateHash)history.replaceState(null,'',`#${agents[active].id}`);}
function moveSlide(index){const n=Math.max(0,Math.min(1,index));if(n===slides[active])return;const oldFocus=document.activeElement;slides[active]=n;render();if(oldFocus?.closest('.scene')||oldFocus?.closest('#slide-dots'))document.querySelector('#experience').focus({preventScroll:true});}
document.addEventListener('click',event=>{const anchor=event.target.closest('a[href^="#"]');if(anchor&&agents.some(a=>`#${a.id}`===anchor.hash)){event.preventDefault();moveWorld(agents.findIndex(a=>`#${a.id}`===anchor.hash));}if(event.target.closest('[data-discover]'))moveSlide(1);const dot=event.target.closest('[data-slide]');if(dot)moveSlide(Number(dot.dataset.slide));if(event.target.closest('[data-open-info]'))dialog.showModal();});
document.querySelector('#close-info').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#previous-slide').addEventListener('click',()=>moveSlide(slides[active]-1));
document.querySelector('#next-slide').addEventListener('click',()=>moveSlide(slides[active]+1));
document.querySelector('#next-world').addEventListener('click',()=>moveWorld(active===3?0:active+1));
function currentScene(){return sections[active].querySelectorAll('.scene')[slides[active]];}
function canScrollInside(delta){const el=currentScene();return delta>0?el.scrollTop+el.clientHeight<el.scrollHeight-3:el.scrollTop>3;}
let lastWheel=0,gestureLocked=false,wheelTotal=0;
window.addEventListener('wheel',event=>{
  if(dialog.open||event.ctrlKey)return;
  const horizontal=Math.abs(event.deltaX)>Math.abs(event.deltaY);
  const delta=(horizontal?event.deltaX:event.deltaY)*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
  if(!horizontal&&canScrollInside(delta))return;
  event.preventDefault();
  const now=performance.now();if(now-lastWheel>180){gestureLocked=false;wheelTotal=0;}lastWheel=now;
  if(gestureLocked)return;wheelTotal+=delta;
  if(Math.abs(wheelTotal)<24)return;
  gestureLocked=true;
  if(horizontal)moveSlide(slides[active]+Math.sign(wheelTotal));else moveWorld(active+Math.sign(wheelTotal));
},{passive:false});
document.addEventListener('keydown',event=>{
  if(dialog.open||event.ctrlKey||event.altKey||event.metaKey||event.target.matches('input,textarea,select'))return;
  const keys=['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','PageDown','PageUp','Home','End'];if(!keys.includes(event.key))return;
  event.preventDefault();if(event.repeat)return;
  if(event.key==='ArrowRight')moveSlide(slides[active]+1);
  else if(event.key==='ArrowLeft')moveSlide(slides[active]-1);
  else if(event.key==='Home')moveWorld(0);
  else if(event.key==='End')moveWorld(3);
  else{const delta=['ArrowDown','PageDown'].includes(event.key)?1:-1;if(canScrollInside(delta))currentScene().scrollBy({top:delta*currentScene().clientHeight*.7,behavior:'instant'});else moveWorld(active+delta);}
});
let touch=null;
document.querySelector('#experience').addEventListener('touchstart',event=>{if(event.touches.length!==1){touch=null;return;}const t=event.touches[0];touch={x:t.clientX,y:t.clientY,top:currentScene().scrollTop};},{passive:true});
document.querySelector('#experience').addEventListener('touchend',event=>{if(!touch||dialog.open)return;const t=event.changedTouches[0],dx=touch.x-t.clientX,dy=touch.y-t.clientY;const scrolled=Math.abs(currentScene().scrollTop-touch.top)>3;touch=null;if(Math.max(Math.abs(dx),Math.abs(dy))<50)return;if(Math.abs(dx)>Math.abs(dy)*1.2)moveSlide(slides[active]+Math.sign(dx));else if(!scrolled&&!canScrollInside(dy))moveWorld(active+Math.sign(dy));},{passive:true});
function readHash(){const i=agents.findIndex(a=>`#${a.id}`===location.hash);if(i>=0)active=i;render(false);}
window.addEventListener('hashchange',readHash);
readHash();
