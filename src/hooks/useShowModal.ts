import { useState } from 'react'

const useShowModal = (visible: boolean, data: any) => {
  const [modalVisible, setModalVisible] = useState(visible)
  const [modalData, setModalData] = useState(data)

  return {
    visible: modalVisible
  }
}

// https://segmentfault.com/a/1190000022771569
// https://segmentfault.com/a/1190000021304499

export default useShowModal
