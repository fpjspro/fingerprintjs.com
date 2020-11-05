import tippy from 'tippy.js';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import $ from 'jquery';
import 'regenerator-runtime/runtime';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'select2';
import { initFpjsWidget } from './fpjs-widget';
import 'swiper/swiper-bundle.css';

const githubToken = process.env.GITHUB_API_TOKEN;

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// DOM Elements
const BODY = $('body');
const mobileToggler = $('.mobile-toggler');
const rangeSlider = $('.slider');
const rangeSliderInput = $('.slider-input');
const rangeSliderLabelOutput = $('.slider-output');
const rangeSliderPriceOutput = $('.payment-per-month .price');
const paymentSwitcher = $('.payment-switcher');
const paymentSwitcherAnnually = $('.payment-switcher__button--annually');
const paymentSwitcherMonthly = $('.payment-switcher__button--monthly');
const starCounter = document.querySelectorAll('.btn--github .github-counter');
const mobileLinksSubmenu = $('.main-links__link--has-submenu');
const userInputIdentifications = $('.user-input .user-input__input');
const onDemandPrice = $('.on-demand__price');
const reservedPrice = $('.reserved__price');

// Pricing Table
const pricingTable = [
  { label: '100K', value: 100000 },
  { label: '250K', value: 250000 },
  { label: '500K', value: 500000 },
  { label: '1M', value: 1000000 },
  { label: '5M', value: 5000000 },
  { label: '10M', value: 10000000 },
  { label: '20M', value: 20000000 },
];

document.addEventListener('DOMContentLoaded', () => {
  // FPJS widget
  initFpjsWidget();

  // StarCounter
  const getStars = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/fingerprintjs/fingerprintjs', {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
      if (response.ok) {
        let json = await response.json();
        starCounter.forEach((counter) => {
          counter.innerHTML = new Intl.NumberFormat('en-US', {
            notation: 'standard',
            maximumFractionDigits: 1,
          }).format(json.stargazers_count);
        });
      }

      // return response.data.stargazers_count;
    } catch (error) {
      console.error({ error });
    }
  };
  // Set stars
  getStars();

  // Code highlights
  Prism.highlightAll();

  // Tooltips initializations
  tippy('[data-tippy-content]', {
    animation: 'shift-away',
    interactive: true,
    arrow: false,
    trigger: 'click',
  });

  // Mobile menu toggle
  mobileToggler.click(toggleMobileMenu);

  // Mobile menu drop down
  mobileLinksSubmenu.click(toggleMobileLinksSubmenu);
  function toggleMobileLinksSubmenu() {
    this.classList.toggle('isOpen');
  }
  function toggleMobileMenu() {
    BODY.toggleClass('isMobileMenuOpen');
  }

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 1024px)').matches) {
      BODY.removeClass('isMobileMenuOpen');
    }
  });

  if (document.body.classList.contains('homepage')) {
    // Range slider
    rangeSliderInput.change(handlePriceChange);
    rangeSliderInput[0].addEventListener('input', handlePriceChange);

    // Switch billing types
    paymentSwitcherAnnually.click(switchToType);
    paymentSwitcherMonthly.click(switchToType);

    // Toggle Incognito
    // $('.nav__link--logo').click(() => document.documentElement.classList.toggle('incognito'));

    // Swipers
    const logoSwiper = new Swiper('#swiper--trusted-by', {
      spaceBetween: 30,
      slidesPerView: 6,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 6 },
      },
    });

    const proToolsSwiper = new Swiper('#swiper--pro-tools', {
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerColumn: 1,
          spaceBetween: 0,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        },
        768: {
          slidesPerView: 2,
          slidesPerColumn: 3,
          slidesPerColumnFill: 'row',
          spaceBetween: 28,
        },
        1024: {
          slidesPerView: 3,
          slidesPerColumn: 2,
          spaceBetween: 28,
          slidesPerColumnFill: 'row',
        },
      },
    });
  }

  /*====================================
  =            PRICING PAGE            =
  =====================================*/

  if (document.body.classList.contains('pricing')) {
    $('.preset__select').select2({
      width: '100%',
      minimumResultsForSearch: -1,
    });

    $('.preset__select').on('select2:select', (e) => {
      const data = e.params.data;
      userInputIdentifications.val('');
      const onDemandPriceValue = calculatePrice(data.id, 'monthly');
      const reservedPriceValue = calculatePrice(data.id, 'annually');

      // console.log({ onDemandPriceValue, reservedPriceValue });
      onDemandPrice.text(onDemandPriceValue);
      reservedPrice.text(reservedPriceValue);
    });

    userInputIdentifications.on('input', (e) => {
      const identifications = e.target.value;
      $('.preset__select').val('').trigger('change.select2');

      const onDemandPriceValue = calculatePrice(identifications, 'monthly');
      const reservedPriceValue = calculatePrice(identifications, 'annually');

      onDemandPrice.text(onDemandPriceValue);
      reservedPrice.text(reservedPriceValue);
    });
  }

  /*=====  End of PRICING PAGE  ======*/
});

function handlePriceChange(e) {
  const minValue = Number(e.target.min);
  const maxValue = Number(e.target.max);
  const value = Number(e.target.value);
  const magicNumber = ((value - minValue) * 100) / (maxValue - minValue);
  const valueLabel = pricingTable[value].label;
  const newPrice = calculatePrice(pricingTable[value].value, paymentSwitcher[0].dataset.type);

  rangeSlider[0].style.setProperty(
    '--left',
    `calc(${magicNumber}% + (${15 - magicNumber * 0.3}px))`,
  );
  rangeSliderLabelOutput.html(valueLabel);
  rangeSliderPriceOutput.html(newPrice);
}

function calculatePrice(price, type) {
  const currencyFormatOptions = {
    maximumSignificantDigits: 3,
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: 'USD',
    notation: 'standard',
  };

  if (type === 'monthly') {
    return new Intl.NumberFormat('en-US', currencyFormatOptions).format(price / 1000);
  }
  if (type === 'annually') {
    return new Intl.NumberFormat('en-US', currencyFormatOptions).format((price / 1000) * 0.8);
  }
}

function switchToType(e) {
  paymentSwitcher[0].dataset.type = e.target.dataset.type;

  paymentSwitcherAnnually.removeClass('payment-switcher__button--active');
  paymentSwitcherMonthly.removeClass('payment-switcher__button--active');

  rangeSliderInput.trigger('change');
  e.target.classList.add('payment-switcher__button--active');

  if (e.target.dataset.type === 'annually') {
    document.getElementById('billed_annual_text').textContent = 'billed yearly';
  } else {
    document.getElementById('billed_annual_text').textContent = 'billed monthly';
  }
}
