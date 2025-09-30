# ZeroPesa - TODO List 📋

> Action items and future enhancements for the ZeroPesa landing page.

---

## 🔴 High Priority (Pre-Launch)

### Content & Assets
- [ ] **Replace placeholder app screenshots**
  - Create real iPhone mockups with app interface
  - Add Android phone mockups
  - Update phone-mockup section in hero
  - Optimize images (WebP format with PNG fallback)
  - Add proper alt text for accessibility

- [ ] **Update app download links**
  - Replace `#` with actual App Store URL
  - Replace `#` with actual Google Play URL
  - Test links on mobile devices
  - Add deep linking for app install attribution

- [ ] **Create and add favicon assets**
  - Generate favicon-32x32.png
  - Generate favicon-16x16.png
  - Generate apple-touch-icon.png (180x180)
  - Create Open Graph image (1200x630)
  - Create Twitter Card image (1200x628)

### Analytics & Tracking
- [ ] **Set up analytics**
  - Option A: Google Analytics 4
    - Create GA4 property
    - Add tracking code to `<head>`
    - Set up custom events (button clicks, calculator usage)
    - Configure conversion goals
  - Option B: Plausible Analytics (privacy-friendly)
    - Create Plausible account
    - Add lightweight tracking script
    - Set up goal tracking

- [ ] **Implement conversion tracking**
  - Track "Download App" button clicks
  - Track calculator interactions
  - Track time on page
  - Track scroll depth
  - Set up event forwarding to marketing tools

- [ ] **Add Facebook Pixel** (if running ads)
  - Create Facebook Pixel
  - Add pixel code to `<head>`
  - Set up custom conversions
  - Test with Facebook Pixel Helper

### Email Capture
- [ ] **Create email capture form**
  - Design form (above footer, non-intrusive)
  - Add input validation (email format)
  - Connect to email service provider:
    - Option A: Mailchimp API
    - Option B: ConvertKit API
    - Option C: Custom backend endpoint
  - Add success/error messages
  - Include privacy policy link
  - Add GDPR compliance checkbox (if targeting EU)

---

## 🟡 Medium Priority (Post-Launch)

### A/B Testing
- [ ] **Test headline variations**
  - Current: "Send Money Home for KES 30, Not KES 6,000"
  - Variant A: "Send Money to Kenya 95% Cheaper"
  - Variant B: "Stop Paying KES 6,000 in Fees. Pay KES 30 Instead."
  - Variant C: "International Money Transfers for 0.3% Fee"
  - Use Google Optimize or similar tool
  - Run test for minimum 2 weeks
  - Measure conversion rate impact

- [ ] **Test CTA button copy**
  - Current: "Download App"
  - Variant A: "Get Started Free"
  - Variant B: "Start Saving Now"
  - Variant C: "Send Money Cheaper"
  - Test button colors (orange vs teal vs green)

### User Experience Enhancements
- [ ] **Add live chat widget**
  - Research options: Intercom, Drift, Crisp, Tawk.to
  - Install chat widget in bottom-right corner
  - Set up automated welcome message
  - Configure business hours
  - Train support team on common questions

- [ ] **Add QR code for app download**
  - Generate dynamic QR code (updates if links change)
  - Replace `.qr-placeholder` div with actual QR
  - Add "Scan to Download" text
  - Test QR code scanning on multiple devices

- [ ] **Embed demo video**
  - Record 30-60 second app demo
  - Upload to YouTube or Vimeo (unlisted)
  - Add video embed in hero or separate section
  - Add video poster image for faster loading
  - Lazy load video iframe

### Multi-Language Support
- [ ] **Add language switcher**
  - Create language selector in header/footer
  - Translate content to:
    - [ ] Swahili (Kenya, Tanzania)
    - [ ] French (West Africa)
    - [ ] Spanish (growing markets)
    - [ ] Tagalog (Philippines)
  - Use `i18n` approach (separate HTML or JSON files)
  - Update meta tags for each language
  - Add `hreflang` tags for SEO

### Social Proof & Trust
- [ ] **Add customer testimonials**
  - Collect 5-10 real user testimonials
  - Add photos (with permission)
  - Create testimonials section after "Trust" section
  - Include customer location and amount saved

- [ ] **Add trust badges**
  - Payment security badges
  - Regulatory compliance logos (if applicable)
  - Industry awards/recognition
  - User count ("Join 10,000+ users")

- [ ] **Display live transaction stats**
  - Show real-time transaction count
  - Display total money saved by users
  - Add counter animation
  - Update via API or static calculation

---

## 🟢 Low Priority (Future Iterations)

### Visual Enhancements
- [ ] **Implement dark mode**
  - Add dark mode toggle in header
  - Create dark color scheme
  - Store preference in localStorage
  - Respect `prefers-color-scheme: dark`
  - Test all sections in dark mode

- [ ] **Add micro-interactions**
  - Button hover effects with particle animation
  - Cursor followers on key elements
  - Confetti animation on calculator milestones
  - Haptic feedback on mobile (if supported)

- [ ] **Create animated illustrations**
  - Custom SVG illustrations for each section
  - Animated icons with Lottie or CSS
  - Replace emoji icons with custom graphics

### Content Additions
- [ ] **Add FAQ section**
  - Common questions about fees, security, speed
  - Accordion UI for space efficiency
  - Schema markup for FAQ rich snippets

- [ ] **Create comparison table**
  - Compare ZeroPesa vs Western Union, WorldRemit, Wise
  - Show side-by-side fee comparison
  - Highlight ZeroPesa advantages

- [ ] **Add "How It Works" video**
  - Animated explainer video (60-90 seconds)
  - Embed below How It Works section
  - Professional voiceover
  - Closed captions for accessibility

- [ ] **Create country-specific landing pages**
  - `/kenya` - Kenya-focused content
  - `/nigeria` - Nigeria-focused content
  - `/ghana` - Ghana-focused content
  - `/philippines` - Philippines-focused content
  - Localized copy, currency examples, testimonials

### Interactive Features
- [ ] **Add interactive country map**
  - Highlight supported countries
  - Click country to see specific info
  - Show transfer routes and times
  - Use D3.js or Leaflet

- [ ] **Build savings calculator V2**
  - Multi-currency support
  - Annual savings projection
  - Shareable results (social media cards)
  - Export results as PDF

- [ ] **Implement progress indicator**
  - Show scroll progress bar at top
  - Indicate current section in navigation
  - Smooth highlight on active section

### Technical Improvements
- [ ] **Optimize images**
  - Convert all images to WebP
  - Add PNG/JPEG fallbacks
  - Implement responsive images (srcset)
  - Use lazy loading for below-fold images
  - Compress with TinyPNG or Squoosh

- [ ] **Add Service Worker**
  - Implement offline functionality
  - Cache static assets
  - Show offline indicator
  - Progressive Web App (PWA) support

- [ ] **Set up CI/CD pipeline**
  - Automated testing on commit
  - Lighthouse CI for performance monitoring
  - Automated deployment to production
  - Branch previews for PRs

- [ ] **Implement Content Security Policy**
  - Add CSP headers
  - Restrict inline scripts
  - Whitelist trusted domains
  - Monitor CSP violations

### Marketing & Growth
- [ ] **Create blog**
  - Add `/blog` section
  - Write content about remittances, USDT, fintech
  - SEO-optimized articles
  - Drive organic traffic

- [ ] **Build referral program**
  - "Refer a friend" feature
  - Generate unique referral links
  - Track referrals and rewards
  - Automate reward distribution

- [ ] **Add browser push notifications**
  - Request permission after interaction
  - Send notifications about:
    - Exchange rate changes
    - Fee discounts/promotions
    - New features
  - Use OneSignal or custom implementation

- [ ] **Create exit-intent popup**
  - Trigger when user attempts to leave
  - Offer incentive (e.g., "Get your first transfer free")
  - Email capture
  - Don't show again for 7 days

---

## 🔧 Technical Debt & Maintenance

- [ ] **Code organization**
  - Split CSS into modules (variables, layout, components)
  - Split JS into modules (utils, calculator, animations)
  - Use build tool (Vite or Parcel) for bundling
  - Set up PostCSS for autoprefixer

- [ ] **Testing**
  - Write unit tests for calculator logic
  - Add E2E tests with Playwright or Cypress
  - Implement visual regression testing
  - Set up accessibility testing automation

- [ ] **Documentation**
  - Document JavaScript functions (JSDoc)
  - Create component library/style guide
  - Write deployment runbook
  - Document analytics events

- [ ] **Security**
  - Add Content Security Policy headers
  - Implement rate limiting on forms
  - Add honeypot field to prevent spam
  - Regular security audits

---

## 📊 Analytics Events to Track

Once analytics is set up, track these events:

```javascript
// Button clicks
- click_download_app_header
- click_download_app_hero
- click_download_app_cta
- click_download_ios
- click_download_android

// Calculator interactions
- calculator_slide_start
- calculator_slide_end
- calculator_amount_changed

// Scroll tracking
- scroll_to_problem
- scroll_to_solution
- scroll_to_how_it_works
- scroll_to_trust
- scroll_to_cta
- scroll_depth_25
- scroll_depth_50
- scroll_depth_75
- scroll_depth_100

// Engagement
- time_on_page_30s
- time_on_page_60s
- time_on_page_120s

// Email capture
- email_form_viewed
- email_form_submitted
- email_form_success
- email_form_error

// Social
- click_twitter
- click_linkedin
- click_whatsapp

// Navigation
- click_footer_link
- click_logo
```

---

## 🎯 Success Metrics to Monitor

Track these KPIs weekly:

| Metric | Current | Target |
|--------|---------|--------|
| **Page Views** | - | 10,000/mo |
| **Bounce Rate** | - | < 40% |
| **Avg. Time on Page** | - | > 2 min |
| **Conversion Rate** | - | > 5% |
| **App Downloads** | - | 500/mo |
| **Email Signups** | - | 300/mo |
| **Lighthouse Performance** | 95+ | 95+ |
| **Core Web Vitals** | Pass | Pass |

---

## 📝 Notes

- Review this list monthly
- Mark completed items with ✅
- Add new ideas as they come up
- Prioritize based on user feedback and data
- Don't try to do everything at once - focus on impact

---

**Last Updated:** 2025-01-XX
