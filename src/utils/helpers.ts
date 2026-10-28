export const formatWhatsAppLink = (phoneNumber: string, message: string): string => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
};

export const generateTimeSlots = (
  openingTime: string, // e.g. "09:30"
  closingTime: string, // e.g. "20:30"
  durationMinutes: number = 30
): string[] => {
  const slots: string[] = [];
  const [openHour, openMin] = openingTime.split(':').map(Number);
  const [closeHour, closeMin] = closingTime.split(':').map(Number);

  let currentMinutes = openHour * 60 + openMin;
  const endMinutes = closeHour * 60 + closeMin;

  while (currentMinutes + durationMinutes <= endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const mins = currentMinutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = mins.toString().padStart(2, '0');
    slots.push(`${displayHours}:${displayMinutes} ${period}`);
    currentMinutes += durationMinutes;
  }

  return slots;
};

export const formatDateDisplay = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};
