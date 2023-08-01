'use strict'

const randomList = [
    'Buy milk',
    'Mow the lawn',
    'Wash the dishes',
    'Go to gym',
    'Create shopping list',
    'Clean your room',
    'Build new application',
    'Plan new project',
    'Write your homework',
    'Study for the exam',
    'Go grocery shopping',
    'Feed the cat',
    'Go drive around the city',
    'Wash your clothes',
    'Sleep all day',
    'Eat a lot',
    'Plan for tomorrow',
    'Go to cinema',
    'Go to restaurant',
    'Wash your car',
    'Check fridge for groceries',
    'Buy new hardware',
    'Netflix and chill',
    'Drink beer',
    'Play games',
    'Go for a run',
    'Take a break',
    'Listen to music',
    'Go to sleep',
];
export const btn = document.querySelector('#close-random-div');
const spanAnimate = document.querySelector('#wtvr');
let count = 0;

const animateText = function (element, text) {
    element.textContent = text.slice(0, count);
    count++;
}

export const rngListFunction = function () {
    const ul = document.querySelector('#ul-random');
    for (let i = 1 ; i <= randomList.length / 2 ; i++) {
        const randomNum = Math.floor(Math.random() * randomList.length);
        const html = `
        <li>${i}. ${randomList[randomNum]} ?</li>
        `
        ul.insertAdjacentHTML('beforeend', html);
        const _removeFromArray = randomList.splice(randomNum, 1);
    }
}
// console.log('...');
export const getQuotes = async function () {
    try {
        const fetchUrl = await fetch('https://type.fit/api/quotes');
        if(!fetchUrl.ok) throw new Error('Cannot fetch the data');

        const getData = await fetchUrl.json();
        const rng = Math.floor(Math.random() * getData.length);
        const sliceFit = (getData[rng].author).indexOf(', type.fit');
        const data = `"${getData[rng].text}" - ${(getData[rng].author).slice(0, sliceFit)}`;

        setInterval(() => {animateText(spanAnimate, data)}, 20)
    }
    catch (error) {
        console.error(error.message);
    }
    finally {
        console.log(`API url: 'https://type.fit/api/quotes'`);
    }
}

export const openCloseFunc = function (current, query) {
    const el = document.querySelector(query);
    el.classList.toggle('hidden');
    current.style.display = 'flex';
    current.textContent === 'Close' ? current.textContent = 'Open' : current.textContent = 'Close';
}
