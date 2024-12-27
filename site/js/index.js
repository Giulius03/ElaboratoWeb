const dropdownLink = document.getElementById('dropdownLink');
const list = document.getElementById('dropdownList');
const btnMenu = document.getElementById('menu');
const btnSearchAppearPhone = document.getElementById('btnSearchAppear');
const searchBarPhone = document.getElementById('searchPhone');

dropdownLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (list.style.display == 'none') {
        list.style.display = 'block';
    } else {
        list.style.display = 'none';
    }
});

btnMenu.addEventListener('click', (event) => {
    if (list.style.display == 'block') {
        list.style.display = 'none';
    }
})

btnSearchAppearPhone.addEventListener('click', (event) => {
    if (searchBarPhone.style.display == 'flex') {
        searchBarPhone.style.display = 'none';
    } else {
        searchBarPhone.style.display = 'flex';
    }
});