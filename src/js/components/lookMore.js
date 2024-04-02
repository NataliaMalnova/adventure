const changeBtn = (heightStart, content, btn) => {
  if(heightStart > content.scrollHeight) {
    btn.classList.add('d-none');
  } else {
    btn.classList.remove('d-none');
  }
}

const setMaxHeight = (content, heightStart) => {
  content.style.setProperty('max-height', heightStart + 'px');
}

const setPropertyClamp = (content_txt, row = null) => {
  if(!content_txt) return;
  if(row) content_txt.style.setProperty('-webkit-line-clamp', row);
  else content_txt.style.removeProperty('-webkit-line-clamp');
}

const lookMore = () => {
  const wrapper = document.querySelectorAll('.js--look-more');

  if(wrapper.length === 0) return;

  wrapper.forEach(wrap => {
    const btn = wrap.querySelector('.js--look-more--btn');
    const content = wrap.querySelector('.js--look-more--content');
    const content_txt = content.querySelector('p');
    let row = 3;
    if(wrap.hasAttribute('data-more-content-row')) row = wrap.getAttribute('data-more-content-row');

    let heightStart = 19 * row + 2;
    const ob = content.querySelector('div');

    if(!btn || !content) return;

    setMaxHeight(content, heightStart);
    changeBtn(heightStart, content, btn);

    if (wrap.hasAttribute('data-more-only-mobile') && window.innerWidth > 991) {
      setMaxHeight(content, content.scrollHeight);
      btn.classList.add('d-none');
    } else setPropertyClamp(content_txt, row);

    btn.addEventListener('click', () => {
      let textShow = '';
      let textHidden = '';
      if(btn.hasAttribute('data-more-show')) textShow = btn.getAttribute('data-more-show');
      if(btn.hasAttribute('data-more-hidden')) textHidden = btn.getAttribute('data-more-hidden');
      if(wrap.classList.contains('active')) {
        setMaxHeight(content, heightStart);
        if(textShow) btn.querySelector('span').innerHTML = textShow;

        setTimeout(() => {
          wrap.classList.remove('active');
        }, 0);
        setTimeout(() => {
          setPropertyClamp(content_txt, row);
        }, 600);

      } else {
        setPropertyClamp(content_txt);

        setMaxHeight(content, content.scrollHeight);
        if(textHidden) btn.querySelector('span').innerHTML = textHidden;
        setTimeout(() => {
          wrap.classList.add('active');
        }, 0);
      }
    });

    window.addEventListener('resize', function(event){
      if(wrap.hasAttribute('data-more-only-mobile') && window.innerWidth > 991) {
        setMaxHeight(content, content.scrollHeight);
        btn.classList.add('d-none');
        setPropertyClamp(content_txt);
      } else {
        changeBtn(heightStart, content, btn);
        setMaxHeight(content, heightStart);
        setPropertyClamp(content_txt, row);
      }
    });

    const ro = new ResizeObserver(entries => {
      changeBtn(heightStart, content, btn);
      if(!wrap.classList.contains('active')) return;
      setMaxHeight(content, content.scrollHeight);
    })
    if(ob) ro.observe(ob)
  })
};
export default lookMore;