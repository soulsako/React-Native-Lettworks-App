// Minimum and Max price for sale
export const salePrice = [ "10K", "20K", "30K", "40K", "50K", "60K", "70K", "80K", "90K","100K", "110K", "120K", "130K", "140K", "150K", "160K", "170K", "180K","190K","200K", "210K", "220K", "230K", "240K", "250K", "260K", "270K", "280K","290K","300K", "310K", "320K", "330K", "340K", "350K", "360K", "370K", "380K","390K","400K", "410K", "420K", "430K", "440K", "450K", "460K", "470K", "480K","490K","500K", "510K", "520K", "530K", "540K", "550K", "560K", "570K", "580K","590K","600K", "610K", "620K", "630K", "640K", "650K", "660K", "670K", "680K","690K","700K", "710K", "720K", "730K", "740K", "750K", "760K", "770K", "780K","790K","800K", "810K", "820K", "830K", "840K", "850K", "860K", "870K", "880K","890K","900K", "910K", "920K", "930K", "940K", "950K", "960K", "970K", "980K", "990K", "1M+"];

// Minimum and Max price for rent
export const rentPrice = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000, 5250, 5500, 5750, 6000, 6250, 6500, 6750, 7000, 7250, 7500, 7750, 8000, 8250, 8500, 8750, 9000, 9250, 9500, 9750, 10000];

//Distances in miles to fetch properties within miles radius
export const distanceItems = [
  { label:"This area only", value: 1 },
  { label:"1 mile", value: 1 },
  { label:"3 miles", value: 3 },
  { label:"5 miles", value: 5 },
  { label:"10 miles", value: 10 },
  { label:"15 miles", value: 15 },
  { label:"20 miles", value: 20 }, 
  { label:"30 miles", value: 30 }, 
  { label:"40 miles", value: 40 }
];

export const minSalePrice = [...salePrice];
export const maxSalePrice = [...salePrice];

export const minRentPrice = [...rentPrice];
export const maxRentPrice = [...rentPrice];

minSalePrice.unshift("No min");
maxSalePrice.unshift("No max");
minRentPrice.unshift("No min");
maxRentPrice.unshift("No max");
