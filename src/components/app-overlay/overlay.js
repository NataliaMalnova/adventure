const find = (node) => {
    while (node) {
        if (node.hasAttribute('data-notshow-modal')) {
            return 0;
        } else {
            node = node.parentElement;
        }
    }
    return 1;
}
const showModal = () => {

    const btn = document.querySelectorAll('[data-show-modal]')

    if(btn.length == 0) return

    btn.forEach(elem => {
        let overlay = document.querySelector("." + elem.getAttribute('data-show-modal'))

        if(!overlay) return

        const close = overlay.querySelector('.overlay-close')

        const notshow = elem.querySelectorAll('[data-notshow-modal]');


        elem.addEventListener('click', function(e) {
            let show = 1;

            if(!find(e.target)) show= 0;

            e.preventDefault();
            if(!show) return;

            document.documentElement.style.overflowY = 'hidden';

            overlay.style.zIndex = 999;
            elem.disabled = true;

            setTimeout(() => {
                overlay.classList.add('overlay-show')
                elem.disabled = false
            }, 100)
        });
        if(close) {
            close.addEventListener('click', function(e) {

                e.preventDefault()
                clickClose()
            })
        }

        overlay.addEventListener('click', function(e) {
            if (e.target != overlay) return
            clickClose()
        })

        const clickClose = () => {
            if (getComputedStyle(overlay.querySelector('.overlay-wrap')).marginRight != '0px') return
            overlay.classList.remove('overlay-show')
            setTimeout(() => {
                overlay.style.zIndex = -1
                document.documentElement.style.overflowY = 'auto'
            }, 300)
        }
    })
}

export default showModal;

