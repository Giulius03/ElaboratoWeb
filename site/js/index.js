const dropdownLink = document.getElementById('dropdownLink');
const list = document.getElementById('dropdownList');
const btnSearchAppearPhone = document.getElementById('btnSearchAppear');
const searchBarPhone = document.getElementById('searchPhone');
const productsLink = document.getElementById('productsLink');
const productsMenu = document.getElementById('productsMenu');

dropdownLink.addEventListener('click', (event) => {
    event.preventDefault();
    list.style.display = list.style.display == 'block' ? 'none' : 'block';
});

btnSearchAppearPhone.addEventListener('click', (event) => {
    searchBarPhone.style.display = searchBarPhone.style.display == 'flex' ? 'none' : 'flex';
});

productsLink.addEventListener('mouseover', (event) => {
    productsMenu.style.display = 'block';
});

productsMenu.addEventListener('mouseover', (event) => {
    productsMenu.style.display = 'block';
});

productsMenu.addEventListener('mouseout', (event) => {
    productsMenu.style.display = 'none';
});