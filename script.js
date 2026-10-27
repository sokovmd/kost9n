const modal=document.querySelector('#modal'),enter=document.querySelector('#enter'),decline=document.querySelector('#decline'),speech=document.querySelector('#speech'),stunt=document.querySelector('#stunt'),consolePet=document.querySelector('.pet-console'),mainPet=document.querySelector('#mainPet'),patience=document.querySelector('#patience'),motion=document.querySelector('#motion'),bar=document.querySelector('.progress span'),title=document.title;
let enabled=true,mode='run',until=0,kickTimer,stuntIndex=0;
const runner={x:12,y:Math.max(70,innerHeight-170),vx:2.8,vy:-1.65};
const stunts=[
  {kind:'tbank',pose:'shoot',company:true,text:'«Я решил уйти в Т‑Банк. Эврика, без обид.»'},
  {kind:'punch',text:'«ПОЛУЧАЙ, ЭВРИКА! ЛЕВОЙ. ПРАВОЙ. И ЕЩЁ РАЗ ЛЕВОЙ!»'},
  {kind:'vk',pose:'punch',company:true,text:'«Я ухожу в VK. Синий мне к лицу.»'},
  {kind:'goal',text:'«Пас на Костяна. Удар. Эврика в воротах.»'},
  {kind:'yandex',pose:'rope',company:true,text:'«Решил уйти в Яндекс. Краски уже приехали.»'},
  {kind:'rope',text:'«Прыгаю на скакалке, пока ищу другую компанию.»'}
];
function resetKick(){clearInterval(kickTimer);kickTimer=undefined;mainPet.style.width='';mainPet.style.height='';mainPet.style.backgroundImage='';mainPet.style.backgroundSize='';mainPet.style.filter='';}
function pose(kind='run'){
  resetKick();consolePet.className=`pet-console ${kind}`;mainPet.className='pet';mainPet.style.animation='';mainPet.style.backgroundPosition='';
  if(kind==='rope'){consolePet.className='pet-console';mainPet.style.backgroundPosition='0 -416px';mainPet.style.animation='rope .8s steps(5) infinite'}
  if(kind==='idle')mainPet.classList.add('idle');mainPet.style.transform=runner.vx<0?'scaleX(-1) scale(1.62)':'scale(1.62)';
}
function footballKick(){
  resetKick();consolePet.className='pet-console';mainPet.className='pet';mainPet.style.width='108px';mainPet.style.height='144px';mainPet.style.backgroundImage="url('assets/kostyan-football-kick.png')";mainPet.style.backgroundSize='432px 144px';mainPet.style.backgroundPosition='0 0';mainPet.style.animation='';mainPet.style.transform='scale(1.25)';
  let frame=0;kickTimer=setInterval(()=>{frame=(frame+1)%4;mainPet.style.backgroundPosition=`-${frame*108}px 0`},240);
}
function clearStunt(){clearInterval(kickTimer);kickTimer=undefined;stunt.replaceChildren();stunt.style.cssText='display:none'}
function hideSpeech(){speech.style.cssText='display:none'}
function showSpeech(text){speech.textContent=text;speech.style.cssText='display:block;position:absolute;left:0;bottom:116px;width:min(220px,calc(100vw - 30px));z-index:5'}
function boxingBag(){
  const rope=document.createElement('i'),bag=document.createElement('i');rope.style.cssText='position:absolute;left:161px;bottom:88px;width:3px;height:92px;background:#e9e5d8;transform-origin:bottom center';bag.style.cssText='position:absolute;left:130px;bottom:10px;width:64px;height:83px;border:4px solid #e9e5d8;border-radius:45% 45% 48% 48%;background:#e34135;box-shadow:inset 0 0 0 11px #7e241e;transform-origin:32px -88px';
  mainPet.style.animation='boxing 1.2s steps(6) 3 forwards';stunt.style.cssText='display:block;position:absolute;inset:0;pointer-events:none';stunt.append(rope,bag);
  bag.animate([{offset:0,transform:'rotate(0deg)'},{offset:.16,transform:'rotate(0deg)'},{offset:.21,transform:'rotate(24deg)'},{offset:.29,transform:'rotate(0deg)'},{offset:.37,transform:'rotate(-20deg)'},{offset:.46,transform:'rotate(0deg)'},{offset:.55,transform:'rotate(28deg)'},{offset:.63,transform:'rotate(5deg)'},{offset:.77,transform:'translate(82px,165px) rotate(118deg)',opacity:1},{offset:1,transform:'translate(105px,210px) rotate(145deg)',opacity:0}],{duration:5400,easing:'ease-in',fill:'forwards'});
  rope.animate([{offset:0,transform:'rotate(0deg)',opacity:1},{offset:.21,transform:'rotate(8deg)',opacity:1},{offset:.37,transform:'rotate(-7deg)',opacity:1},{offset:.55,transform:'rotate(10deg)',opacity:1},{offset:.62,transform:'scaleY(1)',opacity:1},{offset:.68,transform:'translateY(35px) scaleY(.35) rotate(22deg)',opacity:0},{offset:1,opacity:0}],{duration:5400,easing:'ease-in',fill:'forwards'});
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
  const themes={tbank:{paint:'linear-gradient(120deg,#ffdd2d 0 70%,#111 70%)',ink:'#111',label:'Т‑БАНК MODE'},vk:{paint:'linear-gradient(135deg,#0077ff,#00c8ff)',ink:'#fff',label:'VK MODE'},yandex:{paint:'linear-gradient(120deg,#fc3f1d 0 42%,#ffde00 42% 60%,#f4f1e8 60%)',ink:'#111',label:'ЯНДЕКС MODE'}}[kind];
  if(!themes)return;const flash=document.createElement('div');flash.textContent=themes.label;flash.style.cssText=`position:fixed;inset:0;z-index:18;display:grid;place-items:center;pointer-events:none;background:${themes.paint};color:${themes.ink};font:900 clamp(2rem,11vw,8rem)/.9 Impact,Arial,sans-serif;letter-spacing:.07em;text-align:center;mix-blend-mode:color;opacity:0;text-shadow:2px 2px 0 rgba(255,255,255,.28)`;
  document.body.append(flash);flash.animate([{opacity:0},{opacity:.9,offset:.12},{opacity:.72,offset:.83},{opacity:0}],{duration:2000,easing:'ease-out',fill:'forwards'}).finished.then(()=>flash.remove());
}
function companyLook(kind){
  const themes={
    tbank:{mark:'T',bg:'#ffdd2d',ink:'#111',filter:'sepia(1) saturate(7) hue-rotate(2deg) brightness(1.16)'},
    vk:{mark:'VK',bg:'#087cf0',ink:'#fff',filter:'sepia(1) saturate(8) hue-rotate(165deg) brightness(1.02)'},
    yandex:{mark:'Я',bg:'#fc3f1d',ink:'#fff',filter:'sepia(1) saturate(9) hue-rotate(325deg) brightness(1.05)'}
  }[kind];
  if(!themes)return;mainPet.style.filter=themes.filter;
  const mark=document.createElement('i');mark.textContent=themes.mark;mark.style.cssText=`position:absolute;left:27px;bottom:33px;z-index:4;width:58px;height:58px;display:grid;place-items:center;border:4px solid ${themes.ink};border-radius:${kind==='vk'?'50%':'9px'};background:${themes.bg};color:${themes.ink};font:900 ${kind==='vk'?'1.05rem':'2rem'}/1 Arial,sans-serif;letter-spacing:-.12em;box-shadow:4px 4px 0 rgba(17,18,15,.55);transform:rotate(-8deg)`;
  stunt.style.cssText='display:block;position:absolute;inset:0;pointer-events:none';stunt.append(mark);mark.animate([{transform:'scale(.35) rotate(-20deg)',opacity:0},{transform:'scale(1.08) rotate(6deg)',opacity:1},{transform:'scale(1) rotate(-8deg)',opacity:1}],{duration:650,fill:'forwards'});
}
function fitAction(){
  runner.x=Math.min(Math.max(8,runner.x),Math.max(8,innerWidth-360));runner.y=Math.min(Math.max(65,runner.y),Math.max(65,innerHeight-250));
  consolePet.style.left=`${runner.x}px`;consolePet.style.top=`${runner.y}px`;consolePet.style.right='auto';consolePet.style.bottom='auto';
}
function startRun(now=performance.now()){mode='run';until=now+1500+Math.random()*1500;hideSpeech();clearStunt();pose('run')}
function nextStunt(){
  if(stuntIndex===0){stuntIndex++;return stunts[0]}
  if(stuntIndex===1){stuntIndex++;return stunts[1]}
  stuntIndex++;return stunts[Math.floor(Math.random()*stunts.length)];
}
function pauseForStunt(now=performance.now(),forced){
  mode='pause';const stuntData=forced||nextStunt();until=now+(stuntData.kind==='punch'?5800:stuntData.company?4700:4600);fitAction();showSpeech(stuntData.text);clearStunt();
  if(stuntData.kind==='goal')footballGoal();else pose(stuntData.pose||stuntData.kind);
  if(stuntData.kind==='punch')boxingBag();if(stuntData.kind==='shoot')shootTarget();if(stuntData.company){companyLook(stuntData.kind);brandFlash(stuntData.kind)}
}
function animatePet(now){
  if(enabled&&modal.hidden){
    if(mode==='run'){
      const maxX=Math.max(8,innerWidth-consolePet.offsetWidth-8),maxY=Math.max(65,innerHeight-consolePet.offsetHeight-8);runner.x+=runner.vx;runner.y+=runner.vy;
      if(runner.x<=8||runner.x>=maxX){runner.vx*=-1;runner.x=Math.max(8,Math.min(maxX,runner.x));pose('run')}
      if(runner.y<=65||runner.y>=maxY){runner.vy*=-1;runner.y=Math.max(65,Math.min(maxY,runner.y));}
      consolePet.style.left=`${runner.x}px`;consolePet.style.top=`${runner.y}px`;consolePet.style.right='auto';consolePet.style.bottom='auto';if(now>=until)pauseForStunt(now);
    }else if(now>=until)startRun(now);
  }requestAnimationFrame(animatePet);
}
document.body.classList.add('lock');hideSpeech();clearStunt();pose('run');startRun();requestAnimationFrame(animatePet);
enter.onclick=()=>{modal.hidden=true;document.body.classList.remove('lock');startRun();};
decline.onmouseenter=()=>{decline.style.transform=`translate(${(Math.random()>.5?1:-1)*(80+Math.random()*110)}px,${(Math.random()-.5)*70}px)`;pauseForStunt(performance.now(),{kind:'shoot',text:'«НЕПРАВИЛЬНЫЙ ОТВЕТ.»'})};
decline.onclick=()=>{decline.textContent='НЕПРАВИЛЬНЫЙ ОТВЕТ';pauseForStunt(performance.now(),{kind:'shoot',text:'«Эврику я всё равно кину.»'})};
document.querySelectorAll('.project').forEach(x=>{x.onmouseenter=()=>pauseForStunt(performance.now(),{kind:'punch',text:'«ПОЛУЧАЙ, ЭВРИКА! ЛЕВОЙ. ПРАВОЙ. И ЕЩЁ РАЗ ЛЕВОЙ!»'});x.onmouseleave=()=>startRun()});
document.querySelectorAll('a[href^="https://github.com"]').forEach(x=>x.onclick=()=>pauseForStunt(performance.now(),{kind:'rope',text:'«GitHub открыл. Теперь ищем другую компанию.»'}));
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight,val=Math.max(8,100-Math.round(scrollY/Math.max(1,max)*78));bar.style.width=`${Math.min(100,scrollY/max*100)}%`;patience.textContent=`${val}%`;if(val<25&&enabled)pauseForStunt(performance.now(),{kind:'tbank',pose:'shoot',text:'«Время вышло. Ухожу в Т‑Банк.»'})},{passive:true});
document.addEventListener('visibilitychange',()=>{document.title=document.hidden?'Я ВИЖУ, ЧТО ТЫ УШЁЛ':title;if(!document.hidden&&enabled)pauseForStunt(performance.now(),{kind:'goal',text:'«Вернулся? Мяч в сетке. Эврика — в прошлом.»'})});
motion.onclick=()=>{enabled=!enabled;motion.textContent=enabled?'ДВИЖ ВКЛ':'ДВИЖ ВЫКЛ';if(!enabled){pose('idle');hideSpeech();clearStunt()}else startRun()};
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
