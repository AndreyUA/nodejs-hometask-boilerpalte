const { UserRepository } = require("../repositories/userRepository");

class UserService {
  createUser(data) {
    const create = UserRepository.create(data);
    return create;
  }

  deleteUser(id) {
    const del = UserRepository.delete(id);
    return del;
  }

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService();
