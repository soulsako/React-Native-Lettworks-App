import React from 'react';
import { View, Picker, Image } from 'react-native';
import { Text } from 'atoms';
import { BlankButton } from 'atoms'
import { Icon, TouchableItem } from 'components';

export default class FilterBar extends React.PureComponent {


  render(){
    return (
      <View style={styles.filters}>
      <Picker
        placeholder={{}}
        hideIcon
        style={{ ...pickerStyles }}
        onValueChange={this.onSortSelect}
        items={sortItems}
      >
        <View style={styles.sort}>
            <Icon.Ionicons name="ios-arrow-down" size={14} color="#999ca4" />
            <Text style={styles.filterText} black mediumWeight>
                Sort
            </Text>
        </View>
      </Picker>

      {/* <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 8 }}>
              <TouchableItem onPress={this.toggleGridView}>
                  <Image
                      style={styles.gridIcon}
                      source={
                          singleView
                              ? IconsPLP.gridMenu.gridCol
                              : IconsPLP.gridMenu.gridColActive
                      }
                  />
              </TouchableItem>
          </View>
          <View style={{ marginLeft: 8 }}>
              <TouchableItem onPress={this.toggleGridView}>
                  <Image
                      style={styles.gridIcon}
                      source={
                          singleView
                              ? IconsPLP.gridMenu.gridSingleActive
                              : IconsPLP.gridMenu.gridSingle
                      }
                  />
              </TouchableItem>
          </View>
      </View> */}

      {navigation.getParam('showFilters') !== false ? (
          <BlankButton style={styles.filter} onPress={this.onOpenFilters}>
              {numFilters > 0 && (
                  <View style={styles.numFilters}>
                      <Text small type="w">
                          {numFilters}
                      </Text>
                  </View>
              )}
              <Text style={styles.filterText} black mediumWeight>
                  Filter
              </Text>
              <Icon.Ionicons name="ios-arrow-down" size={19} color="#999ca4" />
          </BlankButton>
      ) : null}
      </View>
    );
  }
}