document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('#burger');
  const nav = document.querySelector('#nav');
  const body = document.body;

  function closeMenu() {
    if (!burger || !nav) return;

    burger.classList.remove('is-active');
    nav.classList.remove('is-open');
    body.classList.remove('no-scroll');
    burger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (!burger || !nav) return;

    const isOpen = nav.classList.toggle('is-open');

    burger.classList.toggle('is-active', isOpen);
    body.classList.toggle('no-scroll', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  }

  if (burger && nav) {
    burger.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      const isMenuOpen = nav.classList.contains('is-open');
      const clickedInsideMenu = nav.contains(event.target);
      const clickedBurger = burger.contains(event.target);

      if (isMenuOpen && !clickedInsideMenu && !clickedBurger) {
        closeMenu();
      }
    });
  }

  const navLinks = document.querySelectorAll('.nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
      link.classList.add('is-active');
    }
  });

  const amountButtons = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.querySelector('#customAmount');
  const donationForm = document.querySelector('#donationForm');
  const donationMessage = document.querySelector('#donationMessage');

  let selectedAmount = 300;

  amountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      amountButtons.forEach((item) => item.classList.remove('is-active'));

      button.classList.add('is-active');
      selectedAmount = Number(button.dataset.amount);

      if (customAmountInput) {
        customAmountInput.value = '';
      }
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      const value = Number(customAmountInput.value);

      if (value > 0) {
        selectedAmount = value;
        amountButtons.forEach((item) => item.classList.remove('is-active'));
      }
    });
  }

  if (donationForm && donationMessage) {
    donationForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(donationForm);
      const contact = formData.get('donorContact');
      const agreement = formData.get('agreement');
      const donationType = formData.get('donationType');

      donationMessage.className = 'form-message';

      if (!selectedAmount || selectedAmount <= 0) {
        donationMessage.textContent = 'Пожалуйста, выберите или укажите сумму пожертвования.';
        donationMessage.classList.add('is-error');
        return;
      }

      if (!contact) {
        donationMessage.textContent = 'Пожалуйста, укажите email или телефон.';
        donationMessage.classList.add('is-error');
        return;
      }

      if (!agreement) {
        donationMessage.textContent = 'Пожалуйста, подтвердите согласие с обработкой данных.';
        donationMessage.classList.add('is-error');
        return;
      }

      const typeText = donationType === 'monthly' ? 'ежемесячное' : 'разовое';

      donationMessage.textContent = `Спасибо! Вы выбрали ${typeText} пожертвование на сумму ${selectedAmount.toLocaleString('ru-RU')} ₽. Позже здесь будет переход к оплате.`;
      donationMessage.classList.add('is-success');

      donationForm.reset();

      selectedAmount = 300;

      amountButtons.forEach((item) => item.classList.remove('is-active'));

      const firstAmountButton = document.querySelector('.amount-btn[data-amount="300"]');

      if (firstAmountButton) {
        firstAmountButton.classList.add('is-active');
      }
    });
  }

  const contactForm = document.querySelector('#contactForm');
  const contactMessage = document.querySelector('#contactMessage');

  if (contactForm && contactMessage) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      const agreement = formData.get('agreement');

      contactMessage.className = 'form-message';

      if (!name || !email || !message) {
        contactMessage.textContent = 'Пожалуйста, заполните имя, email и сообщение.';
        contactMessage.classList.add('is-error');
        return;
      }

      if (!agreement) {
        contactMessage.textContent = 'Пожалуйста, подтвердите согласие с обработкой персональных данных.';
        contactMessage.classList.add('is-error');
        return;
      }

      contactMessage.textContent = 'Спасибо! Ваше сообщение принято. Форма пока работает в тестовом режиме.';
      contactMessage.classList.add('is-success');

      contactForm.reset();
    });
  }

  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (revealElements.length) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      revealElements.forEach((element) => {
        element.classList.add('is-visible');
      });
    } else if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -60px 0px',
        }
      );

      revealElements.forEach((element) => {
        observer.observe(element);
      });
    } else {
      revealElements.forEach((element) => {
        element.classList.add('is-visible');
      });
    }
  }
});