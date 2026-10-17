import {services,regions,priceFor,number,serviceBySlug} from './data.mjs';
export const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function icon(name,cls='') {
  const paths={
    pipe:'<path d="M8 7h13v9h-6v18h16V23h10v18H8z"/><path d="M4 5h20v5H4zm24 15h16v6H28z"/>',
    bolt:'<path d="M27 3 10 27h12l-2 18 18-27H26z"/>',
    brush:'<path d="M10 5h28v17H10zM15 5v8m6-8v8m6-8v8m6-8v8M10 22l8 6v13a6 6 0 0 0 12 0V28l8-6"/>',
    tiles:'<path d="M6 6h15v15H6zm21 0h15v15H27zM6 27h15v15H6zm21 0h15v15H27z"/>',
    saw:'<path d="m6 30 25-20 11 6-6 12-5-2-4 6-4-2-4 6-4-2-4 6z"/><path d="m31 14 6 3-3 6-6-3z"/>',
    sun:'<circle cx="24" cy="24" r="10"/><path d="M24 3v6m0 30v6M3 24h6m30 0h6M9 9l5 5m20 20 5 5M9 39l5-5m20-20 5-5"/>',
    washer:'<rect x="8" y="4" width="32" height="40" rx="2"/><circle cx="24" cy="28" r="11"/><path d="M8 13h32m-26-5h2m5 0h2m-8 22q8-8 18 0"/>',
    roof:'<path d="m3 23 21-18 21 18M9 22v22h30V22M19 44V29h10v15M33 12V5h6v12"/>',
    floor:'<path d="M5 8h38v32H5zm0 10h38M5 29h38M18 8v10m14 0v11M16 29v11"/>',
    key:'<circle cx="16" cy="17" r="10"/><circle cx="16" cy="17" r="3"/><path d="m23 24 18 18 5-5-5-5-4 4-4-4 3-3-6-6"/>',
    arrow:'<path d="M8 24h32M28 12l12 12-12 12"/>',
    heart:'<path d="M24 41 6 23C-5 9 15-1 24 13 33-1 53 9 42 23z"/>',
    search:'<circle cx="20" cy="20" r="13"/><path d="m30 30 13 13"/>',
    pin:'<path d="M24 44S8 28 8 18a16 16 0 0 1 32 0c0 10-16 26-16 26Z"/><circle cx="24" cy="18" r="5"/>',
    close:'<path d="m10 10 28 28M10 38l28-28"/>',
    check:'<path d="m7 24 11 11L41 12"/>'
  };
  return `<svg class="icon ${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.pipe}</svg>`;
}
export function personCard(p,{base='',sub='',compact=false}={}) {
  const s=serviceBySlug(p.service),price=priceFor(p,sub);
  return `<article class="person-card ${compact?'compact':''}" data-person="${p.id}" data-rating="${p.rating}" data-price="${price.min}">
    <div class="person-top"><div class="avatar ${p.color}" aria-hidden="true"><span>${p.name.split(' ').map(x=>x[0]).join('')}</span><small>${icon(s.icon)}</small></div><button class="save-button" data-save="${p.id}" aria-pressed="false" aria-label="Зачувај: ${p.name}">${icon('heart')}</button></div>
    <div class="person-info"><div class="person-trade">${s.trade} <span>• демо</span></div><h3><button data-profile="${p.id}">${p.name}</button></h3><p class="location">${icon('pin')}${p.area}, ${p.city}</p><div class="specialties">${p.specialties.map(t=>`<span>${t}</span>`).join('')}</div></div>
    <div class="person-bottom"><div class="rating"><span aria-hidden="true">★</span> ${p.rating.toFixed(1)} <small>демо-оценка</small></div><div class="price"><strong>${number(price.min)}–${number(price.max)} ден.</strong><small>демо / ${price.unit}</small></div><button class="profile-link" data-profile="${p.id}">Види профил ${icon('arrow')}</button></div>
  </article>`;
}
export function serviceCard(s,region,base,index) {
  return `<a class="service-card ${s.color}" href="${base}/${region}/${s.slug}/"><span class="service-no">${String(index+1).padStart(2,'0')}</span>${icon(s.icon)}<h3>${s.name}</h3><p>2 подуслуги <span>·</span> 5 мајстори</p><span class="card-arrow">↗</span></a>`;
}
export const regionOptions = selected => regions.map(r=>`<option value="${r.slug}" ${r.slug===selected?'selected':''}>${r.name} регион</option>`).join('');
export const serviceOptions = selected => services.map(s=>`<option value="${s.slug}" ${s.slug===selected?'selected':''}>${s.name}</option>`).join('');
