export interface User {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  pesel: string;
  phoneNumber: string;

  // constructor(
  //   id: number,
  //   role: string,
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   pesel: string,
  //   phoneNumber: string
  // ) {
  //   this.id = id;
  //   this.role = role;
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  //   this.email = email;
  //   this.pesel = pesel;
  //   this.phoneNumber = phoneNumber;
  // }
}
