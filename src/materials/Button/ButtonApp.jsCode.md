import Progress from './Progress.js';
import Button from './Button.js';

const App = ( ) => (

<div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "5px",
              flexWrap: "wrap",
            }}
          >
            <Button>Normal</Button>
            <Button reversed>Reversed</Button>
            <Button>
              <Progress size={"small"} />
            </Button>
            <Button reversed>
              <Progress size={"small"} reversed />
            </Button>
          </div>
)
export default App;
