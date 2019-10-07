import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {
    images,
    onlyAtImages,
    onlyAtImages2,
    faciaSocialLogos,
    cardImages,
    paymentTypeImages,
    socialIcons,
} from './AppIcons/AppIcons';

// ==========================================================================
// #Config Functions: Config
// ==========================================================================

export function isDev() {
    const releaseChannel = Constants.manifest.releaseChannel;
    if (releaseChannel === 'production') return false;
    return true;
}

// ==========================================================================
// #Config Functions: Facias
// ==========================================================================

const facias = {
    jdsports: 'JD Sports',
    footpatrol: 'Footpatrol',
    scotts: 'scotts',
    size: 'size?',
    tessuti: 'Tessuti',
    blacks: 'Blacks',
    millets: 'Millets',
    ultimateoutdoors: 'Ultimate Outdoors',
};

const faciaCodes = {
    jdsports: 'jd',
    footpatrol: 'fp',
    scotts: 'sc',
    size: 'sz',
    tessuti: 'te',
    blacks: 'bl',
    millets: 'ml', // might be wrong
    ultimateoutdoors: 'uo',
};

const errors = {
    default: 'Sorry an error has occurred. We are aware of the issue and are working on it.',
    permission:
        'Sorry you need to allow permissions to use this feature. You can enable these in your phone settings.',
};

// ==========================================================================
// #Config Functions: GET
// ==========================================================================

export function getFacias() {
    return Object.keys(facias).map(facia => {
        return {
            name: facias[facia],
            ID: facia,
            image: images[facia],
        };
    });
}

export function getFaciaSocialLogo(facia) {
    return faciaSocialLogos[facia] || '';
}

export function getFaciaName(facia) {
    return facias[facia] || '';
}

export function getFaciaImage(facia) {
    return images[facia];
}

export function getOnlyAtImages(facia) {
    return onlyAtImages[facia];
}

export function getOnlyAtImages2(facia) {
    return onlyAtImages2[facia];
}

export function getonlyAtImages(facia) {
    return onlyAtImages[facia];
}

export function getSocialImage(type) {
    return socialIcons[type];
}

export function getPrice(price, discountPerc = 0, priceDivider = 0) {
    if (Array.isArray(price)) return getArrayPrice(price, discountPerc);
    const newPrice = Number(price * ((100 - discountPerc) / 100)).toFixed(2);
    return priceDivider ? (newPrice / priceDivider).toFixed(2) : newPrice;
}

export function getArrayPrice(prices, discount) {
    const sortedPrices = prices.sort((a, b) => (a > b ? 1 : -1)).map(p => getPrice(p, discount));
    if (sortedPrices.length === 1) {
        return sortedPrices[0];
    }
    return sortedPrices[0] + '-' + sortedPrices[sortedPrices.length - 1];
}

export function getNumberOfFilters(filters = {}) {
    if (!filters) return 0;
    return Object.keys(filters).reduce((p, c) => {
        return p + filters[c].length;
    }, 0);
}

export function getCurrencySymbol(curreny) {
    const currencies = {
        GBP: '£',
        EUR: '€',
        USD: '$',
    };
    return currencies[curreny] || '£';
}

export function getFilterString(filters) {
    if (!filters) return '';
    // Delete the filter items that does not have valid filter property
    if (filters.filter === '') delete filters.filter;

    return Object.keys(filters)
        .map(key => {
            if (key === 'filter') delete filters[key];
            return {
                value: key,
                values: filters[key],
            };
        })
        .map(f => {
            if (f.value !== 'categories') return f.value + ':' + f.values.join(' ');

            // Handle category logic
            const categories = f.values[0] ? f.values[0].split('_') : [];
            const filter = categories.filter(c => c !== 'jdplc');
            return filter.map((category, i) => {
                return `categories:jdplc${(i > 0 ? '_' : '')}${filter.slice(0, i).join('_')}_${category}`;
            }).join(',');
        })
        .join(',');
}

export function getAddressLookup() {
    return {
        url: 'https://api.addressy.com/Capture/Interactive',
        key: 'Key=BR88-GY65-TY45-WJ49',
    };
}

export function getCardImage(type) {
    if (!type) return cardImages.default;
    return cardImages[type] ? cardImages[type] : cardImages.default;
}

export function getPaymentTypeImage(type) {
    if (!type) return paymentTypeImages['credit-card'];
    return paymentTypeImages[type] ? paymentTypeImages[type] : paymentTypeImages['credit-card'];
}

export function getPricesFromProductOptions(productOptions) {
    if (!productOptions) return;
    const uniqueArrayFilter = (p, i, a) => a.indexOf(p) === i;
    const pos = productOptions.filter(po => !!po.prices);
    if (!pos || !pos.length) return;
    const prices = pos
        .map(po => Number(po.prices.price / 100))
        .filter(uniqueArrayFilter)
        .sort((a, b) => a - b);
    const rrps = pos
        .map(po => Number((po.prices.rrp || 0) / 100))
        .filter(uniqueArrayFilter)
        .sort((a, b) => a - b);
    return {
        price: prices.length === 1 ? prices[0] : prices,
        rrp: rrps.length === 1 ? rrps[0] : rrps,
        currency: pos[0].currency,
    };
}

export function getAttributeID(value, separator = '_') {
    if (!value || typeof value !== 'string') return '';
    value = value.toLowerCase();
    value = value.replace(new RegExp('&amp;', 'g'), '');
    value = value.replace(new RegExp('&apos;', 'g'), '');
    value = value.replace(new RegExp(/[\])}|\-.,&[{(]/, 'g'), '');
    value = value.trim();
    value = value.replace(new RegExp(/ {1,}/, 'g'), ' ');
    value = value.replace(new RegExp(' ', 'g'), separator);
    return value;
}

// ==========================================================================
// #Config Functions: DATE CONVERTER
// ==========================================================================

export function getDayName(date) {
    const day = date.getDay();
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
}

export function getMonthName(date) {
    const month = date.getMonth();
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ][month];
}

export function addZero(number) {
    return number.toString().length == 1 ? '0' + number : number;
}

// ==========================================================================
// #Config Functions: OTHER
// ==========================================================================

export function convertFaciaName(name) {
    return faciaCodes[name];
}

export function hasExpired(expiry) {
    const now = new Date();
    const month = now.getMonth() < 9 ? '0' + Number(now.getMonth() + 1) : now.getMonth() + 1;
    const nowYearMonth = Number(`${now.getFullYear()}${month}`);
    const expiryYearMonth = Number(
        expiry
            .split('/')
            .reverse()
            .join('')
    );
    return expiryYearMonth < nowYearMonth;
}

export function clothingFullname(value) {
    switch (value) {
        case 'XS':
            return 'Extra Small';
        case 'S':
            return 'Small';
        case 'M':
            return 'Medium';
        case 'L':
            return 'Large';
        case 'XL':
            return 'Extra Large';
    }
}

export const capitalize = str => {
    return [str[0].toUpperCase(), ...str.slice(1, str.length)].join('');
};

export const formatDataGrid = (data, columns) => {
    const numberOfFullRows = Math.floor(data.length / columns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * columns;
    while (numberOfElementsLastRow !== columns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};

export const getError = message => {
    if (!message || message === "Network Error" || message === true) return errors.default;
    if (typeof message === 'string') return message;
    return errors.default;
};

export const isPermissionDenied = async (permission, alert = false) => {
  //Ask for location or other permissions
    const existingStatus = await Permissions.getAsync(Permissions[permission]);
    if (!existingStatus || existingStatus.status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions[permission]);
        if (status !== 'granted') {
            if (alert) Alert.alert('Permission Denied', errors.permission);
            return false;
        }else {
          return true;
        }
    }
    return true;
};

export const mapProductToListing = product => {
    if (!product) return;
    const image = product.media && product.media.find(media => media.type === 'resizable');
    const prices = product.prices || getPricesFromProductOptions(product.productOptions);

    return {
      brand: product.brand,
      productID: product.ID || product.productID,
      externalID: product.ID || product.externalID,
      facia: product.facia,
      media: image ? [image] : [],
      name: product.name,
      otherColours: product.otherColours,
      prices: prices || {},
    };
};

export function calculateLengths(aspectRatio) {
    const splitAspect = aspectRatio.split(':');
    return { width: Number(splitAspect[0]), height: Number(splitAspect[1]) };
}

export function formatNumbers(nStr){
  nStr += '';
  const x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

export function isEquivalent(a, b) {

  const equivKeys = [];
  // Create arrays of property names
  const aKeys = Object.getOwnPropertyNames(a);
  const bKeys = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aKeys.length != bKeys.length) {
      return false;
  }

  for (let i = 0; i < aKeys.length; i++) {
      const currentKey = aKeys[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[currentKey] !== b[currentKey]) {
        equivKeys.push(currentKey);
      }
  }
  // If equiv key is empty objects are equivalent
  return equivKeys;
  
}
