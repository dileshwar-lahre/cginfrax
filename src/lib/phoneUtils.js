// ✅ Phone Number Utilities

// Format phone number for display (e.g., 9876543210 -> +91 98765 43210)
export function formatPhoneNumber(phone) {
  if (!phone) return "";
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");
  
  // If it's a Google-generated temp number, return as is
  if (cleaned.startsWith("G-")) return phone;
  
  // If it's 10 digits, format it
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  // If it's 12 digits (with country code), format it
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone; // Return as is if format is unknown
}

// Validate phone number
export function validatePhoneNumber(phone) {
  if (!phone) return { valid: false, message: "Phone number is required" };
  
  const cleaned = phone.replace(/\D/g, "");
  
  // Check if it's a temp Google number
  if (phone.startsWith("G-")) {
    return { valid: false, message: "Please update your phone number" };
  }
  
  // Must be 10 digits
  if (cleaned.length !== 10) {
    return { valid: false, message: "Phone number must be 10 digits" };
  }
  
  // Must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(cleaned)) {
    return { valid: false, message: "Phone number must start with 6, 7, 8, or 9" };
  }
  
  return { valid: true, cleaned };
}

// Check if phone is a real number (not temp Google number)
export function isRealPhoneNumber(phone) {
  if (!phone) return false;
  return !phone.startsWith("G-") && /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));
}



