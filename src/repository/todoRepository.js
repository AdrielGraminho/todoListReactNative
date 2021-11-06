import { stringLiteral } from "@babel/types";
import Realm from "realm";
export const TODO_SCHEMA = "Todo";

export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: {type: 'string', indexed: true},
    }
};
const databaseOptions = {
    path: 'todoApp.realm',
    schema: [TodoSchema],
    schemaVersion: 0,
}
export const insertNewTodo = newTodo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODO_SCHEMA, newTodo);
            resolve(newTodo);
        })
    }).catch((error) => {
        console.log("Api call error");
        reject(error)
    });
});
export const deleteTodo = todoId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingTodo = realm.objectForPrimaryKey(TODO_SCHEMA, todoId);
            realm.delete(deletingTodo);
            resolve();
        });
    }).catch((error) => reject(error));;
});
export const deleteAllTodo = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodo = realm.objects(TODO_SCHEMA);
            realm.delete(allTodo);
            resolve();
        });
    }).catch((error) => reject(error));;
});
export const queryAllTodo = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodo = realm.objects(TODO_SCHEMA);
            resolve(allTodo);
        });
    }).catch((error) => reject(error));;
});
export default new Realm(databaseOptions);