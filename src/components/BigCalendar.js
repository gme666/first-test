import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { selectDate, changeMonth } from '../actions/EnergyActions';

class BigCalendar extends Component {
  onDayPressHandler({ year, month, dateString }) {
    this.props.selectDate({ year, month, dateString });
  }

  onMonthPressHandler({ year, month }) {
    this.props.changeMonth({ year, month });
  }

  render() {
    return (
      <Calendar
        current={new Date().toISOString().slice(0, 10)}
        // minDate={'2017-09-01'}
        // maxDate={'2017-11-30'}
        onDayPress={this.onDayPressHandler.bind(this)}
        monthFormat={'yyyy MM'}
        onMonthChange={this.onMonthPressHandler.bind(this)}
        firstDay={1}

        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350
        }}

        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { dateString } = state.calendar;

  return { dateString };
};

export default connect(mapStateToProps, {
  selectDate,
  changeMonth
})(BigCalendar);
