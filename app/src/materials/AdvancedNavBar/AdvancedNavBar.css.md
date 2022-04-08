@import "../constants.scss";

.button__versed {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--main-color);
  color: var(--main-color);
  border: solid 1px var(--main-color);
  outline: none;
  min-width: 140px;
  min-height: 40px;
  border-radius: 5px;
  padding-left : 8px;
  padding-right : 8px;
  cursor: pointer;
  transition: 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.button__reversed {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--main-color);
  color: var(--main-color);
  border: solid 1px var(--main-color);
  outline: none;
  min-width: 140px;
  min-height: 40px;
  border-radius: 5px;
  padding-left : 8px;
  padding-right : 8px;
  cursor: pointer;
  transition: 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button__versed:hover {
  border: solid 1px var(--main-color);
  transition: 0.2s ease-in;
}
.button__reversed:hover {
  border: solid 1px var(--main-color);
  transition: 0.2s ease-out;
}
