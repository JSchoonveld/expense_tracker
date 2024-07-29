import {StyleSheet, Text, View} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import {useNavigation} from "expo-router";
import {useLayoutEffect} from "react";
import {ExpenseList} from "@/components/expenses/ExpenseList";
import {ExpenseSummary} from "@/components/expenses/ExpenseSummary";
import useExpensesStore from "@/store/expenseStore";
import {ExpenseModal} from "@/components/expenses/ExpenseModal";
import {Expense} from "@/interfaces/expense";

export default function TabTwoScreen() {
  const navigation = useNavigation();

  const expenses = useExpensesStore((state) => state.expenses);
  const modalIsVisible = useExpensesStore((state) => state.modalIsVisible);

  const thisWeeksExpenses: Expense[] = expenses.filter((expense: Expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    return expenseDate >= oneWeekAgo && expenseDate <= today;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recent expenses',
    });
  }, [navigation]);

  return (
      <ThemedView style={styles.container}>
        <ExpenseModal visible={modalIsVisible}/>

        <ExpenseSummary weekly={true}/>

        {thisWeeksExpenses.length > 0 ? (
          <ExpenseList items={thisWeeksExpenses}/>
        ) : (
          <View style={styles.container}>
            <Text style={styles.text}>No expenses this week</Text>
          </View>
        )}

      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  }
});
