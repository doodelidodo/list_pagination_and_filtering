/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
let studentList = document.querySelectorAll('.student-item');
const numberOfItemsPerPage = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (list, page) => {
   let startIndex = (page * numberOfItemsPerPage) - numberOfItemsPerPage;
   let endIndex = page * numberOfItemsPerPage;
   
   for(i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         list[i].style.display = "block";
      } else {
         list[i].style.display = "none";
      }
   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.

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

const appendPageLinks = (list) => {
   let pages = Math.ceil(list.length / numberOfItemsPerPage);
   const body = document.querySelector('body');

   const div = document.createElement('div');
   div.className = "pagination";

   const ul = document.createElement('ul');
   div.appendChild(ul);

   appendListElements(ul, pages);
   paginationClickListener(ul);

   body.appendChild(div);
}


const appendListElements = (ul, pages) => {
   for(let i = 1; i <= pages; i++) {
      let page = i;
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = "#";
      link.textContent = page;
      li.appendChild(link);
      if (page === 1) {
         link.className = "active";
      }
      ul.appendChild(li);
   }
}

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
}

const removeActiveClass = (list) => {
   for(let i = 0; i < list.length; i++) {
      list[i].firstChild.classList.remove("active");
   }
}


window.onload = () => {
   showPage(studentList, 1);
   appendPageLinks(studentList);
}
