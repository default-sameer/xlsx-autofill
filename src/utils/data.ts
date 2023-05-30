const cars = [
  "Chevrolet",
  "Ford",
  "Tesla",
  "Toyota",
  "Ferrari",
  "Honda",
  "Hyundai",
  "Kia",
  "Mazda",
  "Nissan",
  "Subaru",
  "Volkswagen",
  "Volvo",
  "BMW",
  "Mercedes-Benz",
  "Porsche",
  "Audi",
  "Lexus",
  "Acura",
  "Infiniti",
  "Land Rover",
  "Lincoln",
  "Buick",
  "Cadillac",
  "Chrysler",
  "Dodge",
  "GMC",
  "Jeep",
  "Ram",
  "Mitsubishi",
  "Alfa Romeo",
  "Genesis",
];

export const randomMFCname = cars[Math.floor(Math.random() * cars.length)];

export const mfcSku = randomMFCname.slice(0, 3).toUpperCase();

export const description = cars.map((car) => {
  const randomIndex = Math.floor(Math.random() * cars.length);
  return `${car} is a ${cars[randomIndex]} car`;
});

export const randomDescription =
  description[Math.floor(Math.random() * description.length)];

export const randomDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date(2024, 0, 1);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const month = randomDate.getMonth() + 1;
  const day = randomDate.getDate();
  const year = randomDate.getFullYear();
  return `${month < 10 ? `0${month}` : month}/${
    day < 10 ? `0${day}` : day
  }/${year}`;
};
