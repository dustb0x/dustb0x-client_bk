import React from 'react'

import { Text } from '@nextui-org/react'

import BaseModal from '@/components/Parts/BaseModal'

interface CompletedModelProp {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CompletedModal: React.FC<CompletedModelProp> = ({
  isOpen,
  setIsOpen
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      setIsOpne={setIsOpen}
      title="Please confirm"
    >
      <Text>
        Processing was successful.
      </Text>
      <Text>
        It feels good when your wallet is clean.
      </Text>
    </BaseModal>
  )
}

export default CompletedModal
