import { create } from 'zustand';
import {EXPENSES} from "@/data/dummy-data";
import {Expense} from "@/interfaces/expense";

type ExpenseStore = {
    expenses: Expense[];
    modalIsVisible: boolean;
    expenseBeingEdited: Expense | null;
    addExpense: (expense: Expense) => void;
    editExpenseDetails: (expense: Expense) => void;
    deleteExpense: (expense: Expense) => void;
    showModal: () => void;
    hideModal: () => void;
    editExpense: (expense: Expense) => void;
};

const initialExpenses: Expense[] = EXPENSES;

const useExpensesStore = create<ExpenseStore>((set) => ({
    expenses: initialExpenses,
    modalIsVisible: false,
    expenseBeingEdited: null,
    addExpense: (expense: Expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
    editExpenseDetails: (expense: Expense) => set((state) => ({ expenses: state.expenses.map((e) => e.id === expense.id ? expense : e) })),
    deleteExpense: (expense: Expense) => set((state) => ({ expenses: state.expenses.filter((e) => e.id !== expense.id) })),
    showModal: () => set((state) => ({ modalIsVisible: true, expenseBeingEdited: null })),
    hideModal: () => set((state) => ({ modalIsVisible: false, expenseBeingEdited: null })),
    editExpense: (expense: Expense) => set((state) => ({ expenseBeingEdited: expense, modalIsVisible: true })),
}));

export default useExpensesStore;
