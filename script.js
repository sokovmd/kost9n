const modal=document.querySelector('#modal'),enter=document.querySelector('#enter'),decline=document.querySelector('#decline'),speech=document.querySelector('#speech'),consolePet=document.querySelector('.pet-console'),mainPet=document.querySelector('#mainPet'),patience=document.querySelector('#patience'),motion=document.querySelector('#motion'),bar=document.querySelector('.progress span'),title=document.title;
let enabled=true,i=0,transientUntil=0;
const runner={x:12,y:Math.max(70,innerHeight-190),vx:2.8,vy:-1.65};
const lines=['«Я хочу кинуть Эврику, сука.»','«Я работаю в Эврике. Но недолго.»','«Найдёшь новую Go-работу — я кину Эврику.»','«Ты чё молчишь? Поможешь мне Эврику кинуть?»','«Либо я кидаю Эврику, либо следующий коммит будет про тебя.»','«Не листай мимо, блядь. Я хочу кинуть Эврику.»','«Stone Island настоящий. Намерение кинуть Эврику тоже.»','«Молодец. Помогаешь Костяну кинуть Эврику.»'];
function setPose(state='run'){consolePet.className=`pet-console ${state}`;mainPet.style.transform=runner.vx<0?'scaleX(-1) scale(1.35)':'scale(1.35)'}
function say(text,state='run'){speech.textContent=text;setPose(state);if(state!=='run')transientUntil=Date.now()+1100}
function runAcrossScreen(){
  const maxX=Math.max(8,innerWidth-consolePet.offsetWidth-8),maxY=Math.max(65,innerHeight-consolePet.offsetHeight-8);
  if(enabled&&modal.hidden){
    runner.x+=runner.vx;runner.y+=runner.vy;
    if(runner.x<=8||runner.x>=maxX){runner.vx*=-1;runner.x=Math.max(8,Math.min(maxX,runner.x));}
    if(runner.y<=65||runner.y>=maxY){runner.vy*=-1;runner.y=Math.max(65,Math.min(maxY,runner.y));}
    consolePet.style.left=`${runner.x}px`;consolePet.style.top=`${runner.y}px`;consolePet.style.right='auto';consolePet.style.bottom='auto';
    if(Date.now()>transientUntil&&!consolePet.classList.contains('run'))setPose('run');
  }
  requestAnimationFrame(runAcrossScreen);
}
document.body.classList.add('lock');setPose('run');requestAnimationFrame(runAcrossScreen);
enter.onclick=()=>{modal.hidden=true;document.body.classList.remove('lock');say('«Смотри внимательно. Помоги мне кинуть Эврику.»','run')};
decline.onmouseenter=()=>{decline.style.transform=`translate(${(Math.random()>.5?1:-1)*(80+Math.random()*110)}px,${(Math.random()-.5)*70}px)`;say('«НЕПРАВИЛЬНЫЙ ОТВЕТ.»','shoot')};
decline.onclick=()=>{decline.textContent='НЕПРАВИЛЬНЫЙ ОТВЕТ';say('«Эврику я всё равно кину.»','shoot')};
document.querySelectorAll('.project').forEach(x=>{x.onmouseenter=()=>say('«Смотри внимательно. Я должен кинуть Эврику.»','punch');x.onmouseleave=()=>say('«Проект держит нагрузку. Поможешь мне сменить Эврику?»','run')});
document.querySelectorAll('a[href^="https://github.com"]').forEach(x=>x.onclick=()=>say('«Молодец. GitHub открыл. Помогай Костяну кинуть Эврику.»','run'));
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight,val=Math.max(8,100-Math.round(scrollY/Math.max(1,max)*78));bar.style.width=`${Math.min(100,scrollY/max*100)}%`;patience.textContent=`${val}%`;if(val<25&&enabled)say('«Время вышло. Я КОГДА ЭВРИКУ КИНУ?»','shoot')},{passive:true});
document.addEventListener('visibilitychange',()=>{document.title=document.hidden?'Я ВИЖУ, ЧТО ТЫ УШЁЛ':title;if(!document.hidden&&enabled)say('«Вернулся? Поможешь мне Эврику кинуть?»','run')});
motion.onclick=()=>{enabled=!enabled;motion.textContent=enabled?'ДВИЖ ВКЛ':'ДВИЖ ВЫКЛ';if(!enabled){runner.vx=0;runner.vy=0;say('«Ладно. Эврика подождёт.»','idle')}else{runner.vx=2.8;runner.vy=-1.65;say('«Погнали. Я иду кидать Эврику.»','run')}};
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
setInterval(()=>{if(modal.hidden&&enabled&&Math.random()>.45){i=(i+1)%lines.length;say(lines[i],'run')}},18000);
