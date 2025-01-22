document.addEventListener('DOMContentLoaded', () => {
  // Навигация между секциями
  const navItems = document.querySelectorAll('.nav__item');
  const sections = document.querySelectorAll('.section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const sectionId = item.dataset.section;
      
      // Обновляем активные классы
      navItems.forEach(nav => nav.classList.remove('active'));
      sections.forEach(section => section.classList.remove('active'));
      
      item.classList.add('active');
      const activeSection = document.getElementById(sectionId);
      activeSection.classList.add('active');

      // Создаем звезды для всех секций, кроме главной
      if (sectionId !== 'home') {
        createStars(activeSection);
      }

      // Создаем планеты только для секции "Вечная жизнь смерти"
      if (sectionId === 'deaths-end') {
        createPlanets();
      }
    });
  });

  // Функция создания звезд
  function createStars(container) {
    const starfield = container.querySelector('.starfield');
    if (!starfield) return;
    
    starfield.innerHTML = '';
    
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`;
      starfield.appendChild(star);
    }
  }

  // Функция создания планет
  function createPlanets() {
    const planetsContainer = document.querySelector('.planets-container');
    planetsContainer.innerHTML = '';
    
    const leftContainer = document.createElement('div');
    leftContainer.className = 'planets-left';
    const rightContainer = document.createElement('div');
    rightContainer.className = 'planets-right';
    
    planetsContainer.appendChild(leftContainer);
    planetsContainer.appendChild(rightContainer);
    
    const colors = [
      ['#FF6B6B', '#845EC2'],
      ['#4D8076', '#00C2A8'],
      ['#D65DB1', '#FF6F91'],
      ['#00B8A9', '#F8F3D4'],
      ['#FFAAA7', '#FFD3B4'],
      ['#7FB5FF', '#C4DFDF'],
      ['#FFB84C', '#F266AB'],
      ['#A459D1', '#2CD3E1'],
      ['#B799FF', '#ACBCFF'],
      ['#E384FF', '#865DFF'],
      ['#96C291', '#FFC436'],
      ['#5C469C', '#D4ADFC']
    ];

    const containerHeight = document.documentElement.scrollHeight;
    const sideWidth = (window.innerWidth - 800) / 2;
    const minSize = 30;
    const maxSize = 120;
    const padding = maxSize + 40;
    
    function createPlanetGrid(isLeft) {
      const container = isLeft ? leftContainer : rightContainer;
      const gridCols = Math.floor(sideWidth / padding);
      const gridRows = Math.floor(containerHeight / padding);
      
      const grid = [];
      for (let row = 0; row < gridRows; row++) {
        if (row % 2 === 0) {
          for (let col = 0; col < gridCols; col++) {
            if (col % 2 === 0) {
              const x = col * padding + (Math.random() * padding * 0.4);
              const y = row * padding + (Math.random() * padding * 0.4);
              grid.push({x, y});
            }
          }
        }
      }
      
      for (let i = grid.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [grid[i], grid[j]] = [grid[j], grid[i]];
      }
      
      return grid;
    }

    function createPlanet(position, isLeft) {
      const planet = document.createElement('div');
      planet.className = 'planet';
      
      const size = Math.floor(Math.random() * (maxSize - minSize) + minSize);
      planet.style.width = `${size}px`;
      planet.style.height = `${size}px`;
      
      const colorPair = colors[Math.floor(Math.random() * colors.length)];
      planet.style.background = `radial-gradient(circle at 30% 30%, ${colorPair[0]}, ${colorPair[1]})`;
      
      planet.style.position = 'absolute';
      planet.style.left = `${position.x}px`;
      planet.style.top = `${position.y}px`;
      
      planet.addEventListener('click', function(e) {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.left = `${parseInt(this.style.left) - 20}px`;
        explosion.style.top = `${parseInt(this.style.top) - 20}px`;
        
        const container = isLeft ? leftContainer : rightContainer;
        container.appendChild(explosion);
        this.remove();

        setTimeout(() => {
          explosion.remove();
        }, 500);
      });
      
      return planet;
    }

    const leftGrid = createPlanetGrid(true);
    const rightGrid = createPlanetGrid(false);
    
    leftGrid.forEach(position => {
      leftContainer.appendChild(createPlanet(position, true));
    });
    
    rightGrid.forEach(position => {
      rightContainer.appendChild(createPlanet(position, false));
    });
  }

  // Функция перемешивания текста
  function scrambleText(element) {
    const originalText = element.textContent;
    const words = originalText.split(' ');
    
    const scrambledWords = words.map(word => {
      if (word.length <= 3) return word;
      
      const letters = word.split('');
      const first = letters[0];
      const last = letters[letters.length - 1];
      const middle = letters.slice(1, -1);
      
      for (let i = middle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middle[i], middle[j]] = [middle[j], middle[i]];
      }
      
      return first + middle.join('') + last;
    });
    
    element.textContent = scrambledWords.join(' ');
    
    setTimeout(() => {
      element.textContent = originalText;
    }, 3000);
  }

  // Функция для создания эффекта глитча
  function applyGlitchEffect(element) {
    const text = element.textContent;
    element.setAttribute('data-text', text);
    element.classList.add('glitch');
    
    setTimeout(() => {
      element.classList.remove('glitch');
      element.removeAttribute('data-text');
    }, 2000);
  }

  // Обработчик клика для эффекта глитча в разделе "Задача трёх тел"
  document.querySelector('.section--three-body').addEventListener('click', (e) => {
    if (e.target.tagName === 'P' || e.target.classList.contains('quote')) {
      applyGlitchEffect(e.target);
      setTimeout(() => {
        scrambleText(e.target);
      }, 2000);
    }
  });

  // Обработчик изменения размера окна
  window.addEventListener('resize', () => {
    const deathsEnd = document.querySelector('.section--deaths-end');
    if (deathsEnd.classList.contains('active')) {
      createPlanets();
    }
  });

  // Эффект исчезновения текста в "Темном лесу"
  const darkForestChapters = document.querySelectorAll('.dark-forest-chapter');
  darkForestChapters.forEach(chapter => {
    const texts = chapter.querySelectorAll('.vanishing-text');
    
    chapter.addEventListener('mouseenter', () => {
      texts.forEach((text, index) => {
        setTimeout(() => {
          text.style.opacity = '0';
          text.style.transform = 'translateX(20px)';
        }, index * 100);
      });
    });

    chapter.addEventListener('mouseleave', () => {
      texts.forEach((text, index) => {
        setTimeout(() => {
          text.style.opacity = '1';
          text.style.transform = 'translateX(0)';
        }, index * 100);
      });
    });
  });

  // Анимация появления элементов при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.chapter, .quote').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    observer.observe(element);
  });

  // Инициализация звезд для активной секции при загрузке
  const activeSection = document.querySelector('.section.active');
  if (activeSection && !activeSection.classList.contains('section--home')) {
    createStars(activeSection);
  }
});
