import {View, TextInput, StyleSheet, Modal, Text} from 'react-native';
import {useEffect, useState} from 'react';
import useExpensesStore from "@/store/expenseStore";
import {Colors} from "@/constants/Colors";
import MyButton from "@/components/MyButton";
import {Expense} from "@/interfaces/expense";
import RNDateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";

export function ExpenseModal({visible}: { visible: boolean }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const addExpense = useExpensesStore((state) => state.addExpense);
    const editExpenseDetails = useExpensesStore((state) => state.editExpenseDetails);
    const hideModal = useExpensesStore((state) => state.hideModal);
    const expenseEdited = useExpensesStore((state) => state.expenseBeingEdited);

    useEffect(() => {
        if (expenseEdited) {
            setName(expenseEdited.name);
            setAmount(expenseEdited.amount.toString());
            setDate(new Date(expenseEdited.date));
        } else {
            setName('');
            setAmount('');
            setDate(new Date());
        }
    }, [expenseEdited]);

    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
    }

    const handleSubmit = (): void => {
        if (!name || !amount) {
            return;
        }

        const nameIsValid = name.trim().length > 0;

        const amountIsValid = !isNaN(parseFloat(amount)) && parseFloat(amount) >= 0;

        const dateIsValid = !isNaN(date.getTime());

        if (!nameIsValid || !amountIsValid || !dateIsValid) {
            // show feedback
            return;
        }

        const expense: Expense = {
            id: expenseEdited ? expenseEdited.id : generateId(),
            name: name,
            amount: parseFloat(amount),
            date: date.toISOString(),
        } as Expense;

        if (expenseEdited) {
            editExpenseDetails(expense);
        } else {
            addExpense(expense);
        }

        setName('');
        setAmount('');
        setDate(new Date());

        hideModal();
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setIsDatePickerVisible(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <Modal visible={visible} animationType={"slide"}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderTitle}>{expenseEdited ? 'Edit expense' : 'Add Expense'}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Your expense</Text>
                <View style={styles.topRowInputs}>
                    <TextInput
                        placeholder="Amount"
                        inputMode={"decimal"}
                        value={amount}
                        onChangeText={setAmount}
                        style={styles.topRowInput}
                    />
                    <TextInput
                        placeholder="Date"
                        value={date.toDateString()}
                        style={styles.topRowInput}
                        onPress={() => setIsDatePickerVisible(true)}
                    />
                </View>
                <TextInput
                    placeholder="Name"
                    multiline={true}
                    value={name}
                    onChangeText={setName}
                    style={styles.inputMultiLines}
                />
                {isDatePickerVisible && (
                    <RNDateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <View style={styles.buttonContainer}>
                    <MyButton
                        label="Cancel"
                        addedStyles={{backgroundColor: Colors.dark.background}}
                        onPress={hideModal}
                    />
                    <MyButton
                        label={expenseEdited ? 'Edit' : 'Add'}
                        addedStyles={{backgroundColor: Colors.dark.backgroundLighter}}
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalHeader: {
        backgroundColor: Colors.dark.backgroundLighter,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalHeaderTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        paddingVertical: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
        paddingTop: 100,
    },
    inputMultiLines: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: Colors.dark.backgroundTertiary,
        padding: 8,
        margin: 8,
        borderRadius: 8,
        width: '95%',
        minHeight: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginTop: 16,
        marginBottom: 100,
    },
    topRowInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topRowInput: {
        backgroundColor: Colors.dark.backgroundTertiary,
        padding: 8,
        margin: 8,
        borderRadius: 8,
        width: '45%',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    }
});
