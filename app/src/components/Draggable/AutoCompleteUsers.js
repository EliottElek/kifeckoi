import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/queries";
import Select from "react-select";

const AutoCompleteUsers = ({ setSelectedAccountables }) => {
  const customStyles = {
    option: (base, state) => ({
      ...base,
      color: "#1e2022",
      padding: ".5rem 3rem .5rem .5rem",
      cursor: "pointer",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  const { data } = useQuery(GET_ALL_USERS);
  const [accountables, setAccountables] = React.useState([]);

  React.useEffect(() => {
    if (data?.getAllUsers) {
      var newUsers = data?.getAllUsers;
      const finalUsers = newUsers.map((user) => ({
        ...user,
        label: user.username,
        value: user.username,
      }));
      console.log(finalUsers);
      setAccountables(finalUsers);
    }
  }, [setAccountables, data?.getAllUsers]);
  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      placeholder="Selectionnez le(s) responsable(s)..."
      styles={customStyles}
      openMenuOnClick={(e) => e.stopPropagation()}
      onChange={(selectedOptions) => {
        setSelectedAccountables(selectedOptions);
      }}
      options={accountables}
    />
  );
};

export default AutoCompleteUsers;
