'use strict';


export const searchFunc = function () {
    const searchInput = document.querySelector('#search');
    const allLists = Array.from(document.querySelectorAll('.created-list h4'));

    if (!searchInput.value) allLists.forEach(list => list.parentElement.classList.remove('hidden'));

    for (const [index, _list] of allLists.entries()) {
        const headings = allLists[index].textContent.toLowerCase();
        if (!headings.toLowerCase().includes(searchInput.value.toLowerCase())) {
            const parentEl = allLists[index].parentElement;
            parentEl.classList.add('hidden');

        } else {
            const parentEl = allLists[index].parentElement;
            parentEl.classList.remove('hidden');
        }
    }
};

