import Swiper, { Navigation, Pagination } from 'swiper';

import scrolling from './components/scroll.js'
import * as header from '../components/_layout/header/header.js'
import {changeShopBorder} from "../components/shops/shop.js";
import changeReview from "../components/review/review.js";
import showModal from "../components/app-overlay/overlay.js";
import {filterPromocodes, showPromo, showMore} from "../components/promocodes/promocode.js";
import changeBurger from "../components/burger/burger.js";
import showAccordion from "../components/faq/faq.js";
import lookMore from "./components/lookMore.js";



window.addEventListener('load', () => {
    scrolling();
    header.changeDatalist();
    header.showSearchMobile();
    header.closeSearchList();
    changeShopBorder();
    changeReview();
    showModal();
    filterPromocodes();
    showPromo();
    showMore();
    changeBurger();
    showAccordion();
    lookMore();


    new Swiper(".shop-swiper", {
        slidesPerView: 1,
        modules: [Navigation, Pagination],
        spaceBetween: 8,
        navigation: {
            nextEl: '.shop-slider__navigation .swiper-button-next',
            prevEl: '.shop-slider__navigation .swiper-button-prev',
        },
        pagination: {
            el: ".shop-slider__pagination",
            clickable: true
        },
    });

    const copyText = () => {
        const wrap = document.querySelectorAll('.js--copy');
        if(wrap.length == 0) return;

        wrap.forEach(elem => {
            const btn = elem.querySelector('.js--copy-btn');
            const input = elem.querySelector('.js--copy-input');

            if(!btn || !input) return;

            btn.addEventListener('click', () => {
                input.select();
                document.execCommand("copy");
            })
        })
    }

    copyText();
});