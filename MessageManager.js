const MessageManager = () => {
  let messageRef = null

  const init = (ref) => {
    messageRef = ref
  }

  const show = (data) => {
    messageRef.current.showMessage(data)
  }

  const hide = () => {
    messageRef.current.hideMessage()
  }

  return {
    init,
    show,
    hide
  }
}

const messageManager = MessageManager()

export default messageManager

