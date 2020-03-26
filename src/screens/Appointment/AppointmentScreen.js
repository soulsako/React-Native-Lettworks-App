import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Filters from 'components/Filters';

export default class AppointmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  filteredProperties = (currFilters) => {
    // console.log('====================================');
    // console.log("Fetching properties with filters: ",);
    // console.log('====================================');
  }

  render() {
    const preferences =   {
          maxBedroom: 3,
          maxPrice: 600000,
          minBedroom: 3,
          minPrice: 200000,
          searchRadius: 10,
          type: "sale",
        }

    return (
      <Filters preferences={preferences} totalResults={10} onFilteresSelected={this.filteredProperties}/>
    );
  }
}
