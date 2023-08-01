'use strict';

//Creating the list

export const generatedLists = document.querySelector('.generate-lists');
const date = new Date();
const dateCreated = {
    day: date.getDate(),
    month: (date.getMonth()) + 1,
    year: date.getFullYear(),
};

export let listArr = [];
export let localStorArr = [];

const randomRgb = max => Math.floor(Math.random() * max);
const {day, month, year} = dateCreated;
let html;
let id = 0;

export const createNewListFunc = function (name) {

    if(!name) return;

    if (listArr.includes(name)) {
        alert(`List with the name "${name}" already exists!`);
        return;
    }

    if (!listArr.includes(name)) {
        id++;
        listArr.push(name);

        html = `
        <div style="background-color: rgb(${randomRgb(255)},${randomRgb(255)},${randomRgb(255)});" class="created-list" id="${id}">
            <span>[${day}/${month}/${year}] 📋#${id}</span>
            <h4>${name}</h4>
            <button class="btn-edit-list" data-operation="edit">Edit list</button>
            <button class="btn-edit-list hidden" data-operation="finish">Finish editing</button>
            <button class="btn-edit-list hidden" data-operation="delete">Delete list</button>
            <button class="btn-edit-list" data-operation="hide">Show To-dos</button>
            <div>
                <ul class="ul-element">
                </ul>
            </div>
            <button class="btn-edit-list hidden" data-operation="add-todo">+ Add new to-do</button>
        </div>
        `


        
        const _addingToGen = generatedLists.insertAdjacentHTML('beforeend', html);
        //Adding to local storage
        const forLocal = new Object(html);
        localStorArr.push(forLocal);
        localStorage.setItem('lists', JSON.stringify(localStorArr));
        localStorage.setItem('listArray', JSON.stringify(listArr));
        localStorage.setItem('currentListID', JSON.stringify(id));
    };
};

export const renderFromLocalStorage = function () {
    const data = JSON.parse(localStorage.getItem('lists'));
    const arrayData = JSON.parse(localStorage.getItem('listArray'));
    const idData = JSON.parse(localStorage.getItem('currentListID'));

    if(!data || !arrayData || !idData) return;

    localStorArr = [...data];
    listArr = [...arrayData];
    id = idData;
    localStorArr.forEach(list => generatedLists.insertAdjacentHTML('beforeend', list));
}
