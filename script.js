const carousel = document.getElementById('carousel');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function getCards(){ return Array.from(carousel.querySelectorAll('.card')); }
function updateDots(){
  const cards = getCards();
  dotsContainer.innerHTML = '';
  cards.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.addEventListener('click', () => scrollToCard(idx));
    dotsContainer.appendChild(dot);
  });
  highlightDot();
}
function cardWidth(){ return getCards()[0].offsetWidth + 20; }
function currentIndex(){
  const x = carousel.scrollLeft;
  return Math.round(x / cardWidth());
}
function scrollToCard(index){
  carousel.scrollTo({ left: index * cardWidth(), behavior: 'smooth' });
}
function highlightDot(){
  const idx = currentIndex();
  const dots = Array.from(dotsContainer.children);
  dots.forEach((d,i)=>d.classList.toggle('active', i===idx));
}

prevBtn.addEventListener('click', () => scrollToCard(Math.max(0, currentIndex()-1)));
nextBtn.addEventListener('click', () => scrollToCard(Math.min(getCards().length-1, currentIndex()+1)));
carousel.addEventListener('scroll', () => { requestAnimationFrame(highlightDot); });

window.addEventListener('load', updateDots);
window.addEventListener('resize', () => setTimeout(updateDots, 100));
