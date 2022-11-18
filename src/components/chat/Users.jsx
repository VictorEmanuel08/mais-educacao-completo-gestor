import React from "react";

export function Users({
  users,
  onClickUser,
  userToAdd,
  setUserToAdd,
  onAddFriend,
}) {
  const renderUser = ({ item }) => {
    return (
      <button
        onClick={() => onClickUser(item)}
        //   style={styles.row}
      >
        <a>
          <img
            //   style={styles.avatar}
            source={{ uri: item.avatar }}
          />
        </a>
        <h1>{item.username}</h1>
      </button>
    );
  };
  return (
    <>
      <div
      //   style={styles.addUser}
      >
        <input
          type="text"
          //   style={styles.input}
          onChange={setUserToAdd}
          value={userToAdd}
        />
        <button title={"Add User"} onClick={() => onAddFriend(userToAdd)} />
      </div>
      {/* <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.username.toString()}
      /> */}
    </>
  );
}

// const styles = StyleSheet.create({
//   avatar: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   row: {
//     flexDirection: "row",
//     padding: 10,
//     alignItems: "center",
//     borderBottomColor: "#cacaca",
//     borderBottomWidth: 1,
//   },
//   addUser: {
//     marginTop: 60,
//     flexDirection: "row",
//     padding: 10,
//   },
//   input: {
//     backgroundColor: "#cacaca",
//     flex: 1,
//     marginRight: 10,
//     padding: 10,
//   },
// });
