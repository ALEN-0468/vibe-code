const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const amountButtons = document.querySelectorAll('.amount-btn');
const amountInput = document.querySelector('#donationAmount');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  const clickedInsideMenu = navLinks.contains(event.target) || menuToggle.contains(event.target);
  if (!clickedInsideMenu) {
    navLinks.classList.remove('open');
  }
});

const scrollToSection = (targetSelector) => {
  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) {
    return;
  }

  const navHeight = document.querySelector('.navbar').offsetHeight + 18;
  const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({
    top: topPosition,
    behavior: 'smooth'
  });
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (href === '#') {
      return;
    }

    event.preventDefault();
    scrollToSection(href);
    navLinks.classList.remove('open');
  });
});

amountButtons.forEach((button) => {
  button.addEventListener('click', () => {
    amountButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const selectedAmount = button.dataset.amount;
    if (selectedAmount === 'custom') {
      amountInput.value = '';
      amountInput.focus();
      return;
    }

    amountInput.value = selectedAmount;
  });
});

const donationForm = document.querySelector('#donationForm');
const donationMessage = donationForm.querySelector('.form-message');

donationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  donationMessage.textContent = `Thank you, ${donationForm.name.value}! Your donation of ₹${donationForm.amount.value} means a lot.`;
  donationForm.reset();
  amountButtons.forEach((btn) => btn.classList.remove('active'));
});

const contactForm = document.querySelector('#contactForm');
const contactStatus = document.querySelector('#contactMessageStatus');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  contactStatus.textContent = `Thanks ${contactForm.name.value}, we've received your message and will contact you soon.`;
  contactForm.reset();
});

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0 && 'IntersectionObserver' in window) {
  document.body.classList.add('js-animate');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('revealed'));
}

document.querySelector('#year').textContent = new Date().getFullYear();