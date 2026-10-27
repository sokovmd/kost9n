const modal=document.querySelector('#modal'),enter=document.querySelector('#enter'),decline=document.querySelector('#decline'),speech=document.querySelector('#speech'),consolePet=document.querySelector('.pet-console'),patience=document.querySelector('#patience'),motion=document.querySelector('#motion'),bar=document.querySelector('.progress span'),title=document.title;
let enabled=true,i=0;
const lines=['«Кидай оффер, сука.»','«Я тебя найду. И вакансию тоже.»','«Открывай GitHub. Медленно.»','«Ты чё молчишь? Зарплату согласовываешь?»','«Либо оффер, либо следующий коммит будет про тебя.»','«Не листай мимо, блядь. Я старался.»','«Stone Island настоящий. Угрозы тоже.»','«Молодец. Открыл GitHub. Пока живи.»'];
function say(text,state=''){speech.textContent=text;consolePet.className='pet-console';if(state)consolePet.classList.add(state)}
document.body.classList.add('lock');
enter.onclick=()=>{modal.hidden=true;document.body.classList.remove('lock');say('«Смотри внимательно. Второй раз показывать не буду.»','run')};
decline.onmouseenter=()=>{decline.style.transform=`translate(${(Math.random()>.5?1:-1)*(80+Math.random()*110)}px,${(Math.random()-.5)*70}px)`;say('«НЕПРАВИЛЬНЫЙ ОТВЕТ.»','shoot')};
decline.onclick=()=>{decline.textContent='НЕПРАВИЛЬНЫЙ ОТВЕТ';say('«Где собес, тварь?»','shoot')};
document.querySelectorAll('.project').forEach(x=>{x.onmouseenter=()=>say('«Смотри внимательно. Второй раз показывать не буду.»','punch');x.onmouseleave=()=>say('«Проект держит нагрузку. А ты держишь удар?»')});
document.querySelectorAll('a[href^="https://github.com"]').forEach(x=>x.onclick=()=>say('«Молодец. Открыл GitHub. Пока живи.»','run'));
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight,val=Math.max(8,100-Math.round(scrollY/Math.max(1,max)*78));bar.style.width=`${Math.min(100,scrollY/max*100)}%`;patience.textContent=`${val}%`;if(val<25&&enabled)say('«Время вышло. ОФФЕР ГДЕ?»','shoot')},{passive:true});
document.addEventListener('visibilitychange',()=>{document.title=document.hidden?'Я ВИЖУ, ЧТО ТЫ УШЁЛ':title;if(!document.hidden&&enabled)say('«Вернулся, сучка?»','run')});
motion.onclick=()=>{enabled=!enabled;document.body.classList.toggle('motion-off',!enabled);motion.textContent=enabled?'ДВИЖ ВКЛ':'ДВИЖ ВЫКЛ';if(!enabled)say('«Ладно. Дышим спокойно.»')};
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
setInterval(()=>{if(modal.hidden&&enabled&&Math.random()>.45){i=(i+1)%lines.length;say(lines[i],Math.random()>.6?'run':'')}},18000);
