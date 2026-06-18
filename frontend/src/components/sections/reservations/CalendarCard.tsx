interface CalendarProps {
  onDateChange: (date: string) => void;
}

function CalendarCard({ onDateChange }: CalendarProps) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Selecciona una fecha</h5>
          <input
            type="date"
            className="form-control"
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default CalendarCard;
