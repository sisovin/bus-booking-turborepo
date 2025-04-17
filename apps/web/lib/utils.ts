export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const calculatePrice = (basePrice: number, tier: string): number => {
  const pricingTiers = {
    ECONOMY: 1,
    BUSINESS: 1.5,
    FIRST_CLASS: 2,
  };

  return basePrice * (pricingTiers[tier.toUpperCase()] || 1);
};
