export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return (i > 0 && messages[i - 1].sender._id === m.sender._id);
};

// export const getSender = (loggedUser, users) => {
//   return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
// };
export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) {
    // Handle the case where loggedUser, users, or users array is undefined or insufficient.
    // You might return a default value or throw an error as needed.
    return "Sender Not Found";
  }

  const [firstUser, secondUser] = users;

  if (!firstUser || !secondUser) {
    // Handle the case where firstUser or secondUser is undefined.
    // You might return a default value or throw an error as needed.
    return "Sender Not Found";
  }

  return firstUser._id === loggedUser._id ? secondUser.name : firstUser.name;
};


export const getSenderFull = (loggedUser, users) => {
  return (users[0]._id === loggedUser._id ? users[1] : users[0]);
};
