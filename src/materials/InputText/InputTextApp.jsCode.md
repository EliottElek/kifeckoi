import InputText from './InputText.js';

const App = ( ) => {

  const [inputValue1, setInputValue1] = React.useState();
  const [inputValue2, setInputValue2] = React.useState();
  
return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "5px",
              flexWrap: "wrap",
            }}
          >
            <InputText
              value={inputValue1}
              label={"Email"}
              onChange={(e) => setInputValue1(e.target.value)}
              placeHolder={"Enter your email..."}
            />
            <InputText
              number
              max={2}
              min={1}
              value={inputValue2}
              label={"Number of employees"}
              onChange={(e) => setInputValue2(e.target.value)}
              placeHolder={"Enter a number..."}
            />
          </div>
);
}
export default App;
