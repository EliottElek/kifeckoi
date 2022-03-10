import CheckBox from './CheckBox.js';

const App = ( ) => {

  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

return (
 <>
          <CheckBox
            rounded
            style={{ margin: 7 }}
            checked={checked}
            setChecked={setChecked}
          >
            {checked ? "Checked (rounded)" : "unChecked (rounded)"}
          </CheckBox>
          <CheckBox
            style={{ margin: 7 }}
            checked={checked2}
            setChecked={setChecked2}
          >
            {checked2 ? "Checked (square)" : "unChecked (square)"}
          </CheckBox>
  </>
);
}
export default App;
