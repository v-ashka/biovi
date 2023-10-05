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
            this.widthVal = this.itemList.firstChild.offsetWidth;
            this.widthValTemp = this.widthVal;
            this.handleBtns(items.length)
            // this.loop(items.length, this.widthVal);
        }
    }


    changeItem(gap, position, itemsWidth, itemWidth, paginationElements) {
        let paginationIndex = undefined
        if (paginationElements != undefined) paginationIndex = 0;
                this.btnRight.addEventListener('click', e => {
                    console.log(`${position} > ${itemsWidth} || ${paginationElements}`)
                        // console.log(this.carousel.offsetWidth)
                    if (position >= itemsWidth) {
                        position = 0;
                        this.itemList.style.transform = `translateX(-${position}px)`
                        // pagination
                        if (paginationElements) {
                            this.paginationList.children[paginationIndex].firstChild.removeAttribute('data', 'active')
                            paginationIndex = 0;
                            this.paginationList.children[paginationIndex].firstChild.setAttribute('data', 'active')    
                        }
                    } else {
                        position += itemWidth + gap
                        this.itemList.style.transform = `translateX(-${position}px)`    

                        if (paginationElements) {
                            // console.log(paginationIndex)
                            this.paginationList.children[paginationIndex].firstChild.removeAttribute('data', 'active')
                            paginationIndex++;
                            this.paginationList.children[paginationIndex].firstChild.setAttribute('data', 'active')        
                        }
                    }
                })
                
                this.btnLeft.addEventListener('click', e => {
                if (position <= 0 ) {
                    position = itemsWidth;
                    this.itemList.style.transform = `translateX(-${position}px)`
                    // pagination
                    if (paginationElements) {
                        this.paginationList.children[paginationIndex].firstChild.removeAttribute('data', 'active')
                        paginationIndex = paginationElements - 1;
                        this.paginationList.children[paginationIndex].firstChild.setAttribute('data', 'active')    
                    }
                } else {
                    // console.log(`${position} > ${itemsWidth} || ${paginationElements}`)
                    position -= itemWidth + gap
                    this.itemList.style.transform = `translateX(-${position}px)`
                    if (paginationElements) {
                            this.paginationList.children[paginationIndex].firstChild.removeAttribute('data', 'active')
                            paginationIndex--;
                            this.paginationList.children[paginationIndex].firstChild.setAttribute('data', 'active')        
                    }
                }
                    
                })
        

        for (let item = 0; item < paginationElements; item++)  
        {
            this.paginationList.children[item].addEventListener('click', e => {
                this.paginationList.children[paginationIndex].firstChild.removeAttribute('data', 'active')
                    paginationIndex = item;
                    position = item * (itemWidth + gap)
                this.paginationList.children[paginationIndex].firstChild.setAttribute('data', 'active')
                this.itemList.style.transform = `translateX(-${position}px)`
            })
        }

    }
          


    handleBtns(items) {
        const gap = 20;
        const itemsInRow = Math.floor(this.carousel.offsetWidth / this.itemList.firstChild.offsetWidth);
        let position = 0;
        const itemsWidth = (this.itemList.firstChild.offsetWidth * (items - itemsInRow)) + ((items - itemsInRow) * gap); 
        const itemWidth = (this.itemList.firstChild.offsetWidth)

        // add pagination btns


        if (this.paginationList) {
            const paginationElements = Math.floor(itemsWidth / itemWidth);
            // console.log(this.paginationList.lastChild)
            while (this.paginationList.firstChild) {
                this.paginationList.removeChild(this.paginationList.firstChild)
            }
                for (let index = 0; index <= paginationElements; index++) {
                    const paginationItem = this.createElement('li');
                    const paginationBtn = this.createElement('button', 'item');
                    paginationItem.append(paginationBtn);
                    
                    this.paginationList.append(paginationItem);
            }

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
