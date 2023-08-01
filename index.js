'use strict';

import { rngListFunction, getQuotes, openCloseFunc, btn  } from "./createRandomList.js";
import { editCurrentList, showWholeListSection, toggleOptions, options, deleteAll } from "./editLists.js";
import { createNewListFunc, generatedLists, renderFromLocalStorage } from "./createList.js";
import { searchFunc } from "./searchList.js";

const headerHideShowBtn = document.querySelector('[data-id="1"]');
const createList = document.querySelector('[data-id="2"]');
const showLists = document.querySelector('.show-lists');
const searchInput = document.querySelector('#search');
const deleteAllBtn = document.querySelector('#del');


toggleOptions(options);
rngListFunction();
getQuotes();



createList.addEventListener('click', () => {createNewListFunc(prompt('Add new list (name of the list):'))});
btn.addEventListener('click' , function() {openCloseFunc(this, '.random-intro')});
headerHideShowBtn.addEventListener('click', showWholeListSection);
generatedLists.addEventListener('click', function(e) {editCurrentList(e)});
showLists.addEventListener('click', function(e) {editCurrentList(e)});
searchInput.addEventListener('keyup', searchFunc);
deleteAllBtn.addEventListener('click', deleteAll);
renderFromLocalStorage();
