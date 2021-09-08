class UserDto {
  login: string;
  id: string;

  constructor(model: { login: string; _id: string }) {
    this.login = model.login;
    this.id = model._id;
  }
}

export default UserDto;
