import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../../contexts/BudgetContext'
import BudgetCard from '../BudgetCard/BudgetCard'

function UncategorizedBudgetCard(props){
    const {getBudgetExpenses} = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total,expense)=> total + expense.amount, 0)
    if(amount === 0)return null
    return(
       <BudgetCard gray amount={amount} name='Uncategorized'{...props} ></BudgetCard>)}

export default UncategorizedBudgetCard;