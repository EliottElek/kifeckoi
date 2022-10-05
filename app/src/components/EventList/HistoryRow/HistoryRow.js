import React from "react";
import { TableRow, TableCell, Avatar } from "@mui/material";
import formatDate from "../../../assets/functions/formatDate";
import PeriodSelect from "./PeriodSelect/PeriodSelect";
import RenderHtml from "../../../assets/RenderHtml";
import AutoTextArea from "../AutoTextArea";
import "../../EventList/EventTable.scss";
const styles = {
  row: {
    textDecoration: "none",
    color: "var(--font-color)",
    borderColor: "var(--border-color)",
  },
};
const HistoryRow = ({ row, comment }) => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <TableRow>
      <TableCell component="th" scope="row" sx={styles.row}>
        {row.status}
      </TableCell>
      <TableCell sx={styles.row}>
        <PeriodSelect defaultValue={row.period} />
      </TableCell>
      <TableCell sx={styles.row} align="left" onClick={() => setEditMode(true)}>
        {editMode ? (
          <AutoTextArea
            setModifMode={setEditMode}
            defaultValue={comment.content}
          />
        ) : (
          <span className="history__row__area">
            <RenderHtml>{comment.content}</RenderHtml>
          </span>
        )}
      </TableCell>
      <TableCell sx={styles.row} align="right">
        {formatDate(comment.creation)}
      </TableCell>
      <TableCell sx={styles.row} align="right">
        <Avatar sx={{ width: 22, height: 22 }} src={comment.author.avatarUrl} />
      </TableCell>
    </TableRow>
  );
};

export default HistoryRow;
