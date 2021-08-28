import { Button, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

export const PowerOffModal = (props: { open: boolean, onClose: () => void, onReboot: (e: any) => void, onPowerOff: () => void }) => {
  return <Modal isOpen={props.open} onClose={props.onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Power Off</ModalHeader>
      <ModalBody>
          <Flex justifyContent={'space-evenly'}>
              <Button onClick={props.onReboot}>Reboot</Button>
              <Button onClick={props.onPowerOff}>Power Off</Button>
          </Flex>
      </ModalBody>
    </ModalContent>
  </Modal>
}
