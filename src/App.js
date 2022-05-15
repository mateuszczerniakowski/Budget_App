import './App.css';
import { Stack, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from './components/BudgetCard/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal/AddBudgetModal';
import { useState } from 'react';
import { BudgetsProvider, UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';
import AddExpenseModal from './components/AddExpenseModal/AddExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal/ViewExpensesModal';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">My Budget</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal }>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total,expense)=> total + expense.amount, 0)
            return (<BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max} 
              onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
              onViewExpensesClick={()=>setViewExpensesModalBudgetId(budget.id)}
              />)
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpensesClick={()=>setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
          <TotalBudgetCard/>
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal defaultBudgetId={addExpenseModalBudgetId} show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} />
      <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId()} />
    </>
  );
}

export default App;
