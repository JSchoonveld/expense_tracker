import {StyleSheet, View, Text, FlatList} from "react-native";
import {Expense} from "@/interfaces/expense";
import {EXPENSES} from "@/data/dummy-data";
import {ExpenseItem} from "@/components/expenses/ExpenseItem";

export function ExpenseList({items}: {items: Expense[]}) {
    const renderExpenseItem = ({item}: {item: Expense}) => {
        return (
            <ExpenseItem item={item} />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderExpenseItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});