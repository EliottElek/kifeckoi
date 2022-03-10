import AdvancedNavBarItem from './AdvancedNavBarItem.js';
import DropDownMenu from './DropDownMenu.js';
import { ReactComponent as BellIcon } from "./assets/icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./assets/icons/messenger.svg";
import { ReactComponent as PlusIcon } from "./assets/icons/plus.svg";

const App = ( ) => (

<div style={{ position: "relative", display: "flex" }}>
          <AdvancedNavBarItem icon={<PlusIcon />}>
            <DropDownMenu />
          </AdvancedNavBarItem>
          <AdvancedNavBarItem icon={<BellIcon />} />
          <AdvancedNavBarItem icon={<MessengerIcon />}>
            <DropDownMenu />
          </AdvancedNavBarItem>
        </div>

)
export default App;
