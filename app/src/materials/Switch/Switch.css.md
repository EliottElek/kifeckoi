@import "../constants.scss";

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  z-index: 1;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

input:checked + .slider {
  background-color: var(--main-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--main-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(22px);
  -ms-transform: translateX(22px);
  transform: translateX(22px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.switch_disabled_bar {
  height: 3px;
  width : 50px;
  border-radius: 2px;
  background-color: rgba(0,0,0,0.3);
  z-index: 2;
  display: non;
  transform: rotate(40deg) translate(-10%, -150%);
}
.disabled{
  cursor:default;
}