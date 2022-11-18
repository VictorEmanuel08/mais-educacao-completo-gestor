import React, { useContext, useEffect, useState } from "react";
import { Chat } from "./Chat";
import { Users } from "./Users";
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from "firebase/database";
import { AuthContext } from "../../context/auth";
import { app } from "../../api/app";

export function ChatApp() {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("users");
  const [users, setUsers] = useState([]);
  const [userToAdd, setUserToAdd] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myData, setMyData] = useState(null);

  const [userInfo, setUserInfo] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/escolas/users/professores/${user}`);
      setUserInfo(response.data.professor.escola_user);
      setUsername(response.data.professor.escola_user.id);
    };
    getData();
  }, []);

  function AbrirChat() {
    console.log(username);
    const findUser = async (name) => {
      const database = getDatabase();

      const mySnapshot = await get(ref(database, `users/${name}`));

      return mySnapshot.val();
    };
    const onLogin = async () => {
      try {
        const database = getDatabase();

        const user = await findUser(userInfo.id);

        if (user) {
          setMyData(user);
        } else {
          const newUserObj = {
            username: username,
            avatar: "https://i.pravatar.cc/150?u=" + Date.now(),
          };

          set(ref(database, `users/${username}`), newUserObj);
          setMyData(newUserObj);
        }

        const myUserRef = ref(database, `users/${username}`);
        onValue(myUserRef, (snapshot) => {
          const data = snapshot.val();
          setUsers(data.friends);
          setMyData((prevData) => ({
            ...prevData,
            friends: data.friends,
          }));
        });
        setCurrentPage("users");
      } catch (error) {
        console.error(error);
      }
    };
    onLogin();

    const onClickUser = (user) => {
      setCurrentPage("chat");
      setSelectedUser(user);
    };

    const onAddFriend = async (name) => {
      try {
        //find user and add it to my friends and also add me to his friends
        const database = getDatabase();

        const user = await findUser(name);

        if (user) {
          if (user.username === myData.username) {
            // don't let user add himself
            return;
          }

          if (
            myData.friends &&
            myData.friends.findIndex((f) => f.username === user.username) > 0
          ) {
            // don't let user add a user twice
            return;
          }

          // create a chatroom and store the chatroom id

          const newChatroomRef = push(ref(database, "chatrooms"), {
            firstUser: myData.username,
            secondUser: user.username,
            messages: [],
          });

          const newChatroomId = newChatroomRef.key;

          const userFriends = user.friends || [];
          //join myself to this user friend list
          update(ref(database, `users/${user.username}`), {
            friends: [
              ...userFriends,
              {
                username: myData.username,
                avatar: myData.avatar,
                chatroomId: newChatroomId,
              },
            ],
          });

          const myFriends = myData.friends || [];
          //add this user to my friend list
          update(ref(database, `users/${myData.username}`), {
            friends: [
              ...myFriends,
              {
                username: user.username,
                avatar: user.avatar,
                chatroomId: newChatroomId,
              },
            ],
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const onBack = () => {
      setCurrentPage("users");
    };

    switch (currentPage) {
      case "users":
        return (
          <Users
            users={users}
            onClickUser={onClickUser}
            userToAdd={userToAdd}
            setUserToAdd={setUserToAdd}
            onAddFriend={onAddFriend}
          />
        );
      case "chat":
        return (
          <Chat myData={myData} selectedUser={selectedUser} onBack={onBack} />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <button onClick={AbrirChat}>Abrir chatttttttt</button>
    </div>
  );
}
