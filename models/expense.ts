export default class ExpenseModel {
    constructor(
        public name: string,
        public amount: number,
        public date: string
    ) {
        this.name = name;
        this.amount = amount;
        this.date = date;
    }
}