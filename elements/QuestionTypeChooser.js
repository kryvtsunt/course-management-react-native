import React, {Component} from 'react'
import {ButtonGroup} from 'react-native-elements'

export default class QuestionTypeChooser extends Component {
    static navigationOptions = {
        title: 'Create Question'
    };
    constructor() {
        super()
        this.state = {
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {
        const buttons = ['Multiple Choice',
            'Fill in the blank', 'Essay', 'True or\nfalse']

        // const {selectedIndex} = this.state
        return (
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={this.state.selectedIndex}
                buttons={buttons}
                containerStyle={{height: 75}}/>
        )
    }
}