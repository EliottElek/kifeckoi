import TableRow from "./TableRow";
import TableHeadItem from "./TableHeadItem";
import Progress from "../Progress/Progress";
const Table = ({ theadData, customClass, data }) => {
  if (!data) return <Progress />;

  return (
    <table className={customClass}>
      <thead>
        <tr>
          {theadData.map((h, i) => {
            return <TableHeadItem key={i} item={h} />;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => {
          return <TableRow key={i} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
