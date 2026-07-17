
import { useEffect, useState } from "react";

function CheckStatsPage() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5556/bills", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setBills(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {bills.map((bill) => (
        <div key={bill.id}>
          <p>{bill.total}</p>
          <p>{bill.tip}</p>
          <p>{bill.created_at}</p>
        </div>
      ))}
    </div>
  );
}

export default CheckStatsPage;