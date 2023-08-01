'use strict';

import { generatedLists, listArr, localStorArr } from "./createList.js";
export const options = document.querySelector('.options');
const rndBtn = document.querySelector('#close-random-div');

export const editCurrentList = function (e) {
    const mainEl = e.target;

    if (!mainEl.classList.contains('btn-edit-list')) return;

    const btns = Array.from(document.querySelectorAll('.btn-edit-list'));
    const hideWholeList = Array.from(document.querySelectorAll('.created-list'));
    const headerBtns = Array.from(document.querySelectorAll('.btn-header'));
    const showEditToDoBtns = Array.from(document.querySelectorAll('.edit-todo'));
    const showLists = document.querySelector('.show-lists');
    const generatedLists = document.querySelector('.generate-lists');
    const hideDiv = mainEl.closest('div');
    const listName = hideDiv.querySelector('h4');
    const ulDiv = hideDiv.querySelector('div');

    //Functions for each button in the created list
    switch(mainEl.dataset.operation) {

        case "edit":
            rndBtn.closest('div').nextElementSibling.classList.add('hidden');
            rndBtn.textContent = 'Open';
            rndBtn.setAttribute('disabled', 'disabled');
            const ulDivElement = hideDiv.querySelector('div');
            const targetUlElement = ulDivElement.firstElementChild;
            targetUlElement.addEventListener('click', addClickEvent);
            targetUlElement.addEventListener('dblclick', removeFromList);
            generatedLists.classList.add('hidden');
            generatedLists.removeChild(hideDiv);
            showLists.appendChild(hideDiv);
            ulDivElement.classList.remove('hidden');
            hideDiv.classList.remove('hidden');
            ulDiv.classList.remove('hidden');
            headerBtns.forEach(button => {
                button.setAttribute('disabled', 'disabled');
                button.style.color = 'whitesmoke';
                button.style.backgroundColor = 'inherit';
            });
            toggleToDoBtns(showEditToDoBtns);
            toggleOptions(options);
            resetBtns(btns);
            break;

        case "hide":
            const hideUl = mainEl.nextElementSibling;
            const todosUl = hideUl.firstElementChild;
            todosUl.removeEventListener('click', addClickEvent);
            todosUl.removeEventListener('dblclick', removeFromList);
            const ulLis = Array.from(todosUl.children);
            hideGeneratedEditBtns(ulLis);
            headerDOM(hideUl, mainEl, 'Hide To-dos', 'Show To-dos');
            break;

        case "delete":
            const check = prompt(`Are you sure about deleting the list "${listName.textContent}" ? (Y/y)`);
            if (check === 'Y' || check === 'y') {
                showLists.removeChild(hideDiv);
                generatedLists.classList.remove('hidden');
                headerBtnsFunc(headerBtns);
                hidingTodos(hideWholeList);
                resetBtns(btns);
                toggleOptions(options);
                hideShowRandomDiv(rndBtn);

                //Removing from array and updating local storage
                listArr.findIndex((list, index) => { 
                    if (list === listName.textContent) {
                        listArr.splice(index, 1);
                        localStorage.setItem('listArray', JSON.stringify(listArr));
                    }
                 });

                //Removing whole list from local storage
                localStorArr.forEach((local, index) => {
                    const targetHeading = local.includes(listName.textContent);
                    if (targetHeading) {
                        localStorArr.splice(index, 1);
                        localStorage.setItem('lists', JSON.stringify(localStorArr));
                    }
                });
            }
            else return;
            break;

        case "finish":        
            hideShowRandomDiv(rndBtn);
            showLists.removeChild(hideDiv);
            generatedLists.appendChild(hideDiv);
            generatedLists.classList.remove('hidden');
            hideDiv.classList.remove('hidden');
            ulDiv.classList.remove('hidden');
            toggleToDoBtns(showEditToDoBtns);
            toggleOptions(options);
            headerBtnsFunc(headerBtns);
            resetBtns(btns);
            hidingTodos(hideWholeList);
            break;
        
        case "add-todo":
            const inputDiv = mainEl.previousElementSibling;
            const ulEl = inputDiv.firstElementChild;
            const text = prompt('Enter new To-Do:');

            if(!text) return;

            const newLi = document.createElement('li');
            newLi.classList.add('done');
            newLi.textContent = `- ${text}`;
            ulEl.appendChild(newLi);
            const btn = document.createElement('button');
            btn.classList.add('edit-todo');
            btn.classList.remove('hidden');
            btn.textContent = '✏️';
            newLi.appendChild(btn);
            btn.addEventListener('click', function (e) {
                const changeList = prompt(`Change To-Do "${newLi.textContent}": `);

                if(!changeList) return;

                newLi.textContent = `- ${changeList}`;
                newLi.append(this);
            })
            break;
        default: 0;
    };
};


//Hiding edit btns in generate-lists div
const hideGeneratedEditBtns =  ([...todosUl]) => todosUl.forEach(todoEditBtn => todoEditBtn.firstElementChild.classList.add('hidden'));

 
//Hiding / showing random list on delete/edit
const hideShowRandomDiv = function (btn) {
    btn.closest('div').nextElementSibling.classList.remove('hidden');
    btn.textContent = 'Close';
    btn.removeAttribute('disabled');
};



//reseting list button's text content and classes
const resetBtns = function ([...btns]) {
    btns.forEach(button => {
        button.classList.contains('hidden') ? button.classList.remove('hidden') : button.classList.add('hidden');
        button.textContent === 'Hide To-dos' ? button.textContent = 'Show To-dos' : button.textContent;
    })
};


//reseting header buttons attributes
const headerBtnsFunc = function ([...headerBtns]) {
    headerBtns.forEach(button => {
        button.removeAttribute('disabled')
        button.style.color = 'black';
        if (button.classList.contains('for-node')) button.style.color = 'red';
        button.style.backgroundColor = 'whitesmoke';
    });
};


//Hiding todos in each list on load or when finishing editing the current list
const hidingTodos = function (wholeList) {
    wholeList.forEach((todo) => {
        const childNodes = Array.from(todo.children);
        childNodes.findIndex((div, index) => {
            if (div.nodeName === 'DIV') todo.children.item(index).classList.add('hidden');
        })
    })
};


//Removing all keys from local storage and lists from dom
export const deleteAll = function () {
    const check = prompt('Delete all lists? (Y/y)');

    if(!check) return;

    if (check === 'Y' || check === 'y') {
        localStorage.removeItem('lists');
        localStorage.removeItem('listArray');
        localStorage.removeItem('currentListID');
        const allLists = Array.from(document.querySelectorAll('.created-list'));
        allLists.forEach(list => {
            generatedLists.removeChild(list);
        })
        listArr.splice(0, listArr.length);
        localStorArr.splice(0, localStorArr.length);
    }
};


//changing the header elements
const headerDOM = function (el1, el2, text1, text2) {
    el1.classList.contains('hidden') ? el1.classList.remove('hidden') : el1.classList.add('hidden');
    el2.textContent === text1 ? el2.textContent = text2 : el2.textContent = text1;
};

//hiding / showing options div in editing list
export const toggleOptions = optionsDiv => optionsDiv.style.display === 'none' ? optionsDiv.style.display = 'flex' : optionsDiv.style.display = 'none';
  

//hiding / showing todo edit buttons
const toggleToDoBtns = ([...btnsToDo]) => btnsToDo.forEach(button => button.classList.toggle('hidden'));
 
//Adding event listeners to each todo in the list
const addClickEvent = function (e) {
    const mainEl = e.target;
    if(!mainEl.classList.contains('done')) return;

    const editBtn = mainEl.firstElementChild;
    editBtn.setAttribute('disabled', 'disabled');
    editBtn.style.backgroundColor = 'inherit';
    mainEl.style.textDecoration = 'line-through';
    mainEl.style.color = 'lime';
}

//Removing todo from the list
const removeFromList = function (e) {
    const mainEl = e.target;
    if(!mainEl.classList.contains('done')) return;
    const parent = mainEl.parentElement;
    parent.removeChild(mainEl);
}

//Header show/hide button
export const showWholeListSection = function () {
    const wholeListDiv = document.querySelector('.generate-lists');
    headerDOM(wholeListDiv, this, 'Show all lists 📋', 'Hide all lists 📋');
};
