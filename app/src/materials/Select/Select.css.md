@import "../constants.scss";

.select {
  position: relative;
  user-select: none;
  max-width: 100%;
}
.select .select_button_label {
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 4px;
  background: #fefefe;
  border: solid 1px rgba(0, 0, 0, 0.06);
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select .select_content {
  z-index: 2;
  position: absolute;
  max-width: 100%;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 4px;
  top: 110%;
  left: 0;
  padding: 10px;
  background: #fff;
  font-weight: 500;
  width: 95%;
  color: #333;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  margin-bottom: 100px !important;
}
.gg-chevron-down,
.gg-chevron-up {
  color: var(--main-color);
}
