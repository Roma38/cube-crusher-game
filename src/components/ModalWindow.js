import React, { useState } from 'react'
import { Modal, Input, Icon, Button, Header } from 'semantic-ui-react'

function ModalWindow(props) {
  const [name, setName] = useState('');

  return <Modal onClose={() => props.closeHandler(name)} open={props.isModalOpen} closeOnDimmerClick={false}>
    <Modal.Content>
      <Header as='h3'>Your Score: {props.points}</Header>
      <Input label='Name' value={name} onChange={e => setName(e.target.value)} />
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={() => props.closeHandler(name)}>
        <Icon name='checkmark' /> Save
      </Button>
    </Modal.Actions>
  </Modal>
}

export default ModalWindow;