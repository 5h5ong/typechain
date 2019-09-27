class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}
const shsong = new Human('shsong', 20, 'male');
const sayHi = (person: Human): string => {
  const { name, age, gender } = person;
  return `hello ${name}, you are ${age}, you are a ${gender}`;
};
console.log(sayHi(shsong));

// feature somthing
export {};
