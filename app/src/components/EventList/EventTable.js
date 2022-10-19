import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useFindEventsByProjectId } from "../../hooks/queries/event";
import { Context } from "../Context/Context";
import RenderHtml from "../../assets/RenderHtml";
import { MenuItem, Menu, CircularProgress } from "@mui/material";
import getPeriod from "../../assets/functions/getPeriod";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./EventTable.scss";
import {
  useDeleteMultipleEvents,
  useChangeEventState,
} from "../../hooks/mutations/event";
import Button from "../../materials/Button/Button";
import { toast } from "react-toastify";
import Modal from "../../materials/Modal/Modal";
import { MdOutlineClear } from "react-icons/md";
import HistoryRow from "./HistoryRow/HistoryRow";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const styles = {
  row: {
    textDecoration: "none",
    color: "var(--font-color)",
    borderColor: "var(--border-color)",
  },
};
const headCells = [
  {
    id: "Période",
    numeric: false,
    disablePadding: true,
    label: "Période",
  },
  {
    id: "Description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "Contributeurs",
    numeric: true,
    disablePadding: false,
    label: "Contributeurs",
  },
  {
    id: "Status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "État",
    numeric: true,
    disablePadding: false,
    label: "État",
  },
];
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { currentProject } = React.useContext(Context);
  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        aria-checked={props.isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={props.isItemSelected}
        style={styles.row}
      >
        <TableCell
          padding="checkbox"
          onClick={(event) =>
            props.selectMode && props.handleClick(event, row.id)
          }
          sx={{
            color: "var(--font-color)",
            borderColor: "var(--border-color)",
          }}
        >
          {props.selectMode ? (
            <Checkbox
              disableRipple
              color="primary"
              sx={{
                color: "var(--main-color)",
                "&.Mui-checked": {
                  color: "var(--main-color)",
                },
              }}
              checked={props.isItemSelected}
            />
          ) : (
            <IconButton
              aria-label="expand row"
              size="small"
              sx={{ color: "var(--font-color)" }}
              disableRipple
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell
          component={NavLink}
          style={styles.row}
          to={`/project/${currentProject.id}/${row.type.toLowerCase()}/${
            row.id
          }?display=list`}
          id={row.id}
          scope="row"
          padding="none"
          align="left"
        >
          <span
            className={`card__icon__table ${
              row.period === getPeriod()
                ? "current__period__table"
                : "previous__period__table"
            }`}
          >
            {row.period}
          </span>
        </TableCell>
        <TableCell
          component={NavLink}
          style={styles.row}
          to={`/project/${currentProject.id}/${row.type.toLowerCase()}/${
            row.id
          }?display=list`}
          align="left"
        >
          <RenderHtml>{row.description}</RenderHtml>
        </TableCell>
        <TableCell
          component={NavLink}
          style={styles.row}
          to={`/project/${currentProject.id}/${row.type.toLowerCase()}/${
            row.id
          }?display=list`}
          align="center"
        >
          {"none"}
        </TableCell>
        <TableCell
          component={NavLink}
          style={styles.row}
          to={`/project/${currentProject.id}/${row.type.toLowerCase()}/${
            row.id
          }?display=list`}
          align="right"
        >
          {row.status}
        </TableCell>
        <TableCell
          component={NavLink}
          style={styles.row}
          to={`/project/${currentProject.id}/${row.type.toLowerCase()}/${
            row.id
          }?display=list`}
          align="right"
        >
          {row.state === "" ? (
            <span style={{ fontStyle: "italic" }}>Neutre</span>
          ) : (
            row.state
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "var(--font-color)", fontSize: "1.1rem" }}
              >
                Historique
              </Typography>
              <Table size="small" aria-label="history">
                <TableBody>
                  {row.comments.map((comment) => (
                    <HistoryRow comment={comment} row={row} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{
            backgroundColor: "var(--header-background)",
            color: "var(--font-color)",
            borderColor: "var(--border-color)",
          }}
        >
          <Checkbox
            disableRipple
            sx={{
              color: "var(--main-color)",
              "&.Mui-checked": {
                color: "var(--main-color)",
              },
              "&.MuiCheckbox-root.MuiCheckbox-indeterminate": {
                color: "var(--main-color)",
              },
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{
              backgroundColor: "var(--header-background)",
              color: "var(--font-color)",
              borderColor: "var(--border-color)",
              "& *": {
                color: "var(--font-color)",
              },
              "& *:hover": {
                color: "var(--font-color)",
              },
            }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ color: "var(--font-color)" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopUp = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: "var(--background1)",
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selectionné(s)
            <Tooltip title={`Supprimer ${numSelected} évènement(s)`}>
              <IconButton
                disableRipple
                onClick={() => props.setOpenDeleteModal(true)}
                sx={{ color: "var(--font-color)" }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Plus d'actions">
              <IconButton
                disableRipple
                onClick={handleClick}
                sx={{ color: "var(--font-color)" }}
              >
                <ExpandCircleDownIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Évènements
        </Typography>
      )}
      {numSelected === 0 && (
        <Tooltip title="Filter list">
          <IconButton disableRipple sx={{ color: "var(--font-color)" }}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        anchorEl={anchorEl}
        open={openPopUp}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            props.changeStateSelectedEvents("Vérifié");
          }}
        >
          <span>Passer en "Vérifié"</span>
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={() => {
            props.changeStateSelectedEvents("À vérifier");
          }}
        >
          <span>Passer en "À vérifier"</span>
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={() => {
            props.changeStateSelectedEvents("");
          }}
        >
          <span>Passer en "Neutre"</span>
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ type }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const location = useLocation();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const deleteMultipleEvents = useDeleteMultipleEvents();
  const changeEventState = useChangeEventState();
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const { id } = useParams();
  const { eventsData, setEventsData } = React.useContext(Context);
  const findEventsByProjectId = useFindEventsByProjectId({
    variables: { id: id, type: type },
    onCompleted: (data) => {
      setEventsData(data.findEventsByProjectId);
    },
  });
  React.useEffect(() => {
    if (findEventsByProjectId) {
      findEventsByProjectId.refetch();
    }
  }, [location, findEventsByProjectId]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = eventsData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  //needs to be fixed, cannot do a for each here
  const changeStateSelectedEvents = async (newState) => {
    try {
      for (let i = 0; i < selected.length; i++) {
        await changeEventState({
          variables: {
            eventId: selected[i],
            newState: newState,
          },
        });
      }
      toast.success(
        `${selected.length} évènements passés en "${
          newState === "" ? "neutre" : newState
        }".`,
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
      setSelected([]);
    } catch (err) {
      toast.warning(`Une erreur est surevenue.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    findEventsByProjectId.refetch();
  };
  const handleDeleteSelectedEvents = async (e) => {
    try {
      const response = await deleteMultipleEvents({
        variables: {
          eventIds: selected,
        },
      });
      setSelected([]);
      toast(`${response.data.deleteMultipleEvents.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      toast.error(
        "Impossible de supprimer ces évènements. Réessayez plus tard.",
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
    }
    findEventsByProjectId.refetch();
    setOpenDeleteModal(false);
  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - eventsData.length) : 0;

  if (!eventsData)
    return <CircularProgress sx={{ color: "var(--main-color)" }} />;
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          mb: 0,
          backgroundColor: "var(--background1)",
          color: "var(--font-color)",
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          changeStateSelectedEvents={changeStateSelectedEvents}
          setOpenDeleteModal={setOpenDeleteModal}
        />
        <TableContainer>
          <Table
            stickyHeader
            sx={{ backgroundColor: "var(--background1)" }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={eventsData.length}
            />
            <TableBody>
              {stableSort(eventsData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Row
                      handleClick={handleClick}
                      key={row.id}
                      row={row}
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            color: "var(--font-color)",
            "& *": {
              color: "var(--font-color)",
            },
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={eventsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <div
          className="modal__content__container space__between"
          style={{ width: "95%" }}
        >
          <button
            data-tip
            data-for="closeTooltip"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDeleteModal(false);
            }}
            className="close__modal__button"
          >
            <MdOutlineClear />
          </button>
          <div>
            <h3>
              Êtes-vous sûr(e) de vouloir supprimer {selected.length}{" "}
              évènement(s) ?
            </h3>
            {selected.length === 1 ? (
              <p>L'évènement suivant sera supprimé :</p>
            ) : (
              <p>
                Les {selected.length} évènement(s) suivants seront supprimés :
              </p>
            )}
            <ul
              style={{
                margin: "20px",
              }}
            >
              {selected.map((eve) => (
                <li
                  style={{
                    listStyle: "inside",
                  }}
                  key={eve}
                >
                  id : {eve}
                </li>
              ))}
            </ul>
            <p>La suppression sera définitive. </p>
          </div>
          <div
            className={"delete__actions__container"}
            style={{ position: "sticky", bottom: "12px" }}
          >
            <Button
              reversed
              onClick={() => {
                setOpenDeleteModal(false);
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleDeleteSelectedEvents}>Supprimer</Button>
          </div>
        </div>
      </Modal>
    </Box>
  );
}
