@import "../constants.scss";
.loader-large {
  margin: 3px;
  border: 5.5px solid var(--second-bg-color);
  border-top: 5.5px solid var(--main-color);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  animation: spin var(--speed) linear infinite;
}
.loader-medium {
  margin: 3px;
  border: 4.5px solid var(--second-bg-color);
  border-top: 4.5px solid var(--main-color);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  animation: spin var(--speed) linear infinite;
}
.loader-small {
  margin: 3px;
  border: 3.5px solid var(--second-bg-color);
  border-top: 3.5px solid var(--main-color);
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: spin var(--speed) linear infinite;
}
.reversed {
  border-top: 3.5px solid var(--main-color);
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
