import React from 'react'

import { Button, Loading, Modal } from '@nextui-org/react'

interface BaseModalProps {
  isOpen: boolean
  setIsOpne: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  enterBtnName?: string
  enterBtnFunc?: any
  isLoading?: boolean
  options?: {
    preventClose?: boolean
  }
  children: React.ReactNode
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  setIsOpne,
  title,
  enterBtnName,
  enterBtnFunc,
  isLoading,
  options,
  children
}) => {
  return (
    <Modal
      open={isOpen}
      preventClose={options?.preventClose}
    >
      <Modal.Header>
        {title}
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" disabled={isLoading} onClick={() => setIsOpne(false)}>
          {isLoading ? (
            <Loading type="points-opacity" color="currentColor" size="sm" />
          ) : (
            'Cancel'
          )}
        </Button>
        {enterBtnName && (
          <Button auto disabled={isLoading} onClick={() => enterBtnFunc()}>
            {isLoading ? (
              <Loading type="points-opacity" color="currentColor" size="sm" />
            ) : (
              enterBtnName
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default BaseModal
