export interface SystemUser {
  id: string;
  email: string;
  password: string;
  roleId: string;
  phoneNumber: string;
  contribuinte: string;
}


// Classe que implementa a interface SystemUser
class SystemUserClass implements SystemUser {
  id: string;
  email: string;
  password: string;
  roleId: string;
  phoneNumber: string;
  contribuinte: string;

  // Construtor da classe
  constructor(id: string, email: string, password: string, roleId: string, phoneNumber: string, contribuinte: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.phoneNumber = phoneNumber;
    this.contribuinte = contribuinte;
  }

  // Método estático para criar uma nova instância de SystemUser
  static new(id: string, email: string, password: string, roleId: string, phoneNumber: string, contribuinte: string): SystemUserClass {
    return new SystemUserClass(id, email, password, roleId, phoneNumber, contribuinte);
  }
}

