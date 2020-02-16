/******************************************
 Treehouse Techdegree:
 FSJS project 2 - List Filter and Pagination
 ******************************************/

const studentList = document.querySelectorAll('.student-item');
const numberOfItemsPerPage = 10;
const pageContent = document.querySelector('.page');


/***
 function showPage
 param1: list
 param2: page
 shows each list item which are in the pagination
 hides all other list items
 ***/

const showPage = (list, page) => {
    let startIndex = (page * numberOfItemsPerPage) - numberOfItemsPerPage;
    let endIndex = page * numberOfItemsPerPage;

    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = "block";
        } else {
            list[i].style.display = "none";
        }
    }
};


/***
 function appendPageLinks
 param1: list
 param2: numberPerPage
 calculates how many pagination links are needed and creates these links on the webpage

 template
 <div class="pagination">
 <ul>
 <li>
 <a class="active" href="#">1</a>
 </li>
 <li>
 <a href="#">2</a>
 </li>
 <li>
 <a href="#">3</a>
 </li>
 <li>
 <a href="#">4</a>
 </li>
 <li>
 <a href="#">5</a>
 </li>
 </ul>
 </div>
 ***/

const appendPageLinks = (list, numberPerPage) => {
    let pages = Math.ceil(list.length / numberPerPage);

    const div = document.createElement('div');
    div.className = "pagination";

    const ul = document.createElement('ul');
    div.appendChild(ul);

    appendListElements(ul, pages);
    paginationClickListener(list, ul);

    pageContent.appendChild(div);
};


/***
 function appendListElements
 param1: ul
 param2: pages
 creates links nested in a li element. first a element gets the class 'active'
 ***/

const appendListElements = (ul, pages) => {
    for (let i = 1; i <= pages; i++) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = "#";
        link.textContent = i;
        li.appendChild(link);
        if (i === 1) {
            link.className = "active";
        }
        ul.appendChild(li);
    }
};

/***
 function paginationClickListener
 param1: ul
 creates an click EventListener for each pagination link element.
 the click activate the showPage function to change the shown list elements
 ***/

const paginationClickListener = (list, ul) => {
    const allLinks = ul.childNodes;
    for (let i = 0; i < allLinks.length; i++) {
        allLinks[i].firstChild.addEventListener('click', (e) => {
            let clickedLink = e.target;
            let pageNr = e.target.textContent;
            removeActiveClass(allLinks);
            clickedLink.className = "active";
            showPage(list, pageNr)
        });
    }
};

/***
 function removeActiveClass
 param1: list
 removes for all list elements the class "active"
 ***/
const removeActiveClass = (list) => {
    for (let i = 0; i < list.length; i++) {
        list[i].firstChild.classList.remove("active");
    }
};


/***
 function appendSearchBar
 append the search bar to the page

 template:
 <div class="student-search">
 <input placeholder="Search for students...">
 </div>
 ***/

const appendSearchBar = () => {
    const div = document.createElement('div');
    div.className = "student-search";

    const input = document.createElement('input');
    input.setAttribute('placeholder', "Search for students...");
    div.appendChild(input);

    const headerText = document.querySelector("h2");
    headerText.parentNode.insertBefore(div, headerText.nextSibling);

    const divNoResult = createNoResultDiv();

    input.addEventListener('keyup', (e) => {
        divNoResult.style.display = "none";
        let name = e.target.value;
        let pagination = document.querySelector('.pagination');
        let newStudentList = [];
        for (let i = 0; i < studentList.length; i++) {
            let studentName = studentList[i].querySelector('h3').textContent;
            studentList[i].style.display = "none";
            if (studentName.includes(name)) {
                studentList[i].style.display = "block";
                newStudentList.push(studentList[i]);
            }
            pagination.remove();
        }

        showPage(newStudentList, 1);
        appendPageLinks(newStudentList, numberOfItemsPerPage);
        showNoResult(newStudentList, divNoResult);
    });

};

/***
 function createNoResultDiv
 param1: list
 param2: element

 Creates a div with the message no Results and set the div to display none
 ***/
const createNoResultDiv = () => {
    const divNoResult = document.createElement('div');
    divNoResult.className = "no-result";
    divNoResult.style.display = "none";
    divNoResult.textContent = "No result found!";

    const ulList = document.querySelector("ul");
    ulList.parentNode.insertBefore(divNoResult, ulList.nextSibling);
    return divNoResult;
};


/***
 function showNoResult
 param1: list
 param2: element

 if the list is empty, the element gets display block.
 ***/

const showNoResult = (list, element) => {
    if (!list.length) {
        element.style.display = "block";
    }
};


/***
 sets the view to the first items on window.onload
 and creates the pagination Links
 ***/
window.onload = () => {
    showPage(studentList, 1);
    appendPageLinks(studentList, numberOfItemsPerPage);
    appendSearchBar();
};
