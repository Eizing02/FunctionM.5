import type { TableRow } from "../utils/mathHelpers";
import { formatNumber } from "../utils/mathHelpers";

type ValueTableProps = {
  rows: TableRow[];
  hint?: string;
};

function ValueTable({ rows, hint = "x = -3 ถึง 3" }: ValueTableProps) {
  return (
    <section className="value-table-card">
      <div className="table-heading">
        <h3>ตารางค่า</h3>
        <span>{hint}</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>x</th>
              <th>f(x)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.x}>
                <td>{row.x}</td>
                <td>{row.y === null ? "ไม่กำหนด" : formatNumber(row.y)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ValueTable;
