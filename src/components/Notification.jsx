import { store } from 'react-notifications-component'
const addNotification = (title, message, type = 'success') => {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  })
}
/*Notification.defaultProps = {
  title: 'Wonderful!',
  message: 'message',
  type: 'success'
}
Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'danger', 'info', 'warning'])
}*/
export default addNotification
