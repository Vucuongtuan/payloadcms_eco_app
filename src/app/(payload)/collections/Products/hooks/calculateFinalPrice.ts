import { BeforeValidateHook } from 'payload/types';

export const calculateFinalPrice: BeforeValidateHook = ({ data }) => {
  if (data && data.price) {
    const { basePrice, discount } = data.price;
    const base = Number(basePrice) || 0;
    const disc = Number(discount) || 0;

    let finalPrice = base;
    if (disc > 0) {
      finalPrice = base - (base * (disc / 100));
    }
    
    return {
      ...data,
      price: {
        ...data.price,
        finalPrice: finalPrice,
      },
    };
  }

  return data;
};