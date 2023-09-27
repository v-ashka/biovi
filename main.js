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
            { id: 5, text: 'African Swine Fever', link: '/african-fever', imgSrc: '65a.jpg', },
            { id: 6, text: 'Lyme disease', link: '/african-fever', imgSrc: '64a.jpg', },
            { id: 7, text: 'Highly Pathogenic Avian Influenza', link: '/african-fever', imgSrc: '61.jpg', },
            { id: 8, text: 'Information for beekeepers', link: '/african-fever', imgSrc: '9.jpg', }
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
        this.container.append(this.itemList, this.paginationList);
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
        carouselItemTitle.textContent = item.id 
            
        
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
            this.handleBtns(items.length)
            // this.loop(items.length, this.widthVal);
        }
    }


    
            // if (index == paginationElements) {
            //         this.paginationList.children[index].firstChild.removeAttribute('data', 'active')    
            //         index = 0;
            //         this.paginationList.children[index].firstChild.setAttribute('data', 'active')

            // } else {
            //     this.paginationList.children[index].firstChild.removeAttribute('data', 'active')
            //     index++;
            //     this.paginationList.children[index].firstChild.setAttribute('data', 'active')
            // }   


    changeItem(gap, position, itemsWidth, itemWidth, paginationElements) {
        let indexPos = 0;
        console.log('indexPos: ' + indexPos)
        this.btnRight.addEventListener('click', e => {
            if (indexPos == paginationElements) {
                this.paginationList.children[indexPos].firstChild.removeAttribute('data', 'active')
                indexPos = 0;
                // console.log(`${indexPos} || ${paginationElements}`)
                this.paginationList.children[indexPos].firstChild.setAttribute('data', 'active')
                // console.log(`${indexPos} || ${paginationElements}`)


                
            } else {
                 this.paginationList.children[indexPos].firstChild.removeAttribute('data', 'active')
            indexPos++;
            this.paginationList.children[indexPos].firstChild.setAttribute('data', 'active')           
            }

            // console.log(`${position} > ${itemsWidth} || ${position} || ${indexPos}`)
            position += itemWidth + gap
            

            this.itemList.style.transform = `translateX(-${position}px)`
            console.log(`${position} > ${itemsWidth} || ${position} || ${indexPos} || ${paginationElements}`)

            if (position > itemsWidth) {
                position = 0;   
                this.itemList.style.transform = `translateX(-${position}px)`

            }
        })
        
        this.btnLeft.addEventListener('click', e => {
            if (indexPos <= 0) {
                this.paginationList.children[indexPos].firstChild.removeAttribute('data', 'active')
                indexPos = paginationElements;
                // console.log(`${indexPos} || ${paginationElements}`)
                this.paginationList.children[indexPos].firstChild.setAttribute('data', 'active')
                // console.log(`${indexPos} || ${paginationElements}`)
            } else {
                 this.paginationList.children[indexPos].firstChild.removeAttribute('data', 'active')
            indexPos--;
            this.paginationList.children[indexPos].firstChild.setAttribute('data', 'active')           
            }


            // console.log(`${position} > ${itemsWidth} || ${position} || ${indexPos}`)
            position -= itemWidth + gap
            // indexPos--;
            this.itemList.style.transform = `translateX(-${position}px)`
            console.log(`${position} > ${itemsWidth} || ${position} || ${indexPos} || ${paginationElements}`)
            
            if (position < 0 ) {
                position = itemsWidth;
                
                this.itemList.style.transform = `translateX(-${position}px)`
            }
        })

        const paginationArray = Array.from(this.paginationList.children);
        paginationArray.forEach((paginItem, index) => {
                
            paginItem.addEventListener('click', e => {
                paginationArray.forEach(items => {
                    items.firstChild.removeAttribute('data', 'active')
                })  
                
                paginItem.firstChild.setAttribute('data', 'active')
                position = index * (itemWidth + gap)
                this.itemList.style.transform = `translateX(-${position}px)`
            })
        })
    }


    handleBtns(items) {
        const gap = 20;
        const itemsInRow = Math.floor(window.innerWidth / this.itemList.firstChild.offsetWidth);
        let position = 0;
        const itemsWidth = (this.itemList.firstChild.offsetWidth * (items - itemsInRow)) + ((items - itemsInRow) * gap); 
        const itemWidth = (this.itemList.firstChild.offsetWidth)
        console.log(itemsInRow, position, itemsWidth, itemWidth)

        // add pagination btns
        const paginationElements = Math.floor(itemsWidth / itemWidth);
        console.log(paginationElements)
        for (let index = 0; index <= paginationElements; index++) {
            const paginationItem = this.createElement('li');
            const paginationBtn = this.createElement('button', 'item');
            paginationItem.append(paginationBtn);
            this.paginationList.append(paginationItem);
        }
        this.paginationList.firstChild.firstChild.setAttribute('data', 'active')
        this.changeItem(gap, position, itemsWidth, itemWidth, paginationElements);
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
