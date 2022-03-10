import Progress from './Progress.js';

const App = ( ) => {

  const [selected, setSelected] = React.useState();
  const [selected2, setSelected2] = React.useState();

  const [isActive, setIsActive] = React.useState(false);
  const [isActive2, setIsActive2] = React.useState(false);
  return (
     <>
          <Select
            defaultLabel="select one"
            style={{ margin: "4px" }}
            label={selected?.name}
            width={400}
            height={10}
            isActive={isActive}
            setIsActive={setIsActive}
          >
            {array.map((item, i) => (
              <SelectItem
                key={i}
                onClick={() => {
                  setSelected(item);
                  setIsActive(false);
                }}
              >
                {item.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            defaultLabel="select one"
            label={selected2?.name}
            style={{ margin: "4px" }}
            width={400}
            height={10}
            isActive={isActive2}
            setIsActive={setIsActive2}
          >
            {array.map((item, i) => (
              <SelectItem
                key={i}
                onClick={() => {
                  setSelected2(item);
                  setIsActive2(false);
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item.name}
                </div>
              </SelectItem>
            ))}
          </Select>
          </>

);
}
export default App;
