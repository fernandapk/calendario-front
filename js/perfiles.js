// JavaScript simple para hacer crecer la foto de perfil al hacer hover
const profilePicture = document.querySelector('.profile-picture');

profilePicture.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
});

profilePicture.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});
