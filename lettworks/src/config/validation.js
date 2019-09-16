const policy = {
  email: (value) => {
      value = String(value).toLowerCase();
      return value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  },
  password: (value) => {
      const upperCase = value.match(/[A-Z]/);
      const lowerCase = value.match(/[a-z]/);
      const number = value.match(/[0-9]/);
      const minLength = value.length >= 8;
      return upperCase && lowerCase && number && minLength;
  },
  firstName: (value) => {
      return value.match(/^[A-Za-z0-9-._ ]{2,20}$/);
  },
  lastName: (value) => {
      return value.match(/^[A-Za-z0-9-._ ]{2,20}$/);
  },
  address: (value) => {
      return value.match(/^(.){1,30}$/);
  },
  postcode: (value) => {
      return value.match(/^([A-Z](([0-9][0-9]?)|([A-Z][0-9][0-9]?)|([A-Z]?[0-9][A-Z])) ?[0-9][ABD-HJLNP-UW-Z]{2})$/);
  },
  phoneNumber: (value) => {
      return value.match(/^[0-9\+]{8,14}$/);
  },
  staffCard: (value) => {
      return value.match(/^[0-9]{15}$/);
  },
  dob: (value, minAge = 16) => {
      const today = new Date();
      let age = today.getFullYear() - value.getFullYear();
      const month = today.getMonth() - value.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < value.getDate())) age--;
      return age >= minAge;
  },
  cardName: (value) => {
      return value.match(/^[A-Za-z0-9-._ ]{2,30}$/);
  },
  cardNumber: (value) => {
      return value.match(/^[0-9 ]{12,23}$/);
  },
  cardExpiryMonth: (value) => {
      return value.match(/^[0-9]{1,2}$/);
  },
  cardExpiryYear: (value) => {
      return value.match(/^[0-9]{4}$/);
  },
  cardExpiryDate: (value) => {
      const mmyy = value.split('-');
      const month = Number(mmyy[0] || 0);
      const year = Number(mmyy[1] || 0);
      if (!month || !year) return false;
      const today = new Date();
      if (year === today.getFullYear() && month < today.getMonth() + 1) return false;
      return year >= today.getFullYear();
  },
  cvc: (value) => {
      return value.match(/^[0-9]{3,4}$/);
  }
};

export function validate(field, value, optional = false) {
  if (!value) return optional;
  if (!(policy[field] instanceof Function)) return false;
  return policy[field](value);
}