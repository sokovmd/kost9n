const modal=document.querySelector('#modal'),enter=document.querySelector('#enter'),decline=document.querySelector('#decline'),speech=document.querySelector('#speech'),stunt=document.querySelector('#stunt'),consolePet=document.querySelector('.pet-console'),mainPet=document.querySelector('#mainPet'),patience=document.querySelector('#patience'),motion=document.querySelector('#motion'),bar=document.querySelector('.progress span'),title=document.title;
let enabled=true,mode='run',until=0;
const runner={x:12,y:Math.max(70,innerHeight-170),vx:2.8,vy:-1.65};
const stunts=[
  {kind:'punch',text:'«Секунду. Я грушу уроню — и Эврику кину.»'},
  {kind:'goal',text:'«Пас на Костяна. Удар. Эврика в воротах.»'},
  {kind:'rope',text:'«Прыгаю на скакалке, пока ищу другую компанию.»'},
  {kind:'shoot',text:'«Эврика, без обид. Я нашёл LinkedIn.»'}
];
function pose(kind='run'){
  consolePet.className=`pet-console ${kind}`;
  mainPet.className='pet';mainPet.style.animation='';mainPet.style.backgroundPosition='';
  if(kind==='rope'){consolePet.className='pet-console';mainPet.style.backgroundPosition='0 -416px';mainPet.style.animation='rope .8s steps(5) infinite'}
  if(kind==='idle')mainPet.classList.add('idle');
  mainPet.style.transform=runner.vx<0?'scaleX(-1) scale(1.35)':'scale(1.35)';
}
function clearStunt(){stunt.replaceChildren();stunt.style.cssText='display:none'}
function hideSpeech(){speech.style.cssText='display:none'}
function showSpeech(text){speech.textContent=text;speech.style.cssText='display:block;position:absolute;left:0;bottom:116px;width:220px;z-index:5'}
function boxingBag(){
  const bag=document.createElement('i');bag.style.cssText='position:absolute;left:112px;bottom:3px;width:31px;height:57px;border:3px solid #e9e5d8;border-radius:45% 45% 48% 48%;background:#e34135;box-shadow:inset 0 0 0 7px #7e241e;transform-origin:top center';
  stunt.style.cssText='display:block;position:absolute;inset:0;pointer-events:none';stunt.append(bag);
  bag.animate([{transform:'rotate(0deg)'},{transform:'rotate(17deg)'},{transform:'rotate(-13deg)'},{transform:'rotate(9deg)'},{transform:'translate(46px,74px) rotate(78deg)',opacity:0}],{duration:2200,easing:'ease-in',fill:'forwards'});
}
function footballGoal(){
  const goal=document.createElement('i'),ball=document.createElement('i');
  goal.style.cssText='position:absolute;left:118px;bottom:8px;width:58px;height:43px;border:4px solid #e9e5d8;border-left-width:2px;background:repeating-linear-gradient(45deg,transparent 0 7px,rgba(233,229,216,.35) 8px 9px)';
  ball.style.cssText='position:absolute;left:52px;bottom:16px;width:22px;height:22px;border:2px solid #111;border-radius:50%;background:radial-gradient(circle at 35% 35%,#111 0 14%,#eee 16% 35%,#111 37% 46%,#eee 48%)';
  stunt.style.cssText='display:block;position:absolute;inset:0;pointer-events:none';stunt.append(goal,ball);
  ball.animate([{transform:'translateX(0) rotate(0deg)'},{transform:'translateX(94px) translateY(-8px) rotate(360deg)',opacity:1},{transform:'translateX(117px) translateY(-5px) rotate(470deg)',opacity:0}],{duration:1450,delay:330,easing:'cubic-bezier(.2,.8,.3,1)',fill:'forwards'});
  goal.animate([{transform:'none'},{transform:'translateX(4px) rotate(4deg)'},{transform:'none'}],{duration:450,delay:1550,iterations:2});
}
function shootTarget(){
  const target=document.createElement('i');target.textContent='ЭВРИКА';target.style.cssText='position:absolute;left:119px;bottom:35px;width:66px;height:66px;border:3px solid #e34135;border-radius:50%;display:grid;place-items:center;color:#e34135;background:#111;font:700 .55rem/1 IBM Plex Mono,monospace;transform:rotate(8deg)';
  stunt.style.cssText='display:block;position:absolute;inset:0;pointer-events:none';stunt.append(target);
  target.animate([{opacity:0,transform:'scale(.3) rotate(8deg)'},{opacity:1,transform:'scale(1) rotate(8deg)'},{opacity:1,transform:'scale(1.25) rotate(8deg)'},{opacity:0,transform:'scale(1.55) rotate(8deg)'}],{duration:2200,fill:'forwards'});
}
function startRun(now=performance.now()){mode='run';until=now+1500+Math.random()*1500;hideSpeech();clearStunt();pose('run')}
function pauseForStunt(now=performance.now(),forced){mode='pause';until=now+2500;const stuntData=forced||stunts[Math.floor(Math.random()*stunts.length)];showSpeech(stuntData.text);clearStunt();pose(stuntData.kind);if(stuntData.kind==='punch')boxingBag();if(stuntData.kind==='goal')footballGoal();if(stuntData.kind==='shoot')shootTarget()}
function animatePet(now){
  if(enabled&&modal.hidden){
    if(mode==='run'){
      const maxX=Math.max(8,innerWidth-consolePet.offsetWidth-8),maxY=Math.max(65,innerHeight-consolePet.offsetHeight-8);
      runner.x+=runner.vx;runner.y+=runner.vy;
      if(runner.x<=8||runner.x>=maxX){runner.vx*=-1;runner.x=Math.max(8,Math.min(maxX,runner.x));pose('run')}
      if(runner.y<=65||runner.y>=maxY){runner.vy*=-1;runner.y=Math.max(65,Math.min(maxY,runner.y));}
      consolePet.style.left=`${runner.x}px`;consolePet.style.top=`${runner.y}px`;consolePet.style.right='auto';consolePet.style.bottom='auto';
      if(now>=until)pauseForStunt(now);
    }else if(now>=until)startRun(now);
  }
  requestAnimationFrame(animatePet);
}
document.body.classList.add('lock');hideSpeech();clearStunt();pose('run');startRun();requestAnimationFrame(animatePet);
enter.onclick=()=>{modal.hidden=true;document.body.classList.remove('lock');startRun();};
decline.onmouseenter=()=>{decline.style.transform=`translate(${(Math.random()>.5?1:-1)*(80+Math.random()*110)}px,${(Math.random()-.5)*70}px)`;pauseForStunt(performance.now(),{kind:'shoot',text:'«НЕПРАВИЛЬНЫЙ ОТВЕТ.»'})};
decline.onclick=()=>{decline.textContent='НЕПРАВИЛЬНЫЙ ОТВЕТ';pauseForStunt(performance.now(),{kind:'shoot',text:'«Эврику я всё равно кину.»'})};
document.querySelectorAll('.project').forEach(x=>{x.onmouseenter=()=>pauseForStunt(performance.now(),{kind:'punch',text:'«Проект держит нагрузку. Я держу курс на другую компанию.»'});x.onmouseleave=()=>startRun()});
document.querySelectorAll('a[href^="https://github.com"]').forEach(x=>x.onclick=()=>pauseForStunt(performance.now(),{kind:'rope',text:'«GitHub открыл. Теперь ищем другую компанию.»'}));
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight,val=Math.max(8,100-Math.round(scrollY/Math.max(1,max)*78));bar.style.width=`${Math.min(100,scrollY/max*100)}%`;patience.textContent=`${val}%`;if(val<25&&enabled)pauseForStunt(performance.now(),{kind:'shoot',text:'«Время вышло. Я когда Эврику кину?»'})},{passive:true});
document.addEventListener('visibilitychange',()=>{document.title=document.hidden?'Я ВИЖУ, ЧТО ТЫ УШЁЛ':title;if(!document.hidden&&enabled)pauseForStunt(performance.now(),{kind:'goal',text:'«Вернулся? Мяч в сетке. Эврика — в прошлом.»'})});
motion.onclick=()=>{enabled=!enabled;motion.textContent=enabled?'ДВИЖ ВКЛ':'ДВИЖ ВЫКЛ';if(!enabled){pose('idle');hideSpeech();clearStunt()}else startRun()};
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
