
import * as FP from '@fingerprintjs/fingerprintjs-pro';
import tippy from 'tippy.js';
import $ from 'jquery';
import Swiper from 'swiper';
import mobileTemplate from '../views/partials/demo/mobile.handlebars';

const dashboardEndpoint = process.env.FPJS_DASHBOARD_ENDPOINT;
const clientToken = process.env.FPJS_TOKEN;
const apiToken = process.env.FPJS_API_TOKEN;
const endpoint = process.env.FPJS_ENDPOINT;
const region = process.env.FPJS_REGION;
const config = {
  ipResolution: "full",
  extendedResult: true,
  timeout: 30_000,
};

let activeRequestId;

const fpPromise = FP.load({ token: clientToken, endpoint, region }).then((fp) => fp.get(config));

export function initFpjsWidget() {
  fpPromise
    .then(showVisitInfo)
    .then(loadFpjsHistory)
    .then(() => {
      document.getElementById('fpjs_loader').remove();
      document.getElementById('fpjs_container').classList.add('fingerprint-live-demo__loaded');
    });
  // TODO: log errors
  // .catch(e => window.console && console.log('Error: ', e));

  // Signup Form
  $('.form--get-started').submit((event) => {
    event.preventDefault();

    const form = $('.form--get-started');
    const email = event.currentTarget.elements[0].value;

    form.addClass('form--loading');
    // const state = Math.floor(Math.random() * Math.floor(2));

    fpPromise
      .then(({ visitorId }) => fetch(`${dashboardEndpoint}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fpjsVisitorId: visitorId }),
      }))
      .then((response) => response.json())
      .then(({ ok, error }) => {
        form.removeClass('form--loading');

        if (!ok) {
          form.addClass('form--failed');
          $('.form-failed-reason').text(error.message || 'Something gone wrong. Please try again later.');
          console.log( $('.form-failed-reason'), error.message || 'Something gone wrong. Please try again later.');

          setTimeout(() => form.removeClass('form--failed'), 2500);
        } else {
          form.addClass('form--success');

          dataLayer.push({ event: 'signupintent.success' });
        }
      });
  });
}

// Load visit history
export function loadFpjsHistory(visitorId) {
  return fetch(`${endpoint}/visitors/${visitorId}?token=${apiToken}&limit=20`)
    .then((response) => response.json())
    .then(({ visits }) => {
      const container = document.getElementById('fpjs_history');

      container.innerHTML = '';
      let mobileSlides = '';
      for (const visit of visits) {
        const isCurrent = activeRequestId === visit.requestId;

        const element = document.createElement('li');
        const title = isCurrent ? 'Current visit' : getVisitTitle(visit.timestamp);

        element.classList.add('history-visits__visit');
        element.textContent = title;
        element.id = `visit_${visit.requestId}`;

        if (visit.incognito) {
          const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

          icon.classList.add('incognito');
          use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#incognito');

          icon.appendChild(use);
          element.appendChild(icon);

          element.classList.add('history-visits__visit--incognito');
        }

        if (isCurrent) {
          element.classList.add('history-visits__visit--now');
        }

        element.addEventListener('click', () => showVisitInfo(Object.assign(visit, { visitorId }), title));
        container.appendChild(element);

        const { latitude, longitude } = visit.ipLocation;

        mobileSlides += mobileTemplate({
          visitId: visitorId,
          title,
          browser: getBrowserName(visit.browserDetails),
          ip: visit.ip,
          incognito: visit.incognito ? 'Yes' : 'No',
          bot: getBotDecision(visit.browserDetails.botProbability),
          className: visit.incognito ? 'live-demo--mobile__incognito' : '',
          location: `https://api.mapbox.com/styles/v1/mapbox/${visit.incognito ? 'dark-v10' : 'outdoors-v11'}/static/${longitude},${latitude},7.00,0/512x512?access_token=pk.eyJ1IjoidmFsZW50aW52YXNpbHlldiIsImEiOiJja2ZvMGttN2UxanJ1MzNtcXp5YzNhbWxuIn0.BjZhTdjY812J3OdfgRiZ4A`,
          locationClassName: (latitude && longitude) ? '' : '-not-available',
        });
      }

      highLightRequestId(activeRequestId);
      const swiperContainer = document.getElementById('fpjs_widget_mobile');
      swiperContainer.innerHTML = mobileSlides;

      new Swiper(swiperContainer.parentElement, {
        spaceBetween: 10,
        slidesPerView: 1,
        width: window.innerWidth - 48,
        centeredSlides: true,
        pagination: {
          dynamicBullets: true,
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.btn--next',
          prevEl: '.btn--prev',
        },
      });

      // Tooltips initializations
      tippy('[data-tippy-content]', {
        animation: 'shift-away',
        interactive: true,
        arrow: false,
        trigger: 'click',
      });
    });
}

function highLightRequestId(requestId) {
  if (activeRequestId) {
    const element = document.getElementById(`visit_${activeRequestId}`);
    if (element) {
      element.classList.remove('history-visits__visit--selected');
    }
  }


  const element = document.getElementById(`visit_${activeRequestId = requestId}`);
  if (element) {
    element.classList.add('history-visits__visit--selected');
  }
}

// Let's use existent UI to update values for every visit history
// This will help us reduce the bundle size
function showVisitInfo(visitData, title) {
  const { visitorId, bot, incognito, ip, browserDetails, ipLocation, requestId } = visitData;

  const visitorIdSpan = document.getElementById('fpjs_visitor_id');
  const botSpan = document.getElementById('fpjs_bot');
  const ipSpan = document.getElementById('fpjs_ip');
  const incognitoSpan = document.getElementById('fpjs_incognito');
  const browserSpan = document.getElementById('fpjs_browser');
  const imgLocationSpan = document.getElementById('fpjs_location_img');
  const locationDiv = document.getElementById('fpjs_location');
  const titleSpan = document.getElementById('fpjs_visit_title');

  visitorIdSpan.textContent = visitorId;
  incognitoSpan.textContent = incognito ? 'Yes' : 'No';
  botSpan.textContent = getBotDecision(bot?.probability ?? browserDetails?.botProbability ?? 0);
  ipSpan.textContent = ip;
  browserSpan.textContent = getBrowserName(browserDetails || visitData);

  // Map
  const { latitude, longitude } = ipLocation;
  locationDiv.classList.toggle('-not-available', !latitude || !longitude);
  imgLocationSpan.src = `https://api.mapbox.com/styles/v1/mapbox/${incognito ? 'dark-v10' : 'outdoors-v11'}/static/${longitude},${latitude},7.00,0/400x400?access_token=pk.eyJ1IjoidmFsZW50aW52YXNpbHlldiIsImEiOiJja2ZvMGttN2UxanJ1MzNtcXp5YzNhbWxuIn0.BjZhTdjY812J3OdfgRiZ4A`;

  // Title
  if (title) {
    titleSpan.textContent = title;
  } else {
    titleSpan.textContent = 'Your Current Visit';
  }

  // Appearance
  if (incognito) {
    document.documentElement.classList.add('incognito');
  } else {
    document.documentElement.classList.remove('incognito');
  }
  highLightRequestId(requestId);

  return visitorId;
}

function pluralize(num, one, many) {
  num = Math.floor(num);

  if (num === 1) {
    return `${num} ${one}`;
  }

  return `${num} ${many}`;
}

function getVisitTitle(timestamp, now = Date.now()) {
  const secondsDiff = Math.floor((now - timestamp) / 1000);

  if (secondsDiff < 1) {
    return 'Just now';
  }

  if (secondsDiff < 60) {
    return pluralize(secondsDiff, 'second ago', 'seconds ago');
  }

  if (secondsDiff < 60 * 60) {
    return pluralize(secondsDiff / 60, 'minute ago', 'minutes ago');
  }

  if (secondsDiff < 60 * 60 * 24) {
    return pluralize(secondsDiff / (60 * 60), 'hour ago', 'hours ago');
  }

  if (secondsDiff < 60 * 60 * 24 * 7) {
    return pluralize(secondsDiff / (60 * 60 * 24), 'day ago', 'days ago');
  }

  return new Date(timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getBrowserName({ browserName, browserVersion, os, osVersion, device }) {
  let browserStr = browserName;

  if (browserVersion) {
    browserStr += " " + browserVersion;
  }
  if (os) {
    browserStr += " on " + os;
  }
  if (osVersion) {
    browserStr += " (" + osVersion + ")";
  }
  if (device && device !== "Unknown" && device !== "Other") {
    browserStr += (", " + device);
  }

  return browserStr;
}

function getBotDecision(botProbability) {
  if (botProbability < 0.6) {
    return "No";
  } else if (botProbability < 0.8) {
    return "Probably";
  }

  return "Yes";
}
