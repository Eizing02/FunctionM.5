type FormulaCardProps = {
  formula: string;
  symbolNotes: string[];
};

function FormulaCard({ formula, symbolNotes }: FormulaCardProps) {
  return (
    <section className="formula-card">
      <p className="card-label">สูตรหลัก</p>
      <div className="formula-display">{formula}</div>
      {symbolNotes.length > 0 && (
        <ul className="symbol-list">
          {symbolNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FormulaCard;
