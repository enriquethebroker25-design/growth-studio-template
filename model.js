(function(root){
  const object=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
  const text=x=>typeof x==='string'&&x.length<=200000;
  function normalize(x,defaults){
    if(!object(x)||!object(x.base)||!Array.isArray(x.ideas)||!object(x.scripts)||!Array.isArray(x.calendar))throw Error('Respaldo inválido');
    if(!Object.values(x.base).every(text)||!Object.values(x.scripts).every(text))throw Error('Textos inválidos');
    if(!x.ideas.every(i=>object(i)&&['id','title','market','audience','format','hook','body','cta'].every(k=>text(i[k]))))throw Error('Ideas inválidas');
    if(!x.calendar.every(d=>object(d)&&['date','type','title','cta'].every(k=>text(d[k]))&&/^\d{4}-\d{2}-\d{2}$/.test(d.date)&&Array.isArray(d.checks)&&d.checks.every(v=>typeof v==='boolean')&&typeof d.done==='boolean'))throw Error('Calendario inválido');
    for(const k of ['pillars','production','publications','measurements','experiments'])if(x[k]!==undefined&&(!Array.isArray(x[k])||!x[k].every(object)))throw Error('Módulo inválido');
    const s={...structuredClone(defaults),...x,base:{...defaults.base,...x.base}};
    for(const k of ['pillars','production','publications','measurements','experiments'])s[k]=x[k]||[];
    for(const k of ['baseResult','inventory','notes'])if(!text(s[k]))throw Error('Texto inválido');
    if(!Number.isSafeInteger(s.week)||s.week<0)throw Error('Semana inválida');
    if(!s.pillars.every(p=>text(p.id)&&text(p.name)&&text(p.description)&&Number.isFinite(p.weight)&&p.weight>=0&&p.weight<=100))throw Error('Pilares inválidos');
    if(!s.production.every(p=>text(p.id)&&text(p.title)&&text(p.script)&&text(p.date)&&['Pendiente','Grabación','Edición','Listo'].includes(p.stage)))throw Error('Producción inválida');
    if(!s.publications.every(p=>text(p.id)&&text(p.title)&&text(p.date)&&text(p.caption)&&text(p.url)&&typeof p.approved==='boolean'&&typeof p.published==='boolean'&&text(p.format)))throw Error('Publicaciones inválidas');
    if(!s.measurements.every(m=>text(m.id)&&text(m.publicationId)&&text(m.date)&&['reach','views','likes','comments','saves','shares','leads'].every(k=>Number.isSafeInteger(m[k])&&m[k]>=0)))throw Error('Métricas inválidas');
    if(!s.experiments.every(e=>text(e.id)&&text(e.hypothesis)&&text(e.action)&&text(e.date)&&text(e.result)&&['Pendiente','En prueba','Concluido'].includes(e.status)))throw Error('Experimentos inválidos');
    return s;
  }
  function rate(m){return m.reach>0?100*(m.likes+m.comments+m.saves+m.shares)/m.reach:null}
  function instagramUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&['instagram.com','www.instagram.com'].includes(u.hostname)}catch{return false}}
  root.StudioModel={normalize,rate,instagramUrl};
})(globalThis);
