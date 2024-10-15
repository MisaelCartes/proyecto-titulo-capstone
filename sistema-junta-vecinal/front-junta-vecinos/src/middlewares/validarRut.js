// validarRut.js
const validarRut = (rut) => {
    const cleanedRut = rut.replace(/\./g, '').replace('-', '');
    if (cleanedRut.length < 8 || cleanedRut.length > 9) return false;
    if (!/^\d{7,8}[0-9Kk]$/i.test(cleanedRut)) return false;
    
    const body = cleanedRut.slice(0, -1);
    const dv = cleanedRut.slice(-1).toUpperCase();
    
    let sum = 0;
    let factor = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      sum += body[i] * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
    
    const calculatedDv = 11 - (sum % 11);
    const finalDv = calculatedDv === 10 ? 'K' : calculatedDv === 11 ? '0' : calculatedDv.toString();
    
    return dv === finalDv;
  };
  
  export default validarRut;
  