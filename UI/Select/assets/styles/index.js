import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        backgroundColor: 'orangered',
        paddingVertical: 8,
        paddingHorizontal: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 18
    },
    pressed: {
        opacity: 0.4
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%'
    },
    modalView: {
      position: 'absolute',
      bottom: 0,
      backgroundColor:'orangered',
      borderRadius: 20,
      borderBottomEndRadius: 0,
      borderBottomStartRadius: 0,
      alignItems: 'center',
      width: '100%',
      shadowColor: 'black',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.6,
      shadowRadius: 5,
      elevation: 5
    },
    modalBody: {
      flex: 1,
      width: '100%',
      backgroundColor: 'white',
      padding: 10
    },
    modalHeader: {
      alignSelf: 'center',
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 8
    },
    modalDivider: {
      borderColor: 'black',
      borderBottomWidth: 2,
      width: '10%',
      alignSelf: 'center',
      marginVertical: 5
    }
});