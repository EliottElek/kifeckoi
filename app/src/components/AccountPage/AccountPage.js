import React from "react";
import InputText from "../../materials/InputText/InputText";
import Button from "../../materials/Button/Button";
import { CREATE_USER } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { Context } from "../Context/Context";
import { useQuery } from "@apollo/client";
//to get all clients
import { GET_ALL_USERS } from "../../graphql/queries";
const AccountPage = () => {
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { users, setUsers } = React.useContext(Context);
  const [createUser, { error }] = useMutation(CREATE_USER);

  const { data } = useQuery(GET_ALL_USERS);
  if (data) setUsers(data.getAllUsers);
  const onSubmit = () => {
    try {
      createUser({
        variables: { name: name, username: username, password: password },
      });
      setUsers([
        ...users,
        { name: name, username: username, password: password },
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: 30,
      }}
    >
      <InputText
        placeHolder={"Entrez le nom..."}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputText
        placeHolder={"Entrez le pseudo..."}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputText
        placeHolder={"Entrez le mot de passe..."}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{error?.message}</p>
      <Button style={{ width: "220px" }} onClick={onSubmit}>
        Créer le compte
      </Button>
      {users &&
        users.map((user) => <p style={{ color: "white" }}>{user.username}</p>)}
    </div>
  );
};

export default AccountPage;
