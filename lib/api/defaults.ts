import type { SiteSettings } from './contracts'

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  agencyName: 'KrikoTrip Holidays & Luxury Travels',
  tagline: 'Your Gateway to Extraordinary Journeys',
  contactEmail: 'info@krikotrips.com',
  supportPhone: '+91 8250338715',
  whatsappNumber: '+91 8250338715',
  address: 'BL-A Shop-GLP/5 676 Green Land Park, Sonarpur, Kolkata - 700103',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14748.241355447664!2d88.4239!3d22.4419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02720d440939fb%3A0xb35a396e6255776a!2sSonarpur%2C%20Kolkata%2C%20West%20Bengal%20700103!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  currency: 'INR',
  timezone: 'Asia/Kolkata',
  socialLinks: {
    facebook: 'https://facebook.com/krikotrip',
    instagram: 'https://instagram.com/krikotrip',
    youtube: 'https://youtube.com/@krikotrip',
    pinterest: 'https://pinterest.com/krikotrip',
  },
  homeStats: [
    { id: 'tours', label: 'Tour Completed', value: '1000+', number: '1000+' },
    { id: 'experience', label: 'Travel Experience', value: '10+', number: '10+' },
    { id: 'travelers', label: 'Happy Traveler', value: '1+', number: '1+' },
    { id: 'retention', label: 'Retention Rate', value: '98%', number: '98%' },
  ],
  publicCoupons: [],
  loyaltyDisplay: {
    pointValuePaise: 100,
    earnPercent: 1,
  },
}
