import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'

export function StoreConfigurationModal(props: { open: boolean, onClose: () => void, onSubmit: (e: any) => void, onClick: () => void }) {
  return <Modal isOpen={props.open} onClose={props.onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Save New Configuration</ModalHeader>
      <ModalBody>
        <form onSubmit={props.onSubmit}>
          <Text>Description: </Text>
          <Input name={'description'} type={'text'}
                 placeholder={'Please provide a description for the new configuration'} />
          <Input type={'submit'} onSubmit={props.onSubmit} />
          <Button onClick={props.onClick}>Reset</Button>
          <Button onClick={props.onClose}>Close</Button>
        </form>
      </ModalBody>
    </ModalContent>
  </Modal>
}