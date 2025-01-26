class Todo {
    id: string;
    title: string;
    constructor(title: string) {
        this.id = new Date().toISOString();
        this.title = title;
    }
}
export default Todo;