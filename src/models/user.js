export default class User {
  constructor(username, email, password,  nombres, apellidos, cedula, celular, fechaNacimiento, imagen, edad) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.cedula = cedula;
    this.celular = celular;
    this.fechaNacimiento = fechaNacimiento;
    this.imagen = imagen;
    this.edad = edad;
  }
}
