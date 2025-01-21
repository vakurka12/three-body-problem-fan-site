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
      document.getElementById(sectionId).classList.add('active');
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

  // Наблюдаем за главами и цитатами
  document.querySelectorAll('.chapter, .quote').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    observer.observe(element);
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

  // Генерация звезд для "Вечной жизни смерти"
  const starfield = document.querySelector('.starfield');
  if (starfield) {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animation = `twinkle ${Math.random() * 2 + 2}s infinite`;
      return star;
    };

    // Добавляем звезды
    for (let i = 0; i < 200; i++) {
      starfield.appendChild(createStar());
    }
  }

  // Плавный скролл для внутренних ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});