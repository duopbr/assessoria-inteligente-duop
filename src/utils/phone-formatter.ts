
export const formatPhoneNumber = (value: string) => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, "");
  
  // Format the phone number as (00) 00000-0000
  if (numbers.length <= 2) {
    return numbers.length ? `(${numbers}` : "";
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }
  
  // Limit to 11 digits total
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};
