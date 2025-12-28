document.addEventListener("DOMContentLoaded", () => {

    let actTab = 1;
    const tabs = document.querySelectorAll('.contentSectionClass');
    const upButton = document.querySelector('.upClass');
    const downButton = document.querySelector('.downClass');
    const container = document.querySelector('.contentContainer');

    function updateButtons() {
      upButton.style.display = actTab === 1 ? 'none' : '';
      downButton.style.display = actTab === tabs.length ? 'none' : '';
    }

    function updateSlidePosition() {
      const containerWidth = container.offsetWidth;
      const offset = -containerWidth * (actTab - 1);
      tabs.forEach(tab => {
        tab.style.transform = `translateX(${offset}px)`;
        tab.style.transition = 'transform 0.4s ease';
      });
    }

    upButton.addEventListener('click', () => {
      actTab = Math.max(actTab - 1, 1);
      updateButtons();
      updateSlidePosition();
    });

    downButton.addEventListener('click', () => {
      actTab = Math.min(actTab + 1, tabs.length);
      updateButtons();
      updateSlidePosition();
    });

    let startX = 0;
    let endX = 0;

    container.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener('touchmove', e => {
      endX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', () => {
      const diff = startX - endX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && actTab < tabs.length) {
          actTab++;
        } else if (diff < 0 && actTab > 1) {
          actTab--;
        }
        updateButtons();
        updateSlidePosition();
      }
    });

    updateButtons();
    updateSlidePosition();

    window.addEventListener('resize', updateSlidePosition);

});
