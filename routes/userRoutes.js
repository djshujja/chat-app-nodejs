const users = [];

const addUser = ({ id, name, room }) => {
  try {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    let existingUser = false;
    if (existingUser) return { error: "Username is taken" };
    const user = { id, name, room };
    users.push(user);
    return user;
  } catch (e) {
    console.log("err in catch");
    console.log(e);
  }
};

const removeUser = (id) => {
  const index = users.findIndex((user) => users.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
