const hamBars = document.getElementById('hambar');
const bars = [document.getElementById('bar1'), document.getElementById('bar2'), document.getElementById('bar3')];
const closeMenuIcon = document.getElementById('close-menu');
const sideMenu = document.getElementById('side-menu');

hamBars.addEventListener('click', (e) => {
    const sideMenu = document.getElementById('side-menu');
    
    sideMenu.classList.toggle('open');
})

closeMenuIcon.addEventListener('click', () => {
    const sideMenu = document.getElementById('side-menu');
    
    sideMenu.classList.remove('open')
})

const redirect = (dest) => {
    window.location.href = dest;
}