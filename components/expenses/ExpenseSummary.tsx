import { View, Text, StyleSheet } from 'react-native';
import useExpensesStore from '@/store/expenseStore';
import { Expense } from '@/interfaces/expense';
import {Colors} from "@/constants/Colors";

export function ExpenseSummary({ weekly }: { weekly?: boolean }) {
    const expenses = useExpensesStore((state) => state.expenses);

    let total: number = 0;

    if (weekly) {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);

        const thisWeeksExpenses = expenses.filter((expense: Expense) => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= oneWeekAgo && expenseDate <= today;
        });

        total = Number(thisWeeksExpenses.reduce((acc, item) => acc + item.amount, 0).toFixed(2));
    } else {
        total = Number(expenses.reduce((acc, item) => acc + item.amount, 0).toFixed(2));
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Last 7 days</Text>
            </View>
            <View>
                <Text style={styles.total}>€{total}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        flexDirection: 'row',
        minWidth: 300,
        marginHorizontal: 16,
        padding: 16,
        justifyContent: 'space-between',
        borderRadius: 8,
        marginVertical: 8,
    },
    text: {
      color: 'black',
    },
    total: {
        color: Colors.dark.background,
        fontWeight: 'bold',
    },
});