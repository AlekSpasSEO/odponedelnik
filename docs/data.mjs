export const regions = [
  {slug:'skopski',name:'Скопски',city:'Скопје',label:'Скопје и околината',areas:['Центар','Карпош','Аеродром','Кисела Вода','Ѓорче Петров'],description:'Од Карпош до Аеродром, од капка во кујната до нов почеток за целиот дом.'},
  {slug:'krivopalanecki',name:'Кривопаланечки',city:'Крива Паланка',label:'Крива Паланка и околината',areas:['Центар','Конопница','Мождивњак','Дурачка Река','Крива Паланка'],description:'За куќите покрај Крива Река, за градот и за околните села. Мајстор од вашиот крај.'}
];

export const services = [
  {slug:'vodovod',name:'Водовод',trade:'Водоводџија',icon:'pipe',color:'blue',intro:'Капе, тече или воопшто не тече? Тука почнува поправката.',keywords:'чешма цевки сифон вода одвод водоводџија',min:800,max:3500,unit:'интервенција',subs:[
    {slug:'odzatnuvanje-odvodi',name:'Одзатнување одводи',min:1000,max:3500,unit:'интервенција',description:'Одзатнување мијалници, сифони и одводни цевки во домот.'},
    {slug:'montaza-sanitarija',name:'Монтажа на санитарија',min:1500,max:5000,unit:'елемент',description:'Монтажа или замена на мијалник, WC-школка, чешма и туш-батерија.'}]},
  {slug:'elektrika',name:'Електрика',trade:'Електричар',icon:'bolt',color:'yellow',intro:'Од нов штекер до средена инсталација. Сè на свое место.',keywords:'струја штекер светло сијалица осигурувач електричар',min:700,max:4000,unit:'интервенција',subs:[
    {slug:'elektricni-instalacii',name:'Електрични инсталации',min:1500,max:5000,unit:'интервенција',description:'Поправка и поставување домашни електрични инсталации.'},
    {slug:'montaza-osvetluvanje',name:'Монтажа на осветлување',min:700,max:2500,unit:'светилка',description:'Поставување лустери, плафонки и ѕидно осветлување.'}]},
  {slug:'moleraj',name:'Молерај',trade:'Молер',icon:'brush',color:'red',intro:'Малку боја, голема промена. За ѕидови со нова приказна.',keywords:'бојадисување кречење глетување молер ѕид',min:100,max:220,unit:'м²',subs:[
    {slug:'bojadisuvanje-dzidovi',name:'Бојадисување ѕидови',min:100,max:180,unit:'м²',description:'Освежување на внатрешни ѕидови и тавани со боја.'},
    {slug:'gletuvanje',name:'Глетување',min:150,max:250,unit:'м²',description:'Израмнување и подготовка на ѕидови пред бојадисување.'}]},
  {slug:'keramika',name:'Керамика',trade:'Керамичар',icon:'tiles',color:'green',intro:'Плочка по плочка. За бања и кујна што ќе траат.',keywords:'плочки фуги бања керамичар',min:600,max:1200,unit:'м²',subs:[
    {slug:'postavuvanje-plocki',name:'Поставување плочки',min:600,max:1200,unit:'м²',description:'Поставување подни и ѕидни плочки во бања, кујна или ходник.'},
    {slug:'fugiranje',name:'Фугирање и силиконирање',min:150,max:400,unit:'м²',description:'Обнова на фуги и силиконски споеви околу санитаријата.'}]},
  {slug:'stolarija',name:'Столарија',trade:'Столар',icon:'saw',color:'yellow',intro:'Со мерак и по мерка. Дрвото знае кога е во добри раце.',keywords:'дрво мебел кујна шкаф врати столар',min:1000,max:5000,unit:'интервенција',subs:[
    {slug:'montaza-mebel',name:'Монтажа на мебел',min:1500,max:6000,unit:'елемент',description:'Составување и поставување шкафови, комоди, маси и кревети.'},
    {slug:'popravka-vrati',name:'Поправка на дрвени врати',min:1000,max:3500,unit:'врата',description:'Штелување шарки, поправка на рамки и врати што заглавуваат.'}]},
  {slug:'greenje-i-klimi',name:'Греење и клими',trade:'Сервисер за клими',icon:'sun',color:'red',intro:'Ладно кога треба. Топло кога сакате.',keywords:'клима греење ладење радијатор сервис',min:1500,max:6500,unit:'уред',subs:[
    {slug:'servis-klimi',name:'Сервис и чистење клими',min:1500,max:3000,unit:'уред',description:'Редовно чистење, одржување и проверка на клима-уреди.'},
    {slug:'montaza-klimi',name:'Монтажа на клими',min:4000,max:7000,unit:'уред',description:'Поставување внатрешна и надворешна единица на клима-уред.'}]},
  {slug:'bela-tehnika',name:'Бела техника',trade:'Сервисер',icon:'washer',color:'blue',intro:'За машината пак да врти, а фрижидерот да лади.',keywords:'машина перење садови фрижидер шпорет сервисер',min:1000,max:4000,unit:'поправка',subs:[
    {slug:'popravka-masini',name:'Поправка на машини за перење',min:1200,max:4000,unit:'поправка',description:'Дијагностика и поправка на машини за перење алишта.'},
    {slug:'popravka-sporeti',name:'Поправка на шпорети',min:1000,max:3500,unit:'поправка',description:'Сервис на електрични шпорети, рерни и грејни плочи.'}]},
  {slug:'krovovi',name:'Кровови',trade:'Кровопокривач',icon:'roof',color:'green',intro:'Добар покрив, мирен сон. И кога ќе заврне.',keywords:'кров ќерамиди олуци протекување покрив',min:500,max:1400,unit:'м²',subs:[
    {slug:'popravka-krov',name:'Поправка на кров',min:600,max:1500,unit:'м²',description:'Замена на оштетени ќерамиди и поправка на делови од покривот.'},
    {slug:'montaza-oluci',name:'Монтажа и поправка на олуци',min:500,max:1000,unit:'должен метар',description:'Поставување, поправка и замена на олуци и одводни вертикали.'}]},
  {slug:'podovi',name:'Подови',trade:'Подополагач',icon:'floor',color:'blue',intro:'Чекор кон поубав дом. Од првата до последната штица.',keywords:'ламинат паркет под лакирање',min:250,max:700,unit:'м²',subs:[
    {slug:'postavuvanje-laminat',name:'Поставување ламинат',min:250,max:450,unit:'м²',description:'Поставување ламинат, подлога и завршни лајсни.'},
    {slug:'hobluvanje-parket',name:'Хоблување и лакирање паркет',min:450,max:800,unit:'м²',description:'Обнова на дрвен паркет со хоблување и завршно лакирање.'}]},
  {slug:'bravarija',name:'Браварија',trade:'Бравар',icon:'key',color:'yellow',intro:'За секоја врата има решение. И мајстор за него.',keywords:'брава клуч врата ограда метал бравар',min:800,max:3500,unit:'интервенција',subs:[
    {slug:'zamena-bravi',name:'Замена на брави',min:800,max:2500,unit:'брава',description:'Замена на цилиндри, брави и механизми на врати.'},
    {slug:'popravka-metalni-ogradi',name:'Поправка на метални огради',min:1500,max:5000,unit:'интервенција',description:'Поправка на метални огради, капии, шарки и споеви.'}]}
];

const firstNames = ['Горан','Никола','Зоран','Александар','Драган','Бојан','Игор','Петар','Влатко','Дејан','Марија','Стефан','Елена','Тони','Мартин','Ѓорѓи','Кирил','Филип','Виктор','Димитар','Даниел','Благој','Сашо','Павле','Ристе','Љупчо','Борис','Миле','Трајче','Златко','Коста','Митко','Гоце','Славчо','Васил','Климент','Оливер','Андреј','Душан','Ангел','Иван','Јован','Кристијан','Наум','Дарко','Владимир','Перо','Томе','Ненад','Симеон'];
const surnames = [['Стојановски','Петровски','Трајковски','Митревски','Атанасовски','Илиевски','Јовановски','Николовски','Ристевски','Димовски'],['Стојанов','Петров','Трајков','Митров','Атанасов','Илиев','Јованов','Николов','Ристов','Димитров']];
const approaches = [
  'Прво го разгледува проблемот, потоа го објаснува секој чекор. Сака работата да остане уредна и по заминувањето.',
  'Посветува внимание на малите детали. Пред почеток подготвува јасен список на работи и потребни материјали.',
  'Практичен пристап за секојдневни домашни поправки, со фокус на одржување и зачувување на постојните елементи.',
  'Сака добро испланирана работа и прецизна завршница. Особено се посветува на уредување на постари домови.',
  'Пристапува трпеливо и објаснува како да се одржува поправеното. Работи на мали и средни домашни зафати.'
];
export const people = regions.flatMap((region,r) => services.flatMap((service,s) => Array.from({length:5},(_,i)=>({
  id:`${region.slug}-${service.slug}-${i+1}`,
  name:`${firstNames[(s*5+i+r*7)%50]} ${['Марија','Елена'].includes(firstNames[(s*5+i+r*7)%50])?surnames[r][s].replace(/ски$/,'ска').replace(/ов$/,'ова'):surnames[r][s]}`,
  region:region.slug,service:service.slug,area:region.areas[i],city:region.city,
  specialties:service.subs.map(x=>x.name),rating:[4.9,4.8,4.8,4.7,4.6][i],
  experience:[18,12,9,15,7][(i+s)%5],multiplier:[1,0.85,1.15,0.95,0.8][i],
  color:['blue','red','green','yellow','blue'][(i+s)%5],description:approaches[i],demo:true
}))));
export const regionBySlug = slug => regions.find(r=>r.slug===slug);
export const serviceBySlug = slug => services.find(s=>s.slug===slug);
export function priceFor(person,subservice) {
  const s=serviceBySlug(person.service);const p=s.subs.find(x=>x.slug===subservice)||s;
  return {min:Math.round(p.min*person.multiplier/10)*10,max:Math.round(p.max*person.multiplier/10)*10,unit:p.unit};
}
export const number = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
export function normalize(value) {
  const map={'љ':'lj','њ':'nj','џ':'dz','ж':'zh','ч':'ch','ш':'sh','ѓ':'gj','ќ':'kj','а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','з':'z','ѕ':'dz','и':'i','ј':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c'};
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[а-шѓќљњџѕј]/g,c=>map[c]||c).replace(/zh/g,'z').replace(/ch/g,'c').replace(/sh/g,'s').replace(/gj/g,'g').replace(/kj/g,'k');
}
