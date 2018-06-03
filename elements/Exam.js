import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text} from 'react-native-elements'


export default class Exam extends Component {
 render(){

     const lists = [
         {	title: 'Question 1', subtitle: 'Multiple choice',
             icon: 'list'},
         {	title: 'Question 2', subtitle: 'Fill-in the blanks',
             icon: 'code'},
         {	title: 'Question 3', subtitle: 'True or false',
             icon: 'check'},
         {	title: 'Question 4', subtitle: 'Essay',
             icon: 'subject'}]


     return (
         <View>
             {lists.map((list, i) => (
                 <ListItem
                     key={i}
                     title={list.title}
                     subtitle={list.subtitle}
                     leftIcon={{name: list.icon}}/>
             ))}
         </View>
     )
 }

}