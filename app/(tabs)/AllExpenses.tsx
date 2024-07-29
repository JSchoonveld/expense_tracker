import {StyleSheet, Text, View} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import {useNavigation} from "expo-router";
import {useLayoutEffect} from "react";
import {ExpenseList} from "@/components/expenses/ExpenseList";
import {ExpenseSummary} from "@/components/expenses/ExpenseSummary";
import useExpensesStore from "@/store/expenseStore";

export default function TabTwoScreen() {
    const navigation = useNavigation();

    const expenses = useExpensesStore((state) => state.expenses);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'All expenses',
        });
    }, [navigation]);

    return (
        <ThemedView style={styles.container}>
            <ExpenseSummary />

            {expenses.length > 0 ? (
                <ExpenseList items={expenses}/>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.text}>No expenses so far</Text>
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
