import {StyleSheet, Text, View, FlatList} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import {useNavigation} from "expo-router";
import {useLayoutEffect, useState} from "react";
import {EXPENSES} from "@/data/dummy-data";
import {ExpenseList} from "@/components/expenses/ExpenseList";
import {ExpenseSummary} from "@/components/expenses/ExpenseSummary";
import useExpensesStore from "@/store/expenseStore";
import {ExpenseModal} from "@/components/expenses/ExpenseModal";
import {Expense} from "@/interfaces/expense";

export default function TabTwoScreen() {
  const navigation = useNavigation();

  const expenses = useExpensesStore((state) => state.expenses);
  const modalIsVisible = useExpensesStore((state) => state.modalIsVisible);
  const editExpense = useExpensesStore((state) => state.editExpense);

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

        <ExpenseList items={thisWeeksExpenses}/>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
