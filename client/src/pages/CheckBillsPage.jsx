import { useEffect, useState } from "react";
import BillCard from "../components/BillCard";
import FilterBar from "../components/FilterBar";

function CheckStatsPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    itemSearch: "",
    term: "",
    approaches: [],
  });

  useEffect(() => {
    fetch("http://localhost:5556/bills", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setBills(data))
      .catch((err) => setError("Failed to load bills"))
      .finally(() => setLoading(false));
  }, []);

  function handleBillUpdate(updatedBill) {
    setBills((prevBills) =>
      prevBills.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill))
    );
  }

  function handleBillDelete(deletedBillId) {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== deletedBillId));
  }

  function billMatchesFilters(bill) {
    const matchesItemSearch =
      !filters.itemSearch ||
      bill.items.some((item) =>
        item.item_name.toLowerCase().includes(filters.itemSearch.toLowerCase())
      );

    const matchesTerm =
      !filters.term ||
      bill.items.some((item) =>
        item.interactions.some((interaction) =>
          interaction.terms.some((t) => t.term === filters.term)
        )
      );

    const matchesApproach =
      filters.approaches.length === 0 ||
      bill.items.some((item) =>
        item.interactions.some((interaction) =>
          filters.approaches.includes(interaction.approach)
        )
      );

    return matchesItemSearch && matchesTerm && matchesApproach;
  }

  const filteredBills = bills.filter(billMatchesFilters);

  if (loading) return <p>Loading bills...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="check-stats-page">
      <h2>Check Stats</h2>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      {filteredBills.length === 0 ? (
        <p>No bills match your filters.</p>
      ) : (
        filteredBills.map((bill) => (
          <BillCard
            key={bill.id}
            bill={bill}
            onUpdate={handleBillUpdate}
            onDelete={handleBillDelete}
          />
        ))
      )}
    </div>
  );
}

export default CheckStatsPage;
