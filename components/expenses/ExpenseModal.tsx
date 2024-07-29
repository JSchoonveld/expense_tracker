import {View, TextInput, StyleSheet, Modal, Text} from 'react-native';
import {useEffect, useState} from 'react';
import useExpensesStore from "@/store/expenseStore";
import {Colors} from "@/constants/Colors";
import MyButton from "@/components/MyButton";
import {Expense} from "@/interfaces/expense";
import RNDateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";


interface ExpenseModalProps {
    visible: boolean;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({ visible }) => {
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const addExpense = useExpensesStore((state) => state.addExpense);
    const editExpenseDetails = useExpensesStore((state) => state.editExpenseDetails);
    const hideModal = useExpensesStore((state) => state.hideModal);
    const expenseEdited = useExpensesStore((state) => state.expenseBeingEdited);

    const [inputValues, setInputValues] = useState({
        amount: { value: expenseEdited?.amount ?? 0, isValid: true },
        name: { value: expenseEdited?.name ?? '', isValid: true },
        date: { value: expenseEdited ? new Date(expenseEdited.date) : new Date(), isValid: true },
    });

    useEffect(() => {
        if (expenseEdited) {
            setInputValues({
                amount: { value: expenseEdited.amount, isValid: true },
                name: { value: expenseEdited.name, isValid: true },
                date: { value: new Date(expenseEdited.date), isValid: true },
            });
        } else {
            setInputValues({
                amount: { value: 0, isValid: true },
                name: { value: '', isValid: true },
                date: { value: new Date(), isValid: true },
            });
        }
    }, [expenseEdited]);

    const closeModal = () => {
        setInputValues({
            amount: { value: 0, isValid: true },
            name: { value: '', isValid: true },
            date: { value: new Date(), isValid: true },
        });
        hideModal();
    };

    const generateId = (): string => {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
    };

    const handleSubmit = (): void => {
        const { name, amount, date } = inputValues;

        if (!name.value || !amount.value) {
            return;
        }

        const nameIsValid = name.value.trim().length > 0;
        const amountIsValid = amount.value > 0 && !isNaN(amount.value);
        const dateIsValid = !isNaN(date.value.getTime());

        if (!nameIsValid || !amountIsValid || !dateIsValid) {
            setInputValues((prevValues) => ({
                ...prevValues,
                name: { ...prevValues.name, isValid: nameIsValid },
                amount: { ...prevValues.amount, isValid: amountIsValid },
                date: { ...prevValues.date, isValid: dateIsValid },
            }));
            return;
        }

        const expense: Expense = {
            id: expenseEdited ? expenseEdited.id : generateId(),
            name: name.value,
            amount: parseFloat(String(amount.value)),
            date: date.value.toISOString(),
        };

        if (expenseEdited) {
            editExpenseDetails(expense);
        } else {
            addExpense(expense);
        }

        closeModal();
    };

    const inputChangeHandler = (key: string, value: string) => {
        let isValid = false;

        if (key === 'name') {
            isValid = value.trim().length > 0;
        } else if (key === 'amount') {
            const amountValue = parseFloat(value);
            isValid = !isNaN(amountValue) && amountValue > 0;
        }

        setInputValues((prevValues) => ({
            ...prevValues,
            [key]: { value: value, isValid: isValid },
        }));
    };

    const formIsInvalid: boolean = !inputValues.name.isValid || !inputValues.amount.isValid || !inputValues.date.isValid;

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setIsDatePickerVisible(false);
        if (selectedDate) {
            setInputValues((prevValues) => ({
                ...prevValues,
                date: { value: selectedDate, isValid: true },
            }));
        }
    };

    return (
        <Modal visible={visible} animationType="fade">
            <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderTitle}>{expenseEdited ? 'Edit Expense' : 'Add Expense'}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Your Expense</Text>
                <View style={styles.topRowInputs}>
                    <TextInput
                        placeholder="Amount"
                        inputMode="decimal"
                        value={inputValues.amount.value.toString()}
                        onChangeText={(text) => inputChangeHandler('amount', text)}
                        style={styles.topRowInput}
                    />
                    <TextInput
                        placeholder="Date"
                        value={inputValues.date.value.toDateString()}
                        style={styles.topRowInput}
                        onFocus={() => setIsDatePickerVisible(true)}
                    />
                </View>
                <TextInput
                    placeholder="Name"
                    multiline={true}
                    value={inputValues.name.value}
                    onChangeText={(text) => inputChangeHandler('name', text)}
                    style={styles.inputMultiLines}
                />
                {isDatePickerVisible && (
                    <RNDateTimePicker
                        value={inputValues.date.value}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                {formIsInvalid && (
                    <Text style={styles.errorText}>Please fill in all fields</Text>
                )}
                <View style={styles.buttonContainer}>
                    <MyButton
                        label="Cancel"
                        addedStyles={{ backgroundColor: Colors.dark.background }}
                        onPress={closeModal}
                    />
                    <MyButton
                        label={expenseEdited ? 'Edit' : 'Add'}
                        addedStyles={{ backgroundColor: Colors.dark.backgroundLighter }}
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </Modal>
    );
};

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
    },
    errorText: {
        color: 'red',
    },
});
