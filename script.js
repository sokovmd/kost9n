const modal=document.querySelector('#modal'),enter=document.querySelector('#enter'),decline=document.querySelector('#decline'),speech=document.querySelector('#speech'),stunt=document.querySelector('#stunt'),consolePet=document.querySelector('.pet-console'),mainPet=document.querySelector('#mainPet'),patience=document.querySelector('#patience'),motion=document.querySelector('#motion'),bar=document.querySelector('.progress span'),title=document.title;
let enabled=true,mode='run',until=0,kickTimer,lastFrame=performance.now(),bottomWarningShown=false;
const runner={x:12,y:Math.max(70,innerHeight-270),vx:125,vy:-78};
const stunts=[
  {kind:'tbank',pose:'shoot',company:true,text:'«Т-Банк лучшая компания в мире.»'},
  {kind:'punch',text:'«ПОЛУЧАЙ, ЭВРИКА! ЛЕВОЙ. ПРАВОЙ. И ЕЩЁ РАЗ ЛЕВОЙ!»'},
  {kind:'vk',pose:'punch',company:true,text:'«Артем Пелих мой лучший друг.»'},
  {kind:'goal',text:'«Пас на Костяна. Удар. Эврика в воротах.»'},
  {kind:'yandex',pose:'rope',company:true,text:'«Я решил уйти в Яндекс. Я не боюсь Дронов.»'},
  {kind:'rope',text:'«Прыгаю на скакалке, пока ищу другую компанию.»'}
];
function shuffled(items){
  const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result;
}
const openingDeck=shuffled(stunts);let lastStuntKind='';
function resetKick(){clearInterval(kickTimer);kickTimer=undefined;document.querySelector('#boxingScene')?.remove();mainPet.style.visibility='';mainPet.style.width='';mainPet.style.height='';mainPet.style.backgroundImage='';mainPet.style.backgroundSize='';mainPet.style.filter='';}
function pose(kind='run'){
  resetKick();consolePet.className=`pet-console ${kind}`;mainPet.className='pet';mainPet.style.animation='';mainPet.style.backgroundPosition='';
  if(kind==='rope'){consolePet.className='pet-console';mainPet.style.backgroundPosition='0 -416px';mainPet.style.animation='rope .8s steps(5) infinite'}
  if(kind==='idle')mainPet.classList.add('idle');mainPet.style.transform=runner.vx<0?'scaleX(-1) scale(2.43)':'scale(2.43)';
}
function footballKick(){
  resetKick();consolePet.className='pet-console';mainPet.className='pet';mainPet.style.width='108px';mainPet.style.height='144px';mainPet.style.backgroundImage="url('assets/kostyan-football-kick.png?v=bc4f981')";mainPet.style.backgroundSize='432px 144px';mainPet.style.backgroundPosition='0 0';mainPet.style.animation='';mainPet.style.transform='scale(1.875)';
  let frame=0;kickTimer=setInterval(()=>{frame=(frame+1)%4;mainPet.style.backgroundPosition=`-${frame*108}px 0`},240);
}
function clearStunt(){clearInterval(kickTimer);kickTimer=undefined;document.querySelector('#boxingScene')?.remove();mainPet.style.visibility='';stunt.replaceChildren();stunt.style.cssText='display:none'}
function hideSpeech(){speech.style.cssText='display:none'}
function showSpeech(text){speech.textContent=text;speech.style.cssText='display:block;position:absolute;left:0;bottom:175px;width:min(220px,calc(100vw - 30px));z-index:5'}
function boxingBag(){
  resetKick();consolePet.className='pet-console';mainPet.className='pet';mainPet.style.visibility='hidden';const size=Math.floor(Math.min(430,innerWidth*.9,innerHeight*.58));
  const left=Math.max(8,Math.min(innerWidth-size-8,runner.x-size*.12)),top=Math.max(68,Math.min(innerHeight-size-8,runner.y-size*.28));
  const scene=document.createElement('div');scene.id='boxingScene';scene.setAttribute('aria-label','Костян бьёт грушу Эврики');scene.style.cssText=`position:fixed;left:${left}px;top:${top}px;z-index:32;width:${size}px;height:${size}px;pointer-events:none;background:url('assets/kostyan-heavybag-evrika-v4.png?v=evrika-bag-4') no-repeat;background-size:${size*3}px ${size*2}px;background-position:0 0`;document.body.append(scene);
  speech.style.cssText=`display:block;position:fixed;left:${Math.max(15,Math.min(innerWidth-315,left+size*.5-150))}px;top:${Math.max(66,top-60)}px;bottom:auto;width:min(300px,calc(100vw - 30px));z-index:35`;
  const frames=[{x:0,y:0,ms:350},{x:1,y:0,ms:260},{x:2,y:0,ms:320},{x:0,y:1,ms:260},{x:1,y:1,ms:320},{x:2,y:1,ms:900}];let frame=0;
  const play=()=>{const current=frames[frame];scene.style.backgroundPosition=`-${current.x*size}px -${current.y*size}px`;if(frame<frames.length-1){frame++;kickTimer=setTimeout(play,current.ms)}};play();
}
function footballGoal(){
  footballKick();const goal=document.createElement('i'),width=Math.min(240,Math.max(170,innerWidth-150)),height=Math.round(width*.66);goal.style.cssText=`position:absolute;left:104px;bottom:8px;width:${width}px;height:${height}px;border:7px solid #e9e5d8;border-left-width:4px;background:repeating-linear-gradient(45deg,transparent 0 13px,rgba(233,229,216,.42) 14px 16px);transform-origin:bottom left`;
  stunt.style.cssText='display:block;position:absolute;inset:0;pointer-events:none';stunt.append(goal);goal.animate([{transform:'none'},{transform:'translateX(9px) rotate(4deg)'},{transform:'translateX(-4px) rotate(-2deg)'},{transform:'none'}],{duration:900,delay:3000,iterations:2});
}
function shootTarget(){
  const target=document.createElement('i');target.textContent='ЭВРИКА';target.style.cssText='position:absolute;left:119px;bottom:35px;width:66px;height:66px;border:3px solid #e34135;border-radius:50%;display:grid;place-items:center;color:#e34135;background:#111;font:700 .55rem/1 IBM Plex Mono,monospace;transform:rotate(8deg)';
  stunt.style.cssText='display:block;position:absolute;inset:0;pointer-events:none';stunt.append(target);target.animate([{opacity:0,transform:'scale(.3) rotate(8deg)'},{opacity:1,transform:'scale(1) rotate(8deg)'},{opacity:1,transform:'scale(1.25) rotate(8deg)'},{opacity:0,transform:'scale(1.55) rotate(8deg)'}],{duration:2200,fill:'forwards'});
}
function brandFlash(kind){
  const themes={tbank:{paint:'linear-gradient(120deg,#ffdd2d 0 72%,#111 72%)',logo:'assets/logos/tbank.svg'},vk:{paint:'linear-gradient(135deg,#0077ff,#00c8ff)',logo:'assets/logos/vk.svg'},yandex:{paint:'linear-gradient(120deg,#fc3f1d,#f4f1e8)',logo:'assets/logos/yandex.svg'}}[kind];
  if(!themes)return;const flash=document.createElement('div'),logo=document.createElement('img');logo.src=themes.logo;logo.alt='';logo.style.cssText='width:min(48vw,290px);height:min(30vh,170px);object-fit:contain;padding:1.2rem;border-radius:22px;background:rgba(255,255,255,.92)';flash.append(logo);flash.style.cssText=`position:fixed;inset:0;z-index:18;display:grid;place-items:center;pointer-events:none;background:${themes.paint};opacity:0`;
  document.body.append(flash);flash.animate([{opacity:0},{opacity:.9,offset:.12},{opacity:.72,offset:.83},{opacity:0}],{duration:3000,easing:'ease-out',fill:'forwards'}).finished.then(()=>flash.remove());
}
function companyLook(kind){
  const themes={
    tbank:{logo:'assets/logos/tbank.svg',bg:'#ffdd2d',filter:'sepia(1) saturate(7) hue-rotate(2deg) brightness(1.16)'},
    vk:{logo:'assets/logos/vk.svg',bg:'#fff',filter:'sepia(1) saturate(8) hue-rotate(165deg) brightness(1.02)'},
    yandex:{logo:'assets/logos/yandex.svg',bg:'#fff',filter:'sepia(1) saturate(9) hue-rotate(325deg) brightness(1.05)'}
  }[kind];
  if(!themes)return;mainPet.style.filter=themes.filter;
  const mark=document.createElement('img');mark.src=themes.logo;mark.alt='Логотип компании';mark.style.cssText=`position:absolute;left:105px;bottom:20px;z-index:4;width:${kind==='tbank'?'150px':'82px'};height:82px;object-fit:contain;padding:10px;border-radius:14px;background:${themes.bg};box-shadow:5px 5px 0 rgba(17,18,15,.6)`;
  stunt.style.cssText='display:block;position:absolute;inset:0;pointer-events:none';stunt.append(mark);mark.animate([{transform:'scale(.35) rotate(-20deg)',opacity:0},{transform:'scale(1.08) rotate(6deg)',opacity:1},{transform:'scale(1) rotate(-5deg)',opacity:1}],{duration:650,fill:'forwards'});
}
function placeRunner(){
  consolePet.style.left='0';consolePet.style.top='0';consolePet.style.right='auto';consolePet.style.bottom='auto';consolePet.style.willChange='transform';consolePet.style.transform=`translate3d(${Math.round(runner.x)}px,${Math.round(runner.y)}px,0)`;
}
function fitAction(){
  runner.x=Math.min(Math.max(8,runner.x),Math.max(8,innerWidth-520));runner.y=Math.min(Math.max(65,runner.y),Math.max(65,innerHeight-460));
  placeRunner();
}
function startRun(now=performance.now()){mode='run';until=now+1500+Math.random()*1500;lastFrame=now;hideSpeech();clearStunt();pose('run')}
function nextStunt(){
  let selected;
  if(openingDeck.length)selected=openingDeck.shift();
  else{let pool=Math.random()<1/3?stunts.filter(item=>item.company):stunts.filter(item=>!item.company);const withoutRepeat=pool.filter(item=>item.kind!==lastStuntKind);if(withoutRepeat.length)pool=withoutRepeat;selected=pool[Math.floor(Math.random()*pool.length)]}
  lastStuntKind=selected.kind;return selected;
}
function pauseForStunt(now=performance.now(),forced){
  mode='pause';const stuntData=forced||nextStunt();if(forced){const deckIndex=openingDeck.findIndex(item=>item.kind===stuntData.kind);if(deckIndex>=0)openingDeck.splice(deckIndex,1);lastStuntKind=stuntData.kind}until=now+(stuntData.kind==='punch'?3000:stuntData.company?7050:4600);fitAction();showSpeech(stuntData.text);clearStunt();
  if(stuntData.kind==='goal')footballGoal();else if(stuntData.kind==='punch')boxingBag();else pose(stuntData.pose||stuntData.kind);
  if(stuntData.kind==='shoot')shootTarget();if(stuntData.company){companyLook(stuntData.kind);brandFlash(stuntData.kind)}
}
function animatePet(now){
  const dt=Math.min(.04,Math.max(0,(now-lastFrame)/1000));lastFrame=now;
  if(enabled&&modal.hidden){
    if(mode==='run'){
      const maxX=Math.max(8,innerWidth-245),maxY=Math.max(65,innerHeight-250);runner.x+=runner.vx*dt;runner.y+=runner.vy*dt;
      if(runner.x<=8||runner.x>=maxX){runner.vx*=-1;runner.x=Math.max(8,Math.min(maxX,runner.x));pose('run')}
      if(runner.y<=65||runner.y>=maxY){runner.vy*=-1;runner.y=Math.max(65,Math.min(maxY,runner.y));}
      placeRunner();if(now>=until)pauseForStunt(now);
    }else if(now>=until)startRun(now);
  }requestAnimationFrame(animatePet);
}
document.body.classList.add('lock');hideSpeech();clearStunt();pose('run');startRun();requestAnimationFrame(animatePet);
enter.onclick=()=>{modal.hidden=true;document.body.classList.remove('lock');startRun();};
decline.onmouseenter=()=>{decline.style.transform=`translate(${(Math.random()>.5?1:-1)*(80+Math.random()*110)}px,${(Math.random()-.5)*70}px)`;pauseForStunt(performance.now(),{kind:'shoot',text:'«НЕПРАВИЛЬНЫЙ ОТВЕТ.»'})};
decline.onclick=()=>{decline.textContent='НЕПРАВИЛЬНЫЙ ОТВЕТ';pauseForStunt(performance.now(),{kind:'shoot',text:'«Эврику я всё равно кину.»'})};
document.querySelectorAll('.project').forEach(x=>{x.onmouseenter=()=>pauseForStunt(performance.now(),{kind:'punch',text:'«ПОЛУЧАЙ, ЭВРИКА! ЛЕВОЙ. ПРАВОЙ. И ЕЩЁ РАЗ ЛЕВОЙ!»'});x.onmouseleave=()=>startRun()});
document.querySelectorAll('a[href^="https://github.com"]').forEach(x=>x.onclick=()=>pauseForStunt(performance.now(),{kind:'rope',text:'«GitHub открыл. Теперь ищем другую компанию.»'}));
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight,val=Math.max(8,100-Math.round(scrollY/Math.max(1,max)*78));bar.style.width=`${Math.min(100,scrollY/max*100)}%`;patience.textContent=`${val}%`;if(val<25&&enabled&&!bottomWarningShown){bottomWarningShown=true;pauseForStunt(performance.now(),{kind:'tbank',pose:'shoot',company:true,text:'«Т-Банк лучшая компания в мире.»'})}},{passive:true});
document.addEventListener('visibilitychange',()=>{document.title=document.hidden?'Я ВИЖУ, ЧТО ТЫ УШЁЛ':title;if(!document.hidden&&enabled)pauseForStunt(performance.now(),{kind:'goal',text:'«Вернулся? Мяч в сетке. Эврика — в прошлом.»'})});
motion.onclick=()=>{enabled=!enabled;motion.textContent=enabled?'ДВИЖ ВКЛ':'ДВИЖ ВЫКЛ';if(!enabled){pose('idle');hideSpeech();clearStunt()}else startRun()};
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
