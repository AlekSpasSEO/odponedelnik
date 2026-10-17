import {regions,services,people,regionBySlug,serviceBySlug,priceFor,number,normalize} from './data.mjs';
import {icon,personCard,escape} from './ui.mjs';

const base=document.querySelector('meta[name="site-base"]').content;
const {region,service,sub,kind}=document.body.dataset;
const key='odponedelnik.saved.v1';
let saved=new Set(),storageAvailable=true;
try {const data=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(data)) saved=new Set(data.filter(id=>people.some(p=>p.id===id)));}catch {storageAvailable=false;}
let toastTimer;
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),3500);}
function syncSaves(){
  document.querySelectorAll('[data-saved-count]').forEach(el=>el.textContent=saved.size);
  document.querySelectorAll('[data-save]').forEach(el=>{
    const p=people.find(p=>p.id===el.dataset.save);if(!p)return;
    const active=saved.has(p.id);el.setAttribute('aria-pressed',String(active));el.setAttribute('aria-label',`${active?'Отстрани од тефтерче':'Зачувај'}: ${p.name}`);
    if(el.classList.contains('button'))el.innerHTML=`${icon('heart')}${active?'Зачувано':'Зачувај профил'}`;
  });
}
function renderSaved(){
  if(kind!=='zacuvani')return;
  const list=document.getElementById('saved-list');
  list.innerHTML=people.filter(p=>saved.has(p.id)).map(p=>personCard(p,{base})).join('');
  document.getElementById('saved-empty').hidden=saved.size>0;syncSaves();
}
function toggleSaved(id){
  if(!people.some(p=>p.id===id))return;
  saved.has(id)?saved.delete(id):saved.add(id);
  try {localStorage.setItem(key,JSON.stringify([...saved]));storageAvailable=true;}catch{storageAvailable=false;}
  syncSaves();renderSaved();
  toast(storageAvailable?(saved.has(id)?'Запишано во твоето тефтерче.':'Профилот е отстранет од тефтерчето.'):'Прелистувачот не дозволува зачувување. Изборот важи само додека е отворена страницата.');
}
syncSaves();renderSaved();
window.addEventListener('storage',event=>{if(event.key!==key)return;try{const data=JSON.parse(event.newValue||'[]');saved=new Set(Array.isArray(data)?data.filter(id=>people.some(p=>p.id===id)):[]);syncSaves();renderSaved();}catch{}});

const menu=document.querySelector('.menu-toggle');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.getElementById('main-nav').classList.toggle('open',open);});
document.querySelectorAll('#main-nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');document.getElementById('main-nav').classList.remove('open');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');document.getElementById('main-nav').classList.remove('open');}});
document.getElementById('finder')?.addEventListener('submit',event=>{event.preventDefault();const form=new FormData(event.currentTarget);const r=form.get('region'),s=form.get('service');if(!regionBySlug(r))return;location.href=`${base}/${r}/${serviceBySlug(s)?s+'/':''}`;});
document.getElementById('directory-region')?.addEventListener('change',event=>{if(regionBySlug(event.target.value))location.href=`${base}/${event.target.value}/${service}/${sub?sub+'/':''}`;});

function filterPeople(){
  const query=normalize(document.getElementById('person-search').value.trim());
  const list=document.getElementById('person-list');
  const order=document.getElementById('sort').value;
  const cards=[...list.querySelectorAll('[data-person]')];
  cards.sort((a,b)=>order==='price-asc'?Number(a.dataset.price)-Number(b.dataset.price):order==='price-desc'?Number(b.dataset.price)-Number(a.dataset.price):order==='name'?a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent,'mk'):Number(b.dataset.rating)-Number(a.dataset.rating));
  let count=0;
  cards.forEach(card=>{const p=people.find(p=>p.id===card.dataset.person);card.hidden=!normalize(`${p.name} ${p.area} ${p.city} ${p.specialties.join(' ')}`).includes(query);if(!card.hidden)count++;list.append(card);});
  document.getElementById('result-count').textContent=count;
  document.getElementById('no-results').hidden=count>0;
}
document.getElementById('person-search')?.addEventListener('input',filterPeople);
document.getElementById('sort')?.addEventListener('change',filterPeople);
document.getElementById('reset-search')?.addEventListener('click',()=>{document.getElementById('person-search').value='';filterPeople();document.getElementById('person-search').focus();});

const profileDialog=document.getElementById('profile-dialog');
let activeProfile=null,priorHash='';
function showProfile(id,writeHash=true){
  const p=people.find(x=>x.id===id);if(!p)return;
  activeProfile=p;
  const s=serviceBySlug(p.service),r=regionBySlug(p.region),price=priceFor(p,p.service===service?sub:'');
  const link=`${location.origin}${base}/${p.region}/${p.service}/${p.service===service&&sub?sub+'/':''}#majstor-${p.id}`;
  document.getElementById('profile-content').innerHTML=`<p class="eyebrow">ОД МАЈСТОРСКОТО ТЕФТЕРЧЕ · ДЕМО</p><div class="dialog-profile-header"><div class="avatar ${p.color}" aria-hidden="true"><span>${p.name.split(' ').map(x=>x[0]).join('')}</span></div><div><p class="person-trade">${s.trade}</p><h2 id="profile-title">${p.name}</h2><p class="location">${icon('pin')}${p.area}, ${p.city}</p></div></div><p class="profile-description">${p.description}</p><div class="profile-facts"><div><strong>★ ${p.rating.toFixed(1)}</strong><small>измислена оценка</small></div><div><strong>${p.experience} години</strong><small>примерно искуство</small></div><div><strong>${r.name}</strong><small>регион на работа</small></div></div><div class="profile-specialties"><h3>За што е мајстор?</h3><ul>${s.subs.map(x=>`<li><a href="${base}/${p.region}/${p.service}/${x.slug}/">${x.name} ↗</a></li>`).join('')}</ul></div><div class="profile-specialties"><h3>Примерен ценовен опсег</h3><p><strong>${number(price.min)}–${number(price.max)} ден.</strong> / ${price.unit}</p><p class="list-disclosure">Само труд. Измислен пример, без материјали и патни трошоци.</p></div><div class="profile-disclosure"><strong>Ова е измислена персона.</strong> Нема вистински контакт, достапност или резервација. Оценката не е добиена од кориснички рецензии.</div><div class="profile-actions"><button class="button" data-save="${p.id}" aria-pressed="false">${icon('heart')}Зачувај профил</button><button class="button" id="copy-profile">Копирај линк ${icon('arrow')}</button></div><p class="profile-link-display" id="copy-fallback" hidden></p>`;
  syncSaves();
  document.getElementById('copy-profile').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(link);toast('Линкот до профилот е копиран.');}catch{const el=document.getElementById('copy-fallback');el.innerHTML=`Копирај ја адресата: <a href="${escape(link)}">${escape(link)}</a>`;el.hidden=false;}});
  if(!profileDialog.open){priorHash=location.hash.startsWith('#majstor-')?'':location.hash;profileDialog.showModal();}
  if(writeHash)history.replaceState(null,'',`#majstor-${id}`);
}
profileDialog.addEventListener('close',()=>{activeProfile=null;if(location.hash.startsWith('#majstor-'))history.replaceState(null,'',location.pathname+location.search+priorHash);});
function openHash(){if(location.hash.startsWith('#majstor-'))showProfile(location.hash.slice(9),false);else if(profileDialog.open)profileDialog.close();}
window.addEventListener('hashchange',openHash);
openHash();

const searchDialog=document.getElementById('search-dialog');
function searchServices(){
  const input=normalize(document.getElementById('service-search').value.trim());
  const selected=document.getElementById('search-region').value;
  if(!regionBySlug(selected))return;
  const matches=services.flatMap(s=>[
    {name:s.name,desc:'Сите подуслуги · 5 мајстори',slug:s.slug,icon:s.icon,search:`${s.name} ${s.keywords}`},
    ...s.subs.map(x=>({name:x.name,desc:`${s.name} · 5 мајстори`,slug:`${s.slug}/${x.slug}`,icon:s.icon,search:`${x.name} ${s.name} ${s.keywords} ${x.description}`}))
  ]).filter(x=>normalize(x.search).includes(input));
  document.getElementById('search-result-count').textContent=`${matches.length} ${matches.length===1?'резултат':'резултати'} во ${regionBySlug(selected).name.toLowerCase()} регион`;
  document.getElementById('search-results').innerHTML=matches.length?matches.map(x=>`<a class="search-result" href="${base}/${selected}/${x.slug}/">${icon(x.icon)}<div><strong>${x.name}</strong><small>${x.desc}</small></div><span>↗</span></a>`).join(''):'<div class="empty-state"><h3>Овој занает уште го нема.</h3><p>Пробај со „водовод“, „плочки“ или „клима“.</p></div>';
}
document.querySelectorAll('[data-open-search]').forEach(button=>button.addEventListener('click',()=>{searchServices();searchDialog.showModal();document.getElementById('service-search').focus();}));
document.getElementById('service-search').addEventListener('input',searchServices);
document.getElementById('search-region').addEventListener('change',searchServices);
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});});
document.addEventListener('click',event=>{const save=event.target.closest('[data-save]');if(save){toggleSaved(save.dataset.save);return;}const profile=event.target.closest('[data-profile]');if(profile)showProfile(profile.dataset.profile);});
