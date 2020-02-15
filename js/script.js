/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

let studentList = document.querySelectorAll('.student-item');
const numberOfItemsPerPage = 10;


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
   
   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
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
   const body = document.querySelector('body');

   const div = document.createElement('div');
   div.className = "pagination";

   const ul = document.createElement('ul');
   div.appendChild(ul);

   appendListElements(ul, pages);
   paginationClickListener(ul);

   body.appendChild(div);
};


/***
 function appendListElements
 param1: ul
 param2: pages
 creates links nested in a li element. first a element gets the class 'active'
 ***/

const appendListElements = (ul, pages) => {
   for(let i = 1; i <= pages; i++) {
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

const paginationClickListener = (ul) => {
   const allLinks = ul.childNodes;

   for(let i = 0; i < allLinks.length; i++) {
      allLinks[i].firstChild.addEventListener('click', (e) => {
         let clickedLink = e.target;
         let pageNr = e.target.textContent;
         removeActiveClass(allLinks);
         clickedLink.className = "active";
         showPage(studentList, pageNr)
      });
   }
};

/***
 function removeActiveClass
 param1: list
 removes for all list elements the class "active"
 ***/
const removeActiveClass = (list) => {
   for(let i = 0; i < list.length; i++) {
      list[i].firstChild.classList.remove("active");
   }
};

/***
sets the view to the first items on window.onload
 and creates the pagination Links
 ***/
window.onload = () => {
   showPage(studentList, 1);
   appendPageLinks(studentList, numberOfItemsPerPage);
};
