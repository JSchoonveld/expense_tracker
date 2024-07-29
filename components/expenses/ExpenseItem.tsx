import {StyleSheet, View, Text, Pressable, Alert, Platform} from "react-native";
import {Expense} from "@/interfaces/expense";
import {Colors} from "@/constants/Colors";
import useExpensesStore from "@/store/expenseStore";
import {Swipeable} from "react-native-gesture-handler";
import {FontAwesome} from "@expo/vector-icons";

export function ExpenseItem({item}: { item: Expense }) {
    const edit = useExpensesStore((state) => state.editExpense);
    const deleteExpense = useExpensesStore((state) => state.deleteExpense);

    const date: Date = new Date(item.date);

    function editExpense() {
        edit(item);
    }

    function onDelete(id: string) {
        Alert.alert(
            'Delete Confirmation',
            'Are you sure you want to delete this expense?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => deleteExpense(item) },
            ],
            { cancelable: false }
        );
    }

    const renderLeftActions = () => {
        return (
            <View style={styles.deleteButton}>
                <FontAwesome onPress={() => onDelete(item.id)} size={28} name="trash" color={"white"} />
            </View>
        );
    };

    const renderRightActions = () => {
        return (
            <View style={styles.archiveButton}>
                <FontAwesome onPress={() => onDelete(item.id)} size={28} name="folder" color={"white"} />
            </View>
        );
    };

    return (
        <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>
            <View style={styles.expenseItemContainer}>
                <Pressable android_ripple={{color: '#ccc'}} style={({pressed}) => [pressed ? styles.expensePressed : null]} onPress={editExpense}>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.date}>{date.toLocaleDateString('nl-NL')}</Text>
                        </View>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amount}>{item.amount}</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    expenseItemContainer: {
        borderRadius: 8,
        backgroundColor: Colors.dark.backgroundLighter,
        overflow: Platform.select({android: 'hidden', ios: 'visible'}),
        marginVertical: 8,
        minWidth: 300,
    },
    expensePressed: {
      opacity: 0.5,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    text: {
        color: 'white',
    },
    date: {
        color: 'white',
        fontWeight: 'light',
    },
    amountContainer: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
    },
    amount: {
        color: Colors.dark.backgroundLighter,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 8,
        marginVertical: 8,
    },
    archiveButton: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 8,
        marginVertical: 8,
    },
});