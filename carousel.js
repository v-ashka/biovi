import data from './sliderData.json'
export class ModelCarousel{
    constructor() {
        this.carouselItems = data;
        this.carouselTitle = 'Information Materials';
        this.carouselPagination = true;
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

export class ViewCarousel{
    constructor() {
        this.carousel = this.getElement('.carousel');
        this.headingWrapper = this.createElement('div', 'carousel__wrapper');
        // heading title
            this.title = this.createElement('h2', 'fs-primary-heading');
            

        // buttons functional
        this.btnWrapper = this.createElement('div', 'buttons-wrapper');
        // btnRight
        this.btnRight = this.createElement('button', 'btn-arrow');
        this.btnRight.classList.add('next');
        this.btnRight.innerHTML = `   
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
              >
                <path
                  d="M9.1 0.793091L8.113 1.81512L11.319 5.14214H0V6.59182H11.319L8.106 9.91885L9.1 10.9409L14 5.86698L9.1 0.793091Z"
                  fill="white"
                />
              </svg>`;

        this.btnLeft = this.createElement('button', 'btn-arrow');
        this.btnLeft.classList.add('previous');
        this.btnLeft.innerHTML = `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
              >
                <path
                  d="M4.9 0.793091L5.887 1.81512L2.681 5.14214H14V6.59182H2.681L5.894 9.91885L4.9 10.9409L0 5.86698L4.9 0.793091Z"
                  fill="white"
                />
              </svg>
              
              `;

        // container for carousel and carousel pagination
        this.container = this.createElement('div', 'columns');
        this.container.classList.add('d-inline-flex'); 
        
        this.itemList = this.createElement('ul', 'column-items');
        this.container.append(this.itemList);
        //
        //  carousel__wrapper append
            // btns wrapper
        this.btnWrapper.append(this.btnLeft, this.btnRight);
        this.headingWrapper.append(this.title, this.btnWrapper);

        this.carousel.append(this.headingWrapper, this.container);

        this.paginationList = this.createElement('ul', 'carousel-pagination');
        this.container.append(this.paginationList);

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

    displaySlides(items, slideTitle, paginationState) {
        if (!paginationState) {
             this.paginationList.remove()
        }

        // console.log(items, slideTitle, 'test', paginationState)
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
            this.widthVal = this.itemList.firstChild.clientWidth;
            this.widthValTemp = this.widthVal;
            this.handleBtns(items.length)
            // this.loop(items.length, this.widthVal);
        }
    }

            
    showNextItem(index, len) {
        console.log(index, len)
        if (index === (len - 1) ) return index = 0
        return index + 1 
    }

    showPreviousItem(index, len) {
        if (index === 0) return len - 1
        return index - 1;
    }


    changeItem(gap, position, itemsWidth, itemWidth, paginationElements) {
        // temp val
        let i = 0;

        // slide to right
        this.btnRight.addEventListener('click', e => {
                    // if index === last dot
                    if (i === (paginationElements - 1)) {
                        // set transform position to zero
                        position = 0;
                    } else {
                        // otherwise add elem width to position
                        position += (this.itemList.children[i].offsetWidth + gap)   
                        
            }
            // slide element
            this.itemList.style.transform = `translateX(-${position}px)`
            //  change active dot position 
            this.paginationList.children[i].firstChild.removeAttribute('data', 'active')

            // 
            i = this.showNextItem(i, paginationElements);        
            this.paginationList.children[i].firstChild.setAttribute('data', 'active')     
            })
            
        this.btnLeft.addEventListener('click', e => {
            if (i === 0) {
                position = itemsWidth
            } else {
                position -= (this.itemList.children[i].offsetWidth + gap)
            }
            this.itemList.style.transform = `translateX(-${position}px)`
            this.paginationList.children[i].firstChild.removeAttribute('data', 'active')
            i = this.showPreviousItem(i, (paginationElements));
            this.paginationList.children[i].firstChild.setAttribute('data', 'active')   
                
            })
        

        for (let item = 0; item < paginationElements; item++)  
        {
            this.paginationList.children[item].addEventListener('click', e => {
                this.paginationList.children[i].firstChild.removeAttribute('data', 'active')
                this.paginationList.children[i].firstChild.removeAttribute('data', 'active')
                    i = item;
                    position = item * (itemWidth + gap)
                this.paginationList.children[i].firstChild.setAttribute('data', 'active')
                this.itemList.style.transform = `translateX(-${position}px)`
            })
        }

    }
          


    handleBtns(items) {
        // column gap
        const gap = 20;
        // items in row (depends on resolution)
        const itemsInRow = Math.floor(this.carousel.clientWidth / this.itemList.firstChild.clientWidth);
        // transform position
        let position = 0;
        // invidual element width 
        const itemWidth = (this.itemList.firstChild.clientWidth)
        // 
        const itemsWidth = ((this.itemList.firstChild.clientWidth + gap) * (items)) - (itemsInRow * (itemWidth + gap)); 
        
        //    8 items - 3 items in row = 5 [6 dots]
        //    8 items - 2 items in row = 6 [7 dots]
        //  8 - 1 item in row = 7 [8 dots]
        const dots = items - itemsInRow
        console.log(dots, items, itemsInRow)
        // add pagination btns
        if (this.paginationList) {
            const paginationElements = dots + 1;
            // until window is resizing, delete old dots
            while (this.paginationList.firstChild) {
                this.paginationList.removeChild(this.paginationList.firstChild)
            }
            // create dots
                for (let index = 0; index < paginationElements; index++) {
                    const paginationItem = this.createElement('li');
                    const paginationBtn = this.createElement('button', 'item');
                    paginationItem.append(paginationBtn);
                    // append dots to pagination list
                    this.paginationList.append(paginationItem);
            }
            // set firt dot as active element
            this.paginationList.firstChild.firstChild.setAttribute('data', 'active')    
            this.changeItem(gap, position, itemsWidth, itemWidth, paginationElements);
        } else {
            this.changeItem(gap, position, itemsWidth, itemWidth);
       }
    }


}

export class ControllerCarousel{
    constructor(model, view) {
        this.model = model
        this.view = view

        
        // Display initial slides
        this.onCarouselListChanged(this.model.carouselItems, this.model.carouselTitle, this.model.carouselPagination);

        this.model.bindCarouselListChanged(this.onCarouselListChanged);
        
    }

    onCarouselListChanged = (items, title, paginationState) => {
        this.view.displaySlides(items, title, paginationState)
        window.addEventListener('resize', () => { 
            this.view.displaySlides(items, title, paginationState)
        })
    }
}
