import Switch from './Switch.js';

const App = ( ) => {

  const [switchOn, setSwitchOn] = React.useState(false);
  const [switchOn2, setSwitchOn2] = React.useState(true);
  const [switchOn3, setSwitchOn3] = React.useState(false);

return (
 <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <Switch on={switchOn} onChange={setSwitchOn} />
          <p>Default off</p>
          <Switch on={switchOn2} onChange={setSwitchOn2} />
          <p>Default on</p>
          <Switch on={switchOn3} onChange={setSwitchOn3} disabled />
          <p>Disabled</p>
        </div>
);
}
export default App;
