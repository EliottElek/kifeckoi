import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/queries";
import Select from "react-select";

const AutoCompleteUsers = ({
  setSelectedContributors,
  placeholder,
  multi,
  alreadyExistingContributors,
  users,
}) => {
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
  const [contributors, setContributors] = React.useState([]);

  React.useEffect(() => {
    const setData = () => {
      function objectsEqual(o1, o2) {
        return o1.id === o2.id;
      }

      function subtractArrays(a1, a2) {
        var arr = [];
        if (!a1) return a2;
        if (!a2) return a1;

        a1.forEach((o1) => {
          var found = false;
          a2.forEach((o2) => {
            if (objectsEqual(o1, o2)) {
              found = true;
            }
          });
          if (!found) {
            arr.push(o1);
          }
        });
        return arr;
      }
      if (data?.getAllUsers) {
        var newUsers = [];
        if (!users) newUsers = data?.getAllUsers;
        else newUsers = users;
        const finalUsers = newUsers.map((user) => {
          return {
            ...user,
            label: user.username,
            value: user.username,
          };
        });
        const diff = subtractArrays(finalUsers, alreadyExistingContributors);
        setContributors(diff);
      }
    };
    setData();
  }, [alreadyExistingContributors, data?.getAllUsers, setContributors, users]);
  return (
    <Select
      onFocus={(e) => e.stopPropagation()}
      onCLick={(e) => e.stopPropagation()}
      closeMenuOnSelect={false}
      isMulti={multi ? true : false}
      placeholder={placeholder}
      styles={customStyles}
      openMenuOnClick={(e) => e.stopPropagation()}
      onChange={(selectedOptions) => {
        setSelectedContributors(selectedOptions);
      }}
      options={contributors}
    />
  );
};

export default AutoCompleteUsers;
