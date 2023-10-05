import data from './newsData.json'
export class ModelNews{
    constructor() {
        this.newsItems = data;
        this.newsSectionTitle = 'News and Events';
        this.newsPagination = false;
        this.imgPath = '../assets/img/'
    }

    addItem(itemText, itemLink, itemImg) {
        const item = {
            id: this.newsItems.length > 0 ? this.newsItems[this.newsItems.length - 1].id + 1 : 1,
            text: itemText,
            link: itemLink,
            imgSrc: itemImg,
        }

        this.newsItems.push(item);

        this.onCarouselListChanged(this.newsItems, this.newsSectionTitle);
    }

    deleteItem(id) {
        this.newsItems = this.newsItems.filter((item) => {
            item.id !== id
        })
        this.onCarouselListChanged(this.newsItems, this.newsSectionTitle);
    }

    bindCarouselListChanged(callback) {
        this.onCarouselListChanged = callback;
    }
}

export class ViewNews{
    constructor() {
        this.news= this.getElement('.news');
        this.newsnewsListWrapper = this.createElement('div', 'newsListWrapper')


        this.headingWrapper = this.createElement('div', 'news__wrapper');
        // heading title
        this.title = this.createElement('h2', 'fs-primary-heading');
        this.title.classList.add('fw-bold');
        

            

        // buttons functional
        this.btnWrapper = this.createElement('div', 'buttons-wrapper');
        this.btnWrapper.classList.add('news__nav');
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
        // container 
        this.container = this.createElement('div', 'container')
        // news list wrapper
        this.newsListWrapper = this.createElement('div', 'news_ul__wrapper');
        
        this.itemList = this.createElement('ul', 'news__section');
        this.itemList.classList.add('even-columns');
        this.newsListWrapper.append(this.itemList);
        //
        //  carousel__wrapper append
        // btns wrapper
        this.btnWrapper.append(this.btnLeft, this.btnRight);
        this.headingWrapper.append(this.title, this.btnWrapper);

        this.container.append(this.headingWrapper, this.newsListWrapper);

        this.news.append(this.container)

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

    displaySlides(items, slideTitle, paginationState, imgPath) {
        if (paginationState) {
                    this.paginationList = this.createElement('ul', 'carousel-pagination');
                    this.newsListWrapper.append(this.paginationList);
        }

        // console.log(items, slideTitle, 'test', paginationState)
        while (this.itemList.firstChild) {
            this.itemList.removeChild(this.itemList.firstChild)
        }


        if (slideTitle) this.title.textContent = slideTitle;
        if (items.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'News not found!';
            this.carousel.append(p);

            this.btnWrapper.remove();
        } else {
        // carosuel item
        items.forEach(item => {
        
                // li.box-square
            const listItem = this.createElement('li');
            if (item.imgCover != undefined) {
                listItem.classList.add('box-rectangle', 'news-bg-img');
                listItem.style.backgroundImage = "linear-gradient(#e6e6e6d3, #f6f6f6c8),url(\'"+imgPath+item.imgCover+ "\')";
                listItem.setAttribute('data-news-img', 'first')
            } else {
                 listItem.classList.add('box-square')
            }
            
                // h2 title
                const newsTitle = this.createElement('h2', 'news__title');
                newsTitle.textContent = item.title;
                // p.news__desc
                const newsDesc = this.createElement('p', 'news__desc');
                newsDesc.textContent = item.desc
                // div.news__more-info
                const newsMoreElemen = this.createElement('div', 'news__more-info')
                
                const anchorLink = this.createElement('a', 'news__link')
                anchorLink.textContent = 'Learn more';
                anchorLink.href = item.link;

                const dateText = this.createElement('span', 'date')
                dateText.textContent = item.date
        
        // append elements
            newsMoreElemen.append(anchorLink, dateText);
            listItem.append(newsTitle, newsDesc, newsMoreElemen);
        // li item append
            this.itemList.append(listItem);

        })   
            this.widthVal = this.itemList.firstChild.offsetWidth;
            this.widthValTemp = this.widthVal;
            
            this.handleBtns(items.length)            // this.loop(items.length, this.widthVal);
        }
    }



    changeItem(gap, position, itemsWidth, itemWidth, paginationElements) {
        let i = 0;
        let elementsWidth = 0;
        const items = (this.itemList.children.length / 2);
        
        
        this.btnRight.addEventListener('click', e => {
            if (i === (items - 1)) {
                position = 0;
            } else {
                position += (this.itemList.children[i].offsetWidth + gap)    
            }
            this.itemList.style.transform = `translateX(-${position}px)`
            i = this.showNextItem(i, (items));

            //    console.log(`${position} > ${itemsWidth} || ${i} || ${items} || ${i === (items - 1)}`)
        })
                
        this.btnLeft.addEventListener('click', e => {
            // console.log('check ', i, elementsWidth)
            if (i === 0) {
                elementsWidth = this.calcNews(this.itemList.children, elementsWidth, gap)
                position = elementsWidth;
            } else {
                position -= (this.itemList.children[i].offsetWidth + gap)
                elementsWidth = 0;
            }
            this.itemList.style.transform = `translateX(-${position}px)`
            i = this.showPreviousItem(i, (items));
        })
    }
        
    showNextItem(index, len) {
        if (index === (len - 1) ) return index = 0
        return index + 1 
    }

    showPreviousItem(index, len) {
        if (index === 0) return len - 1
        return index - 1;
    }

    calcNews(elements, elemWidth, gap) {
        Array.from(elements).forEach(item => {
            elemWidth += item.offsetWidth; 
        })
        return ((elemWidth/2) - ((elements.length + 2)*gap));
    }


    handleBtns(items) {
        const gap = 32;
        const itemsInRow = Math.floor(this.news.offsetWidth / this.itemList.firstChild.offsetWidth);
        let position = 0;
        // calc itemsWidth when width is different at each element
        let elementsWidth = 0;
  
        


        // const itemsWidth = (this.itemList.firstChild.offsetWidth * (items - itemsInRow)) + ((items - itemsInRow) * gap); 
        const itemsWidth = elementsWidth + gap

        // console.log(items, elementsWidth, itemsInRow, (this.itemList.firstChild.offsetWidth * (items - itemsInRow)) + ((items - itemsInRow) * gap))
        const itemWidth = (this.itemList.firstChild.offsetWidth)
        
        // console.log(itemWidth, items, elementsWidth, itemsInRow, (this.itemList.firstChild.offsetWidth * (items - itemsInRow)) + ((items - itemsInRow) * gap))
        // console.log(this.itemList.firstChild.offsetWidth, this.container.offsetWidth, itemsInRow, position, itemsWidth, itemWidth)
        // add pagination btns
        if (this.paginationList) {
            const paginationElements = Math.floor(itemsWidth / itemWidth);
            for (let index = 0; index <= paginationElements; index++) {
                const paginationItem = this.createElement('li');
                const paginationBtn = this.createElement('button', 'item');
                paginationItem.append(paginationBtn);
                this.paginationList.append(paginationItem);
            }
            this.paginationList.firstChild.firstChild.setAttribute('data', 'active')    
            this.changeItem(gap, position, itemsWidth, itemWidth, paginationElements+1);
        } else {
            this.changeItem(gap, position, elementsWidth, itemWidth);
       }
    }


}

export class ControllerNews{
    constructor(model, view) {
        this.model = model
        this.view = view

        // Display initial slides
        this.onCarouselListChanged(this.model.newsItems, this.model.newsSectionTitle, this.model.newsPagination, this.model.imgPath);

        this.model.bindCarouselListChanged(this.onCarouselListChanged);
        
    }

    onCarouselListChanged = (items, title, paginationState, imgPath) => {
        this.view.displaySlides(items, title, paginationState, imgPath)

        window.addEventListener('resize', () => {
            // console.log(window.innerWidth)
             this.view.displaySlides(items, title, paginationState, imgPath)
        })
       
    }
}
