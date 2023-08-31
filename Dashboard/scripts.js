
const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', function(){
    localStorage.removeItem('SHIPPING_API_TOKEN')
    location.href = location.origin
})