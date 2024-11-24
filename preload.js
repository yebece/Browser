document.addEventListener('DOMContentLoaded', function() {
    const elements = [document.body, document.documentElement];
    elements.forEach(element => {
        element.style.background = 'none';
        element.style.backgroundColor = 'transparent';
        element.style.backgroundImage = 'none';
        element.style.backgroundRepeat = 'no-repeat';
        element.style.backgroundAttachment = 'scroll';
        element.style.backgroundPosition = '0% 0%';
        element.style.backgroundClip = 'border-box';
        element.style.backgroundOrigin = 'padding-box';
        element.style.backgroundSize = 'auto auto';
    });
});