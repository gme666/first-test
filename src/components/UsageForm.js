import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { usageUpdate } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class UsageForm extends Component {
  constructor(props) {
    super(props);

    this.state = { usage: '' };
  }

  componentWillMount() {
    const { year, month, dateString } = this.props;
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/usage/${year}/${month}/${dateString}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          this.setState({ usage: snapshot.val().usage });
        }
      });
  }

  onButtonPress() {
    const { year, month, dateString } = this.props;
    const { usage } = this.state;

    this.props.usageUpdate({ year, month, dateString, usage });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label={`Electricity usage on ${this.props.dateString}`}
            placeholder="kWh"
            keyboardType="numeric"
            value={this.state.usage}
            onChangeText={usage => this.setState({ usage })}
          />
        </CardSection>
        <CardSection>
          <Button
            onPress={this.onButtonPress.bind(this)}
          >
            Save
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { year, month, dateString } = state.calendar;

  return { year, month, dateString };
};

export default connect(mapStateToProps, {
  usageUpdate
})(UsageForm);
