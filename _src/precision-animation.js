let mode=0,paused=false,time=0,previous=null,rate=1,raf=0,motionBlocked=false;
const get=id=>document.getElementById(id),set=(id,n,v)=>get(id).setAttribute(n,v),button=get('play');
const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x)},mix=(a,b,u)=>a+(b-a)*u;
const between=(t,a,b)=>smooth((t-a)/(b-a));
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const descriptions=['Salta, se acerca a la g, muerde y mastica. La letra conserva el hueco del bocado.','Tras aterrizar, salta otra vez, se agarra a las letras, se balancea y vuelve al suelo.','Toma impulso, recoge las piernas, da una voltereta completa y amortigua el aterrizaje.','Salta a lo alto de Alma, mantiene el equilibrio sobre la letra y vuelve al suelo.'];
// All positions use the original 1000 × 1000 artwork coordinate system.
// The cut and the detached piece share one path: no approximation or swapped logo.
const BITE={x:563,y:478},MOUTH={x:503,y:596},DURATION=11;
function sample(t,keys){
 if(t<=keys[0].t)return {...keys[0]};
 for(let i=1;i<keys.length;i++)if(t<=keys[i].t){const a=keys[i-1],b=keys[i],u=smooth((t-a.t)/(b.t-a.t));const p={};for(const k of ['x','y','s','a','sx','sy'])p[k]=mix(a[k]??(k==='s'||k==='sx'||k==='sy'?1:0),b[k]??(k==='s'||k==='sx'||k==='sy'?1:0),u);return p;}
 return {...keys.at(-1)};
}
const at=(t,x,y,s=1,a=0,sx=1,sy=1)=>({t,x,y,s,a,sx,sy});
const intro=[at(0,510,385,.64),at(.65,510,310,.64),at(1.2,510,310,.64),at(1.48,510,325,.66,0,1.07,.91),at(1.85,515,245,.76,-7),at(2.2,520,280,.85,-5),at(2.82,510,725),at(2.97,510,738,1,0,1.09,.87),at(3.15,510,719,1,0,.98,1.06),at(3.42,510,725)];
const bite=[at(3.42,510,725),at(4,521,725,1,-3),at(4.3,526,735,1,0,1.04,.90),at(4.72,549,584,.92,-5),at(5.15,569.3,567.1,.9),at(5.64,569.3,540.1,.9),at(6.06,569.3,540.1,.9),at(6.38,573,560,.92,3),at(6.95,555,710,1,2),at(7.1,552,737,1,0,1.07,.88),at(7.35,550,725),at(11,550,725)];
const hang=[at(3.42,510,725),at(4,510,738,1,0,1.06,.9),at(4.48,519,575,.94,-3),at(4.75,520,567,.94),at(5,520,582,.94),at(5.4,537,590,.94,7),at(5.95,503,585,.94,-7),at(6.5,531,590,.94,5),at(7,513,585,.94,-3),at(7.35,520,582,.94),at(7.6,520,576,.94),at(8.1,510,725),at(8.25,510,738,1,0,1.09,.87),at(8.5,510,721,1,0,.99,1.04),at(8.75,510,725),at(11,510,725)];
const flip=[at(3.42,510,725),at(4.05,510,740,1,-7,1.07,.85),at(4.38,510,575,1,-35),at(4.72,510,540,1,-165),at(5.02,510,565,1,-290),at(5.4,510,725,1,-360),at(5.55,510,740,1,-360,1.1,.85),at(5.8,510,719,1,-360,.98,1.06),at(6.1,510,725,1,-360),at(11,510,725,1,-360)];
const balance=[at(3.42,510,725),at(3.95,505,738,1,-5,1.06,.87),at(4.38,470,360,.72,-10),at(4.8,443,148,.55,-3),at(5.1,443,171.65,.55),at(7.2,443,171.65,.55),at(7.5,455,147,.57,7),at(7.85,485,320,.73,10),at(8.35,510,725),at(8.5,510,739,1,0,1.08,.86),at(8.8,510,721),at(9.1,510,725),at(11,510,725)];
function world(p,x,y){const a=p.a*Math.PI/180,dx=(x-510)*p.s*p.sx,dy=(y-665)*p.s*p.sy;return{x:p.x+dx*Math.cos(a)-dy*Math.sin(a),y:p.y+dx*Math.sin(a)+dy*Math.cos(a)}}
function local(p,x,y){const a=-p.a*Math.PI/180,dx=x-p.x,dy=y-p.y;return{x:510+(dx*Math.cos(a)-dy*Math.sin(a))/(p.s*p.sx),y:665+(dx*Math.sin(a)+dy*Math.cos(a))/(p.s*p.sy)}}
function pose(t){
 const p=sample(t,t<=3.42?intro:[bite,hang,flip,balance][mode]);
 if(mode===3&&t>=5.1&&t<=7.2){
  p.a=Math.sin((t-5.1)*5)*5*Math.sin((t-5.1)/2.1*Math.PI);
  const foot=world(p,474,762);p.x+=423.2-foot.x;p.y+=225-foot.y;
 }
 const front=t>=2.34;
 const traveler=get('traveler'),parent=front?get('frontLayer'):get('shadow').parentNode;
 if(front&&traveler.parentNode!==parent)parent.append(traveler);
 if(!front&&traveler.parentNode!==parent)parent.insertBefore(traveler,get('lettering'));
 set('traveler','opacity',between(t,0,.28));
 set('traveler','transform',`translate(${p.x} ${p.y}) rotate(${p.a}) scale(${p.s*p.sx} ${p.s*p.sy}) translate(-510 -665)`);
 let raised=t<3.42?Math.sin(clamp((t-1.48)/1.34)*Math.PI):0;
 let hands={lx:386+raised*12,ly:567-raised*40,rx:624+raised*15,ry:652-raised*98,leftAngle:-raised*12,rightAngle:-raised*32};
 let logoY=0,open=0,chew=0;
 set('biteHole','opacity',0);set('piece','opacity',0);set('contactEdge','opacity',0);
 let tuck=0;
 if(mode===2){tuck=between(t,4.2,4.5)*(1-between(t,5.05,5.35));hands.lx=mix(hands.lx,444,tuck);hands.ly=mix(hands.ly,640,tuck);hands.rx=mix(hands.rx,572,tuck);hands.ry=mix(hands.ry,640,tuck);}
 if(mode===3&&t>4&&t<8.35){const out=between(t,4,4.7)*(1-between(t,7.8,8.35));hands.lx=mix(hands.lx,365,out);hands.ly=mix(hands.ly,605,out);hands.rx=mix(hands.rx,661,out);hands.ry=mix(hands.ry,610,out);hands.rightAngle=-30*out;}

 if(mode===0){
  const reach=between(t,4.25,5.12)*(1-between(t,6.15,6.65));
  hands.lx=mix(hands.lx,428,reach);hands.ly=mix(hands.ly,548,reach);
  hands.rx=mix(hands.rx,587,reach);hands.ry=mix(hands.ry,553,reach);hands.rightAngle=-60*reach;
  // The mouth approaches the bottom edge before the teeth close; the logo reacts only on contact.
  open=between(t,5.05,5.55)*(1-between(t,5.86,6.04));
  const grip=between(t,4.72,5.2)*(1-between(t,6.12,6.5));
  const gl=local(p,495,438),gr=local(p,640,438);
  hands.lx=mix(hands.lx,gl.x,grip);hands.ly=mix(hands.ly,gl.y,grip);
  hands.rx=mix(hands.rx,gr.x,grip);hands.ry=mix(hands.ry,gr.y,grip);
  set('contactEdge','opacity',between(t,5.13,5.34)*(1-between(t,6.04,6.1)));

  if(t>=6.45&&t<8.65)chew=Math.sin((t-6.45)/2.2*Math.PI*6)**2*Math.sin(clamp((t-6.45)/2.2)*Math.PI);
  set('biteHole','opacity',t>=6.04?1:0);
  const swallow=1-between(t,6.05,6.58),m=world(p,MOUTH.x,MOUTH.y);
  set('piece','opacity',t>=6.04&&t<6.58?1:0);
  set('piece','transform',`translate(${m.x} ${m.y}) rotate(${p.a}) scale(${swallow}) translate(${-BITE.x} ${-BITE.y})`);
 }else if(mode===1){
  const holding=between(t,4.45,4.75)*(1-between(t,7.35,7.65));
  logoY=t<4.75?0:t<5?mix(0,13,between(t,4.75,5)):t<7.35?13+Math.sin((t-5)*5)*2:t<8?13*(1-between(t,7.35,8)):0;
  // Inverse kinematics keeps both wrist contact points fixed on the moving logo.
  const l=local(p,435,445+logoY),r=local(p,635,440+logoY);
  hands.lx=mix(hands.lx,l.x,holding);hands.ly=mix(hands.ly,l.y,holding);hands.leftAngle=22*holding-p.a*holding;
  hands.rx=mix(hands.rx,r.x,holding);hands.ry=mix(hands.ry,r.y,holding);hands.rightAngle=-105*holding-p.a*holding;
  set('biteHole','opacity',0);set('piece','opacity',0);
 }
 set('lettering','transform',`translate(0 ${logoY})`);
 const suspended=mode===1&&t>=4.75&&t<7.6?Math.sin((t-4.75)*4)*18:0;
 const wave=(t>9&&t<10.3)?Math.sin((t-9)*Math.PI*4)*Math.sin((t-9)/1.3*Math.PI):0;
 hands.lx+=wave*9;hands.ly-=Math.abs(wave)*4;hands.leftAngle+=wave*18;
 const compression=Math.max(0,1-p.sy);
 limbs({...hands,flx:474+suspended-compression*45,frx:539+suspended+compression*45,fly:762-Math.abs(suspended)*.4-tuck*58,fry:762-Math.abs(suspended)*.2-tuck*58-(mode===3?between(t,5.25,5.6)*(1-between(t,6.85,7.15))*35:0),footAngleL:suspended*.5,footAngleR:-suspended*.4,knee:9+compression*90});
 const mouthVisibility=between(open,0,.12)||between(chew,0,.15);
 set('restMouth','opacity',1-mouthVisibility);set('originalTongueMotion','opacity',1-mouthVisibility);
 set('eatingMouth','opacity',mouthVisibility);set('mouthOpen','ry',1+open*18+chew*4);set('mouthOpen','rx',24-open*2-chew*3);
 set('upperTeeth','opacity',between(open,.25,.55));
 set('frontLip','opacity',between(open,.25,.55));set('frontLip','transform',get('traveler').getAttribute('transform'));
 const blink=(t>8.8&&t<9.02)?Math.sin((t-8.8)/.22*Math.PI):0;
 set('eyes','transform',`translate(0 554) scale(1 ${1-.9*blink-.09*chew}) translate(0 -554)`);
 set('character','transform',`translate(0 ${-chew*1.2})`);
 const height=Math.max(0,725-p.y);set('shadow','cx',p.x);set('shadow','rx',Math.max(26,78-height*.09));set('shadow','opacity',Math.max(.025,.13-height*.0002)*between(t,1.5,2.8));
 get('scrub').value=String(t);get('clock').textContent=t.toFixed(1)+' s';
}
function updateButton(){button.textContent=paused?(time>=DURATION?'Reproducir':'Continuar'):'Pausar'}
function schedule(){if(!raf&&!paused&&!motionBlocked&&!document.hidden)raf=requestAnimationFrame(tick)}
function tick(now){raf=0;if(!paused&&!motionBlocked&&!document.hidden){if(previous!==null)time=Math.min(DURATION,time+Math.min((now-previous)/1000,.05)*rate);previous=now;pose(time);if(time>=DURATION){paused=true;updateButton()}else schedule()}}
function choose(n){mode=n;time=reduced.matches?DURATION:0;paused=reduced.matches;previous=null;document.querySelectorAll('button[data-mode]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===n)));get('description').textContent=descriptions[n];updateButton();pose(time);schedule()}
document.querySelectorAll('button[data-mode]').forEach((b,i)=>b.onclick=()=>choose(i));
button.onclick=()=>{if(time>=DURATION)time=0;paused=!paused;previous=null;updateButton();schedule()};
get('restart').onclick=()=>{time=0;paused=false;previous=null;updateButton();pose(time);schedule()};
get('slow').onclick=()=>{rate=rate===1?.35:1;get('slow').setAttribute('aria-pressed',String(rate!==1));get('slow').textContent=rate===1?'Cámara lenta':'Velocidad normal'};
get('scrub').oninput=e=>{time=Number(e.target.value);paused=true;previous=null;updateButton();pose(time)};
document.addEventListener('visibilitychange',()=>{previous=null;if(!document.hidden)schedule()});
reduced.addEventListener('change',()=>{if(reduced.matches){paused=true;time=DURATION;pose(time);updateButton()}});
document.addEventListener('alma-motion',e=>{motionBlocked=e.detail;previous=null;schedule()});
choose(document.getElementById('motion-stage')?.dataset.defaultMode==='1'?1:0);

function limbs(v){
 const {lx=386,ly=567,rx=624,ry=652,leftAngle=0,rightAngle=0,flx=474,fly=762,frx=539,fry=762,footAngleL=0,footAngleR=0,knee=9}=v;
 set('legLeft','d',`M480 665 Q${(480+flx)/2+knee} ${(665+fly)/2} ${flx} ${fly-12}`);set('legRight','d',`M528 665 Q${(528+frx)/2-knee} ${(665+fry)/2} ${frx} ${fry-12}`);
 set('footLeft','transform',`translate(${flx} ${fly}) rotate(${footAngleL})`);set('footRight','transform',`translate(${frx} ${fry}) rotate(${footAngleR}) scale(-1 1)`);
 set('armLeft','d',`M435 612 Q${398+(lx-386)*.55} ${603+(ly-567)*.55} ${lx} ${ly}`);set('armRight','d',`M590 612 Q${600+(rx-624)*.5} ${641+(ry-652)*.6} ${rx} ${ry}`);
 set('handLeft','transform',`translate(${lx-386} ${ly-567}) rotate(${leftAngle} 386 567)`);set('handRight','transform',`translate(${rx-624} ${ry-652}) rotate(${rightAngle} 624 652)`);
}
