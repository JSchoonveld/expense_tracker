import {StyleSheet, Text, View, FlatList} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import {useNavigation} from "expo-router";
import {useLayoutEffect, useState} from "react";
import {EXPENSES} from "@/data/dummy-data";
import {ExpenseList} from "@/components/expenses/ExpenseList";
import {ExpenseSummary} from "@/components/expenses/ExpenseSummary";
import useExpensesStore from "@/store/expenseStore";
import {ExpenseModal} from "@/components/expenses/ExpenseModal";

export default function TabTwoScreen() {
    const navigation = useNavigation();

    const expenses = useExpensesStore((state) => state.expenses);
    const modalIsVisible = useExpensesStore((state) => state.modalIsVisible);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'All expenses',
        });
    }, [navigation]);

    return (
        <ThemedView style={styles.container}>
            <ExpenseSummary />

            <ExpenseList items={expenses}/>
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
