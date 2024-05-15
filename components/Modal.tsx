import React from 'react'
import {
  View, Text, TouchableWithoutFeedback, StyleProp, ViewStyle, Platform, TextStyle,
} from 'react-native'
import Modal from 'react-native-modal'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'

interface ModalContainerProps {
  show: boolean,
  description?: string | JSX.Element,
  children: any,
//   showCloseButton?: boolean,
//   showCaretIcon?: boolean,
  caretIcon?: JSX.Element,
  onDismiss: () => void,
  onHide?: () => void,
  style?: StyleProp<ViewStyle>,
  modalStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
  backdropOpacity?: number
  title?: string
}
const ModalContainer = (props:ModalContainerProps) => {
  const {
    show, description, style,
    onDismiss, children,
    modalStyle, backdropOpacity = 0.70,
    title, titleStyle, descriptionStyle,
    onHide,
  } = props

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={backdropOpacity}
      statusBarTranslucent
      isVisible={show}
      onBackdropPress={() => onDismiss()}
      onModalHide={() => {
        if (onHide) onHide()
      }}
      useNativeDriver
      hideModalContentWhileAnimating
      style={
        [{
            marginTop: 5,
            justifyContent: 'center',
        }, modalStyle]
      }
    >

      <View style={[
        {
          backgroundColor: 'white',
          borderRadius: 8,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          position: 'relative',
        },
        style
      ]}
      >
        {title && (
          <Text style={[{ fontSize: 18, fontWeight: '700' }, titleStyle]}>
            {title}
          </Text>
        )}

        {description && (
          <Text style={[{ fontSize: 15},descriptionStyle]}>
            {description}
          </Text>
        )}

        {children}
      </View>
    </Modal>
  )
}

export default ModalContainer
