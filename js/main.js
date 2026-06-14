/*
 * NayePankh Foundation - Interactive Features Script
 * Handles: Theme Toggle, Sticky Nav, Mob Menu, Stats Counters, Program Tabs, Don Calc, Lightbox, Wizard Form
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initThemeToggle();
  initNavbarScroll();
  initMobileMenu();
  initStatsCounter();
  initProgramTabs();
  initDonationCalculator();
  initCertificateLightbox();
  initDonationWizard();
  initFaqAccordion();
  initContactFormSubmit();
  initScrollReveal();
  initVolunteerFormSubmit();
  initGalleryPage();
});

/* ==========================================
   THEME TOGGLER (LocalStorage Persisted)
   ========================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeToggle, currentTheme);

  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(themeToggle, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  if (theme === 'dark') {
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
  } else {
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
}

/* ==========================================
   SCROLLED STICKY NAVBAR
   ========================================== */
function initNavbarScroll() {
  const navWrapper = document.querySelector('.navbar-wrapper');
  if (!navWrapper) return;

  const checkScroll = () => {
    if (window.scrollY > 40) {
      navWrapper.classList.add('scrolled');
    } else {
      navWrapper.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run once on startup
}

/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

/* ==========================================
   SCROLL STATISTICS COUNTER
   ========================================== */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length === 0) return;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const speed = 200; // lower is slower
    const increment = Math.ceil(target / speed);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format with commas if large number
      if (current >= 1000) {
        element.textContent = current.toLocaleString('en-IN');
      } else {
        element.textContent = current;
      }
    }, 10);
  };

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        obs.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  stats.forEach(stat => observer.observe(stat));
}

/* ==========================================
   INITIATIVES TABS SYSTEM
   ========================================== */
function initProgramTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  if (tabBtns.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Remove active from buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      // Remove active from content
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active
      btn.classList.add('active');
      const content = document.getElementById(targetTab);
      if (content) content.classList.add('active');
    });
  });
}

/* ==========================================
   DONATION CALCULATOR LOGIC
   ========================================== */
const IMPACT_DATABASE = {
  presetRanges: [
    { max: 700, text: "Provides 1 week of nutritional milk and healthy fruits to 10 street children." },
    { max: 1500, text: "Provides a pack of sanitary napkins to 12 women and funds a menstrual hygiene workshop." },
    { max: 3500, text: "Sponsors complete educational study kits (books, stationary, school bags) for 3 underprivileged children." },
    { max: 7500, text: "Provides free daily hot meals for a whole neighborhood slum block for 4 days." },
    { max: 15000, text: "Supports a street animal medical rescue clinic program with food & vaccination for 25 dogs for 1 month." },
    { max: 30000, text: "Sponsors educational coaching tuition and digital computer library access for 10 slum children for 6 months." },
    { max: Infinity, text: "Sponsors vocational training, tailoring workshops, and self-reliance startup kits for 5 rural women to earn their livelihood." }
  ]
};

function getImpactText(amount) {
  const matchedRange = IMPACT_DATABASE.presetRanges.find(range => amount <= range.max);
  return matchedRange ? matchedRange.text : "";
}

function initDonationCalculator() {
  const presets = document.querySelectorAll('.preset-btn');
  const customInput = document.getElementById('custom-donation-amount');
  const slider = document.getElementById('donation-slider');
  const impactText = document.getElementById('impact-desc');
  const donLink = document.getElementById('calc-don-link');

  if (!customInput || !slider || !impactText) return;

  // Set default values
  let currentVal = 2500;
  
  const updateCalculatorValues = (val, source) => {
    currentVal = parseInt(val, 10) || 0;
    
    // Sync slider
    if (source !== 'slider') {
      slider.value = Math.min(currentVal, 10000); // Slider max cap
    }

    // Sync input
    if (source !== 'input') {
      customInput.value = currentVal;
    }

    // Sync presets active status
    presets.forEach(btn => {
      const presetVal = parseInt(btn.getAttribute('data-value'), 10);
      if (presetVal === currentVal) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update impact text
    impactText.textContent = getImpactText(currentVal);

    // Update donate link URL with query parameter
    if (donLink) {
      donLink.href = `donate.html?amount=${currentVal}`;
    }
  };

  // Preset clicks
  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-value');
      updateCalculatorValues(val, 'preset');
    });
  });

  // Slider change
  slider.addEventListener('input', (e) => {
    updateCalculatorValues(e.target.value, 'slider');
  });

  // Custom Input change
  customInput.addEventListener('input', (e) => {
    updateCalculatorValues(e.target.value, 'input');
  });

  // Initialize display
  updateCalculatorValues(currentVal);
}

/* ==========================================
   CERTIFICATES LIGHTBOX GALLERY
   ========================================== */
function initCertificateLightbox() {
  const certCards = document.querySelectorAll('.cert-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (certCards.length === 0 || !lightbox || !lightboxImg) return;

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.querySelector('img').src;
      const title = card.querySelector('h4').textContent;
      const desc = card.querySelector('p').textContent;

      lightboxImg.src = imgSrc;
      lightboxCaption.innerHTML = `<h4>${title}</h4><p style="color:#64748b; font-size:0.85rem; margin-top:4px;">${desc}</p>`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop scrolling
    });
  });

  const closeBox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeBox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeBox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeBox();
    }
  });
}

/* ==========================================
   DONATION MULTI-STEP WIZARD (donate.html)
   ========================================== */
function initDonationWizard() {
  const wizard = document.querySelector('.donate-wizard');
  if (!wizard) return;

  // Dom references
  const steps = document.querySelectorAll('.wizard-step');
  const panels = document.querySelectorAll('.wizard-panel');
  const prevBtn = document.getElementById('prev-step');
  const nextBtn = document.getElementById('next-step');
  const progress = document.querySelector('.wizard-progress-bar');
  
  if (!prevBtn || !nextBtn || !progress) return;

  // Input fields for receipt sync
  const donorNameInput = document.getElementById('donor-name');
  const donorEmailInput = document.getElementById('donor-email');
  const donorPhoneInput = document.getElementById('donor-phone');
  const donorPanInput = document.getElementById('donor-pan');
  const customDonAmt = document.getElementById('donation-step-amount');
  const stepPresets = document.querySelectorAll('.step-preset-btn');
  const freqInputs = document.getElementsByName('donation-frequency');
  const paymentMethods = document.querySelectorAll('.payment-method-card');

  // Receipt items
  const rName = document.getElementById('receipt-name');
  const rEmail = document.getElementById('receipt-email');
  const rPhone = document.getElementById('receipt-phone');
  const rPan = document.getElementById('receipt-pan');
  const rAmt = document.getElementById('receipt-amount');
  const rTaxRelief = document.getElementById('receipt-tax-relief');
  const rFreq = document.getElementById('receipt-freq');
  const rMethod = document.getElementById('receipt-method');
  const rReceiptId = document.getElementById('receipt-number');
  const rDate = document.getElementById('receipt-date');
  const receiptContainer = document.querySelector('.receipt-box');

  let currentStep = 1;
  const maxStep = 3;

  // Pre-fill amount from URL query parameter if available
  const urlParams = new URLSearchParams(window.location.search);
  const urlAmount = urlParams.get('amount');
  
  let donationData = {
    name: 'Anonymous Donor',
    email: '-',
    phone: '-',
    pan: '-',
    amount: urlAmount ? parseInt(urlAmount, 10) : 2500,
    frequency: 'One-Time',
    method: 'UPI Transfer'
  };

  // Sync initial amount preset button
  if (customDonAmt) {
    customDonAmt.value = donationData.amount;
    stepPresets.forEach(btn => {
      if (parseInt(btn.getAttribute('data-value'), 10) === donationData.amount) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Preset button clicks in step 1
  stepPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.getAttribute('data-value'), 10);
      donationData.amount = val;
      customDonAmt.value = val;
      
      stepPresets.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateReceiptDisplay();
    });
  });

  if (customDonAmt) {
    customDonAmt.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) || 0;
      donationData.amount = val;
      
      stepPresets.forEach(b => {
        if (parseInt(b.getAttribute('data-value'), 10) === val) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      updateReceiptDisplay();
    });
  }

  // Frequency change
  freqInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        donationData.frequency = e.target.value;
        updateReceiptDisplay();
      }
    });
  });

  // Payment method click
  paymentMethods.forEach(card => {
    card.addEventListener('click', () => {
      paymentMethods.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      donationData.method = card.getAttribute('data-method');
      updateReceiptDisplay();
    });
  });

  // Text inputs synchronization
  const syncInputs = () => {
    donationData.name = donorNameInput.value.trim() || 'Anonymous Donor';
    donationData.email = donorEmailInput.value.trim() || '-';
    donationData.phone = donorPhoneInput.value.trim() || '-';
    donationData.pan = donorPanInput.value.trim().toUpperCase() || '-';
    updateReceiptDisplay();
  };

  if (donorNameInput) {
    donorNameInput.addEventListener('input', syncInputs);
    donorEmailInput.addEventListener('input', syncInputs);
    donorPhoneInput.addEventListener('input', syncInputs);
    donorPanInput.addEventListener('input', syncInputs);
  }

  // Update receipt view
  function updateReceiptDisplay() {
    if (!rName) return;
    rName.textContent = donationData.name;
    rEmail.textContent = donationData.email;
    rPhone.textContent = donationData.phone;
    rPan.textContent = donationData.pan;
    rAmt.textContent = `₹ ${donationData.amount.toLocaleString('en-IN')}`;
    
    // Tax exemption calculation (50% relief on 80G)
    const relief = Math.floor(donationData.amount * 0.5);
    rTaxRelief.textContent = `₹ ${relief.toLocaleString('en-IN')} (Section 80G)`;
    
    rFreq.textContent = donationData.frequency;
    rMethod.textContent = donationData.method;
  }

  // Wizard Nav Actions
  const updateWizardStep = () => {
    // Show/hide steps
    steps.forEach((step, idx) => {
      if (idx + 1 === currentStep) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else if (idx + 1 < currentStep) {
        step.classList.remove('active');
        step.classList.add('completed');
      } else {
        step.classList.remove('active', 'completed');
      }
    });

    // Show/hide panels
    panels.forEach((panel, idx) => {
      if (idx + 1 === currentStep) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Update progress bar
    const progressWidth = ((currentStep - 1) / (maxStep - 1)) * 100;
    progress.style.width = `${progressWidth}%`;

    // Button states
    if (currentStep === 1) {
      prevBtn.style.visibility = 'hidden';
      nextBtn.innerHTML = 'Next Step &rarr;';
    } else if (currentStep === maxStep) {
      prevBtn.style.visibility = 'visible';
      nextBtn.innerHTML = 'Complete Donation &hearts;';
    } else {
      prevBtn.style.visibility = 'visible';
      nextBtn.innerHTML = 'Next Step &rarr;';
    }
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (donationData.amount <= 0) {
        alert("Please enter a valid donation amount greater than 0.");
        return false;
      }
    } else if (currentStep === 2) {
      // Basic validations
      if (donorNameInput.value.trim() === '') {
        alert("Please enter your name.");
        return false;
      }
      if (donorEmailInput.value.trim() === '') {
        alert("Please enter your email.");
        return false;
      }
      // PAN validation warning (optional, but good for 80G)
      const panVal = donorPanInput.value.trim();
      if (panVal !== '' && panVal.length !== 10) {
        alert("Warning: An Indian PAN card number should be exactly 10 characters long to validate your tax exemption receipt.");
      }
    }
    return true;
  };

  nextBtn.addEventListener('click', () => {
    if (!validateStep()) return;

    if (currentStep < maxStep) {
      currentStep++;
      updateWizardStep();
    } else {
      // Form submitted simulation
      simulateDonationCompletion();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateWizardStep();
    }
  });

  function simulateDonationCompletion() {
    // Generate mock receipt ID & date
    const receiptNum = "NPF-" + Math.floor(100000 + Math.random() * 900000);
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    rReceiptId.textContent = receiptNum;
    rDate.textContent = today;

    // Show completion notification/overlay on the receipt
    const overlay = document.createElement('div');
    overlay.className = 'flex-center';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(236, 253, 245, 0.95)';
    overlay.style.flexDirection = 'column';
    overlay.style.zIndex = '5';
    overlay.style.color = '#047857';
    overlay.style.padding = '20px';
    overlay.style.textAlign = 'center';
    overlay.style.animation = 'fadeIn 0.5s ease-out forwards';

    overlay.innerHTML = `
      <div style="width: 70px; height: 70px; border-radius:50%; background-color:#10B981; color:white; display:flex; align-items:center; justify-content:center; margin-bottom:20px; font-size:2.5rem; font-weight:bold; box-shadow: 0 4px 12px rgba(16,185,129,0.3)">✓</div>
      <h3 style="color:#065F46; font-size:1.8rem; margin-bottom:10px; font-family:var(--font-title);">Donation Successful!</h3>
      <p style="color:#047857; margin-bottom:24px; max-width:280px; font-size:0.9rem;">Thank you for your warm support. We have generated your official tax-exempt receipt.</p>
      <button class="btn btn-primary" onclick="window.print()" style="font-size:0.85rem; padding:10px 20px;">Print Receipt</button>
      <a href="index.html" style="margin-top:16px; font-size:0.85rem; font-weight:600; text-decoration:underline; color:#047857;">Back to Home</a>
    `;

    receiptContainer.style.position = 'relative';
    receiptContainer.appendChild(overlay);

    // Disable wizard actions
    nextBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
  }

  // Run initial displays
  updateReceiptDisplay();
  updateWizardStep();
}

/* ==========================================
   FAQS ACCORDION (contact.html)
   ========================================== */
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  if (accordionHeaders.length === 0) return;

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Open if was not active
      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================
   CONTACT FORM SUBMISSION WITH FEEDBACK
   ========================================== */
function initContactFormSubmit() {
  const contactForm = document.getElementById('contact-form');
  const confirmation = document.getElementById('contact-confirmation');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Perform animation mock send
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" style="animation: spin 1s linear infinite; margin-right: 8px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
      Sending Message...
    `;

    setTimeout(() => {
      // Finish sending
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
      
      if (confirmation) {
        confirmation.style.display = 'block';
        setTimeout(() => {
          confirmation.style.display = 'none';
        }, 5000);
      }
    }, 1500);
  });
}

// Spin animation style helper for contact form loader
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

/* ==========================================
   SCROLL REVEAL OBSERVER
   ========================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('[class*="reveal"]');
  if (reveals.length === 0) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve to run animation only once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================
   VOLUNTEER REGISTRATION FORM SUBMISSION
   ========================================== */
function initVolunteerFormSubmit() {
  const volunteerForm = document.getElementById('volunteer-form');
  const confirmation = document.getElementById('volunteer-confirmation');
  if (!volunteerForm) return;

  volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = volunteerForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" style="animation: spin 1s linear infinite; margin-right: 8px; display: inline-block; vertical-align: middle;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
      Submitting Application...
    `;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      volunteerForm.reset();
      
      if (confirmation) {
        confirmation.style.display = 'block';
        confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          confirmation.style.display = 'none';
        }, 6000);
      }
    }, 1500);
  });
}

/* ==========================================
   GALLERY PAGE FILTER & LIGHTBOX LOGIC
   ========================================== */
function initGalleryPage() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('#gallery-lightbox .lightbox-close');

  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  // 1. Filter Logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
          item.classList.add('show');
        } else {
          item.classList.remove('show');
          item.classList.add('hide');
        }
      });
    });
  });

  // 2. Lightbox Logic
  if (lightbox && lightboxImg && lightboxCaption) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h4').textContent;
        const desc = item.querySelector('p').textContent;

        if (img) {
          lightboxImg.src = img.src;
          lightboxCaption.innerHTML = `<strong>${title}</strong> - ${desc}`;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Disable page scrolling
        }
      });
    });

    // Close Lightbox
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Enable page scrolling
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard ESC Close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
}


