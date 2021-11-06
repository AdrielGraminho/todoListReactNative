import { whileStatement } from "@babel/types";
import React, { useEffect, useState } from "react";
import {SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, TextInput, Pressable} from 'react-native';
import { Header } from "react-native/Libraries/NewAppScreen";
import  {queryAllTodo, deleteTodo, insertNewTodo} from './repository/todoRepository'


export const Home = () => {
    const[newValue, setNewValue] = useState("");
    const [data, setData] = useState([])

      const inserNew = async () => {
        const newTodo = {
          id: await queryAllTodo().then(response => response.max("id") + 1) || 1,
          name: newValue
        }
        insertNewTodo(newTodo).then(() =>{
          getData()
          setNewValue("")
        })
      }

      const handleDelete = (id ) => {
        deleteTodo(id).then(() => {
          getData()
        })
      }
      
      const Item = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item?.name}</Text>
          <View style={styles.actions}>
            <Button title={"Excluir"} color="#E74C3C" onPress={() => handleDelete(item.id)}></Button>
          </View>
        </View>
      );
      
        const renderItem = ({ item }) => (
          <Item item={item} />
        );
      
        const getData = () => {
          queryAllTodo().then(response => setData(response))
        }

        useEffect(() => {
          getData()
        }, [])

        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.addArea}>
                <TextInput onChangeText={setNewValue} value={newValue} style={styles.input} placeholder={"Nova Tarefa"}></TextInput>
                <Pressable style={styles.button} onPress={() => inserNew(newValue)} >
                 <Text style={styles.name}> Adicionar </Text>
                </Pressable>
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        );
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        input: {
            margin: 15,
            fontSize: 20,
            alignSelf: 'center',
        },
        addArea: {
            flexDirection: "column",
        },
        item: {
          backgroundColor: '#008B8B',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          flexDirection: 'row',
          fontSize: 20,
          borderRadius: 10,
        },
        name: {
          maxWidth:220,
          color: 'white',
          fontSize: 20,
        },
        actions: {
          alignSelf: 'center',
          paddingRight: 5,
          textAlign: 'center',
          right:1,
          flexDirection: 'row',
          position: 'absolute',
          fontSize: 20
        },
        button: {
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:"#008B8B",
        }
      });