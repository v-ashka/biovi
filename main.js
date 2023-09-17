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


class Model{
    constructor() {
        
        this.carouselItems = [
            { id: 1, text: 'African Swine Fever', link: '/african-fever', imgSrc: '65a.jpg', },
            { id: 2, text: 'Lyme disease', link: '/african-fever', imgSrc: '64a.jpg', },
            { id: 3, text: 'Highly Pathogenic Avian Influenza', link: '/african-fever', imgSrc: '61.jpg', },
            { id: 4, text: 'Information for beekeepers', link: '/african-fever', imgSrc: '9.jpg', },
            { id: 1, text: 'African Swine Fever', link: '/african-fever', imgSrc: '65a.jpg', },
            { id: 2, text: 'Lyme disease', link: '/african-fever', imgSrc: '64a.jpg', },
            { id: 3, text: 'Highly Pathogenic Avian Influenza', link: '/african-fever', imgSrc: '61.jpg', },
            { id: 4, text: 'Information for beekeepers', link: '/african-fever', imgSrc: '9.jpg', }
        ];
        this.carouselTitle = 'Information Materials';
    }

    addItem(itemText, itemLink, itemImg) {
        const item = {
            id: this.carouselItems.length > 0 ? this.carouselItems[this.carouselItems.length - 1].id + 1 : 1,
            text: itemText,
            link: itemLink,
            imgSrc: itemImg,
        }

        this.carouselItems.push(item);

        this.onCarouselListChanged(this.carouselItems, this.carouselTitle);
    }

    deleteItem(id) {
        this.carouselItems = this.carouselItems.filter((item) => {
            item.id !== id
        })
        this.onCarouselListChanged(this.carouselItems, this.carouselTitle);
    }

    bindCarouselListChanged(callback) {
        this.onCarouselListChanged = callback;
    }
}

class View{
    constructor() {
        this.carousel = this.getElement('.carousel');
        this.headingWrapper = this.createElement('div', 'carousel__wrapper');
        // heading title
            this.title = this.createElement('h2', 'fs-primary-heading');
            

        // buttons functional
        this.btnWrapper = this.createElement('div', 'buttons-wrapper');
        // btnRight
        this.btnRight = this.createElement('button', 'btn-arrow.next');
        this.btnRight.textContent = '>';

        this.btnLeft = this.createElement('button', 'btn-arrow.previous');
        this.btnLeft.textContent = '<';

        // container for carousel and carousel pagination
        this.container = this.createElement('div', 'columns');
        this.container.classList.add('d-inline-flex'); 
        
        this.itemList = this.createElement('ul', 'column-items');
        this.paginationList = this.createElement('ul', 'carousel-pagination');
        this.container.append(this.itemList);
        //
        //  carousel__wrapper append
            // btns wrapper
        this.btnWrapper.append(this.btnLeft, this.btnRight);
        this.headingWrapper.append(this.title, this.btnWrapper);

        this.carousel.append(this.headingWrapper, this.container);

        this.widthVal = 0;
        this.widthValTemp = 0;
        this.actualTransform = 0;
    }   


    getElement(selector) {
        const element = document.querySelector(selector);

        return element;
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if(className) element.classList.add(className);

        return element;
    }

    displaySlides(items, slideTitle) {
        console.log(items, slideTitle)
        while (this.itemList.firstChild) {
      this.itemList.removeChild(this.itemList.firstChild)
        }


        if (slideTitle) this.title.textContent = slideTitle;
        if (items.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Slides not found!';
            this.carousel.append(p);

            this.btnWrapper.remove();
        } else {
            


        // carosuel item
            items.forEach(item => {
        // title and btns wrapper
             const anchorItem = this.createElement('a');
        anchorItem.href = item.link;
            // li.info-item-box 
        const infoItemBox = this.createElement('li', 'info-item-box');
        // div.carousel__wrapper
        const carouselWrapper = this.createElement('div', 'carousel__wrapper');
        // carousel Image
        const carouselItemImage = this.createElement('img')
        carouselItemImage.src = `assets/img/${item.imgSrc}`;
        // carousel Title

        const carouselItemTitleBox = this.createElement('div', 'info__title');
        const carouselItemTitle = this.createElement('p');
        carouselItemTitle.textContent = item.text
            
        
        // append elements

        // info_titte append
        carouselItemTitleBox.append(carouselItemTitle);
        // carousel__wrapper append

        carouselWrapper.append(carouselItemImage, carouselItemTitleBox);
        // info-item-box append
        infoItemBox.append(carouselWrapper);
        // a append
                anchorItem.append(infoItemBox);
                        
        // ul.column-items append
        this.itemList.append(anchorItem);
        // columns|d-inline-flex append
        })   
            this.widthVal = this.itemList.firstChild.offsetWidth;
            this.widthValTemp = this.widthVal;
            this.nextItem(items.length, this.widthVal);
            this.previousItem(items.length, this.widthVal)
            // this.loop(items.length, this.widthVal);
        }
    }

    loop(items, anchor) {
        this.widthVal = this.itemList.firstChild.offsetWidth;
        let secTemp = anchor;
        let temp = items;
        temp--;

        setTimeout(() => {
            this.itemList.style.transform = `translateX(-${secTemp + 20}px)`;
            console.log('resolution: ', window.innerWidth)
            console.log('temp items: ', temp);
            console.log('widthVal', this.widthVal)
            if (this.widthVal != this.widthValTemp) {
                this.itemList.style.transform = `translateX(-${0}px)`;   
                secTemp = this.widthVal;
                temp = this.itemList.children.length;
                this.widthValTemp = this.widthVal;
                this.loop(temp, secTemp);

            } else {

            secTemp += this.widthVal + 20;

            if (window.innerWidth > 0 && window.innerWidth < 610) {
                if (temp < 1 ) {
                temp = this.itemList.children.length;
                this.itemList.style.transform = `translateX(-${0}px)`;
                secTemp = this.widthVal;
                }
    
            }
            if (window.innerWidth >= 610 && window.innerWidth < 916) {
                if (temp < 2 ) {
                temp = this.itemList.children.length;
                this.itemList.style.transform = `translateX(-${0}px)`;
                secTemp = this.widthVal;
                }
    
            }

            if (window.innerWidth >= 916 && window.innerWidth < 1200) {
                if (temp < 3 ) {
                temp = this.itemList.children.length;
                this.itemList.style.transform = `translateX(-${0}px)`;
                secTemp = this.widthVal;
                }
    
            }
            if (window.innerWidth >= 1200) {
                if (temp < 4 ) {
                temp = this.itemList.children.length;
                this.itemList.style.transform = `translateX(-${0}px)`;
                secTemp = this.widthVal;
                }
    
            }            
            console.log(this.widthVal, this.widthValTemp)
            this.loop(temp, secTemp);                
            }
        }, 2000);
    };

    nextItem(items, widthElem) {
        let secTemp = widthElem;
        let temp = items;
        this.widthVal = this.itemList.firstChild.offsetWidth;
        this.btnRight.addEventListener('click', (e) => {
            temp--;
            this.actualTransform = secTemp + 20;
            this.itemList.style.transform = `translateX(-${this.actualTransform}px)`;
            if (this.widthVal != this.widthValTemp) {
                this.actualTransform = 0;
                this.itemList.style.transform = `translateX(-${this.actualTransform}px)`;
                secTemp = this.widthVal;
                temp = this.itemList.children.length;
                this.widthValTemp = this.widthVal;
                this.loop(temp, secTemp);

            } else {

                secTemp += this.widthVal + 20;

                if (window.innerWidth > 0 && window.innerWidth < 610) {
                    if (temp < 1) {
                        this.actualTransform = 0;
                        temp = this.itemList.children.length;
                        this.itemList.style.transform = `translateX(-${this.actualTransform}px)`;
                        secTemp = this.widthVal;
                    }
    
                }
                if (window.innerWidth >= 610 && window.innerWidth < 916) {
                    if (temp < 2) {
                        this.actualTransform = 0;
                        temp = this.itemList.children.length;
                        this.itemList.style.transform = `translateX(-${this.actualTransform}px)`;
                        secTemp = this.widthVal;
                    }
    
                }

                if (window.innerWidth >= 916 && window.innerWidth < 1200) {
                    if (temp < 3) {
                        this.actualTransform = 0;
                        temp = this.itemList.children.length;
                        this.itemList.style.transform = `translateX(-${this.actualTransform}px)`;
                        secTemp = this.widthVal;
                    }
    
                }
                if (window.innerWidth >= 1200) {
                    if (temp < 4) {
                        this.actualTransform = 0;
                        temp = this.itemList.children.length;
                        this.itemList.style.transform = `translateX(-${this.actualTransform}px)`;
                        secTemp = this.widthVal;
                    }
    
                }
            }
            console.log(this.actualTransform)
        }
        )
    }

     previousItem(items, widthElem) {
        let secTemp = widthElem;
        let temp = items;
        this.widthVal = this.itemList.firstChild.offsetWidth;
        this.btnLeft.addEventListener('click', (e) => {
            console.log(secTemp, temp, this.actualTransform)

            this.itemList.style.transform = `translateX(-${this.actualTransform - secTemp + -20}px)`;
        }
        )
    }

}

class Controller{
    constructor(model, view) {
        this.model = model
        this.view = view

        // Display initial slides
        this.onCarouselListChanged(this.model.carouselItems, this.model.carouselTitle);

        this.model.bindCarouselListChanged(this.onCarouselListChanged);
    }

    onCarouselListChanged = (items, title) => {
        this.view.displaySlides(items, title)
    }
}


let slideApp = new Controller(new Model(), new View())
// slideApp.model.addItem('test word', 'link', 'src.jpg')
