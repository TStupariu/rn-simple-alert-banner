import React, {Component} from 'react';
import {Dimensions, StyleSheet, Animated, Easing, View, TouchableOpacity, Text} from 'react-native';

const { width } = Dimensions.get('window')

class MessageBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      yCoordinate: new Animated.Value(-100),
      data: {}
    }

    this.hideTimeout = null
  }

  showMessage = (data) => {
    if (typeof data === 'object') {
      this.setState({
        data: {
          ...data,
          type: 'object'
        }
      })
    } else {
      this.setState({
        data: {
          Component: data,
          type: 'function'
        }
      })
    }

    this.slideIn()
    this.hideTimeout = setTimeout(() => this.hideMessage(), 2000)
  }

  hideMessage = () => {
    this.slideOut()
    clearTimeout(this.hideTimeout)
  }

  slideIn = () => {
    Animated.timing(this.state.yCoordinate, {
      toValue: 0,
      easing: Easing.ease,
      duration: 300
    }).start();
    this.setState({
      visible: true
    })
  }

  slideOut = () => {
    Animated.timing(this.state.yCoordinate, {
      toValue: -100,
      easing: Easing.ease,
      duration: 300
    }).start();
    this.setState({
      visible: false
    })
  }

  renderByConfig = () => {
    const { backgroundColor, color, text, Icon } = this.state.data

    const customContainerStyle = {
      backgroundColor,
    }

    const customTextStyle = {
      color
    }

    return (
      <View style={[styles.innerTouchContainer, customContainerStyle]}>
        {
          Icon
            ? <View style={styles.iconContainer}>
                {<Icon />}
              </View>
            : null
        }
        <Text style={customTextStyle}>{text}</Text>
      </View>
    )
  }

  renderComponent = () => {
    const { Component } = this.state.data
    if (!Component) return null
    return (
      <Component />
    )
  }

  render() {
    const {data: { type }} = this.state
    return (
      <View>
        <Animated.View style={[
          styles.mainContainer,
          { transform: [
            {
              translateY: this.state.yCoordinate
            }
          ] }
          ]}
        >
          <TouchableOpacity style={styles.touchContainer} onPress={this.hideMessage}>
            {
              type === 'object'
                ? this.renderByConfig()
                : this.renderComponent()
            }

          </TouchableOpacity>
        </Animated.View>
        {
          this.props.children
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    zIndex: 100,

    // Default Styling
    height: 100,
    width,
  },
  touchContainer: {
    flex: 1
  },
  innerTouchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  iconContainer: {
    marginRight: 10
  }
})

export default MessageBanner
