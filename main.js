import { ModelCarousel, ViewCarousel, ControllerCarousel } from './carousel.js';
import { ModelNews, ViewNews, ControllerNews } from './news.js';

const navBtnHamburger = document.querySelector('.mobile-nav-toggle');
const navBtnClose = document.querySelector('.mobile-nav-toggle[data-control="close"]');

const primaryNav = document.querySelector('.primary-navigation');
const primaryHeader = document.querySelector('.primary-header');

const navWrapper = document.querySelector('.primary-header .nav-wrapper');
navBtnHamburger.addEventListener('click', e => {
    e.preventDefault();
    primaryNav.hasAttribute('data-visible') ? navBtnHamburger.setAttribute('aria-expanded', false) : navBtnHamburger.setAttribute('aria-expanded', true);
    primaryNav.toggleAttribute('data-visible');
    primaryHeader.toggleAttribute('data-overlay');
})

navBtnClose.addEventListener('click', e => {
    e.preventDefault();
    primaryNav.hasAttribute('data-visible') ? navBtnHamburger.setAttribute('aria-expanded', false) : navBtnHamburger.setAttribute('aria-expanded', true);
    primaryNav.toggleAttribute('data-visible');
    primaryHeader.toggleAttribute('data-overlay');
})

window.addEventListener('scroll', e => {
    // console.log(e);
    primaryHeader.getBoundingClientRect().top < -100 ? navWrapper.setAttribute('data-nav', true) : navWrapper.setAttribute('data-nav', false)
})



new ControllerCarousel(new ModelCarousel(), new ViewCarousel())
new ControllerNews(new ModelNews(), new ViewNews())
// slideApp.model.addItem('test word', 'link', 'src.jpg')
