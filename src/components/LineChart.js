import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { StockLine } from 'react-native-pathjs-charts';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usage: [
        [
          { x: 0, y: 0 }
        ]
      ]
    };
  }

  componentWillMount() {
    const { year, month } = this.props;
    const { currentUser } = firebase.auth();

    firebase
      .database()
      .ref(`/users/${currentUser.uid}/usage/${year}/${month}`)
      .on('value', snapshot => {
        const usage = this.prepareUsage(year, month, snapshot.val());
        this.setState({ usage });
      });
  }

  getNumberOfDays(year, month) {
    const isLeap = ((year % 4) === 0 && ((year % 100) !== 0 || (year % 400) === 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  }

  prepareUsage(year, month, data) {
    const daysInMonth = this.getNumberOfDays(year, month);
    const usage = [
      []
    ];
    let day;
    let date;

    for (let i = 0; i < daysInMonth; i++) {
      day = i < 11 ? `0${i + 1}` : i + 1;
      date = `${year}-${month}-${day}`;

      if (data[date]) {
        usage[0].push({ x: i + 1, y: parseInt(data[date].usage, 10) });
      } else {
        usage[0].push({ x: i + 1, y: 0 });
      }
    }

    return usage;
  }

  render() {
    const options = {
      width: 280,
      height: 280,
      color: '#2980B9',
      margin: {
        top: 20,
        left: 45,
        bottom: 25,
        right: 20
      },
      animate: {
        type: 'delayed',
        duration: 300
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 10,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 10,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    };

    return (
      <View>
        <StockLine data={this.state.usage} options={options} xKey='x' yKey='y' />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { year, month } = state.calendar;

  return { year, month };
};

export default connect(mapStateToProps)(LineChart);
