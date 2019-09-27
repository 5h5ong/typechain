interface Human {
  age: number;
  name: string;
  gender: string;
}
const person = {
  age: 20,
  name: 'shsong',
  gender: 'male'
};
const sayHi = (person: Human): string => {
  const { name, age, gender } = person;
  return `hello ${name}, you are ${age}, you are a ${gender}`;
};
console.log(sayHi(person));

// feature somthing
export {};
