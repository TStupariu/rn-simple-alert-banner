const MessageManager = () => {
  let messageRef = null

  const init = (ref) => {
    messageRef = ref
  }

  const show = (data) => {
    messageRef.current.showMessage(data)
  }

  return {
    init,
    show
  }
}

const messageManager = MessageManager()

export default messageManager

