export function calcBMI(feet: string, inches: string, weight: string): number {
  const totalIn = parseInt(feet || '0') * 12 + parseInt(inches || '0');
  const w = parseFloat(weight || '0');
  if (totalIn === 0 || w === 0) return 0;
  return Math.round((w / (totalIn * totalIn)) * 703 * 10) / 10;
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}
